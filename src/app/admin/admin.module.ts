import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { AdminCategoryComponent } from '../admin/admin-category/admin-category.component';
import { AdminProductComponent } from '../admin/admin-product/admin-product.component';
import { AdminOrderComponent } from '../admin/admin-order/admin-order.component';
import { AdminReservComponent } from '../admin/admin-reserv/admin-reserv.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { FormsModule } from '@angular/forms';
import { CatImgDeleteComponent } from '../shared/components/cat-img-delete/cat-img-delete.component';
import { FdAdminComponent } from '../pages/fd-admin/fd-admin.component';

// Material 
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminHelperComponent } from './admin-helper/admin-helper.component'
@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminReservComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    CatImgDeleteComponent,
    FdAdminComponent,
    AdminHelperComponent,
  ],
  entryComponents: [CatImgDeleteComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  imports: [CommonModule, RouterModule, FormsModule,
    CdkTableModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    OverlayModule,
    ScrollingModule,
    MaterialFileInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
})
export class AdminModule { }
