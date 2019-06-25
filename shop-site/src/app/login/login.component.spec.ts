import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import {ToastrModule} from "ngx-toastr";
import { By } from '@angular/platform-browser';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let username: DebugElement;
    let password: DebugElement;
    let submitButton: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthenticationService],
            imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule,ToastrModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    

});
