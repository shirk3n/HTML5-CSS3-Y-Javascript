var image = document.getElementById('title-img-animated');

image.addEventListener ('mousemove', function(evt){ /*Para que se vaya moviendo la imagenn cuando pase el raton*/
	image.style.backgroundPosition = evt.pageX * -1 / 12 + "px " + evt.pageY * -1 / 12 + "px";
});

image.addEventListener ('mouseleave', function(evt){ /*Para que cuando salgamos con el raton de la imagen se coloque en su sitio*/
	image.style.backgroundPosition = "center center";
});