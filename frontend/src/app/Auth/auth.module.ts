import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../Shared/shared.module";
import { RegisterComponent } from './register/register.component';
import {ComponentsModule} from "../Shared/components/components.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class AuthModule { }
