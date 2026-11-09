import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  imports: [RouterOutlet , NgxSpinnerComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Ecommerce-App');
}

