import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'containers-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  ngOnInit(): void {
  }

    async submitted(event: FormGroup) {
    const {email, password} = event.value;
    try {
      await this.authService.login(email, password);
      this.router.navigate(['/'])
    }catch (err: any){
      this.error = err.message
    }

  }
}
