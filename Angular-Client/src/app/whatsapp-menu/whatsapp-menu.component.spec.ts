import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappMenuComponent } from './whatsapp-menu.component';

describe('WhatsappMenuComponent', () => {
  let component: WhatsappMenuComponent;
  let fixture: ComponentFixture<WhatsappMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsappMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
