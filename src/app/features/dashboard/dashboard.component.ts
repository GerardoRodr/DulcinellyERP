import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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
    { label: 'Dashboard', active: true },
    { label: 'Catálogo', active: false },
    { label: 'Movimientos', active: false },
    { label: 'Reportes', active: false }
  ];

  onBranchChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedBranch = selectElement.value;
  }
}
