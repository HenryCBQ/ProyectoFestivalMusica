//Creo una funcion de JavaScript y le paso un collback (funcion que se ejecuta antes)
function tarea(done){
    console.log('Mi primera tarea con gulp');
    done();
}

//Node tiene una manera diferente de llamar una funcion
//Comando para ejecutar la funcion npx gulp primeraTarea
exports.tarea = tarea; //No es necesario ponerle parentesis a la funcion para mandarla a llamar con node