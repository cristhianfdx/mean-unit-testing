import { routes } from './app-routing.module';

fdescribe('AppRoutingModule', () => {

    it('should have app as path', () => {
        expect(routes[0].path).toBe('app');
    });
});
