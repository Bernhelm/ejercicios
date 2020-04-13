import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SelectorService } from './selector.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private UserService: UserService,
    private SelectorService: SelectorService,
    private StorageService: StorageService
  ) {}

  add(points: number) {
    const users = this.UserService.users;
    const user = this.UserService.current;
    const exercise = this.SelectorService.current;
    users[user.id].data[exercise.level] = [
      ...user.data[exercise.level],
      points,
    ];
    this.StorageService.setData(users);
  }

  getData() {
    return this.StorageService.getData();
  }

  // updateData() {
  //   // this.exercises.map((element, index) => {
  //   //   const maxNumberValues: number = Object.keys(this.storage).reduce(
  //   //     (accum, user) => {
  //   //       return Math.max(accum, this.storage[user][index].length);
  //   //     },
  //   //     0
  //   //   );

  //     // this.lineChartData[index] = Object.keys(this.storage)
  //     //   .map((user) => {
  //     //     const userData: UserData = {
  //     //       data: this.storage[user][index],
  //     //       label: user,
  //     //     };
  //     //     return userData;
  //     //   })
  //     //   .map((value) => {
  //     //     const length = value.data.length;
  //     //     if (length < maxNumberValues) {
  //     //       value.data = [
  //     //         ...value.data,
  //     //         ...new Array(maxNumberValues - length).fill(
  //     //           value.data[length - 1]
  //     //         ),
  //     //       ];
  //     //     }
  //     //     return value;
  //     //   });

  //     // this.lineChartLabels[index] = new Array(maxNumberValues).fill('');
  //   // });
  // }
}
