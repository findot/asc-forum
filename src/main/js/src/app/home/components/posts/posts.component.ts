import { Component, OnInit } from '@angular/core';
import { faBurn } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../../core/models/Post';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  faBurn = faBurn;

  posts: Post[] = [
    {
      id: 2,
      author: { id: 1, pseudo: "John" },
      title: "Thanos did nothing wrong",
      content: "He sought to bring balance, as we all should"
    },
    {
      id: 41,
      author: { id: 2, pseudo: "Lucie" },
      title: "Spiderman new suit is busted",
      content: "His strengths should come from his powers, not hit suit"
    },
    {
      id: 325,
      author: { id: 3, pseudo: "Gabriel" },
      title: "Are Tony Stark and John Snow part of the same family?",
      content: "It's confusing"
    },
    {
      id: 54,
      author: { id: 4, pseudo: "Marie" },
      title: "Who are those worthy to wield Mjolnir?",
      content: "We know of Thor and Vision, who else?"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
