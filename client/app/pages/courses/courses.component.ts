import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import { CourseService } from '../../services/course.service';
import { Course } from '../../shared/models/course.model';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {

  title = 'Courses de l\'utilisateur';
  titleAdd = 'Ajout d\'une course';
  courses: Course[];
  user: User;
  course: Course;
  isLoading = true;
  editForm: FormGroup;
  duration = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(3),
  ]);
  distance = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(3),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toast: ToastComponent,
    private courseService: CourseService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.getUserAndCourses();
    this.editForm = this.formBuilder.group({
      duration: this.duration,
      distance: this.distance
    });
  }

  getUserAndCourses() {
    console.log('getUserAndCourses');
    if ( this.auth.currentUser != undefined) {
      this.user = this.auth.currentUser;
      this.course = new Course(); this.course.userId = this.user._id;
      this.getCourses();

    } else {
      this.userService.getUser(this.auth.currentUser).subscribe(
        data => { this.user = data; this.course = new Course(); this.course.userId = this.user._id; },
        error => console.log(error),
        () => this.getCourses()
      );
    }

  }

  getCourses() {
    console.log('getCourses');
    this.courseService.getCourses(this.user._id).fetch((data: Course[]) => {
      console.log("course List : " + JSON.stringify(data));

        this.isLoading = false
        if (data == []) {  //hawfull tricks
          var course = new Course();
          course._id = 'empty';
          course.duration = 0;
          course.distance = 0;
          data.push(new Course())
        }
        this.courses = data;
        console.log(data);
    }, (error: any) => {
        console.log(error);
        this.isLoading = false
	  });
  }

  save(course: Course) {
    console.log('saving the course : ');
    console.log(course);
    this.courseService.addCourse(course,
      res => {
        this.toast.open('Course created!', 'success');
        this.courses.push(course);
        this.courseService.upload();
      },
      error => {this.toast.open('Error during the Creation process', 'danger'); console.log(error);}
    );
  }

}
