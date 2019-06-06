import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChatbotService } from '../services/chatbot.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

public modalRef:BsModalRef;
public currnetUser:string;
public today:number = Date.now();
public newDate:number;
public charbotMessageReciver:string;
public userMessage:string;
public chatWithBotAndUser:Array<object>
public i:number = 0;

  constructor(private modalService:BsModalService, private cb:ChatbotService) {

  	if (sessionStorage.getItem('currentUser')){
  	this.currnetUser = JSON.parse(sessionStorage.getItem('currentUser')).user;
  	console.log('userul curent este',this.currnetUser);
  	}
  	else {
  		this.currnetUser = 'Visitor';
  	}
   }


  openModal(template:TemplateRef<any>){
  	this.modalRef = this.modalService.show(template);
    this.chatWithBotAndUser = [];
  }

  async sendChatBotMessage(e){

    this.newDate = Date.now();
    this.userMessage = $('.sendMessage').val();
    $('.sendMessage').val(''); 
    await this.cb.sendMessageToChatbot(this.userMessage).then( (res) => {
      this.charbotMessageReciver = res;
       this.chatWithBotAndUser[this.i]={
      user:this.userMessage,
      bot:this.charbotMessageReciver
      }
    }).then(res => {
      setTimeout(function(){ $('.scrollbar').scrollTop($('.scrollbar')[0].scrollHeight); }, 100);
    })
    this.i++;
  }


  ngOnInit() {
  }

}
