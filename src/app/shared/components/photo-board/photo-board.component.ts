import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Photo } from './interfaces/photo';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss']
})
export class PhotoBoardComponent implements OnChanges {

  @Input() public photo: Photo[];
  public rows: any[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photo) {
      this.groupColumns(changes.photo.currentValue);
    }
  }

  public groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;
    for (let indexPhoto = 0;  indexPhoto < photos.length; indexPhoto += step){
      newRows.push(photos.slice(indexPhoto, indexPhoto + step));
    }
    return newRows;
  }

}