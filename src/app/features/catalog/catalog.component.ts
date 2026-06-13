import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Product {
  id: string;
  name: string;
  type: string;
  unit: string;
  minStock: number;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: Product[] = [
    { id: 'INS-001', name: 'Harina de Trigo', type: 'Materia prima', unit: 'kg', minStock: 20 },
    { id: 'INS-002', name: 'Azúcar Blanca', type: 'Materia prima', unit: 'kg', minStock: 15 },
    { id: 'PRO-001', name: 'Torta de Chocolate', type: 'Producto terminado', unit: 'unidades', minStock: 5 },
  ];
  
  filteredProducts: Product[] = [...this.products];
  searchQuery = '';
  
  showModal = false;
  isEditing = false;
  productForm: FormGroup;
  


  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      unit: ['', Validators.required],
      minStock: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = query;
    this.filteredProducts = this.products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.id.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query)
    );
  }

  openModal(product?: Product) {
    this.showModal = true;
    if (product) {
      this.isEditing = true;
      this.productForm.patchValue(product);
    } else {
      this.isEditing = false;
      this.productForm.reset({ type: '', unit: '', minStock: 0 });
    }
  }

  closeModal() {
    this.showModal = false;
    this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      
      if (this.isEditing) {
        const index = this.products.findIndex(p => p.id === formValue.id);
        if (index !== -1) {
          this.products[index] = { ...formValue };
        }
      } else {
        const newId = (formValue.type === 'Materia prima' ? 'INS-' : 'PRO-') + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.products.push({ ...formValue, id: newId });
      }
      
      // Update filtered list
      this.onSearch({ target: { value: this.searchQuery } } as any);
      this.closeModal();
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
