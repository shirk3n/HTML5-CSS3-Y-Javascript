var navbarItems = document.getElementsByClassName('navbar-item');/*Como crea un array, después no se puede poner el addEventListener */

/*Por eso tenemos que hacer un for*/

				/*---------------SMOOTH SCROLL en el navbar--------------------*/

for (var i = 0; i < navbarItems.length; i++){
	navbarItems[i].addEventListener('click', function(evt){
		
		deleteActiveClass();

		if (Modernizr.classList){
			this.classList.add('active');
		} else{
			this.classList += ' active';
		}
		

		var sectionToGo = this.getElementsByTagName('a')[0].href.split('#');  /*this es el item que desecadena la acción(el listen). En este caso el elemento li no el a*/
		
		if (sectionToGo.length > 1){ /*Para que en contacto no haga smooth*/	
			evt.preventDefault();																/*split: metodo que te permite divivir cadenas por un parámetro*/
			var goTo = sectionToGo[sectionToGo.length - 1];
			getElementByIdAndScroll(goTo);

		}																		
	});
}

function getElementByIdAndScroll(name){
	var elem;
	if (name== '') {
		elem = document.getElementsByClassName('header')[0];
	}else{
		elem = document.getElementById(name);
	}
	scrollToElement(elem);
}

function scrollToElement(element){
	var jump = parseInt(element.getBoundingClientRect().top * .3);/*Nos devuelve un cuadro donde esté nuestra función*/
	document.body.scrollTop += jump;
	document.documentElement.scrollTop += jump;

	if (!element.lastJump || element.lastJump > Math.abs(jump)){ /*Math.abs(jumo)--> Valor absoluto del salto*/
		element.lastJump = Math.abs(jump); /*Para tener una referencia (cuanto de grande he saltado) y si he llegado*/

		setTimeout(function(){
			scrollToElement(element);

		}, "60");
	}else{	
		element.lastJump = null;
	}
}

			/*---------------------------------------------------------------*/

			/*---------Cambio de gris al ir cambiando el sidebar-------------*/	
						/*CHANGE ACTIVE ITEM*/

var cumulativeOffset = function(element){
	var top = 0;
	do {
		top += element.offsetTop || 0;
		element = element.offsetParent;
	} while(element);

	return top;
};


var offsetQuienSoy = cumulativeOffset(document.getElementById('quien-soy'));
var offsetEquipo = cumulativeOffset(document.getElementById('equipo'));
var offsetTransporte = cumulativeOffset(document.getElementById('transporte'));

var navbar = document.getElementsByClassName('navbar')[0]; /*Variable para que vaya cambiando el color a gris del navbar*/

window.addEventListener('scroll', changeMenuStyle);

/*console.log(offsetQuienSoy);
console.log(offsetEquipo);
console.log(offsetTransporte);*/

function changeMenuStyle(evt){
	var previous;

	if (window.pageYOffset >= 0 && window.pageYOffset < offsetQuienSoy){
		if(!previous){ /*Evitamos que haga una fuga de rendimiento con el previous ya que si esta en mi seccion es false y no está borrando clases, no recalcula*/
			previous=1;
		}else if (previous==1){
			return false;
		}
		navbar.style.backgroundColor = '#F7F7F7';
		deleteActiveClass();
		if (Modernizr.classList){
			document.querySelector('a[href="#"]').parentNode.classList.add("active"); /*El parentNode es el padre li*/
		} else{
			document.querySelector('a[href="#"]').parentNode.className += " active"; //EXPLORER 9 importante dejarse espacio antes
		}
	} else if(window.pageYOffset >= offsetQuienSoy && window.pageYOffset < offsetEquipo){
		if(!previous){
			previous=2;
		}else if (previous==2){
			return false;
		}
		navbar.style.backgroundColor = '#A4A4A4';
		deleteActiveClass();
		if (Modernizr.classList){
			document.querySelector('a[href$="quien-soy"]').parentNode.classList.add("active-reverse"); /*El parentNode es el padre li*/
		} else{
			document.querySelector('a[href$="quien-soy"]').parentNode.classList += " active-reverse"; //EXPLORER 9 importante dejarse espacio antes
		}
	} else if(window.pageYOffset >= offsetEquipo && window.pageYOffset <  offsetTransporte){
		if(!previous){
			previous=3;
		}else if (previous==3){
			return false;
		}
		navbar.style.backgroundColor = '#F7F7F7';
		deleteActiveClass();
		if (Modernizr.classList){
			document.querySelector('a[href$="equipo"]').parentNode.classList.add("active"); /*El parentNode es el padre li*/
		} else{
			document.querySelector('a[href$="equipo"]').parentNode.classList += " active"; //EXPLORER 9 importante dejarse espacio antes
		}
	}
}

function deleteActiveClass(){
	for (var i = 0; i < navbarItems.length; i++){
		if(Modernizr.classList){
			navbarItems[i].classList.remove('active');
			navbarItems[i].classList.remove('active-reverse');
		} else {
			navbarItems[i].classList = 'navbar-item'; //EXPLORER 9 Para eliminar no hace falta poner += sino el =
		}
	}
}

			/*---------------------------------------------------------------*/
//Función para cambiar el classList por el className (Explorer 9) No la usamos es ejemplo
function addClass(elem, class){
	if (Modernizr.classList){
		elem.classList.add(class);
	}else{
		elem.className += 'class';
	}
}

	