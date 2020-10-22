import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Tour} from '../models/tour';
import {User} from '../models/user';


@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours = {} as Tour[];
  error;
  tour = {} as Tour;
  isShowTourForm = false;
  isUserFormShow = false;
  flagCreate = true;
  user = {} as User;
  tourId: string;
  constructor(private service: ApiService) { }

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
    this.isShowTourForm = false;
  }

  deleteTour(id: string) {
    if (confirm('Вы действительно хотите удалить тур?')) {
    this.service.deleteTour(id).subscribe((data) => {
      this.findTours();
    }, error => {
      this.error = error.message;
      console.log(error);

    });
   }
  }
  updateClick(t: Tour) {
    this.isShowTourForm = true;
    this.tour = t;
    this.flagCreate = false;
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
  }

  addTour() {
    this.isShowTourForm = true;
    this.flagCreate = true;
  }
}
