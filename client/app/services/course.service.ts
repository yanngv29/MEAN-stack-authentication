import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../shared/models/course.model';
import {MinimongoFactory} from '../shared/db/minimongo-factory';

@Injectable()
export class CourseService {

  private static db = new MinimongoFactory().getDatabase();

  constructor(private http: HttpClient) {
  }

  upload() {
    CourseService.db.upload(success => console.log(success), error => console.log(error));
  }

  getCourses(userId: String): any {
    //return this.db.courses.find({ userId: userId });
    return CourseService.db.courses.find({ userId: userId }, {});
  }

  addCourse(course: Course, success, error): any {
    return CourseService.db.courses.upsert(course, function(data, err ) {
      if(err) return error(err);
      return success(data);
    });
//   this.db.courses.upsert(course, function(res) {
// // Success:
//   console.log('result add course : ' + JSON.stringify(res));
//     return res;
//   });
  }

  getCourse(course: Course): Observable<Course> {
    return CourseService.db.courses.findOne({ _id: course._id });
    // this.db.courses.findOne({ _id: course._id }, {}, function(res) {
		//     console.log("course : " + JSON.stringify(res));
    //     return res;
	  //    });
  }

  editCourse(course: Course): Observable<string> {
    return this.http.put(`/api/course/${course._id}`, course, { responseType: 'text' });
  }

  deleteCourse(course: Course): Observable<string> {
    return this.http.delete(`/api/course/${course._id}`, { responseType: 'text' });
  }

}
