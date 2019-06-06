import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBasketComponent } from './item-basket.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComunicationService } from '../../../services/comunication.service';
import { ItemsService } from '../../../services/items.service';


describe('ItemBasketComponent', () => {
    let component: ItemBasketComponent;
    let fixture: ComponentFixture<ItemBasketComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemBasketComponent],
            providers: [ComunicationService, ItemsService],
            schemas:[CUSTOM_ELEMENTS_SCHEMA],
            imports:[ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemBasketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});