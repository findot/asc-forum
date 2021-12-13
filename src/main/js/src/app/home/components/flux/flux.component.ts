import { Component, Input, OnInit } from '@angular/core';
import { faBurn, faStar } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/core/models/Post';

@Component({
  selector: 'app-flux',
  templateUrl: './flux.component.html',
  styleUrls: ['./flux.component.scss']
})
export class FluxComponent implements OnInit {

  faBurn = faBurn;
  faStar = faStar;

  @Input('posts') postMap: Map<number, Post> = new Map();

  constructor() { }

  ngOnInit(): void {
  }

  public get posts(): Post[] {
    return Array.from(this.postMap.entries()).map(([_, post]) => post);
  }

}
