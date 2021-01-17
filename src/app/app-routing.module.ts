import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SecondPageComponent} from './second-page/second-page.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path:"second", component: SecondPageComponent },
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
