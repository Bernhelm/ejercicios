import { Injectable } from '@angular/core';
import { UserData } from './interfaces';
import { SelectorService } from './selector.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  levels;
  initialData: Array<UserData> = [];

  constructor(private SelectorService: SelectorService) {
    this.levels = SelectorService.exercises.length;
  }

  fixData(data) {
    data.map((user) => {
      const userData = new Array(this.levels).fill([]);
      user.data = userData.map((levelData, index) => {
        return user.data[index] || [];
      });
      return user;
    });
    return data;
  }

  getData(): Array<UserData> {
    const data = JSON.parse(localStorage.getItem('app')) || this.initialData;
    return this.fixData(data);
  }
  setData(data) {
    localStorage.setItem('app', JSON.stringify(data));
  }
}
