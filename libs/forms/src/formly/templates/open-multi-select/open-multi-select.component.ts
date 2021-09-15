import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'pwm-open-multi-select',
  templateUrl: './open-multi-select.component.html',
  // styleUrls: ['./open-multi-select.component.scss'],
})
export class OpenMultiSelectComponent extends FieldType implements OnInit {
  // public formControlName: string;
  public items: Observable<any[]> = of([]);
  public asFormControl(v: AbstractControl): FormControl {
    return v as FormControl;
  }

  public addTagFn(name: string) {
    return name;
  }

  ngOnInit(): void {
    // this.formControlName = String(this.key);
    this.items =
      this.to.options instanceof Observable
        ? this.to.options
        : of(this.to.options);
  }
}
