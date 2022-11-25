import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

//components
import { AuthformComponent } from './components/authform/authform.component';

//services
import {AuthService} from "./services/auth/auth.service";
import {AuthGuard} from "./guards/auth.guard";

@NgModule({
  declarations: [
    AuthformComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    AuthformComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any>{
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    }
  }
}
