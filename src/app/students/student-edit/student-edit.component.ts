import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Mstudent } from 'src/app/shared/models/mstudent';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  id: number;
  student: Mstudent;
  studentForm: FormGroup;

  public numMask = ['+', '7', '(',/[1-9]/, /\d/, /\d/,')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/];
  public birthMask = [ /\d/, /\d/,'.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id !== null && params.id !== undefined) {
        this.id = params.id;
      }
      else {
        this.id = null;
      }
    })
  }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.pattern(/^[+,0-9,(,),-]+$/), Validators.required]),
      //email: new FormControl(null, [Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/), Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      birthdate: new FormControl(null, [Validators.required, this.birthdateValidator]),
      group: new FormControl(null, [Validators.required]),
      specialization: new FormControl(null, [Validators.required]),
    });
    this.getData();
  }

  birthdateValidator(control: FormControl): { [s: string]: boolean } {
    return moment(String(control.value), 'DD-MM-YYYY').isBefore(moment.now()) ? null : { "birthdate": true }
  }

  async getData() {
    if ((this.id != null) && (this.id != undefined)) {
      try {
        let student = this.studentService.getOneById(this.id);
        this.student = await student;
      }
      catch (err) {
        console.error(err);
      }
      this.studentForm.patchValue({
        name: this.student.name,
        surname: this.student.surname,
        patronymic: this.student.patronymic,
        number: this.student.number,
        email: this.student.email,
        birthdate: this.student.birthdate,
        group: this.student.group,
        specialization: this.student.specialization
      });
    }
  }

  async onDelete() {
    try {
      await this.studentService.deleteOneById(this.id);
    }
    catch (err) {
      console.error(err);
    }
    this.router.navigate(['/students']);
  }

  async onSave() {
    if (this.id !== null && this.id !== undefined) {
      try {
        await this.studentService.putOneById(this.id, this.studentForm.value);
      }
      catch (err) {
        console.error(err);
      }
    }
    else {
      try {
        let res = await this.studentService.postOne(this.studentForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      }
      catch (err) {
        console.error(err);
      }
    }
  }
}
