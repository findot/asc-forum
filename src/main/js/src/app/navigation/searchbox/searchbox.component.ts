import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  faSearch = faSearch;

  searched = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("Searching " + this.searched);
  }

}
