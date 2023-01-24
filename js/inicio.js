"use strict";
let menu, user={}, modal_direction, json_config = {};
//Inicio de la aplicación
$(document).ready(async function () {
    //Se valida si el usuario ha iniciado sesion
    let sesion = await sendRequestPOSTNew( "/request/valid_sesion.php", ``)
    if( sesion.status == 1 )
        if( sesion.mensaje == 1 ){
            //Sesion iniciada
        }else{
            alert("Sesion expirada","error",3000);
            setTimeout(() => {
                location.assign("index.html")    
            }, 3000);
            return
        }
    else{
        alert("Error deve volverse a loguear","error",3000);
        setTimeout(() => {
            location.assign("index.html")    
        }, 3000);
        return
    }

    // if( get_variables_cache("citizen") == undefined )
    //     location.assign("/")
    // else
    //     user = JSON.parse( get_variables_cache("citizen") )

    // loading(true)
    // try{ 
    //     json_config =  await sendRequestGET("/request/get_config_info_data?info_data=json_config", true, 'application/json')
    //     json_config = JSON.parse( decodeURIComponent( json_config[0].json_data ) ) 
    // }catch(e){}

    //no se implementa cache ni cokies por tiempo
    user.nombre_ciudadano = "Demo";

    //Se carga el menu
    async function load_menu() {
        $("body").append(`
            <div id="menu">
                <v-app id="inspire">
                    <v-app-bar app :color="barra_fondo">
                        <v-app-bar-nav-icon @click="drawer = !drawer" :color="barra_color_text"></v-app-bar-nav-icon>
                        <v-img
                            max-height="30"
                            max-width="30"
                            :src="barra_ruta_imagen"
                            class="img_menu"
                            style="border-radius: 40px;"
                        ></v-img>
                        <v-toolbar-title :style="barra_color">
                            &nbsp;{{barra_titulo}}
                        </v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-menu left bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon :color="barra_color_text">mdi-account-circle</v-icon>
                                </v-btn>
                            </template>

                            <v-card>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-avatar>
                                            <img
                                            src="img/logo.png"
                                            :alt="usuario_nombre"
                                            >
                                        </v-list-item-avatar>
                            
                                        <v-list-item-content>
                                            <v-list-item-title>{{usuario_nombre}}</v-list-item-title>
                                            <v-list-item-subtitle>{{usuario_correo}}</v-list-item-subtitle>
                                        </v-list-item-content>
                            
                                        <v-list-item-action>
                                            <v-icon @click="salir">mdi-logout</v-icon>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </v-app-bar>
        
                    <v-navigation-drawer v-model="drawer" fixed temporary>
                        <!--
                        <v-list-item class="px-2">
                            <v-list-item-avatar>
                                <v-img src="img/logo.png"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-title class="user"> <span class="name">{{usuario_nombre}}</span><br><span class="email">{{usuario_correo}}</span> </v-list-item-title>
                        </v-list-item>
                        -->

                        <v-list-item class="px-2">
                            <div style="text-align: center;width: 100%;margin: 0 0 -15px 0;padding: 0;font-size: 25px;">Menu</div>
                        </v-list-item>

                        <v-divider></v-divider>

                        <span v-for="(rows, i) in v_menu.length">
                            <v-list-group v-if="v_menu[i].type=='menu_group'" v-model="v_menu[i].deploy" :prepend-icon="v_menu[i].icon" v-show="v_menu[i].show == undefined ? true : v_menu[i].show ">
                                <template v-slot:activator>
                                    <v-list-item-title>{{v_menu[i].text}}{{v_menu[i].show}}</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(rows, j) in v_menu[i].elements" v-on:click="menu(j,i)">
                                    <v-list-item-title>{{v_menu[i].elements[j].text}}</v-list-item-title>
                                    <v-list-item-icon>
                                        <v-icon>{{v_menu[i].elements[j].icon}}</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list-group>
                            <v-list-item link v-if="v_menu[i].type=='menu'" v-on:click="menu(0,i)">
                                <v-list-item-icon>
                                    <v-icon>{{v_menu[i].icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{v_menu[i].text}}</v-list-item-title>
                            </v-list-item>
                        </span>
                    </v-navigation-drawer>
                    <v-alert dense text type="success" class="mensaje_success" style="position: fixed; bottom: 0%; right: 30px; z-index: 10000000; background-color: white !important;" v-show="info_text!=''"><div style="max-width: 250px">{{info_text}}</div></v-alert>
                    <v-alert dense text type="success" class="mensaje_success mensaje_movil" style="position: fixed; bottom: 0%; right: 30px; z-index: 10000000; background-color: white !important;" v-show="info_text2!=''"><div style="max-width: 250px">{{info_text2}}</div></v-alert>
                        <v-btn
                            v-show="show_add"
                            style="position: absolute; right: 40px; z-index: 1; top: 50px;"
                            @click="add_element"
                            icon
                        >
                            <v-icon color="primary" x-large>
                                mdi-plus-circle
                            </v-icon>
                        </v-btn>
                </v-app>
            </div>
        `);

        //Se implementa vue
        menu = new Vue({
            el: '#menu',
            vuetify: new Vuetify(),
            data() {
                return {
                    drawer: null,
                    show_add:false,
                    info_text:'',
                    info_text2:'',
                    usuario_nombre: user.nombre_ciudadano,
                    usuario_correo: user.correo_ciudadano,
                    barra_ruta_imagen: json_config != undefined && json_config.barra_ruta_imagen != undefined ? json_config.barra_ruta_imagen : "../img/logo.png" ,
                    barra_titulo: json_config != undefined && json_config.barra_titulo != undefined ? `${json_config.barra_titulo}` : "SuperIntendencia",
                    barra_fondo: json_config != undefined && json_config.barra_fondo != undefined ? json_config.barra_fondo : "#FFFFFF",
                    barra_color: `color:${json_config != undefined && json_config.barra_color != undefined ? json_config.barra_color : "#000000"}`,
                    barra_color_text: json_config != undefined && json_config.barra_color != undefined ? json_config.barra_color : "#000000",
                    v_menu:[{
                        icon:"mdi-alpha-t-circle-outline",
                        text:"Tramites",
                        deploy:false,
                        type:"menu_group",
                        elements:[{
                            icon:"mdi-application-edit-outline",
                            text:"Consultar radicaciones",
                        }]
                    }],
                }
            },
            methods: {
                async menu( option, deploy ){
                    $(".content_options").remove()
                    $("body").append(`<div class="content_options"></div>`)
                    set_variables_cache("option_selected",JSON.stringify({ option:option, deploy:deploy }))
                    if( option == 0 && deploy == 0 ){
                        setTimeout(async () => {
                            loading(true);
                            let datos = await sendRequestPOSTNew( "/request/inicio_getregistros.php", `user=${$(".l_correo").val()}&password=${ btoa($(".l_clave").val()).replace(/=/g,"") }`)
                            let titulos = [];
                            if( datos.status == 1 ){
                                for( let key in datos.mensaje[0] )
                                    if( key == "id" || key == "nombre_solicitante" || key == "fecha" || key == "asunto" || key == "texto_solicitud" || key == "email" )
                                        titulos.push( { text: key, value: key} );

                            }

                            create_table({ 
                                id_class:".content_options",
                                headers:titulos, 
                                desserts:datos.mensaje,
                                title:this.v_menu[deploy].elements[option].text,
                                title_icon:this.v_menu[deploy].elements[option].icon,
                                _click:[{text:"Editar", icon:"mdi-pencil" ,function:async function(element){
                                    menu.show_add = false;
                                    loading(true);
                                    $(".content_options").remove()
                                    $("body").append(`<div class="content_options"></div>`)

                                    //Solo se puede editar 3 campos que son los principales
                                    let form = create_form({
                                        id_class:".content_options",
                                        title:"Editar radicación",
                                        title_icon:"mdi-pencil",
                                        md:6, "offset-md":3,
                                        inputs:[
                                            {type:"text", md:6, "offset-md":3, id:'nombre_solicitante', label:["Nombre solicitante"], element:[element.nombre_solicitante], counter:[255],_click:[function(){
                                            }]},
                                            {type:"text", md:6, "offset-md":3, id:'asunto', label:["Asunto"], element:[element.asunto], counter:[255],_click:[function(){
                                            }]},
                                            {type:"textarea", md:6, id:'Texto solicitud', "offset-md":3, label:"Solicitud", element:[element.texto_solicitud]}
                                        ],
                                        button:[{
                                            color:"",
                                            label:"Cancelar",
                                            md:3,
                                            "offset-md":3,
                                            _function:async function(){
                                                menu.menu(0,0)
                                            }
                                        },{
                                            color:"primary",
                                            label:"Editar",
                                            md:3,
                                            "offset-md":0,
                                            _function:async function(){
                                                let set_registros = await sendRequestPOSTNew( "/request/inicio_set_registros.php", `nombre_solicitante=${form.inputs[0].element[0]}&asunto=${ form.inputs[1].element[0] }&texto_solicitud=${ form.inputs[2].element[0] }&id=${ element.id }`)
                                                if( set_registros.status == 1 ){
                                                    menu.menu(0,0)
                                                    alert("Datos guardados correctamente", "success", 3000)
                                                }else
                                                    alert("Error al guardar los datos", "success", 3000)
                                            }
                                        }]
                                    })
                                    loading(false);
                                }}]
                            })

                            menu.show_add = true;

                            loading(false);
                        }, 500);
                    }
                },
                add_element(){
                    menu.show_add = false;

                    $(".content_options").remove()
                    $("body").append(`<div class="content_options"></div>`)

                    let form = create_form({
                        id_class:".content_options",
                        title:"Crear radicación",
                        title_icon:"mdi-pencil",
                        md:6, "offset-md":3,
                        inputs:[
                            {type:"text", md:6, "offset-md":3, id:'nombre_solicitante', label:["Nombre solicitante"], element:[""], counter:[255],_click:[function(){
                            }]},
                            {type:"text", md:6, "offset-md":3, id:'asunto', label:["Asunto"], element:[""], counter:[255],_click:[function(){
                            }]},
                            {type:"textarea", md:6, id:'Texto solicitud', "offset-md":3, label:"Solicitud", element:[""]}
                        ],
                        button:[{
                            color:"",
                            label:"Cancelar",
                            md:3,
                            "offset-md":3,
                            _function:async function(){
                                menu.menu(0,0)
                            }
                        },{
                            color:"primary",
                            label:"Crear",
                            md:3,
                            "offset-md":0,
                            _function:async function(){
                                menu.show_add = false;
                                let add_registro = await sendRequestPOSTNew( "/request/inicio_add_registros.php", `nombre_solicitante=${form.inputs[0].element[0]}&asunto=${ form.inputs[1].element[0] }&texto_solicitud=${ form.inputs[2].element[0] }`)
                                if( add_registro.status == 1 ){
                                    menu.menu(0,0)
                                    alert("Datos guardados correctamente", "success", 3000)
                                }else
                                    alert("Error al guardar los datos", "success", 3000)
                            }
                        }]
                    })
                },
                async salir(){
                    await sendRequestPOSTNew( "/request/destroid_sesion.php", ``)
                    location.assign("index.html");
                }
            },
            mounted() {
                let selection = JSON.parse( get_variables_cache("option_selected") )
                if( selection != null )
                    this.menu( selection.option, selection.deploy )
                else
                    this.menu( 0, 0 )

                $("title").html( json_config != undefined && json_config.barra_titulo != undefined ? json_config.barra_titulo : "SuperIntendencia" )
                $("link[rel=icon]").attr( "href", json_config != undefined && json_config.barra_ruta_imagen != undefined ? json_config.barra_ruta_imagen : "../img/logo.png" )
                
                loading(false)
            }
        })
    }

    load_menu();
})