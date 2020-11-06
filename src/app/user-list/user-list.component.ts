import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {User} from '../models/user';
import {Tour} from '../models/tour';
import {element} from 'protractor';
import { NgForm} from '@angular/forms';
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
  modalFlag: boolean;
  idDelete;
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
      this.error = 'Tour with this name exist';
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
        this.error = 'Tour with this name exist';
        console.log(error);
      });
    }

  }

  changeButt(userForm: NgForm) {
    this.isUserFormShow = true;
    this.isCreate = true;
    userForm.resetForm();
    window.scroll(0, 0);
  }

  updateClick(u: User) {
    this.isCreate = false;
    this.user = new User(u);
    this.isUserFormShow = true;
    window.scroll(0, 0);
  }
  delete(){
    this.service.deleteUser(this.idDelete).subscribe((data) => {
        this.findUsers();
      }, error => {
        this.error = error.message;
        console.log(error);

      });
    this.modalFlag = false;
  }

  cancel(userForm: NgForm) {
    this.isUserFormShow = false;
    userForm.resetForm();
  }

  cancelModal() {
    this.modalFlag = false;
    this.idDelete = null;
  }

  deleteUser(id: string) {
    this.idDelete = id;
    this.modalFlag = true;
  }
}
