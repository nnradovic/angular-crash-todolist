import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { Todos } from "../../models/Todos";
@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent implements OnInit {
  // DA bi primio props iz parenta moras da stavis sta primas
  @Input() todo: Todos;
  @Output() deleteTodo: EventEmitter<Todos> = new EventEmitter();
  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  //Set Dynamic Clasess
  setClasses() {
    let classes = {
      todo: true,
      "is-complete": this.todo.completed
    };
    return classes;
  }

  onToggle(todo) {
    //Toggle in UI
    todo.completed = !todo.completed;
    //Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
