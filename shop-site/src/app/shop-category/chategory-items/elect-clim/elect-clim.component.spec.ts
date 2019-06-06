import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectClimComponent } from './elect-clim.component';
import { TopItemsService } from '../../../services/top-items.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ElectClimComponent', () => {
    let component: ElectClimComponent;
    let fixture: ComponentFixture<ElectClimComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ElectClimComponent],
            providers: [TopItemsService],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ElectClimComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});