import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  selector: 'app-blank-layout',
  styleUrl: './blank-layout.component.scss',
  templateUrl: './blank-layout.component.html',
})
export class BlankLayoutComponent {}
