import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invoice-system-front';

  isCollapsed: boolean = true;
  menu: any[] = [];

  visible: boolean = false;
  loading = false;

  pending: number = 0;

  user: any;

  isLoading: boolean = false;

  menuImage:string = '';


  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
