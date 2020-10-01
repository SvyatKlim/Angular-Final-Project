import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {
  @Input() statusForm: boolean;
  contactForm: boolean = false;
  contactName:string;
  contactEmail:string;
  contactMessage:string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.statusForm)
  }

  // addReserv(form: NgForm): void {
  //   const reserv = new Reservation(
  //     this.dataId,
  //     this.loginedUserId,
  //     this.name,
  //     this.email,
  //     this.dateValue,
  //     this.timeSelected,
  //     this.count,
  //     this.progress,
  //     this.directions
  //   )
  //   if (!this.editStatus) {
  //     delete reserv.dataID;
  //     delete reserv.directions;
  //     this.reservSerice
  //       .postFireCloudReserv({ ...reserv })
  //       .then(() => this.reservSerice.showSuccess())
  //       .catch((err) => this.reservSerice.showError(err));
  //   }
  //   this.resetForm();
  //   console.log(reserv)
  //   form.resetForm()
  // }

}
