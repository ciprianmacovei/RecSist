import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
	imports:[
	CommonModule,
	BsDropdownModule.forRoot(),
	TooltipModule.forRoot(),
	ModalModule.forRoot(),
	NgbModule
	],
	exports:[BsDropdownModule,TooltipModule,ModalModule]
})

export class BootstrapModule{}