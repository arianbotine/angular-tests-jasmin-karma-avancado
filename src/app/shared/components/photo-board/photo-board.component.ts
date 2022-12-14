import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from './interfaces/photo';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss']
})
export class PhotoBoardComponent implements OnChanges {

  @Input() public photos: Photo[];
  public rows: any[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.photos?.currentValue) {
      this.rows = this.groupColumns(changes.photos.currentValue);
    }
  }

  private groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;
    for (let indexPhoto = 0;  indexPhoto < photos.length; indexPhoto += step){
      newRows.push(photos.slice(indexPhoto, indexPhoto + step));
    }
    return newRows;
  }

}
