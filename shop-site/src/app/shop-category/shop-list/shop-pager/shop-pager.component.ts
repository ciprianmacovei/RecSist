import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';
@Component({
  selector: 'app-shop-pager',
  templateUrl: './shop-pager.component.html',
  styleUrls: ['./shop-pager.component.css']
})
export class ShopPagerComponent implements OnInit {

  @Input()
  private page: number = 1;
  @Input()
  public totalPages: Number = 0;
  @Output()
  private changePage: EventEmitter<Number> = new EventEmitter<Number>();

  private items: any;
  private itemsList: number;
  private startItem: Number = 0;
  private totalNumberOfItems: number;
  public loginBoolean: any;
  public numbers: Array<Number>;
  public arrayForPaggination: Array<Number>;
  public calupForPaggination: number = 3;

  constructor(private pageS: PaginationService) {
    console.log(this.totalPages)

    this.pageS.getItems().then(res => {
      this.items = res;
      this.itemsList = this.items.length;
      console.log('ding on the inside', this.items);
      this.totalNumberOfItemsForPages();
      this.totalNumberOfPages();


    })
      .then(res => { this.pageS.getItemsQuery(0, 6).then(res => { this.items = res }) })
    sessionStorage.length == 1 ? this.loginBoolean = true : this.loginBoolean = false;

  }


  totalNumberOfItemsForPages() {
    this.totalNumberOfItems = this.items.length
    this.totalNumberOfItems = this.totalNumberOfItems + 1;
  }

  totalNumberOfPages() {
    this.totalPages = Math.ceil(this.totalNumberOfItems / 6);
    if (this.totalNumberOfItems % 6 !== 0) {
      // this.totalPages = this.totalPages + 1;
    }
    this.numbers = Array.from(new Array(this.totalPages),(val, index) => index);
    this.arrayForPaggination = this.numbers.slice(0, this.calupForPaggination);
  }

  nextPost() {
    this.page = Number(this.page) + 1;
    this.changePage.emit(this.page)

    console.log('numarul de pagini', this.totalPages, 'pagina', this.page, 'total', this.totalNumberOfItems)
    this.pageS.getItemsQuery((this.page - 1) * 6, 6).then(res => this.items = res);

    if (this.page % 3 === 0 && this.page !== 0) {
      this.calupForPaggination = this.calupForPaggination + 3;
      this.arrayForPaggination = this.numbers.slice(this.calupForPaggination - 4, this.calupForPaggination - 1)
    }
  }


  priviousPost() {
    if (this.page % 3 === 0 && this.page !== 0 && this.calupForPaggination !== 0) {
      this.calupForPaggination = this.calupForPaggination - 3
      this.arrayForPaggination = this.numbers.slice(this.calupForPaggination - 4, this.calupForPaggination - 1)
    }

    this.page = Number(this.page) - 1;
    this.changePage.emit(this.page)
    console.log('numarul de pagini', this.totalPages, 'pagina', this.page, 'total', this.totalNumberOfItems)
    this.pageS.getItemsQuery((this.page - 1) * 6, 6).then(res => this.items = res);

  }

  selectPage(e) {
    this.page = Number(e.target.outerText);
    this.calupForPaggination = Number(this.page) + 3;
    this.changePage.emit(e.target.outerText)
    this.pageS.getItemsQuery((e.target.outerText - 1) * 6, 6).then(res => this.items = res);
    this.arrayForPaggination = this.numbers.slice(Number(e.target.outerText) - 1, Number(e.target.outerText) + 2)


  }

  ngOnInit() {
  }

}
