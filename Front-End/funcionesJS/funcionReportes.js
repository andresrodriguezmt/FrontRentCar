function obtenerReporteStatus(){

    $.ajax({

        url:"http://129.151.119.30:8081/api/Reservation/report-status",
        type:"GET",
        dataType:"JSON",

        success:function(respuesta){

            console.log(respuesta);
            pintarReporteStatus(respuesta);
        },

        error: function(jqXHR,textStatus,errorThrown){
        
        },


    });


}

function pintarReporteStatus(respuesta){

    var myTable ="<table>";

    
        myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    

    myTable+="</table>";

    $("#registrosStatus").html(myTable);

}

/**
 * 
 */


function  obtenerReporteClientes(){

    $.ajax({
        url:"http://129.151.119.30:8081/api/Reservation/report-clients",
        type:"GET",
        dataType:"JSON",

        success:function(respuesta){

            console.log(respuesta)
            pintarReporteClientes(respuesta)
        },

        error: function(jqXHR,textStatus,errorThrown){
        
        },
    });
}

function pintarReporteClientes(respuesta){

    let myTable ="<table>";
        

    
        for(i = 0 ; i < respuesta.length ; i++){
                myTable+="<tr>";
                
                    myTable+="<td>" +respuesta[i].total +"</td>"; 
                    myTable+="<td>" + respuesta[i].client.name +"</td>";
                    myTable+="<td>"+ respuesta[i].client.email +"</th>";
                    myTable+="<td>" + respuesta[i].client.age +"</td>";
            
            myTable+="</tr>";
        }

        myTable+="</Table>";

        $("#registrosClientes").html(myTable);


}

function obtenerReporteDate(){

    var fechaInicio = document.getElementById("startDate").value;
    var fechaCierre = document.getElementById("devolutionDate").value;

    $.ajax({


        url:"http://129.151.119.30:8081/api/Reservation/report-dates/"+ fechaInicio +"/"+ fechaCierre,
        type:"GET",
        dataType:"JSON",

        success:function(respuesta){

            console.log(respuesta);
            pintarReporteDate(respuesta);

        },

        error: function(jqXHR,textStatus,errorThrown){
        
        },
        

    });


}

function pintarReporteDate(respuesta){

    var myTable="<table>";

        for(i = 0 ; i < respuesta.length ; i++){

            myTable+="<tr>";
            myTable+="<td>" +respuesta[i].startDate +"</td>"; 
            myTable+="<td>" + respuesta[i].devolutionDate +"</td>";
            myTable+="<td>"+ respuesta[i].status +"</th>";
            
            myTable+="</tr>";
        }

        myTable+="</Table>";

        $("#registrosFechas").html(myTable);


}