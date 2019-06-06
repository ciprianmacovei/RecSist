import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoMotoComponent } from './auto-moto.component';
import { ItemsService } from '../../../services/items.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AutoMotoComponent', () => {
    let component: AutoMotoComponent;
    let fixture: ComponentFixture<AutoMotoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutoMotoComponent],
            providers: [ItemsService],
            imports: [HttpClientTestingModule, ToastrModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutoMotoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});