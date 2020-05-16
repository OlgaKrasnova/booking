import { ElementRef } from '@angular/core'

//Класс, позволяющий работать с сущностями Materialize
declare var M

export interface MaterialInstance {
    open?(): void
    close?(): void
    destroy?(): void
}

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

    //Метод, описывающий инициализацию модального окна
    static initModal(ref: ElementRef): MaterialInstance {
        return M.Modal.init(ref.nativeElement)
    }
}