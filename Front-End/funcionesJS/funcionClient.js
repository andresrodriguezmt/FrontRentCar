function obtenerRegistrosClient(){

    $.ajax({
        url:"http://129.151.119.30:8081/api/Client/all", //"http://129.151.119.30:80/api/Client/all"
        type:"GET",
        dataType:"JSON",
        
        success:function(respuesta){
            console.log(respuesta);
            pintarRegistrosClient(respuesta);

            let $select = $(".seleccionarClient");
            $.each(respuesta, function (idClient, name ) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            }); 
            
        } ,

        error: function(jqXHR,textStatus,errorThrown){
    
        }
    
    });
}

function pintarRegistrosClient(respuesta){

   
    let myTable ="<table>";

    for (i = 0 ; i < respuesta.length; i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";

        myTable+= "<td>" +"<ul>" 
        for(x = 0 ; x< respuesta[i].messages.length; x++){
            myTable += "<li>" + respuesta[i].messages[x].messageText +"</li>";
        }
        +"</ul> </td>" ;

        myTable+= "<td>" +"<ul>" 
        for(x = 0 ; x< respuesta[i].reservations.length; x++){
             
            myTable +=  "<li>" + respuesta[i].reservations[x].status +"</li> ";
            
        }
        +"</ul> </td>";

        myTable+="<td> <button id='botonPut' onclick='actualizarRegistroClient("+ respuesta[i].idClient+")'> PUT </td>";
        myTable+="<td> <button id='botonDelete' onclick= 'eliminarRegistroClient("+ respuesta[i].idClient+")' > DELETE </td>";
        myTable+="</tr>";
    }

    myTable += "</table>";

    $("#registrosClient").html(myTable);

    

}



function insertarRegistroClient(){

    var elemento={
        
        email:$("#emailClient").val(),
        password:$("#password").val(),
        name:$("#nameClient").val(),
        age:$("#ageClient").val()
    } 
    
    var dataTosend =JSON.stringify(elemento);
    // JSON = JavaScript Object Notation
    
    $.ajax({
    
        dataType: 'JSON',
        data:dataTosend,
        url:'http://129.151.119.30:8081/api/Client/save', //url:'http://129.151.119.30:80/api/Car/save', <button onclick="obtenerRegistrosGama()">GET</button>
        type:'POST',
        contentType:"application/json ",


        success:function(response){
            console.log(response);
            console.log("se guardo correctamente");
            alert("se guardo correctamente");
            window.location.reload()
        },
    
        error: function(jqXHR,textStatus,errorThrown){
            window.location.reload()
            alert("No se guardo correctamente");
        }
    
    
    });
    
    }   

    function actualizarRegistroClient(idElemento){

        let elemento = {
            idClient:idElemento,
            email:$("#emailClient").val(),
            password:$("#password").val(),
            name:$("#nameClient").val(),
            age:$("#ageClient").val()
        } ;
     
        console.log(elemento)
        let dataTosend = JSON.stringify(elemento);
     
        $.ajax({
             
             url :"http://129.151.119.30:8081/api/Client/update",
             type:"PUT",
             data:dataTosend,
             contentType:"application/json",
             datatype : "json",
     
             success:function(respuesta){
     
                 $("#resultado").empty();
                 $("#id").val("");
                 $("#emailClient").val("");
                 $("#password").val("");
                 $("#nameClient").val("");
                 $("#ageClient").val("");
                 obtenerRegistrosClient();
                 alert("se ha Actualizado correctamente la Gama")
             },
     
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 alert("No se actualizo correctamente");
             }
     
     
         });
     
     
     }
     
     function eliminarRegistroClient(idElemento){
     
         var elemento ={
     
             idClient:idElemento
     
         }
     
         var dataTosend=JSON.stringify(elemento);
     
         $.ajax({
     
             url: "http://129.151.119.30:8081/api/Client/" + idElemento,
             type:"DELETE",
             contentType:"application/JSON",
             datatype:"JSON",
     
             success:function(response){
     
                 $("#resultado").empty;
                 alert("Se ha eliminado la Gama exitosamente");
     
             },
             
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 obtenerRegistrosCar();
                 alert("No se elimino el registro correctamente");
             }
         });
     
     
     }