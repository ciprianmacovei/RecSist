import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SearchBarService } from '../services/search-bar.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, AfterViewInit {

  @ViewChild('search') input: ElementRef;
  results: any;
  searchTerm$ = new Subject<string>();
  public searchQuery: string;
  public searchBoolean:Boolean;
  public subscription: Subscription;


  constructor(private searchService: SearchBarService, private elem: ElementRef) {

    this.exitSearchResults();

    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results[Object.keys(results)[0]];
        console.log(results[Object.keys(results)[0]]);
      });
  }


  keyUpSearch(e) {
    this.searchBoolean = true;
    if (e.target.value !== '') {
      this.searchTerm$.next(e.target.value);
    }
  }

  exitSearchResults() {
    let self = this;
    $('body').on('click',function(){
      self.searchBoolean = false;
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('asdasdsadsa', this.input.nativeElement.value)

  }
}
