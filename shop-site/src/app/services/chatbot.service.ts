import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ChatbotService {

	public headers: HttpHeaders;
	public options: any;

	constructor(private http: HttpClient) {


	}


	sendMessageToChatbot(message) {
		var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		this.options = {
			headers: this.headers
		}
		let obj = {
			From: 'sessionId',
			message: message
		}
		const promise = new Promise<any>((resolve, reject) => {
			this.http.post('http://localhost:5020/', obj, this.options)
				.map(res => res[Object.keys(res)[0]])
				.subscribe(res => {
					resolve(res)
				},
					err => {
						resolve(false);
						console.log(err);
					})

		});

		return promise;
	}

}
