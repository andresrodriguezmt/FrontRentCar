function obtenerRegistrosCar(){

    $.ajax({
        url:"http://129.151.119.30:8081/api/Car/all", //"http://129.151.119.30:80/api/Car/all"
        type:"GET",
        dataType:"JSON",
        
        success:function(respuesta){
            console.log(respuesta);
            pintarRegistrosCar(respuesta);

            let $select = $(".seleccionarCar");
            $.each(respuesta, function (idCar, name) {
                $select.append('<option value='+name.idCar+'>'+name.name+'</option>');
                console.log("select "+name.idCar);
            }); 
        } ,

        error: function(jqXHR,textStatus,errorThrown){
    
        }
    
    });
}

function pintarRegistrosCar(respuesta){

   
    let myTable ="<table>";

    for (i = 0 ; i < respuesta.length; i++){
        myTable+="<tr>";
        
        
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].gama.name+"</td>"

        myTable+= "<td>" +"<ul>" 
        for(x = 0 ; x< respuesta[i].messages.length; x++){
            myTable += "<li>" + respuesta[i].messages[x].messageText +"</li>";
        }
        +"</ul> </td>" ;

        myTable+= "<td>" +"<ul>" 
        for(x = 0 ; x< respuesta[i].reservations.length; x++){
             
            myTable +=  "<li>" + respuesta[i].reservations[x].status +"</li> ";
            
        }
        +"</ul> </td>"


        myTable+="<td> <button id='botonPut' onclick='actualizarRegistroCar("+respuesta[i].idCar+")' > PUT  </td>";
        myTable+="<td> <button id='botonDelete' onclick='eliminarRegistroCar("+respuesta[i].idCar+")' > DELETE </td>";
        myTable+="</tr>";
    }

    myTable += "</table>";

    $("#registrosCar").html(myTable);

    

}



function insertarRegistroCar(){

    var elemento={
        
        name:$("#nameCar").val(),
        brand:$("#brandCar").val(),
        year:$("#yearCar").val(),
        description:$("#descriptionCar").val(),
        gama: { idGama:+$("#select-gama").val() },
    } 
    
    console.log(elemento);
    var dataTosend =JSON.stringify(elemento);
    // JSON = JavaScript Object Notation
    
    $.ajax({
    
        dataType: 'JSON',
        data:dataTosend,
        url:'http://129.151.119.30:8081/api/Car/save', //url:'http://129.151.119.30:80/api/Car/save', <button onclick="obtenerRegistrosGama()">GET</button>
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

    function actualizarRegistroCar(idElemento){

        let elemento = {
            idCar:idElemento,
            name:$("#nameCar").val(),
            brand:$("#brandCar").val(),
            year:$("#yearCar").val(),
            description:$("#descriptionCar").val(),
            gama:{id:+$("#select-gama").val()}
        } ;
     
        console.log(elemento)
        let dataTosend = JSON.stringify(elemento);
     
        $.ajax({
             
             url :"http://129.151.119.30:8081/api/Car/update",
             type:"PUT",
             data:dataTosend,
             contentType:"application/json",
             datatype : "json",
     
             success:function(respuesta){
     
                 $("#resultado").empty();
                 $("#id").val("");
                 $("#nameCar").val("");
                 $("#brandCar").val("");
                 $("#yearCar").val("");
                 $("#descriptionCar").val("");
                 obtenerRegistrosCar();
                 alert("se ha Actualizado correctamente la Gama")
             },
     
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 alert("No se actualizo correctamente");
             }
     
     
         });
     
     
     }
     
     function eliminarRegistroCar(idElemento){
     
         var elemento ={
     
             idCar:idElemento
     
         }
     
         var dataTosend=JSON.stringify(elemento);
     
         $.ajax({
     
             url: "http://129.151.119.30:8081/api/Car/" + idElemento,
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
