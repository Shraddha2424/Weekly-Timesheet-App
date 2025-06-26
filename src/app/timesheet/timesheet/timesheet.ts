import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TaskModal } from "../../modal/task-modal/task-modal";
import "primeicons/primeicons.css";

import { ProjectModal } from "../../modal/project-modal/project-modal";
import { TagModule } from 'primeng/tag';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { PrimeIcons } from 'primeng/api';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputSwitchModule } from 'primeng/inputswitch';

interface Project {
  name: string;
  tasks: {
    description: string;
    billable: string;
    hours: number[];
  }[];
}

@Component({
  selector: 'app-timesheet',
  imports: [NgFor, NgIf, NgClass,
    TableModule,
    InputNumberModule,
    ButtonModule,
    ButtonGroupModule,
    ToggleButtonModule, TabMenuModule,ToggleSwitchModule,
    CalendarModule,
    InputTextModule,InputSwitchModule,
    FormsModule, ProjectModal, TagModule, TaskModal],
  templateUrl: './timesheet.html',
  standalone:true,
  styleUrl: './timesheet.css'
})
export class Timesheet implements OnInit {
toggleBillability(arg0: any,arg1: any,arg2: any) {
throw new Error('Method not implemented.');
}
getDayViewTasks(): any[] {
throw new Error('Method not implemented.');
}
  selectedProjectId: number | null = null;
  selectedProjectName: string | null = null;
  showTaskModal: boolean = false;
  closeModal() {
    throw new Error('Method not implemented.');
  }
  viewMode: string= 'week'
  tabItems: any;
  activeTab: any;
  date: any;
  selectedDayIndex: number = 0;

  setView(view: string) {
    this.viewMode = view;
    if (view === 'day') {
      // Optionally reset selectedDayIndex or keep as is
      if (typeof this.selectedDayIndex !== 'number') {
        this.selectedDayIndex = 0;
      }
    }
  }
  selectedDate: any;
  loggedHours: any;
  tedHours: any;
  onDateSelect($event: Date) {
    throw new Error('Method not implemented.');
  }
  weekDays: { name: string; date: string; index: number; }[] | undefined
  currentWeekStart: Date = new Date();
  showProjectModal = false;
  projects: any|null=[];
  weekRange: any;
  showCalendar = false;

  constructor() { }

  ngOnInit(): void {
    this.setCurrentWeek();
    this.generateWeekDays();
    this.loadProjectsFromStorage();
  }

  // Load projects from localStorage
  loadProjectsFromStorage() {
    const stored = localStorage.getItem('timesheet_projects');
    this.projects = stored ? JSON.parse(stored) : [];
  }

  saveProjectsToStorage() {
    localStorage.setItem('timesheet_projects', JSON.stringify(this.projects));
     
  }
  setCurrentWeek(selectedDate?: Date) {
    const baseDate = selectedDate ? new Date(selectedDate) : new Date();
    const day = baseDate.getDay();
    // Calculate Monday of the week for the selected date
    const diff = baseDate.getDate() - day + (day === 0 ? -6 : 1);
    this.currentWeekStart = new Date(baseDate.setDate(diff));
    this.generateWeekDays(this.currentWeekStart);
  }

