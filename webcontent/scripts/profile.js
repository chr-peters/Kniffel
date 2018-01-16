$(function () {
    $('#btn_save_profile').unbind().click(function (e) {
        var text = $('#own_profile').val();
        var token = Cookies.get('token');

        // Create json to send
        var profile = JSON.stringify({profile: text, token: token});
        // send the json
        $.ajax({
            url: 'profile.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: profile,
            success: function (response) {
                // test if the response was successful
                if (response.status === 0) {
                    refresh();
                    // and load the profile page
                    loadContent('contents/profile.html');
                }
                if (response.status === 1) {
                    // set the error message
                    var error_msg = "Das Speichern war nicht erfolgreich. Bitte versuchen sie es später noch einmal.";
                    $('#error_msg').empty().append(error_msg);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // set the error message
                var error_msg = "Das Speichern ist leider zur Zeit nicht möglich.";
                $('#error_msg').empty().append(error_msg);
            }
        });

        // prevent site from reloading
        e.preventDefault();
    });
    $('#btn_request_profile').unbind().click(function (e) {
        var name = $('#search_profile').val();

        // Create json to send
        var profile = JSON.stringify({searchFor: name});

        // send the json
        $.ajax({
            url: 'profile.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: profile,
            success: function (response) {
                // test if the response was successful
                if (response.status === 0) {
                    $('#error_msg').empty();
                    $('#other_profile').empty().append(response.text)
                }
                if (response.status === 2) {
                    // set the error message
                    var error_msg = "Nutzername nicht gefunden";
                    $('#other_profile').empty();
                    $('#error_msg').empty().append(error_msg);
                }
                if (response.status === 1) {
                    // set the error message
                    var error_msg = "Das Suchen war nicht erfolgreich. Bitte versuchen sie es später noch einmal.";
                    $('#error_msg').empty().append(error_msg);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // set the error message
                var error_msg = "Das Suchen ist leider zur Zeit nicht möglich.";
                $('#error_msg').empty().append(error_msg);
            }
        });

        // prevent site from reloading
        e.preventDefault();
    });

    $('#own_profile').unbind().ready(function (e) {
        var token = Cookies.get('token');

        // Create json to send
        var profile = JSON.stringify({token: token});
        // send the json
        $.ajax({
            url: 'profile.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: profile,
            success: function (response) {
                // test if the response was successful
                if (response.status === 0) {
                    $('#own_profile').empty().append(response.text)
                    // refresh();
                    // // and load the profile page
                    // loadContent('contents/profile.html');
                }
                if (response.status === 1) {
                    // set the error message
                    var error_msg = "Das Speichern war nicht erfolgreich. Bitte versuchen sie es später noch einmal.";
                    $('#error_msg').empty().append(error_msg);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // set the error message
                var error_msg = "Das Speichern ist leider zur Zeit nicht möglich.";
                $('#error_msg').empty().append(error_msg);
            }
        });
    });
});
