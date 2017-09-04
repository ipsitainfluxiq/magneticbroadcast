/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostmanagementlistComponent } from './postmanagementlist.component';

describe('PostmanagementlistComponent', () => {
  let component: PostmanagementlistComponent;
  let fixture: ComponentFixture<PostmanagementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostmanagementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmanagementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
