import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CatContactService } from '../../services/cat-contact.service';
@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {
  @Input() statusForm: boolean;
  contactForm: boolean = false;
  cateringForm: FormGroup;
  contactFormTemplate: FormGroup;
  constructor(private toastr: ToastrService, private cateringService: CatContactService) { }

  ngOnInit(): void {
    console.log(this.statusForm)
    this.cateringForm = new FormGroup({
      user_name: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-z]{1,32}")]),
      user_email: new FormControl(null, [Validators.email, Validators.required]),
      user_message: new FormControl(null, Validators.required),
      user_phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}")]),
    })
    this.contactFormTemplate = new FormGroup({
      user_name: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-z]{1,32}")]),
      user_email: new FormControl(null, [Validators.email, Validators.required]),
      user_message: new FormControl(null, Validators.required),
    })
  }

  onSubmit(value: string) {
    if (value === 'catering') {
      this.addRequestCatering()
      this.cateringForm.reset()
    }
    if (value === 'contact') {
      this.addRequestContact()
      this.contactFormTemplate.reset()
    }
  }
  private addRequestCatering(): void {
    if (this.cateringForm.status === "VALID") {
      this.cateringService.postFireCloudCateringOrder(this.cateringForm.value)
        .then(() => this.showSuccess())
        .catch((err) => this.showError(err));
    }
  }
  private addRequestContact(): void {
    if (this.contactFormTemplate.status === "VALID") {
      this.cateringService.postFireCloudContactOrder(this.contactFormTemplate.value)
        .then(() => this.showSuccess())
        .catch((err) => this.showError(err));
    }
  }
  private showSuccess(): any {
    this.toastr.success(`Thank you, your request has been sent.`);
  }
  private showError(error: string): any {
    this.toastr.error(`Error: ${error}`);
  }
}
