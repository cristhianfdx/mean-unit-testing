import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

fdescribe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ApiService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = TestBed.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterAll(() => {
    injector = null;
    service = null;
    httpMock = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('should execute get method', () => {
      const result = 'result';

      service.get('/test').subscribe(response => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });

    it('should execute get method with headers', () => {
      const result = 'result';
      const headers = new HttpHeaders().set('headers', 'new_header');

      service.get('/test', headers).subscribe(response => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      expect(req.request.headers.get('headers')).toBe('new_header');
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });
  });

  describe('POST', () => {
    it('should execute post method', () => {
      const result = 'result';

      service.post('/test', JSON.stringify('body')).subscribe(response => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      expect(req.request.method).toBe('POST');
      req.flush(result);
    });
  });

  describe('PUT', () => {
    it('should execute put method', () => {
      const result = 'result';
      let dataResponse, dataError;

      service.put('/test', JSON.stringify('body')).subscribe(
        response => {
          dataResponse = response;
        },
        error => {
          dataError = error;
        }
      );

      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      req.flush(result);

      expect(req.request.method).toBe('PUT');
      expect(dataResponse).toBe(result);
      expect(dataError).toBeUndefined();
    });
  });

  describe('DELETE', () => {
    it('should execute delete method', () => {
      const result = 'result';
      let dataResponse, dataError;

      service.delete('/test', JSON.stringify('body')).subscribe(
        response => {
          dataResponse = response;
        },
        error => {
          dataError = error;
        }
      );

      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      req.flush(result);

      expect(req.request.method).toBe('DELETE');
      expect(dataResponse).toBe(result);
      expect(dataError).toBeUndefined();
    });
  });
});
