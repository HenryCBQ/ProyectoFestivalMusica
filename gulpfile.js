//Extraer funciones del node_modules para compilar el código SASS a CSS, puntualmente src es para ubicar archivos y el dest para guardar
//watch permite ejecutar tareas cada vez que se actualiza la hoja de estilos de SCSS
const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass")); //Llamar el archivo SASS y el archivo gulp-sass que permite comunicacion entre ambos
const plumber = require('gulp-plumber');

//Creo la funcion para leer, compilñar y guardar la hoja de estilos.
function css(done){
    src("src/scss/**/*.scss") //Identidico todos los archivo con extension SCSS de la carpeta scss
        .pipe(plumber()) //Previene que cada vez que haya un error se detenga la ejecución de la tarea
        .pipe(sass()) //El pipe ejecuta una tarea secuencialmente, entonces ejecuta el archivo sass mandado a llamar con require anteriormente
        .pipe(dest("build/css")); //Guarda el archivo
    done(); //Indico dónde termina la función
}
//Función para compilar el archivo app.scss cad avez que se modifique
function dev(done){
    watch("src/scss/**/*.scss", css); //Indico ruta del archivo y llamo la función que lo compila
    done();
}

//Node tiene una manera diferente de llamar una funcion
//Comando para ejecutar funciones en gulp -> npx gulp nombreFuncion
//Con control+c pauso la funcion de watch
exports.css = css; //No es necesario ponerle parentesis a la funcion para mandarla a llamar con node
exports.dev = dev;
