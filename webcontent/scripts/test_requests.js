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
});
