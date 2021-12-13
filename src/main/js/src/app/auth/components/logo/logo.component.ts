import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() size: number = 2.5;

  constructor() { }

  ngOnInit(): void {
  }

}
