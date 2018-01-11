$(function() {
    $('#btn_login_submit').unbind().click(function(e) {
	var name = $('#login_name').val();
	var pw = $('#login_pw').val();

	// Create json to send
	user = JSON.stringify({name: name, pw: pw});

	// send the json
        $.ajax({
            url: 'login.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: user,
            success: function(response) {
                // test if the response was successful
		if (response.status === 0) {
		    // login worked, so put the cookies
		    putCookies(name, response.token);
		    // and refresh the state of the page
		    refresh();
		    // and load the profile page
		    loadContent('contents/profile.html');
		} else {
		    // set the error message
		    var error_msg = "Das Login war nicht erfolgreich. Bitte prüfen Sie ihre Eingaben.";
		    $('#error_msg').empty().append(error_msg);
		}
            },
            error: function(xhr, ajaxOptions, thrownError) {
                // set the error message
		var error_msg = "Das Login ist leider zur Zeit nicht möglich.";
		$('#error_msg').empty().append(error_msg);
            }
        });

        // prevent site from reloading
        e.preventDefault();
    });
});
