var calculadora = {

	pantalla: document.getElementById("display"),
	valor_pantalla: "0",
	operacion: "",
	prim_valor: 0,
	seg_valor: 0,
	ult_valor: 0,
	resultado: 0,
	tecla_igual: false,

	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),



	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoEncogerBoton;
			x[i].onmouseleave = this.eventoBotonNormal;
		};
	},

	eventoEncogerBoton: function(event){
		calculadora.EncogerBoton(event.target);
	},

	eventoBotonNormal: function(event){
		calculadora.AumentaBoton(event.target);
	},



	EncogerBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28.5%";
			elemento.style.height = "61px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},

	AumentaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},



	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarpantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},



	borrarpantalla: function(){

	  this.valor_pantalla = "0";
		this.operacion = "";
		this.prim_valor = 0;
		this.seg_valor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.tecla_igual = false;
		this.ult_valor = 0;
		this.updatepantalla();
	},

	cambiarSigno: function(){
		if (this.valor_pantalla !="0") {
			var aux;
			if (this.valor_pantalla.charAt(0)=="-") {
				aux = this.valor_pantalla.slice(1);
			}	else {
				aux = "-" + this.valor_pantalla;
			}
		this.valor_pantalla = "";
		this.valor_pantalla = aux;
		this.updatepantalla();
		}
	},

	ingresoDecimal: function(){
		if (this.valor_pantalla.indexOf(".")== -1) {
			if (this.valor_pantalla == ""){
				this.valor_pantalla = this.valor_pantalla + "0.";
			} else {
				this.valor_pantalla = this.valor_pantalla + ".";
			}
			this.updatepantalla();
		}
	},

	ingresoNumero: function(valor){
		if (this.valor_pantalla.length < 8) {

			if (this.valor_pantalla=="0") {
				this.valor_pantalla = "";
				this.valor_pantalla = this.valor_pantalla + valor;
			} else {
				this.valor_pantalla = this.valor_pantalla + valor;
			}
		this.updatepantalla();
		}
	},

	ingresoOperacion: function(oper){
		this.prim_valor = parseFloat(this.valor_pantalla);
		this.valor_pantalla = "";
		this.operacion = oper;
		this.tecla_igual = false;
		this.updatepantalla();
	},

	verResultado: function(){

		if(!this.tecla_igual){
			this.seg_valor = parseFloat(this.valor_pantalla);
			this.ult_valor = this.seg_valor;


			this.realizarOperacion(this.prim_valor, this.seg_valor, this.operacion);

		} else {
		this.realizarOperacion(this.prim_valor, this.ult_valor, this.operacion);
		}


		this.prim_valor = this.resultado;


		this.valor_pantalla = "";



		if (this.resultado.toString().length < 9){
			this.valor_pantalla = this.resultado.toString();
		} else {
			this.valor_pantalla = this.resultado.toString().slice(0,8) + "...";
		}


		this.tecla_igual = true;
		this.updatepantalla();

	},

	realizarOperacion: function(prim_valor, seg_valor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(prim_valor + seg_valor);
			break;
			case "-":
				this.resultado = eval(prim_valor - seg_valor);
			break;
			case "*":
				this.resultado = eval(prim_valor * seg_valor);
			break;
			case "/":
				this.resultado = eval(prim_valor / seg_valor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(prim_valor));
		}
	},

	updatepantalla: function(){
		this.pantalla.innerHTML = this.valor_pantalla;
	}

};

calculadora.init();
