import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }
  toggleSideBar(): void {
    this.toggleSideBarForMe.emit();
  }
  signOut(): void {
    this.authService.signOut()
  }
}
