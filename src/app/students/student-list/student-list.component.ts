import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mstudent } from 'src/app/shared/models/mstudent';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Mstudent[];
  searchStr = "";

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let students = this.studentService.getAll();
      this.students = ((await students) == null || (await students) == undefined) ? [] : await students;
    }
    catch(err) {
      console.error(err);
    }
  }

  getInitials(student: Mstudent) {
    return student.name[0] + student.surname[0];
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  async onDelete(id: number) {
    try {
      await this.studentService.deleteOneById(id);
    }
    catch (err) {
      console.error(err);
    }
    this.getData();
  }
}

