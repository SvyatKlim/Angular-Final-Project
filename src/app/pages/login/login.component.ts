import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  emailName: string;
  passFirst: string;
  marked: boolean = false;
  sectionLogin = true;
  sectionRegister = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  toggleVisibility(e) {
    console.log(e.target.checked)
    this.marked = e.target.checked;
  }
  login(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.signIn(this.email, this.password)
      this.resetForm()
    } else {
      this.authService.showError('Sorry, you account login or password is wrong.')
    }

  }
  register(): void {
    this.authService.signUp(this.emailName, this.passFirst, this.firstName, this.lastName)
    this.resetForm()
  }
  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.emailName = '';
    this.passFirst = '';
    this.marked = false;
    this.sectionLogin = true;
    this.sectionRegister = false;
    this.dialog.closeAll()
  }

}
