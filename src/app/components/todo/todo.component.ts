import { Component, OnInit } from "@angular/core";
import { Todos } from "../../models/Todos";
import { TodoService } from "../../services/todo.service";
import { AddTodoComponent } from "../add-todo/add-todo.component";
@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  todos: Todos[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todos) {
    //delete in UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //on server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todos) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }
}
