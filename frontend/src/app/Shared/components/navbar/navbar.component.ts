import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LocaStorageService} from "../../../Core/services/loca-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private route: Router,
    private localStorageService: LocaStorageService
    ) { }

  ngOnInit(): void {
  }

  salir(): void {
    this.localStorageService.remove('idUser')
    this.localStorageService.remove('isLogged')
    this.localStorageService.remove('token')
    this.localStorageService.remove('dataUser')
    this.route.navigate(['/']);
  }

}
