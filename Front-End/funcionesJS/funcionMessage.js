function obtenerRegistrosMessage(){

    $.ajax({
        url:"http://129.151.119.30:8081/api/Message/all", //"http://129.151.119.30:80/api/Message/all"
        type:"GET",
        dataType:"JSON",
        
        success:function(respuesta){
            console.log(respuesta);
            pintarRegistrosMessage(respuesta);
        } ,

        error: function(jqXHR,textStatus,errorThrown){
    
        }
    
    });
}

function pintarRegistrosMessage(respuesta){

   
    let myTable ="<table>";

    for (i = 0 ; i < respuesta.length; i++){
        myTable+="<tr>";
       
        myTable+="<td>"+ respuesta[i].messageText+"</td>";
        myTable+="<td>"+ respuesta[i].car.name+"</td>";
        myTable+="<td>"+ respuesta[i].client.name+"</td>";
        myTable+="<td> <button id='botonPut' onclick='actualizarRegistroMessage("+respuesta[i].idMessage+")'> PUT </td>";
        myTable+="<td> <button id='botonDelete' onclick='eliminarRegistroMessage("+respuesta[i].idMessage+")'> DELETE </td>";
        
        myTable+="</tr>";
    }

    myTable += "</table>";

    $("#registrosMessage").html(myTable);

    

}



function insertarRegistroMessage(){

    var elemento={
        
        messageText:$("#messageText").val(),
        car: { idCar:+$(".seleccionarCar").val() },
        client: { idClient:+$(".seleccionarClient").val() },
    } 
    
    var dataTosend =JSON.stringify(elemento);
    // JSON = JavaScript Object Notation
    
    $.ajax({
    
        dataType: 'JSON',
        data:dataTosend,
        url:'http://129.151.119.30:8081/api/Message/save', //url:'http://129.151.119.30:80/api/Message/save'
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

    function actualizarRegistroMessage(idElemento){

        let elemento = {
            idMessage:idElemento,
            messageText:$("#messageText").val(),
            car: { idCar:+$(".seleccionarCar").val() },
            client: { idClient:+$(".wseleccionarClient").val() },
        } ;
     
        console.log(elemento)
        let dataTosend = JSON.stringify(elemento);
     
        $.ajax({
             
             url :"http://129.151.119.30:8081/api/Message/update",
             type:"PUT",
             data:dataTosend,
             contentType:"application/json",
             datatype : "json",
     
             success:function(respuesta){
     
                 $("#resultado").empty();
                 $("#id").val("");
                 $("#messageText").val("");
                
                 obtenerRegistrosMessage();
                 alert("se ha Actualizado correctamente el Mensaje")
             },
     
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 alert("No se actualizo correctamente");
             }
     
     
         });
     
     
     }
     
     function eliminarRegistroMessage(idElemento){
     
         var elemento ={
     
             idMessage:idElemento
     
         }
     
         var dataTosend=JSON.stringify(elemento);
     
         $.ajax({
     
             url: "http://129.151.119.30:8081/api/Message/" + idElemento,
             type:"DELETE",
             contentType:"application/JSON",
             datatype:"JSON",
     
             success:function(response){
     
                 $("#resultado").empty;
                 alert("Se ha eliminado la Gama exitosamente");
     
             },
             
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 obtenerRegistrosMessage();
                 alert("No se elimino el registro correctamente");
             }
         });
     
     
     }
