import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapTabTelComponent } from './lap-tab-tel.component';
import { TopItemsService } from '../../../services/top-items.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('LapTabTelComponent', () => {
    let component: LapTabTelComponent;
    let fixture: ComponentFixture<LapTabTelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LapTabTelComponent],
            providers: [TopItemsService],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LapTabTelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});