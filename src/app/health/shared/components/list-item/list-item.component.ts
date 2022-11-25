import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {

  @Input()
  item: any;
  showDeleteConfirm: boolean = false;

  @Output()
  deleteItem: any = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }


  toggleDeleteConfirm() {
    this.showDeleteConfirm = !this.showDeleteConfirm;
  }

  onDeleteItem(item: any) {
    this.deleteItem.emit(item);
  }
}
