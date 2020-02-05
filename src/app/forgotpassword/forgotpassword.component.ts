import { NewRegistration } from './../models/newregistration';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  public newRegistration = {} as NewRegistration;
  constructor(private apiService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  randomString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 9;
    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    this.newRegistration.password = randomstring;
    console.log(this.newRegistration.password);
    return 0;
  }


  onSearch(data: NewRegistration) {
    this.randomString();
    this.apiService.updatePassword(this.newRegistration.email, data).subscribe(data => {
      alert('Check your email id for new password');
    });
    this.router.navigate(['/login'])
  }
}
