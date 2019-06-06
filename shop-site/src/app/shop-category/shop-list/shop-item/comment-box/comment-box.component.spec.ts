import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemsService } from '../../../../services/items.service';
import { CommentBox } from './comment-box.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';


describe('CommentBoxComponent', () => {
    let component: CommentBox;
    let fixture: ComponentFixture<CommentBox>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommentBox],
            imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
            providers: [ItemsService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentBox);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});