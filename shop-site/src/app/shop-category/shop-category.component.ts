import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.css']
})
export class ShopCategoryComponent implements OnInit {
	
	private pagina:number;
	private totalPagini:number;
  private carouselBoolean:Boolean = true;

  constructor(private pageS:PaginationService) {
  	this.pagina = this.pageS.page;
    this.totalPagini = this.pageS.totalPages;

  }

  ngOnInit() {
  }

}
