import { Component, OnInit } from '@angular/core';
import { faDove } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  faDove = faDove;

  // TODO - fetch highlights
  highlights = [
    {
      id: 2,
      author: { pseudo: "John" },
      title: "Thanos did nothing wrong",
      content: "He sought to bring balance, as we all should"
    },
    {
      id: 41,
      author: { pseudo: "Lucie" },
      title: "Spiderman new suit is busted",
      content: "His strengths should come from his powers, not hit suit"
    },
    {
      id: 325,
      author: { pseudo: "Gabriel" },
      title: "Are Tony Stark and John Snow part of the same family?",
      content: "It's confusing"
    },
    {
      id: 54,
      author: { pseudo: "Marie" },
      title: "Who are those worthy to wield Mjolnir?",
      content: "We know of Thor and Vision, who else?"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
