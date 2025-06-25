import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TaskModal } from './modal/task-modal/task-modal';
import { ProjectModal } from './modal/project-modal/project-modal';
import { TagModule } from 'primeng/tag';
import { Timesheet } from './timesheet/timesheet/timesheet';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  imports: [
    TableModule,
    InputNumberModule,
    ButtonModule,
    ToggleButtonModule,
    CalendarModule,
    FormsModule,
    TaskModal,ProjectModal,
        TagModule,
    DialogModule,
    InputTextModule,
        ConfirmDialogModule,
  ],
  schemas:   [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
export const routes: Routes = [
 { path: 'timesheet', component: Timesheet },
];
