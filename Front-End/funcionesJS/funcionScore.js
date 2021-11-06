function obtenerRegistrosScore(){

    $.ajax({
        url:"http://129.151.119.30:8081/api/Score/all", //"http://129.151.119.30:80/api/Score/all"
        type:"GET",
        dataType:"JSON",
        
        success:function(respuesta){
            console.log(respuesta);
            pintarRegistrosScore(respuesta);
        } ,

        error: function(jqXHR,textStatus,errorThrown){
    
        }
    
    });
}

function pintarRegistrosScore(respuesta){

   
    let myTable ="<table>";

    for (i = 0 ; i < respuesta.length; i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].stars+"</td>";
        myTable +="<td>"+ respuesta[i].reservation.startDate+"</td> ";
        myTable +=  "<td>" + respuesta[i].reservation.devolutionDate +"</td>" ;
        myTable+="<td> <button id='botonPut' onclick='actualizarRegistroScore("+respuesta[i].idScore+")' > PUT </td>"
        myTable+="<td> <button id='botonDelete' onclick='eliminarRegistroScore("+respuesta[i].idScore+")' > DELETE </td>"
        myTable+="</tr>";
    }

    myTable += "</table>";

    $("#registrosScore").html(myTable);

    

}



function insertarRegistroScore(){

    var elemento={
        
        messageText:$("#messageTextScore").val(),
        stars:$("#stars").val(),
        reservation:{ idReservation: +$("#seleccionarReserva").val()}
    } 
    
    console.log(elemento)
    var dataTosend =JSON.stringify(elemento);
    // JSON = JavaScript Object Notation
    
    $.ajax({
    
        dataType: 'JSON',
        data:dataTosend,
        url:'http://129.151.119.30:8081/api/Score/save', //url:'http://129.151.119.30:80/api/Message/save'
        type:'POST',
        contentType:"application/json ",


        success:function(response){
            console.log(response);
            console.log("se guardo correctamente");
            window.location.reload()
            alert("se guardo correctamente");
            
        },
    
        error: function(jqXHR,textStatus,errorThrown){
            window.location.reload()
            alert("No se guardo correctamente");
        }
    
    
    });
    
    }    

    function actualizarRegistroScore(idElemento){

        let elemento = {
            idScore:idElemento,
            messageText:$("#messageTextScore").val(),
            stars:$("#stars").val(),
            reservation:{ idReservation: +$("#seleccionarReserva").val()}
        } ;
     
        console.log(elemento)
        let dataTosend = JSON.stringify(elemento);
     
        $.ajax({
             
             url :"http://129.151.119.30:8081/api/Score/update",
             type:"PUT",
             data:dataTosend,
             contentType:"application/json",
             datatype : "json",
     
             success:function(respuesta){
     
                 $("#resultado").empty();
                 $("#id").val("");
                 $("#messageTextScore").val("");
                 $("#stars").val("");
                 obtenerRegistrosScore();
                 alert("se ha Actualizado correctamente el Mensaje")
             },
     
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 alert("No se actualizo correctamente");
             }
     
     
         });
     
     
     }
     
     function eliminarRegistroScore(idElemento){
     
         var elemento ={
     
             idScore:idElemento
     
         }
     
         var dataTosend=JSON.stringify(elemento);
     
         $.ajax({
     
             url: "http://129.151.119.30:8081/api/Score/" + idElemento,
             type:"DELETE",
             contentType:"application/JSON",
             datatype:"JSON",
     
             success:function(response){
     
                 $("#resultado").empty;
                 alert("Se ha eliminado la Calificacion exitosamente");
     
             },
             
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 obtenerRegistrosScore();
                 alert("No se elimino el registro correctamente");
             }
         });
     
     
     }