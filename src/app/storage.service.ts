import { Injectable } from '@angular/core';
import { UserData } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  initialData: Array<UserData> = [
    {
      label: 'Papa',
      id: 0,
      data: [[1, 5, 11, 46, 31], [1, 3], [46, 47, 45, 0, 47, 0, 47, 45, 1], []],
    },
    {
      label: 'Lia',
      id: 1,
      data: [[18], [20], [14, 26, 24, 17, 19, 27, 22, 22, 26], []],
    },
    {
      label: 'David',
      id: 2,
      data: [
        [21],
        [24],
        [0, 6, 22, 23, 22, 28, 27, 26, 20, 31, 31, 16, 31],
        [],
      ],
    },
  ];

  getData(): Array<UserData> {
    return JSON.parse(localStorage.getItem('app')) || this.initialData;
  }
  setData(data) {
    localStorage.setItem('app', JSON.stringify(data));
  }
}
