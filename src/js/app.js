document.addEventListener('DOMContentLoaded', function(){ //Creo una función para llamar y ejecutar funciones
    iniciarApp();
});
function iniciarApp(){ //Esta función llama a todas las funciones que se deben ejecutar
    barraNavegacionFija();
    crearGaleria();
    scrollNav(); //Funcion para navegar por las secciones
}

//Dejar la negacion fija cuando el escroll llega a cierta parte d ela pagina
function barraNavegacionFija(){
    const barraNavegacion = document.querySelector('.header'); //Seleciono la barra de navegacion
    const sobreFestival = document.querySelector('.sobre-festival'); //Selecciona la parte de la pagina donde se debe fijar la barra de navegacion
    const body = document.querySelector('body');
    //Identificar el elemnto sobrefestival de acuerdo al movimiento del scroll
    window.addEventListener('scroll', function(){
        //Si ya paso el elemento, determinado por la parte superior del mismo (top)
        if(sobreFestival.getBoundingClientRect().top < 0){
            barraNavegacion.classList.add('fijar'); //Agrego una clase css si ya paso el elemto
            body.classList.add('body-scroll'); //Calse css creada en el body para prevenir el salto que ocurre cuando se fija la barra navegacion
        }else{
            barraNavegacion.classList.remove('fijar'); //Elimino la clase si no ha pasado por el elemento
            body.classList.remove('body-scroll'); //Elimino la clase si no ha pasado por el elemento
        }
    });
}

//Funcion para nevagar por las secciones de la pagina
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    //Al seleccionar todos los elementos se debe agregar el evento por medio de un foreEach para no generar error
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault(); //Quito comportamiento por defecto
            const seccionScroll = e.target.attributes.href.value; //Acceder a los atributos de cada seccion, en este caso los id de los enlaces
            const seccion = document.querySelector(seccionScroll); 
            seccion.scrollIntoView({behavior: "smooth"}); //asigno nuevo comportamiento para que el scroll sea mas lento
        });
    });
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