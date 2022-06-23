$(document).foundation();

$(".fieldset").hide().fadeIn(1000); 
$(".email, .submit-button").hide().fadeIn(2500); 

$( ".close-button" ).click(function() {
  $( ".fieldset" ).fadeOut( "slow", function() { });
});
$(document).ready(function(){
	$(".submit-button").click(function(){
		return "Thanks for Subscribing!";
	});
	$(".submit-button").click(function(event){
		$("h2").html(event.result);
	});  
});