import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router,
              private validateService: ValidateService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
    const user = {
      username: this.username,
      password: this.password
    }
    //check for all fields
    if(!this.validateService.validateLogin(user)){

      this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
      }

      //authenticate user
      this.authService.authenticateUser(user).subscribe(data => {
        if(data.success){
          this.authService.storeUserData(data.user, data.token);
          this.flashMessage.show('You are now logged in', { cssClass: 'alert-success', timeout: 3000 });

          this.router.navigate(['/dashboard']);
          form.reset();

        }
        else{
          this.flashMessage.show('Invalid login credentials', { cssClass: 'alert-danger', timeout: 2000 });
          this.router.navigate(['/login']);
          form.reset()

        }

      });
  }




}
