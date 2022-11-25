import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authform',
  templateUrl: './authform.component.html',
  styleUrls: ['./authform.component.scss']
})
export class AuthformComponent implements OnInit {

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });


  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid){
      this.submitted.emit(this.form);
    }
  }

  isEmailValid() {
    const control = this.form.get('email')
    return control?.valid == false && control.touched
  }

  isPasswordValid() {
    const control = this.form.get('password')
    return control?.valid == false && control.touched
  }
}
