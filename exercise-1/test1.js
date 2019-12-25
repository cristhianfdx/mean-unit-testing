const saludar = nombre => `Hola ${nombre}`;

console.log(saludar('Cristhian'));

const resultado = saludar('Cristhian');
const esperado = 'Hola Cristhian';

if (resultado === esperado) {
    console.log('Prueba exitosa!');
}else {
    console.log('Prueba no exitosa');
}