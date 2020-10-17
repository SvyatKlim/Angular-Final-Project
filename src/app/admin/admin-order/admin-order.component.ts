import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IOrder } from '../../shared/interfaces/order.interface';
import { OrderService } from '../../shared/services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../../shared/interfaces/product.interface';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-admin-order',
    templateUrl: './admin-order.component.html',
    styleUrls: ['./admin-order.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class AdminOrderComponent implements OnInit, AfterViewInit {
    adminOrders: Array<IOrder> = [];
    dataSource = new MatTableDataSource();
    displayedStudentsColumnsList: string[] = ['date', 'name', 'phone', 'address', 'comment', 'total', 'status', 'actions'];
    isTableExpanded = false;
    userOrder: Array<IProduct>;
    status: Array<object> = [
        { value: '0', viewValue: 'in processing' },
        { value: '1', viewValue: 'Prepare' },
        { value: '2', viewValue: 'Delivered' },
        { value: '3', viewValue: 'Performed' }
    ];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private ordersService: OrderService,) { }
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        this.getOrders();

    }
    private getOrders(): void {
        this.ordersService.getFireCloudOrder().subscribe(
            collection => {
                this.adminOrders = collection.map(document => {
                    const data = document.payload.doc.data() as IOrder;
                    const id = document.payload.doc.id;
                    this.userOrder = data.userOrder;
                    return { id, ...data };
                });
                this.dataSource.data = this.adminOrders
            }
        );
    }
    toggleTableRows() {
        this.isTableExpanded = !this.isTableExpanded;

        this.dataSource.data.forEach((row: any) => {
            row.isExpanded = this.isTableExpanded;
        })
    }

}