const entrada = '10 25 30 18 38 17 35 25 80 40 30 50 45 19 27 24 90 85 18 25 20 26 40 70 16';

function calcularRuta(rutaMaquina) {
    let rutaSplit = rutaMaquina.split(' ');
    let esquema = [[], [], [], [], []];
    let bandas = [];
    let flin = [];
    let glen = [];
    let entrada = [];
    let letras = ['A', 'B', 'C', 'D', 'E'];

    esquema.forEach((value, index) => {
        if (index % 2 == 0) {
            let array = rutaSplit.slice(index * 5, (index + 1) * 5);
            array.forEach((cuadrante) => {
                value.push(cuadrante);
            });
        } else {
            let array = rutaSplit.slice(index * 5, (index + 1) * 5);
            array.reverse().forEach((cuadrante) => {
                value.push(cuadrante);
            });
        }
    });

    esquema.forEach((value, fila) => {
        if (fila == 0 || fila == 4) {
            value.forEach((cuadrante, columna) => {
                bandas.push({
                    'cuadrante': cuadrante,
                    'columna': columna,
                    'fila': fila
                });
            });
        }
        if (fila != 0 && fila != 4) {
            const columnaInicial = 0;
            const columnaFinal = 4;
            bandas.push({
                'cuadrante': value[columnaInicial],
                'columna': columnaInicial,
                'fila': fila
            },
                {
                    'cuadrante': value[columnaFinal],
                    'columna': columnaFinal,
                    'fila': fila
                });
        }
    });

    entrada = bandas.sort((a, b) => { return b.cuadrante - a.cuadrante; }).slice(0, 2);
    flin.push(entrada[0]);
    glen.push(entrada[1]);

    // Ruta Glen
    for (let i = 0; i < 3; i++) {
        let valores = [];
        if (glen[i].columna - 1 >= 0) {
            if (!glen.find((e) => e.fila == glen[i].fila && e.columna == glen[i].columna - 1)) {
                valores.push({ 'cuadrante': esquema[glen[i].fila][glen[i].columna - 1], 'columna': glen[i].columna - 1, 'fila': glen[i].fila });
            }
        }
        if (glen[i].columna + 1 <= 4) {
            if (!glen.find((e) => e.fila == glen[i].fila && e.columna == glen[i].columna + 1)) {
                valores.push({ 'cuadrante': esquema[glen[i].fila][glen[i].columna + 1], 'columna': glen[i].columna + 1, 'fila': glen[i].fila });
            }
        }

        // validar valores en filas
        if (glen[i].fila - 1 >= 0) {
            if (!glen.find((e) => e.fila == glen[i].fila - 1 && e.columna == glen[i].columna)) {
                valores.push({ 'cuadrante': esquema[glen[i].fila - 1][glen[i].columna], 'columna': glen[i].columna, 'fila': glen[i].fila - 1 });
            }
        }
        if (glen[i].fila + 1 <= 4) {
            if (!glen.find((e) => e.fila == glen[i].fila + 1 && e.columna == glen[i].columna)) {
                valores.push({ 'cuadrante': esquema[glen[i].fila + 1][glen[i].columna], 'columna': glen[i].columna, 'fila': glen[i].fila + 1 });
            }
        }
        glen.push(valores.sort((a, b) => { return b.cuadrante - a.cuadrante; })[0]);
    }
    //Ruta Flin
    for (let i = 0; i < 3; i++) {
        let valores = [];
        if (flin[i].columna - 1 >= 0) {
            if (!flin.find((e) => e.fila == flin[i].fila && e.columna == flin[i].columna - 1) && !glen.find((e) => e.fila == flin[i].fila && e.columna == flin[i].columna - 1)) {
                valores.push({ 'cuadrante': esquema[flin[i].fila][flin[i].columna - 1], 'columna': flin[i].columna - 1, 'fila': flin[i].fila });
            }
        }
        if (flin[i].columna + 1 <= 4) {
            if (!flin.find((e) => e.fila == flin[i].fila && e.columna == flin[i].columna + 1) && !glen.find((e) => e.fila == flin[i].fila && e.columna == flin[i].columna + 1)) {
                valores.push({ 'cuadrante': esquema[flin[i].fila][flin[i].columna + 1], 'columna': flin[i].columna + 1, 'fila': flin[i].fila });
            }
        }

        // validar valores en filas
        if (flin[i].fila - 1 >= 0) {
            if (!flin.find((e) => e.fila == flin[i].fila - 1 && e.columna == flin[i].columna) && !glen.find((e) => e.fila == flin[i].fila - 1 && e.columna == flin[i].columna)) {
                valores.push({ 'cuadrante': esquema[flin[i].fila - 1][flin[i].columna], 'columna': flin[i].columna, 'fila': flin[i].fila - 1 });
            }
        }
        if (flin[i].fila + 1 <= 4) {
            if (!flin.find((e) => e.fila == flin[i].fila + 1 && e.columna == flin[i].columna) && !glen.find((e) => e.fila == flin[i].fila + 1 && e.columna == flin[i].columna)) {
                valores.push({ 'cuadrante': esquema[flin[i].fila + 1][flin[i].columna], 'columna': flin[i].columna, 'fila': flin[i].fila + 1 });
            }
        }
        flin.push(valores.sort((a, b) => { return b.cuadrante - a.cuadrante; })[0]);
    }

    console.log(glen.map((value) => { value.fila = letras[value.fila]; return value.fila + (value.columna + 1); }).join(' '));
    console.log(flin.map((value) => { value.fila = letras[value.fila]; return value.fila + (value.columna + 1); }).join(' '));
}

calcularRuta(prompt('la salida generada por la máquina de exploración'));