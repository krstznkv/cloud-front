import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TourListComponent } from './tour-list/tour-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'tour-list', component: TourListComponent},
  {path: 'user-list', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
