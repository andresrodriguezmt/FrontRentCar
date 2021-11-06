function obtenerRegistrosAdmin(){

    $.ajax({
        url:"http://129.151.119.30:8081/api/Admin/all", //"http://129.151.119.30:80/api/Admin/all"
        type:"GET",
        dataType:"JSON",
        
        success:function(respuesta){
            console.log(respuesta);
            pintarRegistrosAdmin(respuesta);
        } ,

        error: function(jqXHR,textStatus,errorThrown){
    
        }
    
    });
}

function pintarRegistrosAdmin(respuesta){

   
    let myTable ="<table>";

    for (i = 0 ; i < respuesta.length; i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td> <button onclick='actualizarRegistroAdmin("+respuesta[i].idAdmin+")' > PUT </td>"
        myTable+="<td> <button onclick='eliminarRegistroAdmin("+respuesta[i].idAdmin+")' > DELETE </td>"

        myTable+="</tr>";
    }

    myTable += "</table>";

    $("#registrosAdmin").html(myTable);

    

}



function insertarRegistroAdmin(){

    var elemento={
        
        email:$("#emailAdmin").val(),
        password:$("#passwordAdmin").val(),
        name:$("#nameAdmin").val(),
    } 
    
    var dataTosend =JSON.stringify(elemento);
    // JSON = JavaScript Object Notation
    
    $.ajax({
    
        dataType: 'JSON',
        data:dataTosend,
        url:'http://129.151.119.30:80/api/Admin/save', //url:'http://localhost:80/api/Message/save'
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

    function actualizarRegistroAdmin(idElemento){

        let elemento = {
            idAdmin:idElemento,
            email:$("#emailAdmin").val(),
            password:$("#passwordAdmin").val(),
            name:$("#nameAdmin").val(),
        } ;
     
        console.log(elemento)
        let dataTosend = JSON.stringify(elemento);
     
        $.ajax({
             
             url :"http://129.151.119.30:80/api/Admin/update",
             type:"PUT",
             data:dataTosend,
             contentType:"application/json",
             datatype : "json",
     
             success:function(respuesta){
     
                 $("#resultado").empty();
                 $("#id").val("");
                 $("#emailAdmin").val("");
                 $("#passwordAdmin").val("");
                 $("#nameAdmin").val("");
                 obtenerRegistrosAdmin();
                 alert("se ha Actualizado correctamente el Administrador")
             },
     
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 alert("No se actualizo correctamente");
             }
     
     
         });
     
     
     }
     
     function eliminarRegistroAdmin(idElemento){
     
         var elemento ={
     
             idAdmin:idElemento
     
         }
     
         var dataTosend=JSON.stringify(elemento);
     
         $.ajax({
     
             url: "http://129.151.119.30:80/api/Admin/" + idElemento,
             type:"DELETE",
             contentType:"application/JSON",
             datatype:"JSON",
     
             success:function(response){
     
                 $("#resultado").empty;
                 alert("Se ha eliminado la Gama exitosamente");
     
             },
             
             error: function(jqXHR,textStatus,errorThrown){
                 
                 window.location.reload()
                 obtenerRegistrosAdmin();
                 alert("No se elimino el registro correctamente");
             }
         });
     
     
     }