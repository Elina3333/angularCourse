import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, throwError} from "rxjs";

export interface Todo {
  completed: boolean
  title: string
  id?: number
}

@Injectable({providedIn: 'root'})

export class TodosService {
  constructor(private http: HttpClient) {

  }

  fetchToDos() {
    let params = new HttpParams()
    params = params.append('_limit', '4')
    params = params.append('custom', 'anything')

    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?', {
      // params:new HttpParams().set('_limit','3')
      params,
      observe:'body'
    })
      .pipe(delay(1500), catchError(error => {
        console.log(error.message);
        return throwError(error);
      }))
  }

  addToDo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
      headers: new HttpHeaders({
        'MyHeader': Math.random().toString()
      })
    })
  }

  completeToDo(id: number): Observable<Todo> {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {completed: true})
  }

  removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }
}
