//==============================================
//============== Date Picker ===================
$(function() {
    $( "#date_naissance" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '-100y:c+nn',
        maxDate: '-1d'
    });
});

//==============================================
//=========== Controle du formulaire ===========
//==============================================
$(document).ready(function(){
    $.validator.addClassRules({
        checkphone:{
            required: true,
            phoneFrOnly: true
        },
        checkname:{
            required: true,
            lettres: true,
            minlength: 2
        },
        checkdate:{
            required: true,
            dateNaiss: true
        }
    });
    
    $("#myForm").validate({
         errorPlacement: function(error, element) {
            error.insertAfter(element);
            error.css({
                left:element.offset().left+15,
                top:element.offset().top-element.height()*2,
                "box-shadow": 'red 1px 1px 5px'
            });
         }
    });
});

//==============================================
//=========== controle de la date ==============
jQuery.validator.addMethod("dateNaiss", function(value, element) {
        return this.optional(element) || 
        /^(((0[1-9])|(1\d)|(2\d)|(3[0-1]))\/((0[1-9])|(1[0-2]))\/(\d{4})(((([[:space:]]?)(([0-1][0-9])|([2][0-3]))(:[0-5][0-9]))((:[0-5][0-9])?))?))$/i.test(value);
    }, "Saisir une date valide"
);

//==============================================
//======= controle des noms et prenoms =========
jQuery.validator.addMethod("lettres", function(value, element) {
        return this.optional(element) || /^([a-zA-Z])+$/i.test(value);
    }, "Saisir uniquement des lettres"
);

//==============================================
//===== controle de numero de telephone ========
$(document).ready(function(){
       $.validator.addMethod("phoneFrOnly", function(value, element) {
           return this.optional(element) || /^0[1-68]([-. ]?[0-9]{2}){4}$/i.test(value);
       }, "Saisir un num&eacute;ro de t&eacute;l&eacute;phone valide");
    
       $("#regForm").validate();
});


jQuery.extend(jQuery.validator.messages, {
    equalTo: "Saisir des mots de passe identiques",
    lettersonly: "Saisir uniquement des lettres"
});


//==============================================
//================== Webservice ================
//==============================================

//==============================le webservice ne fonctionne pas, le serveur doit etre mal configuré====================
function request(callback) {
    var currentValue =  document.getElementById("mot_de_pass").value;
    
    $.ajax( {
        type: "GET",
        url:"http://www.cyril-minette.net/iut/javascript/projet/webservice/checkpwd.php?pwd="+currentValue,
        dataType: "xml",
        success: successWebservice,
        error: errorWebservice                  //webservice ne fonctionne pas
    });
}

function successWebservice(oData){
    alert("ok");
    //var nodes = oData.getElementsByTagName("score");
    //var force = nodes[0].childNodes[0].nodeValue;
    //alert(force);
}

function errorWebservice(){
    alert("erreur webservice");
}

function evalPwd(s){
    document.getElementById('passStrength').className = "visible";
    var cmpx = 0;
    
    if (s.length >= 4){
        cmpx++;
        
        if (s.search("[A-Z]") != -1){
            cmpx++;
        }
        if (s.search("[0-9]") != -1){
            cmpx++;
        }
        if (s.length >= 8 || s.search("[\x20-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]") != -1){
            cmpx++;
        }
    }
    
    if (cmpx == 0){
        document.getElementById("weak").className = "nrm";
        document.getElementById("medium").className = "nrm";
        document.getElementById("strong").className = "nrm";
    }
    else if (cmpx == 1){
        document.getElementById("weak").className = "red";
        document.getElementById("medium").className = "nrm";
        document.getElementById("strong").className = "nrm";
    }
    else if (cmpx == 2){
        document.getElementById("weak").className = "yellow";
        document.getElementById("medium").className = "yellow";
        document.getElementById("strong").className = "nrm";
    }
    else{
        document.getElementById("weak").className = "green";
        document.getElementById("medium").className = "green";
        document.getElementById("strong").className = "green";
    }
}


//==============================================
//=========== Affichage resultats ==============
//==============================================
function getUrlVars() {
    var vars = {};    
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function printUrlVars() {
    var vars = getUrlVars();
    for (var key in vars ) {
        document.write("<tr><td>" + decodeURIComponent(key) + "</td><td>" 
            + decodeURIComponent(vars[key]).replace(/\+/g, " ") + "</td></tr>")
    }
}
	