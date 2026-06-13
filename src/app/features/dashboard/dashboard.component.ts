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
    { title: 'Entradas Hoy', value: '15', subtitle: 'Movimientos', icon: 'entradas', color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Salidas Hoy', value: '8', subtitle: 'Movimientos', icon: 'salidas', color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Insumos', value: '142', subtitle: 'En catálogo', icon: 'insumos', color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Órdenes Activas', value: '3', subtitle: 'En producción', icon: 'ordenes', color: 'text-purple-600', bg: 'bg-purple-100' }
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
