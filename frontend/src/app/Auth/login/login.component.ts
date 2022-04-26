import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../Core/services/auth.service";
import {LocaStorageService} from "../../Core/services/loca-storage.service";
import {isEmail} from "../../Core/constants/conts";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public fgLogin!: FormGroup;
  constructor(
    private router: Router,
    private fbLogin: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocaStorageService
  ) { }

  private form(): void {
    this.fgLogin = this.fbLogin.group({
      email:['',[Validators.required, Validators.pattern(isEmail)]],
      password:['',[Validators.required, Validators.min(5)]]
    })
  }

  successLogin(token:string, data:any, id:string): void {
    localStorage.setItem('isLogged', 'true');
    this.localStorageService.set('token', token);
    this.localStorageService.set('dataUser', data);
    this.localStorageService.set('idUser', id);
    this.router.navigate(['/home'])
  }

  async login() : Promise<boolean> {
    //const data = await this.authService.login(this.fg.value);
    //@ts-ignore
    const {token, user} = await this.authService.login(this.fgLogin.value);
    if(user) {
      this.successLogin(token,user, user.sub);
    }else{
      console.log('error')
    }

    return true;
  }
  register():void{
    this.router.navigate(['registro']);
  }
  ngOnInit(): void {
    this.form();
  }

}
