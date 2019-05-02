import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = this.firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log('userDetails', this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithFacebook() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  isLoggedIn() {
    if (this.userDetails === null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut()
    .then((res) => {
      this.router.navigate(['/']);
    });
  }

  getUserDetails() {
    return this.userDetails;
  }
}
