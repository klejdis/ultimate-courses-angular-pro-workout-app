import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {UserInterface} from "../../../auth/shared/services/auth/user.interface";
import {AuthService} from "../../../auth/shared/services/auth/auth.service";
import {Store} from "../../store/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'workout-containers';

  user$: Observable<UserInterface> | undefined;
  subscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<UserInterface>('user');
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async logout(event:any) {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
