import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-project-modal',
  imports: [NgFor, CommonModule,
    FormsModule, ButtonModule, ConfirmDialogModule
  ],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.css',
  providers: [ConfirmationService]
})
export class ProjectModal {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @ViewChild('projectForm') form!: NgForm;
  
  submitted = false;

  // Sample data - replace with your actual data or service calls
  clients = [
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
    { id: 3, name: 'Client C' }
  ];
  
  projectManagers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' }
  ];
  
  projectData = {
    projectName: '',
    client: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    status: '',
    description: ''
  };
  
  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }
  
  closeModal() {
    this.close.emit();
    this.resetForm();
  }
  
  onSubmit() {
    this.submitted = true;
    
    if (this.form.valid) {
      this.save.emit(this.projectData);
      this.closeModal();
    }
  }
  
  resetForm() {
    if (this.form) {
      this.form.resetForm();
    }
    this.submitted = false;
    this.projectData = {
      projectName: '',
      client: '',
      startDate: '',
      endDate: '',
      projectManager: '',
      status: '',
      description: ''
    };
  }

  confirmCancel() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      header: 'Cancel Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.closeModal();
      },
      reject: () => {
        // Handle rejection logic if needed
      },
    });
  }

  confirmSave() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to save the changes?',
      header: 'Save Confirmation',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.onSubmit();
      }
    });
  }
}
