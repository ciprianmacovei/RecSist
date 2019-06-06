import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ChategoryItemsComponent } from './chategory-items.component';

describe('ChategoryItemsComponent', () => {
    let component: ChategoryItemsComponent;
    let fixture: ComponentFixture<ChategoryItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChategoryItemsComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChategoryItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});