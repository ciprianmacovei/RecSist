import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chategory-items',
  templateUrl: './chategory-items.component.html',
  styleUrls: ['./chategory-items.component.css']
})
export class ChategoryItemsComponent implements OnInit {

  constructor(private nav:Router) { }

  ngOnInit() {
  }

}
