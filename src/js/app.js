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

        galeria.appendChild(imagen);
    }
}

