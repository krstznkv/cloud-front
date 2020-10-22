import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tour} from './models/tour';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: HttpClient) {
  }

  findAllTour() {
    return this.client.get<Tour[]>('http://localhost:8080/findAllTours');
  }
  createTour(tour: Tour){
    return this.client.post<Tour>('http://localhost:8080/createTour', tour);
  }
  deleteTour(id: string){
    return this.client.delete('http://localhost:8080/deleteTour/' + id);
  }
  updateTour(t: Tour){
    return this.client.put('http://localhost:8080/updateTour', t);
  }
  deleteFromTour(idT: string, idU: string){
    return this.client.delete('http://localhost:8080/deleteFromTour/' + idT + '/' + idU);
  }
  createUser(user: User){
    return this.client.post<User>('http://localhost:8080/createUser', user);
  }

  findAllUsers() {
    return this.client.get<User[]>('http://localhost:8080/findAllUsers');
  }

  updateUser(user: User){
    return this.client.post('http://localhost:8080/updateUser', user);
  }
  deleteUser(id: string){
    return this.client.delete('http://localhost:8080/deleteUser/' + id);
  }

}
