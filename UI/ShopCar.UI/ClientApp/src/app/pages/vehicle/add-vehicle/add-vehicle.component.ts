import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from "ngx-bootstrap";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { NotificationsService } from 'src/app/shared/_services';
import { BrandService } from 'src/app/shared/_services/brand.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styles: []
})
export class AddVehicleComponent implements OnInit {
  
  form: FormGroup;
  submitted = false;

  id: number
  brandId: number
  model: string
  year: number
  price: number
  sold: boolean

  isEdit: boolean

  brands: any

  constructor(private modalService: BsModalService, 
            private fb: FormBuilder,
            public bsModalRef: BsModalRef,
            private notificationService: NotificationsService,
            private vehicleService: VehicleService,
            private brandService: BrandService) { }

  ngOnInit() {
    
    this.isEdit = this.id && true || false

    console.log(this.isEdit)

    this.getBrands()
    this.buildForm()
  }

  buildForm() {
    this.form = this.fb.group({
      id: [this.id],
      brand: [this.brandId && this.brandId || undefined, Validators.required],
      model: [this.model, Validators.required],
      year: [this.year, Validators.required],
      price: [this.price, Validators.required],
      sold: [this.sold]
    })
  }

  get getValues() {
    return this.form.controls;
  }

  getBrands(){
    this.brandService.getBrand().subscribe(data => this.brands = data)
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const vehicle = {
      "id": this.getValues.id.value,
      "brandId": this.getValues.brand.value,
      "model": this.getValues.model.value,
      "year": this.getValues.year.value,
      "price":this.getValues.price.value,
      "sold":this.getValues.sold.value
    };

    (!this.isEdit ? this.vehicleService.addVehicle(vehicle) : this.vehicleService.editVehicle(vehicle))
      .subscribe(
        result => {
          this.notificationService.onSuccess(result.message);
          this.bsModalRef.hide()
        },
        error => {
          this.notificationService.onError(error.error)
        })
  }

}
