import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PinsService } from '../pins/pins.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MatBottomSheetRefStub {
  dismiss() {}
}

class PinsServiceStub {
  resolveActionObserver() {}
}

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetRefStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open link', () => {
    const event = new MouseEvent('click');
    const eventCall = spyOn(event, 'preventDefault').and.callThrough();
    const dismiss = spyOn((<any>component).bottomSheetRef, 'dismiss');
    const resolveActionObserver = spyOn((<any>component).pinsService, 'resolveActionObserver');

    component.openLink(event, '');

    expect(eventCall).toHaveBeenCalled();
    expect(dismiss).toHaveBeenCalled();
    expect(resolveActionObserver).toHaveBeenCalled();
  });
});
