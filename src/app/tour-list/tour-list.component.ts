import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Tour} from '../models/tour';
import {User} from '../models/user';
import {ViewportScroller} from '@angular/common';
import { NgForm} from '@angular/forms';

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
  today= Date.now();
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

  createTour(form: NgForm) {
    if (this.flagCreate){
      this.tour.id = null;
      this.service.createTour(this.tour).subscribe((data) => {
      this.findTours();
    }, error => {
      this.error = 'Tour with this name exist';
      console.log(error);

    }); }
    else { this.service.updateTour(this.tour).subscribe((data) => {
      this.findTours();
    }, error => {
      this.error = 'Tour with this name exist';
      console.log(error);

    });
    }
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
    this.tour = new Tour(t);
    this.flagCreate = false;
    window.scroll(0, 0);
  }

  kickFromTour(u: User) {

      this.service.deleteFromTour(u.idTour, u.id).subscribe((data) => {
        this.findTours();
      }, error => {
        this.error = error.message;
        console.log(error);
      });

  }

  createUser() {
    this.user.idTour = this.tourId;
    this.user.id = null;
    this.service.createUser(this.user).subscribe((data) => {
      this.findTours();
      this.tourId = null;
      this.isUserFormShow = false;
    }, error => {
      this.error = 'Tour with this name exist';
      console.log(error);
    });
  }

  createNew(id: string) {
    this.tourId = id;
    this.isUserFormShow = true;
    window.scroll(0, 0);
  }

  addTour(tourForm: NgForm) {
    this.isShowTourForm = true;
    this.flagCreate = true;
    tourForm.resetForm();
 }

  cancelUser() {
    this.isUserFormShow = false;
  }

  cancelTour(form: NgForm) {
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
