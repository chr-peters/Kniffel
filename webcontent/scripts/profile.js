$(function() {
    $('#btn_save_profile').unbind().click(function(e) {
        var text = $('#own_profile').val();
        var token = Cookies.get('token');

        // Create json to send
        profile = JSON.stringify({profile: text, token:token});

        // send the json
        $.ajax({
            url: 'profile.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: user,
            success: function(response) {
                // test if the response was successful
                if (response.status === 0) {
                    refresh();
                    // and load the profile page
                    loadContent('contents/profile.html');
                } else {
                    // set the error message
                    var error_msg = "Das Speichern war nicht erfolgreich. Bitte versuchen sie es später noch einmal.";
                    $('#error_msg').empty().append(error_msg);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                // set the error message
                var error_msg = "Das Speichern ist leider zur Zeit nicht möglich.";
                $('#error_msg').empty().append(error_msg);
            }
        });

        // prevent site from reloading
        e.preventDefault();
    });
    $('#btn_request_profile').unbind().click(function(e) {
        var text = $('#other_profile').val();

        // Create json to send
        profile = JSON.stringify({profile: text});

        // send the json
        $.ajax({
            url: 'profile.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: user,
            success: function(response) {
                // test if the response was successful
                if (response.status === 0) {
                    refresh();
                    // and load the profile page
                    loadContent('contents/profile.html');
                } else {
                    // set the error message
                    var error_msg = "Das Speichern war nicht erfolgreich. Bitte versuchen sie es später noch einmal.";
                    $('#error_msg').empty().append(error_msg);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                // set the error message
                var error_msg = "Das Speichern ist leider zur Zeit nicht möglich.";
                $('#error_msg').empty().append(error_msg);
            }
        });

        // prevent site from reloading
        e.preventDefault();
    });
});
