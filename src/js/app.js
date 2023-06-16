document.addEventListener('DOMContentLoaded', function(){ //Creo una función para llamar y ejecutar funciones
    iniciarApp();
});
function iniciarApp(){ //Esta función llama a todas las funciones que se deben ejecutar
    crearGaleria();
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes'); //Selecciono el apartado donde está la seccion de galaria en el html
    for(let i=1; i<=12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img src="build/img/thumb/${i}.jpg" alt="Imagen Vocalista">
        `;

        imagen.onclick = function(){ //Creo funcion para el evento clic
            mostrarImagen(i); //Envio indice de la imagen al cual le doy clic
        }
        galeria.appendChild(imagen);
    }
}

//Mostrar la version grande de la imagen cuando se da clic sobre una imagen de la galeria
function mostrarImagen(id){ //Recibe el id de la imagen al cual se esta dando clic
    const imagen = document.createElement('picture');
        //Se crea un picture con las imagenes grandes
        imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img src="build/img/grande/${id}.jpg" alt="Imagen Vocalista">
        `;
    const overlay = document.createElement('DIV'); //Creo un contenedor para la imagen
    overlay.appendChild(imagen); //Imprimo la imagen dentro del div
    overlay.classList.add('overlay');

    //Boton para cerrar imagen
    const btnCerrarImagen = document.createElement('P');
    btnCerrarImagen.textContent ='X';
    btnCerrarImagen.classList.add('btn-cerrar');
    //Eliminar el overlay que contiene la imagen cuando se de clic en la X
    btnCerrarImagen.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body'); //Elimino la clase scss para que el body no quede fijado una vez cierro el overlay
        overlay.remove();
    }
    overlay.appendChild(btnCerrarImagen); //Lo agrego al html en el overlay

    //Mostrar el bloque creado con la imagen en todo el body del documento html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body'); //Agregar clase para fijar el overlay
}