import { Component, OnInit, Input } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit {
  @Input('categoryId') categoryId: string
  positions: Position[] = []
  loading = false

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

}
