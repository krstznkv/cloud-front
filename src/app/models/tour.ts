import {User} from './user';

export class Tour {
  constructor(t: Tour) {
    this.name = t.name;
    this.avgAge = t.avgAge;
    this.description = t.description;
    this.price = t.price;
    this.guide = t.guide;
    this.id = t.id;
    this.members = t.members;
    this.date = t.date;
  }

  name: string;
  price: number;
  description: string;
  date: string;
  guide: string;
  members: User[];
  id: string;
  avgAge: number;
}
