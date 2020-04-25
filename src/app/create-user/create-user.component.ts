import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { UserData } from '../interfaces';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  apodo: string = '';
  user: UserData;
  users: Array<UserData>;

  constructor(
    private UserService: UserService,
    private DataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users = this.UserService.users;
  }

  createUser(): void {
    this.DataService.addUser(this.apodo);
    this.router.navigate(['/login']);
  }
}
