$(function() {
    var limit = 10;
    var offset = 0;

    getScores(limit, offset);

    $('#btn_zurueck').click(function() {
        offset = offset-10>=0 ? offset-10 : 0;
        getScores(limit, offset);
        while(offset>0 && $('#score_ranking').html==="") {
            offset = offset-10>=0 ? offset-10 : 0;
            getScores(limit, offset);
        }
    });

    $('#btn_vor').click(function() {
        offset += 10;
        getScores(limit, offset);
        while(offset>0 && $('#score_ranking').html==="") {
            offset = offset-10>=0 ? offset-10 : 0;
            getScores(limit, offset);
        }
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
            dataType: 'application/json',
            data: request,
            success: function(response) {
                if(JSON.stringify(response.records)==='null') {
                    $('#score_ranking').html("");
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
