import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  userStatusChanges: Subject<string> = new Subject<string>();
  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore, private router: Router, private toastr: ToastrService) { }

  showSuccess(user: string): any {
    this.toastr.success(`Hello, ${user}`);
  }
  showError(error: string): any {
    this.toastr.error(`Error: ${error}`);
  }

  signInAdmin(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afFirestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              if (this.currentUser.role === 'admin' && this.currentUser.access) {
                localStorage.setItem('admin', JSON.stringify(this.currentUser));
                this.router.navigateByUrl('/admin');
                this.userStatusChanges.next('admin');
                this.showSuccess('admin')
              } else {
                this.showError('You are not an Admin, run a puppy !!!!')
              }
            });
          }
        );
      })
      .catch(err => this.showError(err.message));
  }
  signInUser(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afFirestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              if (this.currentUser.role === 'user') {
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                this.router.navigateByUrl('/profile');
                this.userStatusChanges.next('/profile');
                this.showSuccess(' Welcome to our restaurant !')
              }
              else {
                this.showError('This Account was not found, please register an account')
              }
            });
          }
        );
      })
      .catch(err => this.showError(err.message));
  }

  signOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('admin');
      localStorage.removeItem('user');
      this.router.navigateByUrl('home');
      this.userStatusChanges.next('logout');
    });
  }

  signUp(email: string, password: string, firstName: string, lastName: string): any {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          id: userResponse.user.uid,
          userEmail: userResponse.user.email,
          userFirstName: firstName,
          userLastName: lastName,
          role: 'user'
        };
        this.afFirestore.collection('users').add(user)
          .then(() => {
            this.showSuccess('Register is done !');
          })
          .catch(err => this.showError(err));
      })
      .catch(err => this.showError(err));
  }
}

