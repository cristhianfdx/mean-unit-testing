import { ApiService } from './api.service';
import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';

import { environment } from 'src/environments/environment';
import { PINS } from './mocks/pins';
import { of } from 'rxjs';

class ApiServiceStub {
  get() {}

  post() {}

  put() {}
}

fdescribe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        RepositoryService,
        { provide: ApiService, useClass: ApiServiceStub }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(RepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPins method', () => {
    it('should execute get method', () => {
      environment.mocks = false;
      const get = spyOn((<any>service).api, 'get');
      service.getPins();
      expect(get).toHaveBeenCalled();
    });

    it('should get pins', () => {
      let dataResponse: any;
      let dataError: any;
      environment.mocks = true;

      service.getPins().subscribe(
        response => {
          dataResponse = response;
        },
        error => {
          dataError = error;
        }
      );

      expect(dataResponse.length).toBeGreaterThan(0);
      expect(dataError).toBeUndefined();
    });
  });

  describe('savePins method', () => {
    it('should execute post method', () => {
      environment.mocks = false;
      const post = spyOn((<any>service).api, 'post');
      service.savePins('body');
      expect(post).toHaveBeenCalledWith('', 'body');
    });

    it('should save pins', () => {
      let dataResponse: any;
      let dataError: any;
      environment.mocks = true;

      service.savePins('body').subscribe(
        response => {
          dataResponse = response;
        },
        error => {
          dataError = error;
        }
      );

      expect(dataResponse).toBe('body');
      expect(dataError).toBeUndefined();
    });
  });

  describe('updatePin method', () => {
    it('should execute put method', () => {
      environment.mocks = false;
      const put = spyOn((<any>service).api, 'put');
      service.updatePin('id', 'body');
      expect(put).toHaveBeenCalledWith('/id', 'body');
    });

    it('should update pin', () => {
      let dataResponse: any;
      let dataError: any;
      environment.mocks = true;

      service.updatePin('id', 'body').subscribe(
        response => {
          dataResponse = response;
        },
        error => {
          dataError = error;
        }
      );

      expect(dataResponse).toBe('body');
      expect(dataError).toBeUndefined();
    });
  });


});
