import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnloggedGuard} from "./Core/guards/unlogged.guard";
import {LoggedGuard} from "./Core/guards/logged.guard";

const routes: Routes = [
  {path:'',loadChildren:()=>import('./Auth/auth.module').then(m=>m.AuthModule), canActivate:[UnloggedGuard]},
  {path:'',loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule), canActivate:[LoggedGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
