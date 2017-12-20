$(function() {
    $('#btn_reg_submit').click(function() {
        var email = $('#reg_mail').val();
        var name = $('#reg_name').val();
        var pw = $('#reg_pw').val();

        // Create json to send
        var user =  JSON.stringify({email: email, name: name, pw: pw});
        
        // send the json
        $.ajax({
            url: 'register.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: user,
            timeout: 5000,
            async: false,
            success: function(response) {
                alert('Es hat geklappt! Der Token lautet: '+response.token);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert('Ein Fehler ist aufgetreten! Error Code: '+thrownError);
            }
        });
    });

    $('#btn_login_submit').click(function() {
        var name = $('#login_name').val();
        var pw = $('#login_pw').val();

        // Create json to send
        var user =  JSON.stringify({name: name, pw: pw});
        
        // send the json
        $.ajax({
            url: 'login.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: user,
            timeout: 5000,
            async: false,
            success: function(response) {
                alert('Es hat geklappt! Der Token lautet: '+response.token);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert('Ein Fehler ist aufgetreten! Error Code: '+thrownError);
            }
        });
    });

    // retrieve the highscores
    getAllScores(10, 0);

    // returns the servers response to a request of all scores
    function getAllScores(limit, offset) {
	// create the json for the request
	var request = JSON.stringify({limit: limit, offset: offset});

	// perform the ajax call
	$.ajax({
            url: 'scores.php',
            type: 'GET',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: request,
            async: true,
            success: function(response) {
		// place the servers response in the designated div
		$('#score_ranking').html(JSON.stringify(response));
            },
            error: function(xhr, ajaxOptions, thrownError) {
		// it did not work, just return an error message
                $('#score_ranking').html('Ein Fehler ist aufgetreten!<br>'+
					 'Error Code: '+thrownError+'<br>'+
					 'xhr: '+xhr+'<br>'+
					 'axajOptions: '+ajaxOptions);
            }
        });
    }
});
