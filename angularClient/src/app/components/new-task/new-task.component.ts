import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.authService.addTask(form.value.content).
    subscribe(data => {
      if(data.success){
        this.flashMessage.show('Task added', { cssClass: 'alert-success', timeout: 3000 });
      }
      else
        this.flashMessage.show('Error while adding task', { cssClass: 'alert-danger', timeout: 3000 });
    });
    form.reset();
  }

}
