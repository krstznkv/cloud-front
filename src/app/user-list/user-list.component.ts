import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {User} from '../models/user';
import {Tour} from '../models/tour';
import {element} from 'protractor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
   users = {} as User[];
   user = {} as User;
   error;
  isUserFormShow: boolean;
  isCreate: boolean;
  tours = {} as Tour[];
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.findUsers();
  }
  findUsers() {
    this.service.findAllUsers().subscribe((data) => {
      this.users = data;
      this.findTours();
    }, error => {
      this.error = error.message;
      console.log(error);

    });
  }
  findTours() {
    this.service.findAllTour().subscribe((data) => {
      this.tours = data;

    }, error => {
      this.error = error.message;
      console.log(error);

    });
  }
  createUser() {
    if (this.isCreate){
      console.log(this.user.idTour);
      console.log(this.user.id);
      this.user.id = null;
      this.service.createUser(this.user).subscribe((data) => {
      this.isUserFormShow = false;
      this.findUsers();
    }, error => {
      this.error = error.message;
      console.log(error);
    });
    }
    else {
      console.log(this.user.id);
      console.log(this.user.name);
      this.service.updateUser(this.user).subscribe((data) => {
        this.isUserFormShow = false;
        this.findUsers();
      }, error => {
        this.error = error.message;
        console.log(error);
      });
    }

  }

  changeButt() {
    this.isUserFormShow = true;
    this.isCreate = true;
  }

  updateClick(u: User) {
    this.isCreate = false;
    this.user = u;
    this.isUserFormShow = true;
  }
  delete(id: string){
    if (confirm('Вы действительно хотите удалить участника?')) {
      this.service.deleteUser(id).subscribe((data) => {
        this.findUsers();
      }, error => {
        this.error = error.message;
        console.log(error);

      });
    }
  }
}
