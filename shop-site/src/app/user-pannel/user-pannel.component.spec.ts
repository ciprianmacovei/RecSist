import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPannelComponent } from './user-pannel.component';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComunicationService } from '../services/comunication.service';
import {ItemsService} from "../services/items.service";
import {ToastrModule} from "ngx-toastr";


describe('UserPannelComponent', () => {
    let component: UserPannelComponent;
    let fixture: ComponentFixture<UserPannelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserPannelComponent],
            providers: [AuthenticationService, ComunicationService, ItemsService],
            imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserPannelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
