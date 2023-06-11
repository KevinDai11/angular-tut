import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService.onToggle().subscribe((bool) => this.showAddTask = bool);
  }

  ngOnInit(): void {
    this.router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd && event.url === '/'){
        this.showAddTask = false;
      }
    })
  }

  toggleAddTask(){
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string){
    if(this.router.url === route){
      return true;
    }
    const currentUrl = this.router.url;
    const regex = new RegExp(`^${route}\\d+$`);
    return regex.test(currentUrl);
  }
}
