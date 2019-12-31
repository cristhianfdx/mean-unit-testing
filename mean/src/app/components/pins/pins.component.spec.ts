import { Subject, of} from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RepositoryService } from 'src/app/services/repository.service';
import { PinsService } from './pins.service';

import { PinsComponent } from './pins.component';

import { PINS } from './../../services/mocks/pins';


class RepositoryServiceStub {
  observer: Subject<any> = new Subject();

  getPins() {
    return this.observer;
  }

  resolveGetPins() {
    this.observer.next(JSON.parse(JSON.stringify(PINS)));
  }

  updatePin() {
    return of(true);
  }
}

class MatSnackBarStub {
  open() {}
}

class PinsServiceStub {
  observer: Subject<any> = new Subject();
  $actionObserver = this.observer.asObservable();

  resolve(action: string) {
    return this.observer.next(action);
  }
}


fdescribe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinsComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get pins', () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   spyOn((<any>component).repository, 'getPins');

  //   fixture.whenStable().then(() => {
  //     expect(component.pins).toContain(PINS);
  //   });
  // });

  it('When update progress', () => {
    component.pins = PINS;
    const pin = PINS[0];
    const pinsService = TestBed.get(PinsService);
    const updatePin = spyOn((<any>component).repository, 'updatePin').and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, 'open').and.callThrough();

    pinsService.resolve('save');

    expect(updatePin).toHaveBeenCalledWith(pin._id, {
      title: pin.title,
      author: pin.author,
      description: pin.description,
      percentage: pin.percentage,
      tags: pin.tags,
      assets: pin.assets
    });
    expect(open).toHaveBeenCalledWith('Progress updated!', 'OK', {
      duration: 2000
    });
  });

  it('When new page is open', () => {
    const open = spyOn(window, 'open');
    component.openUrl('url');
    expect(open).toHaveBeenCalledWith('url', '_blank');
  });
});
