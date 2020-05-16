//Описание пользователя
export interface User {
    email: string
    password: string
}

//Описание сообщения
export interface Message {
    message: string
}

//Описание полей категории (мастера)
export interface Category {
    name: string
    imageSrc?: string
    user?: string 
    _id?: string
}

//Описание услуги
export interface Position {
    name: string
    cost: number
    category: string
    user?: string
    _id?:string
}