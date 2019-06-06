import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ItemDetailComponent } from './item-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemsService } from '../../../../services/items.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComunicationService } from '../../../../services/comunication.service';
import { RecommenderService } from '../../../../services/recommender.service';

describe('ItemDetailComponent', () => {
    let component: ItemDetailComponent;
    let fixture: ComponentFixture<ItemDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemDetailComponent],
            schemas:[CUSTOM_ELEMENTS_SCHEMA],
            imports:[ToastrModule.forRoot(), RouterTestingModule, HttpClientTestingModule], 
            providers:[ItemsService, ComunicationService, RecommenderService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});