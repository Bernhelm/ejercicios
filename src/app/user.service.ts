import { Injectable } from '@angular/core';
import { UserData } from './interfaces';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  current: UserData;
  userList: Array<UserData>;

  constructor(private StorageService: StorageService) {
    this.current = null;
  }

  setCurrent(current: UserData) {
    this.current = current;
  }

  get user(): UserData {
    return this.current;
  }

  get users(): Array<UserData> {
    return this.StorageService.getData();
  }
}
