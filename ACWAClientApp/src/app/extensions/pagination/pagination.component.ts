import { Component, OnInit } from '@angular/core';
import { PaginationHelper } from '../../users/shared/pagination-helper.model';
import { PaperService } from '../paper.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {




  constructor(paperService: PaperService) {


  }

  ngOnInit() {
  }

}
