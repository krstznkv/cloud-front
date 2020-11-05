import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Tour} from '../models/tour';
import {User} from '../models/user';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';


@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours = {} as Tour[];
  error;
  idDelete;
  tour = {} as Tour;
  isShowTourForm = false;
  isUserFormShow = false;
  flagCreate = true;
  user = {} as User;
  tourId: string;
  modalFlag: boolean;
  constructor(private service: ApiService, private viewScroller: ViewportScroller) {

  }

  ngOnInit(): void {
    this.findTours();
  }
  findTours() {
    this.service.findAllTour().subscribe((data) => {
      this.tours = data;

    }, error => {
      this.error = error.message;
      console.log(error);

    });
  }

  createTour() {
    if (this.flagCreate){
      this.tour.id = null;
      this.service.createTour(this.tour).subscribe((data) => {
      this.findTours();
    }, error => {
      this.error = error.message;
      console.log(error);

    }); }
    else { this.service.updateTour(this.tour).subscribe((data) => {
      this.findTours();
    }, error => {
      this.error = error.message;
      console.log(error);

    });
    }
    this.tour = null;
    this.isShowTourForm = false;
  }

  delete() {
    this.service.deleteTour(this.idDelete).subscribe((data) => {
      this.findTours();
    }, error => {
      this.error = error.message;
      console.log(error);

    });
    this.modalFlag = false;
  }
  updateClick(t: Tour) {
    this.isShowTourForm = true;
    this.tour = t;
    this.flagCreate = false;
    window.scroll(0, 0);
  }

  kickFromTour(u: User) {
    if (confirm('Вы действительно хотите удалить участника?')) {
      this.service.deleteFromTour(u.idTour, u.id).subscribe((data) => {
        this.findTours();
      }, error => {
        this.error = error.message;
        console.log(error);
      });
    }
  }

  createUser() {
    this.user.idTour = this.tourId;
    this.user.id = null;
    this.service.createUser(this.user).subscribe((data) => {
      this.findTours();
      this.tourId = null;
      this.isUserFormShow = false;
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }

  createNew(id: string) {
    this.tourId = id;
    this.isUserFormShow = true;
    this.user.number = '';
    this.user.name = '';
    this.user.age = null;
    this.user.email = '';
    window.scroll(0, 0);
  }

  addTour() {
    this.isShowTourForm = true;
    this.flagCreate = true;
    this.tour.guide = '';
    this.tour.price = 0;
    this.tour.description = '';
    this.tour.name = '';
  }

  cancelUser() {
    this.isUserFormShow = false;
  }

  cancelTour() {
    this.isShowTourForm = false;
  }
  cancelModal() {
    this.modalFlag = false;
    this.idDelete = null;
  }

  deleteTour(id: string) {
    this.idDelete = id;
    this.modalFlag = true;
  }
}
