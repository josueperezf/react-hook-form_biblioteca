export const formatRut = (value: string, separadores = true ) => {
    let rut = value.toUpperCase().trim();
    rut = rut.split('-').join('');
    rut = rut.replace(/[^0-9kK]/g, '').slice(0, 9);
    let rutConSeparador = rut;
    if (rut.length > 1 ) {
        const fin = rut.substring(rut.length - 1);
        let inicio: any = rut.substring(0, rut.length - 1);
        inicio = inicio.split('.').join('');
        if (inicio.length > 3) {
            const arr: string[] = inicio.split('');
            arr.reverse();
            inicio = arr.reverse().join('');
        }
        if ( !isNaN(inicio) ) {
          inicio = new Intl.NumberFormat('de-DE').format(inicio);
        }
        rutConSeparador = inicio + '-' + fin;
    }
    return (separadores) ? rutConSeparador : rut;
}
