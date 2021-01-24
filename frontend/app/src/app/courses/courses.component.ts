import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseInfo } from '../model/courseinfo.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let module = params['module'];
      this.coursesService.getCoursesByModule(module).subscribe((coursesInfos: CourseInfo[])=>{
        console.log(coursesInfos);
      })
   });
  }

}
