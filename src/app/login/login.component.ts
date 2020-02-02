import { Component, OnInit } from '@angular/core';
import { Loginuser } from '../models/loginuser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData = {} as Loginuser; 
  constructor(private router: Router, private apiService: AuthService) { }
  token : string;

  ngOnInit() {
  }

  onLogin(loginData : Loginuser) {
    this.apiService.isLoginId(loginData).subscribe(data => {
    sessionStorage.setItem('token', this.token);
    this.router.navigate(["/paper"]); 
      },
        error => {
          alert(error.error.text);
        });
  }
}
