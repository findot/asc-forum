import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/core/models/Post';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  faSearch = faSearch;

  searched = '';
  found: Post[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apiService
      .search(this.searched)
      .subscribe(found => { this.found = found; });
  }

}
