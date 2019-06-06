import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PermanentHeaderComponent } from '../permanent-header/permanent-header.component';
import { ContactComponent } from './contact.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ChatbotService } from '../services/chatbot.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ComunicationService } from '../services/comunication.service';

describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContactComponent, PermanentHeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [BsModalService, ChatbotService, AuthenticationService, ComunicationService],
            imports: [ModalModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});