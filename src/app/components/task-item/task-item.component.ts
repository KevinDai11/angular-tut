import { Component, Input, Output, EventEmitter } from '@angular/core';

import {Task} from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task = {
    id: 1,
    text: "task",
    day: "today",
    reminder: true
  };

  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

  faTime = faTimes;

  deleteTask(task: Task){
    console.log("removed task", task)
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task){
    this.onToggleReminder.emit(task)
  }

}
