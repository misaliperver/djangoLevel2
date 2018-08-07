var responseX;
$(document).ready(function(){
    var token = "ag9zfnRlbGVmb25pLXRlc3RyHwsSElRlbmFudEFwcGxpY2F0aW9ucxiAgICw46OcCQyiARVzdGFnaW5nMS5hbG8tdGVjaC5jb20";
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer' + token;
        
    }
    var cursorx="";
    function searchCall(startTime,finishTime){
        if(cursorx==="")
        cdURL = "http://staging1.alo-tech.com/api/?function=reportsCDRLogs&startdate="+startTime+"&finishdate="+finishTime+"&app_token="+token 
        else
        cdURL = "http://staging1.alo-tech.com/api/?function=reportsCDRLogs&startdate="+startTime+"&finishdate="+finishTime+"&app_token="+token +"&cursor="+cursorx
        $.ajax({
            type: 'GET',
            url: cdURL,
            headers: headers,   
            dataType: "json",
            success: function(response){
                responseX=response.CallList;
                cursorx=response.cursor;
                console.log(cursorx)
                console.log(responseX.length)
                $('#DivCallList').html('');
                
                var len = response.CallList.length;
                var str ="", duration="", datex ="";
                for(var i=0; i<len; i++){
                    str = "";
                    datex=response.CallList[i].calldate;//Date Format
                    datex = datex.substring(8,10)+"/"+datex.substring(5,7)+"/" +datex.substring(0,4) + " " + datex.substring(11,13)+ ":" + datex.substring(14,16)
                    if(response.CallList[i].answered)str="Cevaplandı"; else str="Cevaplanmadı";
                    if(response.CallList[i].duration!=null) duration= "&nbsp;&nbsp;sn: " + response.CallList[i].duration;
                    
                    $('#DivCallList').append("<div onclick='statement(this.id)' data-toggle='modal' data-target='.statementModal' id='card"+ i +"' class='card'>\
                    <div class='card-header'>\
                    <div style='float:left'><i class='fas fa-phone-volume'>Arayan Numara: "+
                        response.CallList[i].callerid +
                    "</i>&nbsp;&nbsp;&nbsp;&nbsp;<i style='color:red' class='fas fa-angle-double-right'></i>&nbsp;&nbsp;&nbsp;&nbsp;<i class='fas fa-phone-volume'>Aranan Numara: "+ 
                        response.CallList[i].called_num +
                    "</i></div><div class='text-right'>"+
                        datex+
                    "</div></div>\
                    <div class='card-body'><p class='card-text'>" +
                        str + duration +
                    "</p></div></div>");           
                }
            }
        })
    }

 

    $('#btnSearch').click(function(){
       //format düzenleme metoduda kullanılabilir. Gerek duymadım.
       var startTime = $('#inputStart').val();
       startTime = startTime.substring(0, 10) + " " + startTime.substring(10 + 1) + ":00";
       var finishTime = $('#inputFinish').val();
       finishTime = finishTime.substring(0, 10) + " " + finishTime.substring(10 + 1) + ":00";        
       searchCall(startTime,finishTime);
    })
});
function statement(id){
    id = id.substring(4,id.length);
    id = parseInt(id);
    $(".modal-content").html('');
    $(".modal-content").append("<div class='container'>\
                                <div class='row'>\
                                <nav class='col-12' aria-label='breadcrumb'>\
                                <ol class='breadcrumb'>\
                                    <li class='breadcrumb-item'><a><strong style='color:#9077FF'><i class='fas fa-clipboard-list'></i> CallList[</strong><i style='color:green'>"+id+"</i><strong style='color:#9077FF'>]</strong></a></li>\
                                    <li class='breadcrumb-item active' aria-current='page'><strong>callid</strong></li>\
                                    <li class='breadcrumb-item active' aria-current='page'>"+responseX[id].callid+"</li>\
                                </ol>\
                                </nav></div>\
                                <div class='row'><div class='col-12 col-sm-3'><strong>Queued</strong>(" +  responseX[id].queued   +"</a>)</div>" + 
                                                "<div class='col-12 col-sm-3'><strong>Answered</strong>(" +  responseX[id].answered   +")</div>" + 
                                                "<div class='col-12 col-sm-3'><strong>Assigned</strong>(" +  responseX[id].assigned   +")</div>" +
                                                "<div class='col-12 col-sm-3'><strong>Abandon</strong>(" +  responseX[id].abandon   +")</div>" +"</div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Queuedate:</strong>" + responseX[id].queuedate +
                                "</div><div class='col-12 col-sm-6'><strong>Calldate:</strong>" +  responseX[id].calldate +"</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Talkdate:</strong> " + responseX[id].talkdate +
                                "</div><div class='col-12 col-sm-6'><strong>Hangupdate:</strong> " +  responseX[id].hangupdate +"</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Waitduration:</strong> " + responseX[id].waitduration +
                                "</div><div class='col-12 col-sm-6'><strong>Duration:</strong> " +  responseX[id].duration +"</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>sl</strong>(" + responseX[id].sl + ")"+ "</div><div class='col-12 col-sm-6'><strong>Shortcall(</strong>" + responseX[id].shortcall +")</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Callerid:</strong> " + responseX[id].callerid +
                                "</div><div class='col-12 col-sm-6'><strong>Called_num:</strong> " +  responseX[id].called_num +"</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Queue:</strong> " + responseX[id].queue + "</div><div class='col-12 col-sm-6'><strong>Around</strong>(" + responseX[id].around + ")" +"</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Agent</strong>(" + responseX[id].agent +")</div>\
                                <div class='col-12 col-sm-6'><strong>Agentid</strong>(" +  responseX[id].agentid +")</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Hold</strong>(" + responseX[id].hold +")</div>\
                                <div class='col-12 col-sm-6'><strong>Holdduration</strong>(" +  responseX[id].holdduration +")</div></div>\
                                <div class='row'><div class='col-12 col-sm-12'><strong>Queuekey:</strong> " + responseX[id].queuekey + "</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Voicemail:</strong> " +  responseX[id].voicemail +"</div>\
                                <div class='col-12 col-sm-6'><strong>Recordingurl:</strong> " + responseX[id].recordingurl + "</div></div>\
                                <div class='row'><div class='col-12 col-sm-6'><strong>Localrelease:</strong> " +  responseX[id].localrelease +"</div>\
                                <div class='col-12 col-sm-6'><strong>Transferred:</strong> " + responseX[id].transferred + "</div></div>\
                                <div class='row'><div class='col-12 col-sm-12'><strong>Answeredby:</strong> " +  responseX[id].answeredby +"</div></div>\
                                </div>");




    
}