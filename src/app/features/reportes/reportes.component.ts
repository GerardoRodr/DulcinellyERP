import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  filterForm: FormGroup;

  menuItems = [
    { label: 'Dashboard', active: false, route: '/dashboard' },
    { label: 'Catálogo', active: false, route: '/catalog' },
    { label: 'Movimientos', active: false, route: '/movimientos' },
    { label: 'Reportes', active: true, route: '/reportes' }
  ];

  movimientos = [
    { id: 'MOV-1001', fecha: '2026-06-07 08:30:00', producto: 'Harina de Trigo', cantidad: '+50', tipo: 'Entrada', usuario: 'Carlos Admin', motivo: 'Compra a proveedor', orden: '-' },
    { id: 'MOV-1002', fecha: '2026-06-07 09:15:22', producto: 'Azúcar Blanca', cantidad: '-10', tipo: 'Salida', usuario: 'Rosa Operaria', motivo: 'Uso en producción', orden: 'ORD-00123' },
    { id: 'MOV-1003', fecha: '2026-06-07 10:05:10', producto: 'Cacao en Polvo', cantidad: '+20', tipo: 'Entrada', usuario: 'Rosa Operaria', motivo: 'Ajuste positivo', orden: '-' },
    { id: 'MOV-1004', fecha: '2026-06-07 11:45:00', producto: 'Torta de Chocolate', cantidad: '+5', tipo: 'Entrada', usuario: 'Carlos Admin', motivo: 'Producción', orden: 'ORD-00123' },
    { id: 'MOV-1005', fecha: '2026-06-07 14:20:30', producto: 'Harina de Trigo', cantidad: '-5', tipo: 'Salida', usuario: 'Rosa Operaria', motivo: 'Merma o desperdicio', orden: '-' },
  ];

  filteredMovimientos = [...this.movimientos];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
      sucursal: ['Todas'],
      usuario: ['Todos']
    });

    // En un caso real se suscribiría a valueChanges, aquí lo mantenemos simple.
  }

  applyFilters() {
    // Aquí iría la lógica real de filtrado. Por ahora es un mock simple.
    console.log('Aplicando filtros:', this.filterForm.value);
    this.filteredMovimientos = [...this.movimientos]; // Mock reset
  }

  exportReport() {
    console.log('Exportando reporte a PDF/Excel...');
    alert('Ya mucho vamos a exportar pdf (Generando PDF...)');
  }
}
