import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopItemsService } from '../../../services/top-items.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TvMultimediaComponent } from './tv-multimedia.component';

describe('TvMultimediaComponent', () => {
    let component: TvMultimediaComponent;
    let fixture: ComponentFixture<TvMultimediaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TvMultimediaComponent],
            imports: [HttpClientTestingModule],
            providers: [TopItemsService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TvMultimediaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});