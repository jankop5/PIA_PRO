import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './navigation/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { MatCardModule } from '@angular/material/card';
import { ResearchComponent } from './science/research/research.component';
import { ProjectsComponent } from './science/projects/projects.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OffersComponent } from './offers/offers.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeinfoComponent } from './employees/employeeinfo/employeeinfo.component';
import { EmployeepageComponent } from './employees/employeepage/employeepage.component';
import { EmployeecoursesComponent } from './employees/employeecourses/employeecourses.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { MatTableModule } from '@angular/material/table';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterComponent } from './register/register.component';
import { StudentsComponent } from './students/students.component';
import { StudentpageComponent } from './students/studentpage/studentpage.component';
import { StudentcoursesComponent } from './students/studentcourses/studentcourses.component';
import { ManagecoursesComponent } from './managecourses/managecourses.component';
import { NewsComponent } from './news/news.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginComponent,
    ContactComponent,
    ResearchComponent,
    ProjectsComponent,
    OffersComponent,
    EmployeesComponent,
    EmployeeinfoComponent,
    EmployeepageComponent,
    EmployeecoursesComponent,
    CoursesComponent,
    CourseComponent,
    PasswordchangeComponent,
    MycoursesComponent,
    RegisterComponent,
    StudentsComponent,
    StudentpageComponent,
    StudentcoursesComponent,
    ManagecoursesComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule, 
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    FileUploadModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
