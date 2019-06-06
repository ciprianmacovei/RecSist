import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelieveryComponent } from './delievery.component';
import { PermanentHeaderComponent } from '../permanent-header/permanent-header.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComunicationService } from '../services/comunication.service';

describe('DelieveryComponent', () => {
    let component: DelieveryComponent;
    let fixture: ComponentFixture<DelieveryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DelieveryComponent, PermanentHeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [AuthenticationService, ComunicationService],
            imports: [HttpClientTestingModule, RouterTestingModule]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DelieveryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});