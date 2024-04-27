import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Student} from "../../model/student.entity";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-student-create-and-edit',
  templateUrl: './student-create-and-edit.component.html',
  styleUrl: './student-create-and-edit.component.css'
})
export class StudentCreateAndEditComponent {

  // Attributes

  @Input() student: Student;
  @Input() editMode = false;
  @Output() studentAdded = new EventEmitter<Student>();
  @Output() studentUpdated = new EventEmitter<Student>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('studentForm', { static: false}) studentForm!: NgForm;

  // Methods

  constructor() {
    this.student = {} as Student;
  }

  // Private Methods

  private resetEditState() {
    this.editMode = false;
    this.studentForm.resetForm();
    this.student = {} as Student;
  }

  // Event Handlers

  onSubmit() {
    if (this.studentForm.form.valid) {
      if (this.editMode) {
        this.studentUpdated.emit(this.student);
      } else {
        this.studentAdded.emit(this.student);
      }
      this.resetEditState();
    } else {
      console.log('invalid data');
    }
  }

  onCancel() {
    this.resetEditState();
    this.editCanceled.emit();
  }

}
