var rClick;
var http = new XMLHttpRequest(); 

    window.addEventListener("load",function(){
        var hoy = new this.Date();
        var idfecha = this.document.getElementById("idfecha");
        idfecha.max = hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear();
        var modificar = document.getElementById("btnModificar");
        modificar.onclick = ejecutarPost;

        http.onreadystatechange = callback;
        http.open("GET","http://localhost:3000/materias",true);
        http.send();    
    });   


function callback(){
        if (http.readyState==4 && http.status==200) {
            var listaJS=JSON.parse(http.responseText);
            tabla(listaJS);
        }
}

function tabla(objJS){

    var tbody = document.getElementById("tbody");
    var personas = objJS;  
    
    for (var i = 0; i < personas.length; i++){    
       //Creo la fila
       var row = document.createElement("tr");
       //Creamos las colunmnas
       var td4 = document.createElement("td");  
       var nodoText4 = document.createTextNode(personas[i].id);    
       td4.appendChild(nodoText4);
       row.appendChild(td4);

       var td = document.createElement("td");  
       var nodoText = document.createTextNode(personas[i].nombre);      
       td.appendChild(nodoText);
       td4.style.display="none";
       row.appendChild(td);

       var td1 = document.createElement("td");  
       var nodoText1 = document.createTextNode(personas[i].cuatrimestre);      
       td1.appendChild(nodoText1);
       row.appendChild(td1);

       var td2 = document.createElement("td");  
       var nodoText2 = document.createTextNode(personas[i].fechaFinal);      
       td2.appendChild(nodoText2);
       row.appendChild(td2);

       var td3 = document.createElement("td");  
       var nodoText3 = document.createTextNode(personas[i].turno);      
       td3.appendChild(nodoText3);
       row.appendChild(td3);
        
       row.addEventListener("dblclick",clkTabla);
       tbody.appendChild(row);
    }     
} 

function clkTabla(event){

    var contAgregar = document.getElementById("contAgregar");
    var btn = document.getElementById("btn");

    btn.hidden = true;
    contAgregar.hidden = false;
    
    rClick = event.target.parentNode; 
    document.getElementById("id").value = rClick.childNodes[0].innerHTML;
    document.getElementById("name").value = rClick.childNodes[1].innerHTML;
    document.getElementById("cuatrimestre").value = rClick.childNodes[2].innerHTML;
    // fecha
    fecha = rClick.childNodes[3].innerHTML;
    fechaFormato = fecha.substr(6,4)+"-"+fecha.substr(3,2)+"-"+fecha.substr(0,2);   
    document.getElementById("idfecha").value = fechaFormato;
    document.getElementById("idTurno").value = rClick.childNodes[4].innerHTML;

    // Botón radio
    if(document.getElementById("idTurno").value == "Mañana"){
          document.querySelector('#radiobuttonset > [value="Mañana"]').checked = true;
    }
    else{
        document.querySelector('#radiobuttonset > [value="Noche"]').checked = true;
    }   
    document.getElementById("segundoCuatrimestre").value = rClick.childNodes[2].innerHTML;   
}

function ejecutarPost(){

    var httpPost = new XMLHttpRequest();
    var id = document.getElementById("id").value;
    var nombreString = document.getElementById("name").value;
    var cuatrimestreString = document.getElementById("cuatrimestre").value;
    var fechaString = document.getElementById("idfecha").value;
                    fecha = rClick.childNodes[3].innerHTML;
                    var anio = fecha.substr(6,4);
                    var mes = fecha.substr(3,2);
                    var dia = fecha.substr(0,2)
                    fechaFormato = dia+"/"+mes+"/"+anio; 
    fechaString = fechaFormato;          
    var radiobutton = document.querySelector('input[name = "radiobutton"]:checked').value;
    var trunoString = radiobutton;

    //Validación 
    if(nombreString == "" || nombreString.length < 6){
        document.getElementById("name").className="error";
        alert("Nombre minimo 6 caracteres");
        return ;
    }
    else {
        document.getElementById("name").className="sinError";
    }

    httpPost.onreadystatechange=function(){

        var nombreString = document.getElementById("name").value;
        var fechaString = document.getElementById("idfecha").value;
        var radiobutton = document.querySelector('input[name = "radiobutton"]:checked').value;
        var trunoString = radiobutton;  

        if(httpPost.readyState == 4 && httpPost.status == 200){
                alert(httpPost.responseText);
                if(JSON.parse(httpPost.responseText).type=="ok"){

                    rClick.childNodes[1].innerHTML=nombreString;

                    fecha = rClick.childNodes[3].innerHTML;
                    var anio = fecha.substr(6,4);
                    var mes = fecha.substr(3,2);
                    var dia = fecha.substr(0,2)
                    fechaFormato = dia+"/"+mes+"/"+anio; 
                    rClick.childNodes[3].innerHTML=fechaFormato;
                    console.log(rClick.childNodes[3].innerHTML);
                    rClick.childNodes[4].innerHTML=trunoString; 
                }
                else{
                    alert("Error!!");
                }
                document.getElementById("contenedor_carga").hidden = true;
            }  
    }

    httpPost.open("POST","http://localhost:3000/editar",true);
    httpPost.setRequestHeader("Content-Type","application/json");
    var json = {"id":id,"nombre":nombreString,"cuatrimestre":cuatrimestreString,"fechaFinal":fechaString,"turno":trunoString};
    httpPost.send(JSON.stringify(json));    
    document.getElementById("contenedor_carga").hidden = false;
        
    cerrar();
}

function eliminar(){
    var httpPost = new XMLHttpRequest();

    var id = document.getElementById("id").value;
    
    httpPost.onreadystatechange=function(){
        if(httpPost.readyState == 4 && httpPost.status == 200){
            alert(httpPost.responseText);
            if(JSON.parse(httpPost.responseText).type=="ok"){
                rClick.remove();
            }else{
                alert("Error al Eliminar!!!");
            }
            
            document.getElementById("contenedor_carga").hidden = true;
        }
    }
    httpPost.open("POST","http://localhost:3000/eliminar",true);
    httpPost.setRequestHeader("Content-Type","application/json");
    var json = {"id":id};
    httpPost.send(JSON.stringify(json));  
    document.getElementById("contenedor_carga").hidden = false;  
    cerrar();
}

function cerrar(){
    var contAgregar = document.getElementById("contAgregar");
    var btn = document.getElementById("btn");
    
    btn.hidden = false;
    contAgregar.hidden = false;
    
}

function abrir(){
    var contAgregar = document.getElementById("contAgregar");
    var btn = document.getElementById("btn");

    btn.hidden = true;
    contAgregar.hidden = false;
}


