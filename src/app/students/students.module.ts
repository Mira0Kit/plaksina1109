import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { SurnameSortPipe } from '../shared/pipes/surname-sort.pipe';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent,
    StudentEditComponent,
    FilterPipe,
    SurnameSortPipe
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule
  ]
})
export class StudentsModule { }
