import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPagerComponent } from './shop-pager.component';
import { PaginationService } from '../../../services/pagination.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShopPagerComponent', () => {
    let component: ShopPagerComponent;
    let fixture: ComponentFixture<ShopPagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopPagerComponent],
            providers: [PaginationService],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopPagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});