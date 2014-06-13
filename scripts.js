
$(document).ready(function(){
   $.validator.addClassRules({
        checkinput:{
            required: true
        }
    });
    $("#myForm").validate();
});




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

function AffichePartenaire() {
	var currentValue =  document.getElementById("sitation_familiale").value;
	var div_partenaire = document.getElementById("div_partenaire");
	var newClass ;
	
	if (currentValue == "marie" || currentValue == "pacse" ) {
		newClass = "show" ;
	} else {
		newClass = "hidden" ;
	}

	div_partenaire.className = newClass;
}

function validate() {
	if(!validateInput("civilite") || !validateInput("nom") || !validateInput("prenom") || !validateSituationFamiliale() || !validateInput("adresse") || !validateInput("code_postal") || !validateInput("ville") || !validateInput("email") || !validateInput("telephone") || !validateInput("mot_de_passe") || !validateMdP() || !validateInput("confirmation_mdp") || !validateCheckbox("CGU") ) {	
		return false;
	}
}

function validateMdP() {
	var taille_mdp = document.getElementById("mot_de_passe").value.length;

	if (taille_mdp < 4) {
		alert("Votre mot de passe est trop court!");
		return false;
	}
	if (taille_mdp > 7) {
		alert("Votre mot de passe est trop long!");	
		return false;
	}

	return true; 
}

function validateSituationFamiliale() {
	var situation = document.getElementById("sitation_familiale");

	if (situation == "marie" || situation == "pacse" ) {
		return validateInput("nom_partenaire");
	}
	return true; 
}

function validateCheckbox(selectName){
	if (!document.getElementById(selectName).checked) {
		alert("Le champ " + selectName + " doit être coché !");
		return false;
	}
}

function validateInput(selectName) {	
	var currentValue =  document.getElementById(selectName).value;

	if (currentValue.length < 1) {
		alert("Le champ " + selectName + " ne doit pas être vide !");
		return false;
	}	
	return true;
}

function EvaluateMdp() {
	document.getElementById("messages").className="show";
	var classe_message_court;
	var classe_message_long;

	var taille_mdp = document.getElementById("mot_de_passe").value.length;

	if (taille_mdp < 4) {
		classe_message_court = "faux"; 
	}
	else {
		classe_message_court = "vrai"; 
	}
	if (taille_mdp > 7) {
		classe_message_long = "faux"; 
	}
	else {
		classe_message_long = "vrai"; 
	}

	document.getElementById("court").className=classe_message_court;
	document.getElementById("long").className=classe_message_long;
}

function HideMesssageDiv() {
	document.getElementById("messages").className="hidden";
}

function EvaluateMdp() {
	document.getElementById("messages").className="show";
	var classe_message_court;
	var classe_message_long;

	var taille_mdp = document.getElementById("mot_de_passe").value.length;

	if (taille_mdp < 3) {
		classe_message_court = "faux"; 
	}
	else {
		classe_message_court = "vrai"; 
	}
	if (taille_mdp > 7) {
		classe_message_long = "faux"; 
	}
	else {
		classe_message_long = "vrai"; 
	}

	document.getElementById("court").className=classe_message_court;
	document.getElementById("long").className=classe_message_long;
}

function EvaluateMdpConfirm() {
	document.getElementById("messages").className="show";	
	var mdp = document.getElementById("mot_de_passe").value;
	var confirmation_mdp = document.getElementById("confirmation_mdp").value;
	var newClass ;

	if(mdp != confirmation_mdp) {
		newClass = "show" ;
	} else {
		newClass = "hidden" ;
	}

	document.getElementById("confirmation").className=newClass + " faux" ;
}