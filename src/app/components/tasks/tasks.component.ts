import { Component } from '@angular/core';

import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.updateTasks();
  }

  updateTasks() : void{
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(t: Task) {
    this.taskService.deleteTask(t).subscribe(() => this.updateTasks())
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task){
    console.log("added task: ",task)
    this.taskService.addTask(task).subscribe(() => this.updateTasks())
  }
}
