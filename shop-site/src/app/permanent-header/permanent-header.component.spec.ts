import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PermanentHeaderComponent } from './permanent-header.component';
import { AuthenticationService } from '../services/authentication.service';
import { ComunicationService } from '../services/comunication.service';
import { UserPannelComponent } from '../user-pannel/user-pannel.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchBarService } from '../services/search-bar.service';

describe('PermanentHeaderComponent', () => {
    let component: PermanentHeaderComponent;
    let fixture: ComponentFixture<PermanentHeaderComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PermanentHeaderComponent, UserPannelComponent, SearchBarComponent],
            providers: [AuthenticationService, ComunicationService, SearchBarService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PermanentHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();


    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});