import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  menuItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Catálogo', route: '/catalog' },
    { label: 'Movimientos', route: '/movimientos' },
    { label: 'Reportes', route: '/reportes' }
  ];
}
