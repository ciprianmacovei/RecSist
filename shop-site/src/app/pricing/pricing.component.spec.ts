import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingComponent } from './pricing.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('PricingComponent', () => {
    let component: PricingComponent;
    let fixture: ComponentFixture<PricingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PricingComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PricingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});