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
    { title: 'Entradas Hoy', value: '15', subtitle: 'Movimientos', icon: 'fa-solid fa-arrow-right-to-bracket', color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Salidas Hoy', value: '8', subtitle: 'Movimientos', icon: 'fa-solid fa-arrow-right-from-bracket', color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Insumos', value: '142', subtitle: 'En catálogo', icon: 'fa-solid fa-boxes-stacked', color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Órdenes Activas', value: '3', subtitle: 'En producción', icon: 'fa-solid fa-clipboard-list', color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  lowStockAlerts = [
    { name: 'Harina de Trigo', current: 5, min: 20, unit: 'kg', percentage: 25 },
    { name: 'Azúcar Blanca', current: 2, min: 15, unit: 'kg', percentage: 13 },
    { name: 'Cacao en Polvo', current: 1, min: 5, unit: 'kg', percentage: 20 }
  ];

  recentMovements = [
    { date: 'Hoy, 10:30 AM', item: 'Harina de Trigo', type: 'Entrada', qty: '50 kg', user: 'Admin' },
    { date: 'Hoy, 09:15 AM', item: 'Torta de Chocolate', type: 'Salida', qty: '5 unds', user: 'Admin' },
    { date: 'Ayer, 16:45 PM', item: 'Azúcar Blanca', type: 'Entrada', qty: '25 kg', user: 'Admin' },
    { date: 'Ayer, 14:20 PM', item: 'Cacao en Polvo', type: 'Salida', qty: '2 kg', user: 'Admin' }
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
