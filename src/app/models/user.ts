export class User {
  constructor(u: User) {
    this.name = u.name;
    this.number = u.name;
    this.age = u.age;
    this.id = u.id;
    this.email = u.email;
    this.idTour = u.idTour;
    this.tourName = u.tourName;
  }

  name: string;
  number: string;
  age: number;
  id: string;
  email: string;
  idTour: string;
  tourName: string;
}
