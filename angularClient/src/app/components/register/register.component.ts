import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {ValidateService} from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  password: String;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegister(){
    const user =  {
      name: this.name,
      username: this.username,
      password: this.password
    }

    //check for all fields
    if(!this.validateService.validateRegister(user)){

      this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 2000 });
      return false;
      }

      //register user
      this.authService.registerUser(user).subscribe(data => {
        if(data.success){
          this.flashMessage.show('You are now registered', { cssClass: 'alert-success', timeout: 2000 });
          this.router.navigate(['/login']);
        }
        else{
          this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 2000 });
          this.router.navigate(['/register']);
        }

      });

  }

}
