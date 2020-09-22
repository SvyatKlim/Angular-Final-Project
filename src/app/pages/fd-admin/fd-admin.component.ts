import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-fd-admin',
  templateUrl: './fd-admin.component.html',
  styleUrls: ['./fd-admin.component.scss'],
})
export class FdAdminComponent implements OnInit {
  email: string;
  password: string;
  constructor(private AuthService: AuthService) { }

  signIn(): void {
    this.AuthService.signIn(this.email, this.password)
  }

  ngOnInit(): void { }
}
