import { Component } from '@angular/core';
 
import { Timesheet } from "./timesheet/timesheet/timesheet";
import { Sidebar } from "./layout/sidebar/sidebar/sidebar";
import { Topbar } from "./layout/topbar/topbar/topbar";
import { RouterOutlet } from '@angular/router';
 

@Component({
  selector: 'app-root',
  imports: [ Timesheet, Sidebar, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone:true
})
export class App {
  protected title = 'Weekly-Timesheet-App';
}
