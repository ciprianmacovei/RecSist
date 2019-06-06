import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class ComunicationService {

	public subject = new Subject<any>();

	sendObject(obj: any) {
		this.subject.next({ data: obj });
	}

	clearObj() {
		this.subject.next();
	}

	getObject(): Observable<any> {
		return this.subject.asObservable();
	}
}















