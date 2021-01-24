import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  course: Course;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let coursename = params['coursename'];
      this.coursesService.getCourse(coursename).subscribe((course: Course)=>{
        this.course = course;
        console.log(this.course);
      })
   });
  }

}
