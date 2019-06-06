import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopItemsService } from '../../../services/top-items.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PcSoftComponent } from './pc-soft.component';

describe('PcSoftComponent', () => {
    let component: PcSoftComponent;
    let fixture: ComponentFixture<PcSoftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PcSoftComponent],
            imports: [HttpClientTestingModule],
            providers: [TopItemsService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PcSoftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});