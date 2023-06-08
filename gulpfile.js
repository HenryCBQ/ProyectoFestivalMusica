//Extraer funciones del node_modules para compilar el código SASS a CSS, puntualmente src es para ubicar archivos y el dest para guardar
//watch permite ejecutar tareas cada vez que se actualiza la hoja de estilos de SCSS
const {src, dest, watch, parallel} = require("gulp");
const sass = require("gulp-sass")(require("sass")); //Llamar el archivo SASS y el archivo gulp-sass que permite comunicacion entre ambos
const plumber = require('gulp-plumber');

//Extraer función instalada para convertir imágenes a formato webp
const webp = require('gulp-webp');
//Extraer funcion para aligerar imagenes jpg, png
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

//Creo la funcion para leer, compilñar y guardar la hoja de estilos.
function css(done){
    src("src/scss/**/*.scss") //Identidico todos los archivo con extension SCSS de la carpeta scss
        .pipe(plumber()) //Previene que cada vez que haya un error se detenga la ejecución de la tarea
        .pipe(sass()) //El pipe ejecuta una tarea secuencialmente, entonces ejecuta el archivo sass mandado a llamar con require anteriormente
        .pipe(dest("build/css")); //Guarda el archivo
    done(); //Indico dónde termina la función
}

//Funcion para cambiar el formato de las imagenes a webp
function imgWebp(done){
    //La calidad de las imagenes webp va de 0 a 100
    const calidadImagen = {
        calidad: 50
    };
    //Busco todos los archivos que haya en la carpeta imagenes con los formatos jpg y png, le paso la calidad de las imagenes
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(calidadImagen))
        .pipe(dest('build/img')) //Asigno la ruta de destino de las imagenes convertidas
    done();
}

//Funcion para volver las imagenes mas ligeras
function imgLigero(done){
    //Nivel de optimizacion de imagenes, para mas imformacion consultar la documentacion de gulp
    const opciones = {
        nivelOptimizacion: 3
    };
    //Busco todos los archivos que haya en la carpeta imagenes con los formatos jpg y png, le paso la calidad de las imagenes
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
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
exports.imgLigero = imgLigero;
exports.imgWebp = imgWebp;
exports.dev = parallel(imgLigero,imgWebp,dev); //Ejecuta las tareas paralelamente
