import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { EmployeepageComponent } from './employees/employeepage/employeepage.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { ManagecoursesComponent } from './managecourses/managecourses.component';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { NewsComponent } from './news/news.component';
import { OffersComponent } from './offers/offers.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './routeguards/admin.guard';
import { EmployeeGuard } from './routeguards/employee.guard';
import { FirstLoginGuard } from './routeguards/firstlogin.guard';
import { LoggedInGuard } from './routeguards/loggedin.guard';
import { ProjectsComponent } from './science/projects/projects.component';
import { ResearchComponent } from './science/research/research.component';
import { StudentpageComponent } from './students/studentpage/studentpage.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent, canActivate: [FirstLoginGuard]},
  {path: 'science/research', component: ResearchComponent, canActivate: [FirstLoginGuard]},
  {path: 'science/projects', component: ProjectsComponent, canActivate: [FirstLoginGuard]},
  {path: 'projects', component: OffersComponent, canActivate: [FirstLoginGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [FirstLoginGuard]},
  {path: 'employees/:username', component: EmployeepageComponent, canActivate: [FirstLoginGuard]},
  {path: 'courses/:module', component: CoursesComponent, canActivate: [FirstLoginGuard]},
  {path: 'course/:coursename', component: CourseComponent, canActivate: [LoggedInGuard, FirstLoginGuard]},
  {path: 'passwordchange', component: PasswordchangeComponent, canActivate: [LoggedInGuard]},
  {path: 'mycourses', component: MycoursesComponent, canActivate: [LoggedInGuard, FirstLoginGuard, EmployeeGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AdminGuard]},
  {path: 'students', component: StudentsComponent, canActivate: [LoggedInGuard, AdminGuard]},
  {path: 'students/:username', component: StudentpageComponent, canActivate: [LoggedInGuard, AdminGuard]},
  {path: 'managecourses', component: ManagecoursesComponent, canActivate: [LoggedInGuard, AdminGuard]},
  {path: 'news', component: NewsComponent, canActivate: [FirstLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
