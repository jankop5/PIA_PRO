import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseInfo } from '../model/courseinfo.model';
import { CoursesService } from '../services/courses.service';

/**
 * @module 
 * komponenta za prikaz liste svih predmeta 
 */
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
      this.studylevel = "Osnovne studije";
      switch (module) {
        case "SI":
          this.modulename = "Odsek SI";
          break;
        case "RTI":
          this.modulename = "Odsek RTI";
          break;
        case "master":
          this.modulename = "Master";
          this.studylevel = "Master studije";
          break;
        default:
          this.modulename = "Ostali odseci";
          break;
      }
      this.courses = [];
      this.semesters = [];
      this.coursesService.getCoursesByModule(module).subscribe((coursesInfos: CourseInfo[])=>{
        if(module != "master"){
          for (let i = 1; i <= 8; i++) {
            this.semesters.push(i);
            this.courses.push(this.filterAndSortCourses(coursesInfos, i));
          }
        }
        else{
          for (let i = 9; i <= 10; i++) {
            this.semesters.push(i);
            this.courses.push(this.filterAndSortCourses(coursesInfos, i));
          }
        }
      })
   });
  }

  /**
   * filtriranje i sortiranje predmeta po semestrima i nazivu
   * @param coursesInfos niz sa informacijama o predmetima
   * @param semester semestar
   */
  private filterAndSortCourses(coursesInfos: CourseInfo[], semester: number): CourseInfo[]{
    let courses = coursesInfos.filter(function(course){
      return course.semester == semester;
    });
    courses = courses.sort((a, b)=>{
      if(a.coursename < b.coursename) return -1;
      else if(a.coursename > b.coursename) return 1;
      else return 0;
    });
    return courses;
  }

  studylevel: string;
  modulename: string;
  semesters: number[];
  courses: CourseInfo[][];
}
