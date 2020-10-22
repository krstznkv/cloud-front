import {User} from './user';

export class Tour {
  name: string;
  price: number;
  description: string;
  date: string;
  guide: string;
  members: User[];
  id: string;
  avgAge: number;
}
