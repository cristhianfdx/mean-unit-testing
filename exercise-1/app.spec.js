const { it, expect } = require('./framework');
const saludar = require('./app');

it('La función saluda', () => {
  expect(saludar('Cristhian')).toBe('Hola Cristhian');
});
