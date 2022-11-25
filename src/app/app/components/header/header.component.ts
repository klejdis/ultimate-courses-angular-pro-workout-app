import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInterface} from "../../../auth/shared/services/auth/user.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  user: UserInterface | undefined | null;

  @Output()
  logout = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.logout.emit()
  }
}
