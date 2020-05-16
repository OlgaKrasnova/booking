import { ElementRef } from '@angular/core'

//Класс, позволяющий работать с сущностями Materialize
declare var M

export class MaterialService {
    //Метод, описывающий всплывающее уведомление об ошибки
    static toast(message: string) {
        M.toast({html: message})
    }

    //Метод, описывающий парящую кнопку в личном кабинете
    static initializeFloatingButton(ref: ElementRef){
        M.FloatingActionButton.init(ref.nativeElement)
    }

    //Метод, описывающий обновление полей
    static updateTextInputs() {
        M.updateTextFields()
    }
}