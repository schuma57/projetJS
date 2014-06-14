//==============================================
//============== Date Picker ===================
$(function() {
    $( "#datepicker" ).datepicker({
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
            PhoneFrOnly: true
        },
        checkname:{
            required: true,
            lettres: true
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
                left:element.offset().left+element.width()/2,
                top:element.offset().top-element.height(),
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
       $.validator.addMethod("PhoneFrOnly", function(value, element) {
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
/*
function getXMLHttpRequest() {                  // gère les anciens navigateurs
    var xhr = null;
    
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    
    return xhr;
}*/

function request(callback) {                    // gère la requête au webservice
    //var currentValue =  document.getElementById("mdp").value;
    /*var xhr = getXMLHttpRequest();
    var url = "http://www.cyril-minette.net/iut/javascript/projet/webservice/checkpwd.php?pwd="+currentValue+"";
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseXML);
        }
    };
    
    xhr.open("GET", url, true);
    xhr.send(null);
    */
    $.ajax( {
        type: "GET",
        url:"http://www.cyril-minette.net/iut/javascript/projet/webservice/checkpwd.php?pwd=toto",
        dataType: "xml",
        success:testPass,
        error:errorFalse
    });
}

function testPass(oData){
    alert("ok");
    //var nodes = oData.getElementsByTagName("score");
    //var force = nodes[0].childNodes[0].nodeValue;
    //alert(force);
}

function errorFalse(){
    alert("erreur webservice");
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
        document.write("<tr><td>" + decodeURIComponent(key) + "</td><td>" + decodeURIComponent(vars[key]).replace(/\+/g, " ") + "</td></tr>")
    }
}

	