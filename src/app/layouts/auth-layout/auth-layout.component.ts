import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  selector: 'app-auth-layout',
  styleUrl: './auth-layout.component.scss',
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
