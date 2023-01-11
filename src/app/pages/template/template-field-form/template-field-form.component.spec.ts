import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFieldFormComponent } from './template-field-form.component';

describe('TemplateFieldFormComponent', () => {
  let component: TemplateFieldFormComponent;
  let fixture: ComponentFixture<TemplateFieldFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFieldFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateFieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
