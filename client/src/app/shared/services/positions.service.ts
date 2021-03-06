import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Message, Position} from '../interfaces'

//Сервис для управления услугами
@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private http: HttpClient) {
  }
  //Метод получения ID мастера (категории), к которой принадлежит услуга
  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }
  //Создание новой услуги
    create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position)
  }
  //Обновление информации об услуге
  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position)
  }
  // Удаление услуги из списка всех услуг
  delete(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position._id}`)
  }
}
