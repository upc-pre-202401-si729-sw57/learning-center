import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Student} from "../../model/student.entity";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  @Input() student: Student;
  @Input() editMode = false;
  @Output() studentAdded = new EventEmitter<Student>();
  @Output() studentUpdated = new EventEmitter<Student>();
  @Output() editCanceled = new EventEmitter();

  @ViewChild('studentForm', { static: false}) studentForm!: NgForm;
  constructor() {
    this.student = {} as Student;
  }

  private resetEditState() {
    this.editMode = false;
    this.studentForm.resetForm();
    this.student = {} as Student;
  }

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
