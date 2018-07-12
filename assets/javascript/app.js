
										
	var topics = ["Captain America", "Iron Man", "Antman", "Black Widow", "Thor", "Black Panther"];
	var inputSuperhero = '';
	var theUrl= '';
	for(var i = 0; i < topics.length;i++) {
		var button = $('<button>').attr('id', 'superheroButton').attr('class',' btn btn-danger');
		button.text(topics[i]);
		$('.buttonSection').append(button);
	}	
	// when clicking the submit button, 
	// create a button with the input as the innerText of the button
	$('#submit').on('click',function() {
		event.preventDefault();	
		var button = $('<button>').attr('id', 'superheroButton').attr('class','btn btn-danger');
		inputSuperhero = $('#userInput').val();
		
		topics.push(inputSuperhero);
		button.text(inputSuperhero);
		$('.buttonSection').append(button);
	})	
	$(document).on('click', '#superheroButton',function() {
		$('.gifs').text('');
		var theSuperhero 	= $(this).text();
		theUrl 			= 'https://api.giphy.com/v1/gifs/search?q='+ theSuperhero +'&api_key=ZMYnTWx0YMWCbDSnopxjDimPTtTEjpTK&limit=5';
		$.ajax({url: theUrl}).then(function(res){
			for(var i = 0; i < res.data.length; i++){
				var div	= $('<div>');
				var p = $('<p>').text('Rated: ' + res.data[i].rating);
				var image = $('<img>').attr('id', 'superheroImage');
				var gifUrlStill= res.data[i].images.original_still.url;
				var gifUrlAnimation	= res.data[i].images.original.url;
				image.attr('src',gifUrlStill).attr('gifCondition', 'still').attr('gifStill', gifUrlStill).attr('gifUrlAnimation',gifUrlAnimation);
				$('.gifs').append(div.append(p,image));
			}
		})
	})
	$(document).on('click', '#superheroImage',function() {
		var condition = $(this).attr('gifCondition');
		var still= $(this).attr('gifStill');
		var animation = $(this).attr('gifUrlAnimation');
		if(condition == 'still') {
			$(this).attr('src', animation);
			$(this).attr('gifCondition', 'animation');
		} 
		else if(condition == 'animation') {
			$(this).attr('src', still);
			$(this).attr('gifCondition', 'still');
		}
	})
