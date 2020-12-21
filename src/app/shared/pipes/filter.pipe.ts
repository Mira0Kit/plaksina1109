import { Pipe, PipeTransform } from '@angular/core';
import { Mstudent } from '../models/mstudent';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(students: Mstudent[], searchStr: string): any[] {
    if (searchStr === '' || students.length === 0) {
      return students;
    }
    else {
      let filteredWorkers = students.filter(
        (student => {
          let filt = [student.group, student.specialization, (student.group + " " + student.specialization), (student.specialization + " " + student.group)];
          return filt.some((item) => item.toLowerCase().startsWith(searchStr.toLowerCase()));
        }));
      return filteredWorkers;
    }
  }
}