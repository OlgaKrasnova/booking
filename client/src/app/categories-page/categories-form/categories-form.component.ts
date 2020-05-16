import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';
import { error } from 'protractor';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef

  form: FormGroup
  image: File //хранилище для картинки
  imagePreview = null //превью картинки
  isNew = true //маркер новой категории

  category: Category

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router 
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if(params['id']){
              this.isNew = false
              return this.categoriesService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        (category: Category) => {
          if(category){
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }
  
  //Вызов окна выбора файла для загрузки
  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  //Удаление категории, т.е. мастера
  deleteCategory() {
    const decision = window.confirm(`Вы уверены, что хотите удалить мастера ${this.category.name}?`)
    if(decision){
      this.categoriesService.delete(this.category._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }

  //Загрузка файла
  onFileUpload(event: any){
    const file = event.target.files[0]
    this.image = file

    //Показ превью картинки
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit(){
    //Выключаем форму
    let obs$
    this.form.disable()

    if(this.isNew){
      // Если стоит маркер, создаем новую категорию
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      // Если маркер не активен, обновляем существующую категорию
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }
    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены.')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }
}
