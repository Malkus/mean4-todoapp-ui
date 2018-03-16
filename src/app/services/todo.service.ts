import ToDo from '../models/todo.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()

export class TodoService {
	
	api_url = 'http://localhost:3000';
	todoUrl = `${this.api_url}/api/todos`;

	constructor(
		private http: HttpClient
	) { }

	/**
	 *  Create Todo
	 *  @author MJB
	 *  @since  2018-03-16
	 *  @param  {ToDo}            todo [description]
	 *  @return {Observable<any>}      [description]
	 */
	createTodo(todo: ToDo): Observable<any>{
		//returns the observable of http post request
		return this.http.post(`${this.todoUrl}`, todo);
	}

	/**
	 *  Read todo
	 *  @author MJB
	 *  @since  2018-03-16
	 *  @return {Observable<ToDo[]>} [description]
	 */
	getToDos(): Observable<ToDo[]>{
		return this.http.get(this.todoUrl)
			.map(res => {
				//Maps the response object sent from server
				return res["data"].docs as ToDo[];
			})
	}

	/**
	 *  Update todo
	 *  @author MJB
	 *  @since  2018-03-16
	 *  @param  {ToDo}     todo [description]
	 */
	editTodo(todo:ToDo) {
		let editUrl = `${this.todoUrl}`
		//returns the observable of http put request
		return this.http.put(editUrl, todo);
	}

	/**
	 *  delete todo
	 *  @author MJB
	 *  @since  2018-03-16
	 *  @param  {string}   id [description]
	 *  @return {any}         [description]
	 */
	deleteTodo(id:string):any {
		//Delete the object by the id
		let deleteUrl = `${this.todoUrl}/${id}`
		return this.http.delete(deleteUrl)
			.map(res => { 
				return res;
			})
	}

	/**
	 *  Default Error Handler
	 *  @author MJB
	 *  @since  2018-03-16
	 *  @param  {any}          error [description]
	 *  @return {Promise<any>}       [description]
	 */
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}