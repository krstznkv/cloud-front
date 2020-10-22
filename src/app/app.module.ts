import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TourListComponent } from './tour-list/tour-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'tour-list', component: TourListComponent},
  {path: 'user-list', component: UserListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TourListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes)],
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
