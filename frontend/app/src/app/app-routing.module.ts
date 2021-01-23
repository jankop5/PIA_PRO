import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { ProjectsComponent } from './science/projects/projects.component';
import { ResearchComponent } from './science/research/research.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'science/research', component: ResearchComponent},
  {path: 'science/projects', component: ProjectsComponent},
  {path: 'projects', component: OffersComponent},
  {path: 'employees', component: EmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
