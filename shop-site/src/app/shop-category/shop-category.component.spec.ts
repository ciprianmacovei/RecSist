import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PermanentHeaderComponent } from '../permanent-header/permanent-header.component';
import { ShopCategoryComponent } from './shop-category.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { ComunicationService } from '../services/comunication.service';


describe('ShopCategoryComponent', () => {
    let component: ShopCategoryComponent;
    let fixture: ComponentFixture<ShopCategoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopCategoryComponent, PermanentHeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [PaginationService, AuthenticationService, ComunicationService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});