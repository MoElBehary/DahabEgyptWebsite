import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStudioComponent } from './product-studio.component';

describe('ProductStudioComponent', () => {
  let component: ProductStudioComponent;
  let fixture: ComponentFixture<ProductStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
