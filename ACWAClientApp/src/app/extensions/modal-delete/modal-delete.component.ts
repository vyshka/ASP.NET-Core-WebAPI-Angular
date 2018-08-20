import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})

export class ModalDeleteComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) { }

  @Input() itemDescription: string;
  @Input() itemId: string;

  ngOnInit() { }
}
