import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef
  //Пул ссылок, формирующих боковое меню
  links = [
    {url: '/overview', name: 'Обзор'},
    // {url: '/analytics', name: 'Аналитика'},
    // {url: '/history', name: 'История записей'},
    {url: '/order', name: 'Создать запись'},
    {url: '/categories', name: 'Каталог'}

  ]

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }
  //Метод для выхода из системы
  logout(event: Event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
