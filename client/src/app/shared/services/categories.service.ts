import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces';
import { Observable } from 'rxjs';
import { Message } from '../interfaces';

// Сервис для управления мастерами

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient){
    }

    fetch(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/category')
    }

    //Получение категории по id
    getById(id: string): Observable<any> {
        return this.http.get(`/api/category/${id}`)
    }

    //Создание новой категории
    create(name: string, image?: File): Observable<Category>{
        const fd = new FormData()

        if(image){
            fd.append('image', image, image.name)
        }
        fd.append('name', name)

        return this.http.post<Category>('/api/category', fd)
    }

    //Обновление существующей категории
    update(id: string, name: string, image?: File): Observable<Category>{
        const fd = new FormData()

        if(image){
            fd.append('image', image, image.name)
        }
        fd.append('name', name)

        return this.http.patch<Category>(`/api/category/${id}`, fd)
    }

    //Удаление категории, т.е. мастера
    delete(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/category/${id}`)
    }
}