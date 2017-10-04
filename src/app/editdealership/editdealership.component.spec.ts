/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditdealershipComponent } from './editdealership.component';

describe('EditdealershipComponent', () => {
  let component: EditdealershipComponent;
  let fixture: ComponentFixture<EditdealershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdealershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdealershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
