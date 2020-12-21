import { Pipe, PipeTransform } from '@angular/core';
import { Mstudent } from '../models/mstudent';

@Pipe({
  name: 'surnameSort'
})
export class SurnameSortPipe implements PipeTransform {

  transform(students: Mstudent[]): any {
    if (students == undefined || students.length === 0) {
      return students;
    }
    else {
      let filteredStudents = students.sort((a, b) => {
        if (a.surname > b.surname) {
          return 1;
        }
        if (a.surname < b.surname) {
          return -1;
        }
        return 0;
      });
      return filteredStudents;
    }
  }
}
