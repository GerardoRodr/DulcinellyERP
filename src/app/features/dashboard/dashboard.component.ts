import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedBranch = 'Trujillo';
  branches = ['Trujillo', 'Huanchaco', 'Todas'];

  summaryMetrics = [
    { title: 'Entradas Hoy', value: '15 Movimientos' },
    { title: 'Salidas Hoy', value: '8 Movimientos' }
  ];

  lowStockAlerts = [
    { name: 'Harina', missing: '5kg' },
    { name: 'Azúcar', missing: '2kg' }
  ];

  menuItems = [
    { label: 'Dashboard', active: true, route: '/dashboard' },
    { label: 'Catálogo', active: false, route: '/catalog' },
    { label: 'Movimientos', active: false, route: '/movimientos' },
    { label: 'Reportes', active: false, route: '/reportes' }
  ];

  onBranchChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedBranch = selectElement.value;
  }
}
