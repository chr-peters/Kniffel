$(function () {
    $('#btn_reg_submit').unbind().click(function (e) {
        var email = $('#reg_mail').val();
        var name = $('#reg_name').val();
        var pw = $('#reg_pw').val();

        // Create json to send
        var user = JSON.stringify({email: email, name: name, pw: pw});

        // send the json
        $.ajax({
            url: 'register.php',
            type: 'POST',
            contentType: 'application/json',
            charSet: 'utf-8',
            dataType: 'json',
            data: user,
            success: function (response) {
                // test if the response was successful
                if (response.status === 0) {
                    // registering worked, so put the cookies
                    putCookies(name, response.token);
                    // and refresh the state of the page
                    refresh();
                    // and load the profile page
                    loadContent('contents/profile.html');
                } else {
                    // set the error message
                    var error_msg = "Die Registrierung war nicht erfolgreich. Bitte prüfen Sie ihre Eingaben.";
                    $('#error_msg').empty().append(error_msg);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // set the error message
                var error_msg = "Die Registrierung ist leider zur Zeit nicht möglich:" + xhr + ajaxOptions + thrownError;
                $('#error_msg').empty().append(error_msg);
            }
        });

        // prevent site from reloading
        e.preventDefault();
    });
});
