import { Component, OnInit } from '@angular/core';
import {Tour} from '../models/tour';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {newArray} from '@angular/compiler/src/util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ApiService, private router: Router) { }
  tours = {} as Tour[];
  error;
  isShow;
  ngOnInit(): void {
    this.findTours();
  }
  findTours() {
    this.service.findAllTour().subscribe((data) => {
      this.tours = data;
      // tslint:disable-next-line:only-arrow-functions
      this.tours.forEach(function(value, index, array) {
        let sum;
        sum = 0;
        // tslint:disable-next-line:no-shadowed-variable only-arrow-functions
        value.members.forEach(function(value, index, array) {
          sum = sum + value.age;
       });
        value.avgAge = sum / value.members.length;
      });
      this.isShow = newArray<boolean>(this.tours.length);
    }, error => {
      this.error = error.message;
      console.log(error);

    });
  }
  changeButt(i){
   if (this.isShow[i]) { this.isShow[i] = false; }
   else { this.isShow[i] = true; }
   console.log(this.isShow[i]);
  }
}
