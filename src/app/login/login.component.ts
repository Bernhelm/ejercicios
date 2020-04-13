import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserData } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: UserData;
  users: Array<UserData>;

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.UserService.users;
  }

  selectUser(user): void {
    this.UserService.setCurrent(user);
    this.router.navigate(['/selector']);
  }
}
