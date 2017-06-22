import { Component, OnInit } from '@angular/core';
import {Task} from '../../task.interface';
import {AuthService} from '../../services/auth.service'
import {ValidateService} from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Response} from '@angular/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }


  ngOnInit(){
    this.authService.getTask()
    .subscribe(
      (tasks: Task[]) =>this.tasks = tasks,
      (error: Response) => {
        this.flashMessage.show('You have to login to view tasks', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }

    );
  }


}
