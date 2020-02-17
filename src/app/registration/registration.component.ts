import { Component, OnInit } from '@angular/core';
import { NewRegistration } from '../models/newregistration';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public newRegistration = {} as NewRegistration;
  constructor(private router: Router, private apiService: AuthService) { }
  token: string;
  date = new Date();
  codeGenerated = '';
  evtMsg: any;


  ngOnInit() {
   
  }


  randomString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 6;
    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
   }
    this.newRegistration.password = randomstring;
    console.log(this.newRegistration.password);
    return 0;
   }



  onSubmit(newRegistration: NewRegistration) {
   
if(newRegistration.email.includes(newRegistration.roll +'')) {
 // this.randomString();
    this.apiService.createLoginId(newRegistration).subscribe(data => {
      alert('You Successfully registered.');
  this.router.navigate(['/login']);
    },
      error => {
        alert(error.error.text);
      });

} else {
alert('email id and roll number are not match')
}
  }




}
