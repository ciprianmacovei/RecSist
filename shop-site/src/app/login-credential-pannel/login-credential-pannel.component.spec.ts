import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCredentialPannelComponent } from './login-credential-pannel.component';
import { PermanentHeaderComponent } from '../permanent-header/permanent-header.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComunicationService } from '../services/comunication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

describe('LoginCredentialPannelComponent', () => {
    let component: LoginCredentialPannelComponent;
    let fixture: ComponentFixture<LoginCredentialPannelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginCredentialPannelComponent, PermanentHeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [ComunicationService, AuthenticationService],
            imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule, FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginCredentialPannelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});