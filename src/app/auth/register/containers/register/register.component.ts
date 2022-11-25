import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'containers-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: string | undefined

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async submitted(event: FormGroup) {
    const {email, password} = event.value;

    try {
      await this.authService.createUser(email, password)
      //user registered
      this.router.navigate(['/'])
    }catch (err: any){
      this.error = err.message
    }
  }
}
