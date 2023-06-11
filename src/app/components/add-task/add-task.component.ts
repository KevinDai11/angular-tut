import { Component, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  text: string = "";
  day: string = "";
  reminder: boolean = false;

  showAddTask: boolean = false;
  subscription: Subscription = new Subscription();

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private uiService: UiService){
    this.subscription = this.uiService.onToggle().subscribe( (bool) => this.showAddTask = bool)
  }

  onSubmit(){
    if(!this.text){
      alert('Add Task');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    //clear form
    this.text = "";
    this.day = "";
    this.reminder = false;
  }
}
