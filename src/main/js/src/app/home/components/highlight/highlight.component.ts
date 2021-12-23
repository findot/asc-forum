import { Component, Input, OnInit } from '@angular/core';
import { faDove } from '@fortawesome/free-solid-svg-icons';
import { Post, PostOrdPublished } from 'src/app/core/models/Post';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';


@Component({ selector: 'highlight', templateUrl: './highlight.component.html' })
export class HighlightComponent {

  faDove = faDove;

  // TODO - fetch highlights
  @Input() posts: Post[] = [];
  @Input() nb: number = 4;

  _highlights: [Post[], Post[]] = [[], []];

  public get highlights(): Post[] {
    if (this.posts === this._highlights[0])
      return this._highlights[1];
    
    const highlights = pipe(
      this.posts.filter(p => p.highlighted),
      A.sort(PostOrdPublished),
      A.takeRight(this.nb)
    );
    this._highlights = [this.posts, highlights];
    return this._highlights[1];
  }

}
