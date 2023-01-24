$(document).ready(async function(){
	let sesion = await sendRequestPOSTNew( "/request/valid_sesion.php", ``)
	console.log(sesion)
	if( sesion.status == 1 && sesion.mensaje == 1 )
		location.assign("inicio.html");
})


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if( get_variables_cache("mensaje_confirmacion") != undefined ){ 
	alert( get_variables_cache("mensaje_confirmacion"), "success", 5000 )
	clear_cache();
}

if( get_variables_cache("citizen") != undefined ){ 
	location.assign("inicio.html")
}

signUpButton.addEventListener('click', () => {
	alert("Funcion deshabilitada","error",3000);
	container.classList.add("right-panel-active");
	setTimeout(() => {
		$("#signIn").click();
	}, 1000);
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

$(".registrarse").click(async function(){
	alert("Funcion deshabilitada","error",3000);
})

$(".ingresar").click(async function(){
	loading(true)
	// let login = await sendRequestPOST("/request/index.php", {
	// 	user: $(".l_correo").val(),
	// 	clave: $(".l_clave").val(),
	// }, "application/x-www-form-urlencoded", false)

	if( $(".l_correo").val() == '' || $(".l_clave").val() == '' )
		alert("Debe ingresar un usuario y una contraseña","error",3000)
	else{
		let login = await sendRequestPOSTNew( "/request/index.php", `user=${$(".l_correo").val()}&password=${ btoa($(".l_clave").val()).replace(/=/g,"") }`)
		if( login.status == 1 ){
			if( login.mensaje.length == 0 ){
				alert("Usuario o contraseña incorrecta","error",3000)
			}else{
				if( login.mensaje[0] == 0 )
					alert( "Usuario bloqueado", "error", 3000 )
				else{
					location.assign("inicio.html")
				}
			}
		}else{
			alert("Error en la peticion","error",3000)
		}
	}
	loading(false);
})

$(".recuperar").click(function(){
	$( "#modal" ).remove()
    $("body").append(`
        <div id="modal">
            <v-app id="inspire">
                <v-row justify="center">
                    <v-dialog
                        v-model="dialog"
                        width="80%"
                    >
                        <v-card>
							<v-row class="mb-6" no-gutters>
								<v-col md="6" offset-md="3">
									<br><br>	
									<h1>Recuperar clave <v-icon>mdi-account-question-outline</v-icon></h1>
									<span>Enviaremos la confirmación de recuperacion a tu correo</span>
									<br><br>
									<v-text-field
										v-model="correo"
										:rules="rol_correo"
										counter="100"
										label="Correo"
									required>
								</v-col>
							</v-row>
							
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                color="red darken-4"
                                text
                                @click="dialog = false"
                                >
                                Salir
                                </v-btn>
								<v-btn
                                color="blue darken-4"
                                text
                                @click="save"
                                >
                                guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-app>
        </div>
    `)

    new Vue({
        el: '#modal',
        vuetify: new Vuetify(),
        data () {
          return {
			correo:'',
            dialog: true,
			rol_correo:[
				v => !!v || `El campo correo no puede ser vacio`,
				v => v.length <= 100|| `Este campo no debe superar los 100 caracteres`,
			],
          }
        },
		methods: {
			async save(){
				if( this.correo == '' ){
					alert("El campo correo no puede estar vacio", "error", 5000 )
				}else{
					// loading(true)
					// let user = await sendRequestPOST("/request/recuperar_clave", {
					// 	email: this.correo,
					// 	url:location.origin,
					// }, 'application/json', false, "status")
	
					// if( user.status == 1 ){
					// 	alert( user.mensaje, "success", 5000 )
					// 	this.dialog = false;
					// }
					// loading(false)
				}
				
			}
		},
		mounted(){
			alert("Funcion deshabilitada","error",3000);
			let popup = this;
			setTimeout(() => {
				popup.dialog = false;
			}, 1000);
		}
    })
	f_fuentes()
})


