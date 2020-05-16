import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Position } from 'src/app/shared/interfaces';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading = false
  modal: MaterialInstance

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    //Начало загрузки списка услуг
    this.loading = true
    //Получение списка всех услуг, относящихся к текущему мастеру
    this.positionsService.fetch(this.categoryId)
      .subscribe(positions => {
        this.positions = positions
        // Окончание загрузки списка услуг
        this.loading = false
      })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  // Генерация модального окна
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.modal.open()
  }

  onAddPosition(){
    this.modal.open()
  }

  onCancel(){
    this.modal.close()
  }
}
