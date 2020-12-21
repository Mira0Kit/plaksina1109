import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentsComponent } from './students.component';
import { StudentsModule } from './students.module';


const routes: Routes = [
  {
    path: "",
    component: StudentsComponent,
    children: [
      {
        path: "",
        component: StudentListComponent
      },
      {
        path: "profile",
        component: StudentEditComponent
      },
      {
        path: "profile/:id",
        component: StudentEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
