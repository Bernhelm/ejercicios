import { Injectable } from '@angular/core';
import { UserData } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  current: UserData;
  userList: Array<UserData>;

  initialData = [
    {
      label: 'Papa',
      id: 0,
      data: [
        [1, 5, 11, 46, 31],
        [1, 3],
        [46, 47, 45, 0, 47, 0, 47, 45, 1],
      ],
    },
    {
      label: 'Lia',
      id: 1,
      data: [[18], [20], [14, 26, 24, 17, 19, 27, 22, 22, 26]],
    },
    {
      label: 'David',
      id: 2,
      data: [[21], [24], [0, 6, 22, 23, 22, 28, 27, 26, 20, 31, 31, 16, 31]],
    },
  ];

  constructor() {
    this.current = null;
    this.userList =
      JSON.parse(localStorage.getItem('users')) || this.initialData;
  }

  setCurrent(current: UserData) {
    this.current = current;
  }

  get user(): UserData {
    return this.current;
  }

  get users(): Array<UserData> {
    return this.userList;
  }
}
