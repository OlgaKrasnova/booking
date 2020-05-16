import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { tap } from 'rxjs/operators'

// Сервис для управления регистрацией и авторизацией
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    private token = null
    
    constructor(private http: HttpClient){
    }
    //Регистрация нового пользователя
    register(user: User): Observable<User>{
        return this.http.post<User>('/api/auth/register', user)    
    }
    //Авторизация уже существующего в системе пользователя по токену
    login(user: User): Observable<{token: string}> {
        return this.http.post<{token: string}>('/api/auth/login', user)
            .pipe(
                tap(
                    ({token}) => {
                        localStorage.setItem('auth-token', token)
                        this.setToken(token)
                    }
                )
            )
    }
    //Установка токена
    setToken(token: string) {
        this.token = token
    }
    //Получение токена для передачи
    getToken(): string {
        return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }
    //Выход из системы и очистка локального хранилища от токена
    logout() {
        this.setToken(null)
        localStorage.clear()
    }

}