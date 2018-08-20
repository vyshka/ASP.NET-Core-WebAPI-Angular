import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  constructor() {}

  @Input() totalPages: number;
  @Input() pageNumber: number;
  @Input() url: string;
  @Input() pagesToDisplay: number;
  public pages: number[];

  ngOnInit() {
    this.pages = [];
    if (this.totalPages > 1) {
      if (this.totalPages > this.pagesToDisplay) {
        this.pages = this.GetPages();
      } else {
        this.pages = Array.from(Array(this.totalPages).keys()).map(i => 1 + i);
      }
    }
  }

  GetPages(): number[] {
    let start: number;
    let startRemainder = 0;
    let end: number;
    let endRemainder = 0;

    start = Math.ceil(this.pageNumber - this.pagesToDisplay / 2);
    if (start <= 0) {
      startRemainder = 1 - start;
      start = 1;
    }

    end = Math.ceil(this.pageNumber + this.pagesToDisplay / 2 - 1);
    if (end > this.totalPages) {
      endRemainder = end - this.totalPages;
      end = this.totalPages;
    }

    if (startRemainder !== 0) {
      end += startRemainder;
    }

    if (endRemainder !== 0) {
      start -= endRemainder;
    }

    return Array.from(Array((end + 1) - start).keys()).map(i => start + i);
  }
}
