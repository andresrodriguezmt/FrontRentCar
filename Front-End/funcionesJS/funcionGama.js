function obtenerRegistrosGama(){

    $.ajax({
        url:"http://129.151.119.30:8081/api/Gama/all", // "http://129.151.119.30:80/api/Gama/all"
        type:"GET",
        dataType:"JSON",
        
        success:function(respuesta){
            console.log(respuesta);
            pintarRegistrosGama(respuesta);

            let $select = $("#select-gama");
            $.each(respuesta, function (idGama, name) {
                $select.append('<option value='+name.idGama+'>'+name.name+'</option>');
                console.log("select "+name.idGama);
            }); 
        } ,

        error: function(jqXHR,textStatus,errorThrown){
        
        }
        
    });
}

function pintarRegistrosGama(respuesta){

       
    let myTable ="<table>";
    
    for (i = 0 ; i < respuesta.length; i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+= "<td>" +"<ul>" 
        for(x = 0 ; x< respuesta[i].cars.length; x++){
            myTable += "<li>" + respuesta[i].cars[x].name +"</li>";
        }
        +"</ul> </td>"
        myTable+="<td> <button id='botonPut' onclick = 'actualizarRegistroGama("+respuesta[i].idGama+")'> PUT </td> ";
        myTable+="<td> <button id='botonDelete' onclick = 'eliminarRegistroGama("+respuesta[i].idGama+")'> DELETE </td> ";
        myTable+="</tr>"; 
   }
    
    myTable += "</table>";

    $("#registrosGama").html(myTable);

        
    
}
    
    
    
function insertarRegistroGama(){

    var elemento={
        
        name:$("#nameGama").val(),
        description:$("#descriptionGama").val()
    } 
        
    var dataTosend =JSON.stringify(elemento);
    // JSON = JavaScript Object Notation
        
    $.ajax({
        
        dataType: 'JSON',
        data:dataTosend,
        url:'http://129.151.119.30:8081/api/Gama/save', //url:'http://129.151.119.30:80/api/Car/save', <button onclick="obtenerRegistrosGama()">GET</button>
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

function actualizarRegistroGama(idElemento){

   let elemento = {
       idGama:idElemento,
       name:$("#nameGama").val(),
       description:$("#descriptionGama").val()
   } ;

   console.log(elemento)
   let dataTosend = JSON.stringify(elemento);

   $.ajax({
        
        url :"http://129.151.119.30:8081/api/Gama/update",
        type:"PUT",
        data:dataTosend,
        contentType:"application/json",
        datatype : "json",

        success:function(respuesta){

            $("#resultado").empty();
            $("#id").val("");
            $("#nameGama").val("");
            $("#descriptionGama").val("");
            obtenerRegistrosGama();
            alert("se ha Actualizado correctamente la Gama")
        },

        error: function(jqXHR,textStatus,errorThrown){
            
            window.location.reload()
            alert("No se actualizo correctamente");
        }


    });


}

function eliminarRegistroGama(idElemento){

    var elemento ={

        idGama:idElemento

    }

    var dataTosend=JSON.stringify(elemento);

    $.ajax({

        url: "http://129.151.119.30:8081/api/Gama/" + idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(response){

            $("#resultado").empty;
            alert("Se ha eliminado la Gama exitosamente");
            obtenerRegistrosGama();

        },
        
        error: function(jqXHR,textStatus,errorThrown){
            
            window.location.reload()
            obtenerRegistrosGama();
            alert("No se guardo correctamente");
        }
    });


}