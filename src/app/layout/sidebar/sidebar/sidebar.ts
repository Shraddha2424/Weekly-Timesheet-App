import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';

@Component({
  selector: 'app-sidebar',
  imports: [NgFor,NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Projects', icon: 'pi pi-folder', route: '/projects' },
    {label:'Activities', icon:'pi pi-briefcase', route:'/activities'},
    {label:'Time Tracking', icon:'pi pi-clock', route:'/time-tracking'},
    { label: 'Timesheet', icon: 'pi pi-calendar', route: '/timesheet' }
  ];
  isSidebarVisible: any;

  
 toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
