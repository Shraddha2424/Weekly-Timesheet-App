import { formatNumber, NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IftaLabel } from 'primeng/iftalabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-task-modal',
  imports: [NgClass, NgIf, FormsModule, ButtonModule, ToastModule, ConfirmDialogModule, DropdownModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css',
  providers: [ConfirmationService]
})
export class TaskModal {
  taskStatusOptions: any;
  taskNameOptions: any[] | undefined;

  constructor(private confirmationService: ConfirmationService) { }

  @Input() isVisible: boolean = false;
  @Input() selectedProjectId: string | null = null;
  @Input() selectedProjectName: string | null = null;
  @Input() projects: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  taskCategories = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Testing' },
    { id: 4, name: 'Deployment' }
  ];
  billabilityOptions = [
    { label: 'Billable', value: 'billable', icon: 'pi pi-dollar' },
    { label: 'Non-Billable', value: 'non-billable', icon: 'pi pi-dollar' }
  ];
  // Your form data model
  taskForm = {
    taskCategory: '',
    taskName: '',
    billable: '',
    taskStatus: '',
    description: '',
    comment: ''
  };
  formSubmitted = false;
  formErrors = {
    taskCategory: false,
    taskName: false,
    billable: false,
    taskStatus: false,
    description: false
  };

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.formSubmitted = true;
 
    if (this.validateForm()) {
      this.save.emit(this.taskForm);
      this.resetForm();
    } else {
      this.updateFormErrors();
      console.log('Validation failed', this.taskForm);
    }
  }

  validateForm() {
    return (
      this.taskForm.taskCategory.trim() !== '' &&
      this.taskForm.taskName.trim() !== '' &&
      this.taskForm.billable.trim() !== '' &&
      this.taskForm.taskStatus.trim() !== '' &&
      this.taskForm.description.trim() !== ''
    );
  }

  updateFormErrors() {
    this.formErrors = {
      taskCategory: this.taskForm.taskCategory.trim() === '',
      taskName: this.taskForm.taskName.trim() === '',
      billable: this.taskForm.billable.trim() === '',
      taskStatus: this.taskForm.taskStatus.trim() === '',
      description: this.taskForm.description.trim() === ''
    };
  }

  resetForm() {
    this.taskForm = {
      taskCategory: '',
      taskName: '',
      billable: '',
      taskStatus: '',
      description: '',
      comment: ''
    };
    this.formSubmitted = false;
    this.formErrors = {
      taskCategory: false,
      taskName: false,
      billable: false,
      taskStatus: false,
      description: false
    };
  }
}