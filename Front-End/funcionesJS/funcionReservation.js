function obtenerRegistrosReservation(){

    $.ajax({
        url:"http://129.151.119.30:80/api/Reservation/all", //"http://129.151.119.30:80/api/Reservation/all"
        type:"GET",
        dataType:"JSON",
        
        success:function(respuesta){
            console.log(respuesta);
            pintarRegistrosReservation(respuesta);
        } ,

        error: function(jqXHR,textStatus,errorThrown){
    
        }
    
    });
}

function pintarRegistrosReservation(respuesta){

   
    let myTable ="<table>";

    for (i = 0 ; i < respuesta.length; i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td> <button onclick='actualizarRegistroReservation("+ respuesta[i].idReservation+")'> PUT </td>" ;
        myTable+="<td> <button onclick='eliminarRegistroReservation("+respuesta[i].idReservation+")'> DELETE</td>"

        myTable+="</tr>";
    }

    myTable += "</table>";

    $("#registrosReservation").html(myTable);

    

}



function obtenerRegistrosReservation(){

    $.ajax({
        url:"http://129.151.119.30:8081/api/Reservation/all", //"http://129.151.119.30:80/api/Reservation/all"
        type:"GET",
        dataType:"JSON",
        
        success:function(respuesta){
            console.log(respuesta);
            pintarRegistrosReservation(respuesta);

            let $select = $("#seleccionarReserva");
            $.each(respuesta, function (idClient, startDate ) {
                $select.append('<option value='+startDate.idReservation+'>'+startDate.startDate+'</option>');
                console.log("select "+startDate.idReservation);
            }); 
        } ,

        error: function(jqXHR,textStatus,errorThrown){
    
        }
    
    });
}

function pintarRegistrosReservation(respuesta){

   
    let myTable ="<table>";

    for (i = 0 ; i < respuesta.length; i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+ respuesta[i].car.name+"</td>";
        myTable+="<td>"+ respuesta[i].client.name+"</td>";
        myTable+="<td> <button id='botonPut' onclick='actualizarRegistroReservation("+ respuesta[i].idReservation+")'> PUT </td>" ;
        myTable+="<td> <button id='botonDelete' onclick='eliminarRegistroReservation("+respuesta[i].idReservation+")'> DELETE</td>"

        myTable+="</tr>";
    }

    myTable += "</table>";

    $("#registrosReservation").html(myTable);

    

}



function insertarRegistroReservation(){

    var elemento={
        
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        car: { idCar:+$(".seleccionarCar").val() },
        client: { idClient:+$(".seleccionarClient").val() },
    } 
    
    var dataTosend =JSON.stringify(elemento);
    // JSON = JavaScript Object Notation
    
    $.ajax({
    
        dataType: 'JSON',
        data:dataTosend,
        url:'http://129.151.119.30:8081/api/Reservation/save', //url:'http://129.151.119.30:80/api/Message/save'
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

    function actualizarRegistroReservation(idElemento){

        let elemento = {
            idReservation:idElemento,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            car: { idCar:+$(".seleccionarCar").val() },
            client: { idClient:+$(".seleccionarClient").val() },
        } ;
     
        console.log(elemento)
        let dataTosend = JSON.stringify(elemento);
     
        $.ajax({
             
             url :"http://129.151.119.30:8081/api/Reservation/update",
             type:"PUT",
             data:dataTosend,
             contentType:"application/json",
             datatype : "json",
     
             success:function(respuesta){
     
                 $("#resultado").empty();
                 $("#id").val("");
                 $("#startDate").val("");
                 $("#devolutionDate").val("");
                 obtenerRegistrosReservation();
                 alert("se ha Actualizado correctamente el Mensaje")
             },
     
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 alert("No se actualizo correctamente");
             }
     
     
         });
     
     
     }
     
     function eliminarRegistroReservation(idElemento){
     
         var elemento ={
     
             idReservation:idElemento
     
         }
     
        
     
         $.ajax({
     
             url: "http://129.151.119.30:8081/api/Reservation/" + idElemento,
             type:"DELETE",
             contentType:"application/JSON",
             datatype:"JSON",
     
             success:function(response){
     
                 $("#resultado").empty;
                 alert("Se ha eliminado la Reserva exitosamente");
     
             },
             
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 obtenerRegistrosReservation();
                 alert("No se elimino el registro correctamente");
             }
         });
     
     
     }