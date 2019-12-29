import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormComponent } from './form.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { NavigationService } from 'src/app/services/navigation.service';

class RepositoryServiceStub {
  savePins() {
    return of(true);
  }
}

class NavigationServiceStub {
  goToPins() {}
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed: () => {
        return of(true);
      }
    };
  }
}

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: NavigationService, useClass: NavigationServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When component is initialized', () => {
    it('should create the first form', () => {
      expect(Object.keys(component.firstFormGroup.controls)).toEqual([
        'title',
        'author',
        'description'
      ]);
    });

    it('should create the second form', () => {
      expect(Object.keys(component.secondFormGroup.controls)).toEqual([
        'firstAsset',
        'assets'
      ]);
    });
  });

  describe('When addAsset method is called', () => {
    it('should add new group', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');

      component.addAsset();
      component.addAsset();

      expect(Object.keys(assets.controls)).toEqual(['0', '1']);
    });
  });

  describe('When deleteAsset method is called', () => {
    it('should remove the form control', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');

      component.addAsset();
      component.deleteAsset(0);

      expect(Object.keys(assets.controls)).toEqual([]);
    });
  });

  describe('When savePin method is called', () => {
    it('should save pin', () => {
      const navigate = spyOn((<any>component).navigate, 'goToPins');
      const open = spyOn((<any>component).snackBar, 'open').and.callThrough();

      component.savePin();

      expect(navigate).toHaveBeenCalled();
      expect(open).toHaveBeenCalledWith(
        'Your pin is saved, Redirecting ...',
        'Cool!',
        {
          duration: 2000
        }
      );
    });
  });
});
