import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  menuItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Catálogo', route: '/catalog' },
    { label: 'Movimientos', route: '/movimientos' },
    { label: 'Reportes', route: '/reportes' },
  ];
}
