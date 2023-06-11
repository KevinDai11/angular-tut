import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent {
  @Input() task: Task = {
    id: 1,
    text: "loading...",
    day: "loading...",
    reminder: true
  };

  task_id: any = "1";

  faTimes = faTimes;
  reminder: boolean = false;

  constructor(private route : ActivatedRoute, private taskService: TaskService, private router: Router, private uiService : UiService) { }

  ngOnInit() : void {
    this.task_id = this.route.snapshot.paramMap.get('id');
    if (!this.task_id){
      alert('invalid id')
    }

    this.taskService.getTask(this.task_id).subscribe( (task) => {this.task = task; this.reminder = this.task.reminder;})

  }

  deleteTask(t: Task) {
    this.taskService.deleteTask(t).subscribe( () => this.router.navigate(["/"]) );
  }

  onToggle(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }
}
