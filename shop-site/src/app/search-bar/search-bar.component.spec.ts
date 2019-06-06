import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchBarComponent } from './search-bar.component';
import { SearchBarService } from '../services/search-bar.service';


describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchBarComponent],
            imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
            providers: [SearchBarService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});