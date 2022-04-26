import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{

  @Input() title!: string;
  @Input() footer!: string;
  @Input() value!: string;
  @Input() hasHeader: boolean = false;
  @Input() shadowStrong: boolean = false;
  @Input() icons!: string;
  @Input() padding!: string;

  constructor() { }

}
