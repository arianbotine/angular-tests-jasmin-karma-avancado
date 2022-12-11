import { PhotoBoardService } from './../photo-board/services/photo-board.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotoListModule } from './photo-list.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { buildPhotoList } from '../photo-board/test/build-photo-list';
import { of } from 'rxjs';

describe(PhotoListComponent.name, () => {
    let component: PhotoListComponent;
    let fixture: ComponentFixture<PhotoListComponent>;
    let service: PhotoBoardService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PhotoListModule, HttpClientModule],
            providers: [{
                provide: PhotoBoardService,
                useValue: {
                    getPhotos() {
                        return buildPhotoList()
                    }
                }
            }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PhotoListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(PhotoBoardService);
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('(D) Should display board when data arrives', () => {
        const photos = buildPhotoList();
        spyOn(service, 'getPhotos').and.returnValue(of(photos));
        fixture.detectChanges();
        const board = fixture.nativeElement.querySelector('app-photo-board');
        const loader = fixture.nativeElement.querySelector('.loader');
        expect(board).withContext('Should display board').not.toBeNull();
        expect(loader).withContext('Should not display loader').toBeNull();
    });

    it('(D) Should display board when data loading', () => {
        const photos = buildPhotoList();
        spyOn(service, 'getPhotos').and.returnValue(null);
        fixture.detectChanges();
        const board = fixture.nativeElement.querySelector('app-photo-board');
        const loader = fixture.nativeElement.querySelector('.loader');
        expect(board).withContext('Should not display board').toBeNull();
        expect(loader).withContext('Should display loader').not.toBeNull();
    });
});
