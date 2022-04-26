import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from "@angular/router";
import { CardComponent } from './card/card.component';




@NgModule({
    declarations: [
        NavbarComponent,
        CardComponent,
    ],
  exports: [
    NavbarComponent,
    CardComponent,
  ],
    imports: [
        RouterModule,
        CommonModule,

    ]
})
export class ComponentsModule { }
