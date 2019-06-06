import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatbotService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', async(inject([ChatbotService], (service: ChatbotService) => {
    expect(service).toBeTruthy();
  })));
});
