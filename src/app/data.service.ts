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
}
