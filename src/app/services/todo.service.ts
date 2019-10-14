import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Todos } from "../models/Todos";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
@Injectable({
  providedIn: "root"
})
export class TodoService {
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todosLimit = "?_limit=5";
  constructor(private http: HttpClient) {}
  //Get Todos
  getTodos(): Observable<Todos[]> {
    return this.http.get<Todos[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // Toggle Completed
  toggleCompleted(todo: Todos): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // Delete Todo
  deleteTodo(todo: Todos): Observable<Todos> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todos>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo: Todos): Observable<Todos> {
    return this.http.post<Todos>(this.todosUrl, todo, httpOptions);
  }
}
