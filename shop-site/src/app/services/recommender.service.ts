import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()

export class RecommenderService {

	private options: any;

	constructor(private http: HttpClient) { }

	getRecommendedItem(itemId) {

		const promise = new Promise<Object>((resolve, reject) => {
			this.http.post('http://127.0.0.1:5000/', { 'id': itemId }, { 'headers': { 'Content-Type': 'application/json', } })
				.subscribe(res => {
					resolve(res)
				}, err => {
					console.log(err);
					resolve(false);
				})
		})
		return promise;
	}

	getItems(arrayOfItems) {

		const promise = new Promise<Object>((resolve, reject) => {
			this.http.post('http://localhost:8000/recommendedItems', { 'array': arrayOfItems }, { 'headers': { 'Content-Type': 'application/json', } })
				.subscribe(res => {
					resolve(res)
				}, err => {
					console.log(err);
					resolve(false);
				})
		})
		return promise;
	}

}