  generateWeekDays(startDate?: Date) {
    this.weekDays = [];
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const base = startDate ? new Date(startDate) : new Date(this.currentWeekStart);
    for (let i = 0; i < 7; i++) {
      const day = new Date(base);
      day.setDate(base.getDate() + i);
      this.weekDays.push({
        name: daysOfWeek[i],
        date: `${day.toLocaleString('default', { month: 'short' })} ${day.getDate()}`,
        index: i
      });
    }
  }
  getCurrentWeekKey(): string {
    const d = new Date(this.currentWeekStart);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getTaskHoursForCurrentWeek(task: any): string[] {
    if (!task.weekHours) task.weekHours = {};
    const key = this.getCurrentWeekKey();
    if (!task.weekHours[key]) {
      task.weekHours[key] = Array(7).fill('00:00');
    }
    return task.weekHours[key];
  }

  updateHours(projectId: number, taskId: number, dayIndex: number, event: any) {
    const value = event.target.value;
    const project = this.projects.find((p: any) => p.id === projectId);
    if (project) {
      const task = project.tasks.find((t: any) => t.id === taskId);
      if (task) {
        const hours = this.getTaskHoursForCurrentWeek(task);
        hours[dayIndex] = value;
    
        this.saveProjectsToStorage();
      }
    }
  }
   
  toggleProject(projectId: number) {
    const project = this.projects.find((p: any) => p.id === projectId);
    if (project) {
      project.expanded = !project.expanded;
      this.saveProjectsToStorage(); // Save when project is expanded/collapsed
    }
  }

  navigatePreviousWeek() {
    const newStart = new Date(this.currentWeekStart);
    newStart.setDate(this.currentWeekStart.getDate() - 7);
    this.currentWeekStart = newStart;
    this.generateWeekDays();
    if (this.viewMode === 'day') {
      this.selectedDayIndex = 0;
    }
  }

  navigateNextWeek() {
    const newStart = new Date(this.currentWeekStart);
    newStart.setDate(this.currentWeekStart.getDate() + 7);
    this.currentWeekStart = newStart;
    this.generateWeekDays();
    if (this.viewMode === 'day') {
      this.selectedDayIndex = 0;
    }
  }

  openProjectModal() {
    this.showProjectModal = true;
  }

  closeProjectModal() {
    this.showProjectModal = false;
  }

  saveProject(projectData: any) {
    const newId = this.projects.length > 0 ?
      Math.max(...this.projects.map((p: { id: any; }) => p.id)) + 1 : 1;
    const newProject = {
      id: newId,
      name: projectData.projectName,
      client: projectData.client,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      projectManager: projectData.projectManager,
      status: projectData.status,
      description: projectData.description,
      expanded: true,
      tasks: []
    };

    this.projects.push(newProject);
    this.saveProjectsToStorage(); // Save after adding new project
    this.closeProjectModal();
  }
  openTaskModal(projectId: number) {
  this.selectedProjectId = projectId;
  const selectedProject = this.projects.find((p:any) => p.id === projectId);
  this.selectedProjectName = selectedProject ? selectedProject.name : null;
  this.showTaskModal = true;
  this.selectedDayIndex = 0;
}

  closeTaskModal() {
    this.showTaskModal = false;
    this.selectedProjectId = null;
  }
  saveTask(taskData: any) {
    const project = this.projects.find((p: { id: number | null; }) => p.id === this.selectedProjectId);
    if (project) {
      if (!project.tasks) project.tasks = [];
      // Assign a unique id to the new task
      const newTaskId = project.tasks.length > 0
        ? Math.max(...project.tasks.map((t: any) => t.id)) + 1
        : 1;
      const newTask = {
        ...taskData,
        id: newTaskId,
        hours: Array(7).fill('00:00')
      };
      project.tasks.push(newTask);
      this.saveProjectsToStorage();  
      this.loadProjectsFromStorage(); 
    }
    this.closeTaskModal();
  }

  getProjectTotalForDay(project: any, dayIndex: number): string {
    let totalSeconds = 0;
    if (project.tasks && Array.isArray(project.tasks)) {
      for (const task of project.tasks) {
        const hours = this.getTaskHoursForCurrentWeek(task);
        const val = hours[dayIndex] ? hours[dayIndex] : '00:00';
        if (val.includes(':')) {
          const [h, m] = val.split(':').map(Number);
          totalSeconds += (isNaN(h) ? 0 : h) * 3600 + (isNaN(m) ? 0 : m) * 60;
        } else {
          const floatVal = parseFloat(val);
          if (!isNaN(floatVal)) totalSeconds += floatVal * 3600;
        }
      }
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getProjectTotalForWeek(project: any): string {
    let totalSeconds = 0;
    if (project.tasks && Array.isArray(project.tasks)) {
      for (const task of project.tasks) {
        const hours = this.getTaskHoursForCurrentWeek(task);
        for (let i = 0; i < 7; i++) {
          const val = hours[i] ? hours[i] : '00:00';
          if (val.includes(':')) {
            const [h, m] = val.split(':').map(Number);
            totalSeconds += (isNaN(h) ? 0 : h) * 3600 + (isNaN(m) ? 0 : m) * 60;
          } else {
            const floatVal = parseFloat(val);
            if (!isNaN(floatVal)) totalSeconds += floatVal * 3600;
          }
        }
      }
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getTaskTotalForWeek(task: any): string {
    let totalSeconds = 0;
    const hours = this.getTaskHoursForCurrentWeek(task);
    for (let i = 0; i < 7; i++) {
      const val = hours[i] ? hours[i] : '00:00';
      if (val.includes(':')) {
        const [h, m] = val.split(':').map(Number);
        totalSeconds += (isNaN(h) ? 0 : h) * 3600 + (isNaN(m) ? 0 : m) * 60;
      } else {
        const floatVal = parseFloat(val);
        if (!isNaN(floatVal)) totalSeconds += floatVal * 3600;
      }
    }
    const hoursTotal = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hoursTotal.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getTotalForDay(dayIndex: number): string {
    let totalSeconds = 0;
    for (const project of this.projects) {
      if (project.tasks && Array.isArray(project.tasks)) {
        for (const task of project.tasks) {
          const hours = this.getTaskHoursForCurrentWeek(task);
          const val = hours[dayIndex] ? hours[dayIndex] : '00:00';
          if (val.includes(':')) {
            const [h, m] = val.split(':').map(Number);
            totalSeconds += (isNaN(h) ? 0 : h) * 3600 + (isNaN(m) ? 0 : m) * 60;
          } else {
            const floatVal = parseFloat(val);
            if (!isNaN(floatVal)) totalSeconds += floatVal * 3600;
          }
        }
      }
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getTotalForWeek(): string {
    let totalSeconds = 0;
    for (let i = 0; i < 7; i++) {
      const val = this.getTotalForDay(i);
      if (val && val !== '00:00') {
        const [h, m] = val.split(':').map(Number);
        totalSeconds += (isNaN(h) ? 0 : h) * 3600 + (isNaN(m) ? 0 : m) * 60;
      }
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getWeekRange(): string {
    const start = this.currentWeekStart;
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const startStr = `${start.toLocaleString('default', { month: 'short' })} ${start.getDate()}`;
    const endStr = `${end.toLocaleString('default', { month: 'short' })} ${end.getDate()}, ${end.getFullYear()}`;
    return `${startStr} - ${endStr}`;
  }

  onCalendarSelect(date: Date) {
    this.showCalendar = false;
    this.setCurrentWeek(date);
    if (this.viewMode === 'day') {
      this.selectedDayIndex = 0;
    }
  }

  getDayRange(): string {
    if (!this.weekDays || typeof this.selectedDayIndex !== 'number') return '';
    const day = this.weekDays[this.selectedDayIndex];
    if (!day) return '';
    // Example: 'Mon, Jun 16, 2025'
    const currentYear = new Date(this.currentWeekStart).getFullYear();
    return `${day.name}, ${day.date}, ${currentYear}`;
  }
  selectDay(index: number): void {
  this.selectedDayIndex = index;
}
}
