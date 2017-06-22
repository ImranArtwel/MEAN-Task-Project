import { Component, OnInit, Input } from '@angular/core';
import {Task} from '../../task.interface';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
 @Input() task: Task; //set from outside
 allowEdit = false;
 editValue = "";
  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
  onEdit(){

    this.allowEdit = true;
    this.editValue = this.task.content;
    return false;
  }
  onUpdate() {

   this.authService.updateTask(this.task._id, this.editValue)
     .subscribe(
       (task: Task) => {
         this.task.content = this.editValue;
         this.editValue = '';
       }
     );

   this.allowEdit = false;
   return false;

 }
  onCancel(){
   this.editValue = '';
   this.allowEdit = false;
   return false;
  }
  onDelete(){
   this.authService.deleteTask(this.task._id).subscribe(data => {
    if(data.success)
    {
      this.flashMessage.show('Task deleted', { cssClass: 'alert-success', timeout: 3000 });
    }
    else
       this.flashMessage.show('Error while deleting task', { cssClass: 'alert-danger', timeout: 3000 });
   });
   location.reload();
   return false;
  }

}
