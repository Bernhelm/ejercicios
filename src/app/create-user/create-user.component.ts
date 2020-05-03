import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { UserData } from '../interfaces';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, AfterViewInit {
  apodo: string = '';
  @ViewChild('input') input: ElementRef;
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

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  createUser(): void {
    this.DataService.addUser(this.apodo);
    this.router.navigate(['/login']);
  }

  home(): void {
    this.router.navigate(['/login']);
  }
}
