
$(function() {
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '-100y:c+nn',
        maxDate: '-1d'
    });
});

 
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
    $("#myForm").validate();
});



//controle de la date
jQuery.validator.addMethod("dateNaiss", function(value, element) {
        return this.optional(element) || 
        /^(((0[1-9])|(1\d)|(2\d)|(3[0-1]))\/((0[1-9])|(1[0-2]))\/(\d{4})(((([[:space:]]?)(([0-1][0-9])|([2][0-3]))(:[0-5][0-9]))((:[0-5][0-9])?))?))$/i.test(value);
    }, "Saisir une date valide"
);

//controle des noms et prenoms
jQuery.validator.addMethod("lettres", function(value, element) {
        return this.optional(element) || /^([a-zA-Z])+$/i.test(value);
    }, "Saisir uniquement des lettres"
);

//controle de numero de telephone
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
		document.write("<li>" + decodeURIComponent(key) + " : " + decodeURIComponent(vars[key]).replace(/\+/g, " ") + "</li>")
    }
}

	