$(function() {
    var global_limit = 10;
    var global_offset = 0;

    getScores(global_limit, global_offset);

    $('#btn_zurueck').click(function() {
        global_offset = global_offset-10>=0 ? global_offset-10 : 0;
        getScores(global_limit, global_offset);
    });

    $('#btn_vor').click(function() {
        global_offset += 10;
        getScores(global_limit, global_offset);
    });

    // returns the servers response to a request of limit scores
    function getScores(limit, offset) {
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
            success: function(response) {
                if(JSON.stringify(response.records)==='null') {
                    if(offset===0) {
                        $('#score_ranking').html("");
                    } else {
                        global_offset -= 10;
                    }
                } else {
                    //place the servers response in the designated div
                    $('#score_ranking').html(getTableFromScores(response));
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                // set the error message
                var error_msg = "Es konnte keine Verbindung zum Server hergestellt werden."
                $('#error_msg').empty().append(error_msg);
            }
        });
    }

    // returns a html table from the scores object
    function getTableFromScores(scores) {
        var table = $('<table border="1"></table>');
        var head = $('<tr></tr>');
        head.append('<th>Name</th>');
        head.append('<th>Score</th>');
        head.append('<th>Time</th>');
        table.append(head);
        for(var curEntry in scores.records) {
            var row = $('<tr></tr>');
            row.append('<td>'+scores.records[curEntry].name+'</td>');
            row.append('<td>'+scores.records[curEntry].score+'</td>');
            row.append('<td>'+scores.records[curEntry].time_stamp+'</td>');
            table.append(row)
        }
        return table;
    }
});
