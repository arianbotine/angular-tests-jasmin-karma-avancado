import { PhotoListComponent } from './photo-list.component';
import { PhotoBoardModule } from './../photo-board/photo-board.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PhotoListComponent],
  imports: [CommonModule, PhotoBoardModule],
  exports: [PhotoListComponent],
})
export class PhotoListModule {}
