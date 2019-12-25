const saludar = require('../app');

const x = true;
const a = {};
const b = {};
let c = undefined;

describe('Verificar que la variable es true', () => {
  it('La función saluda', () => {
    expect(saludar('Cristhian')).toContain('Hola');
  });

  it('x es true', () => {
    expect(x).toBeTruthy();
  });

  it('Objetos iguales', () => {
    expect(a).toEqual(b);
  });

  it('La variable ha sido inicializada', () => {
      expect(c).toBeDefined();
  });
});
