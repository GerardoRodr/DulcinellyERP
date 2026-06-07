import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  movimientoForm: FormGroup;
  activeTab: 'entrada' | 'salida' = 'entrada';
  isSubmitting = false;
  successMessage = '';
  
  menuItems = [
    { label: 'Dashboard', active: false, route: '/dashboard' },
    { label: 'Catálogo', active: false, route: '/catalog' },
    { label: 'Movimientos', active: true, route: '/movimientos' },
    { label: 'Reportes', active: false, route: '/reportes' }
  ];

  insumos = [
    { id: 'INS-001', name: 'Harina de Trigo' },
    { id: 'INS-002', name: 'Azúcar Blanca' },
    { id: 'INS-003', name: 'Cacao en Polvo' },
    { id: 'PRO-001', name: 'Torta de Chocolate' }
  ];
  
  filteredInsumos = [...this.insumos];
  showInsumosDropdown = false;
  selectedInsumoName = '';

  constructor(private fb: FormBuilder) {
    this.movimientoForm = this.fb.group({
      insumoId: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0.1)]],
      motivo: ['', Validators.required],
      ordenProduccion: [''] // Condicional
    });
  }

  ngOnInit() {
    this.updateValidators();
  }

  switchTab(tab: 'entrada' | 'salida') {
    this.activeTab = tab;
    this.updateValidators();
    this.successMessage = '';
    this.movimientoForm.reset();
    this.selectedInsumoName = '';
  }

  updateValidators() {
    const ordenCtrl = this.movimientoForm.get('ordenProduccion');
    if (this.activeTab === 'salida') {
      ordenCtrl?.setValidators([Validators.required]);
    } else {
      ordenCtrl?.clearValidators();
    }
    ordenCtrl?.updateValueAndValidity();
  }

  filterInsumos(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.selectedInsumoName = query;
    this.showInsumosDropdown = true;
    
    if (!query) {
      this.movimientoForm.get('insumoId')?.setValue('');
    }

    this.filteredInsumos = this.insumos.filter(i => 
      i.name.toLowerCase().includes(query) || i.id.toLowerCase().includes(query)
    );
  }

  selectInsumo(insumo: any) {
    this.selectedInsumoName = insumo.name;
    this.movimientoForm.get('insumoId')?.setValue(insumo.id);
    this.showInsumosDropdown = false;
  }

  hideDropdown() {
    setTimeout(() => {
      this.showInsumosDropdown = false;
    }, 200);
  }

  onSubmit() {
    if (this.movimientoForm.valid) {
      this.isSubmitting = true;
      this.successMessage = '';
      
      const payload = {
        ...this.movimientoForm.value,
        tipo: this.activeTab,
        usuario: 'Admin', // Inyectado automáticamente
        fechaHora: new Date().toISOString() // Inyectado automáticamente
      };
      
      console.log('Registrando movimiento:', payload);

      setTimeout(() => {
        this.isSubmitting = false;
        this.successMessage = `Se registró la ${this.activeTab} exitosamente.`;
        this.movimientoForm.reset();
        this.selectedInsumoName = '';
        this.updateValidators();
        
        setTimeout(() => this.successMessage = '', 3000);
      }, 800);
    } else {
      this.movimientoForm.markAllAsTouched();
    }
  }
}
