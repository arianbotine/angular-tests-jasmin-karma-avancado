import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../photo-board/interfaces/photo';
import { PhotoBoardService } from '../photo-board/services/photo-board.service';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit {
  public title = 'Angular testing';
  public photos$: Observable<Photo[]>;
  public fa = {
    faCircleNotch,
  };

  constructor(private service: PhotoBoardService) {}

  ngOnInit(): void {
    this.photos$ = this.service.getPhotos();
  }
}
