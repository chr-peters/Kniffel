$(function() {
    var wuerfel;
    var tabelle;
    var belegt;

    //count the number of dice rolls
    var getCount = (function() {
        var counter = 1;
        return function(reset) {
            if(reset) {
                counter = 1;
            } else {
                counter++;
            }
            return counter;
        };
    })();

    //random number between 1 and 6
    function getRandom() {
        return Math.floor(Math.random()*6)+1;
    }

    //reset dice for new player attempt
    function reset() {
        $('#btn_wuerfeln').prop('disabled', false);
        getCount(true);
        for(var i=0; i<5; i++) {
            wuerfel[i] = getRandom();
            $('#wuerfel'+i).removeClass('chosen');
            $('#wuerfel'+i).prop('src', 'img/wuerfel_'+wuerfel[i]+'.png');
            $('#wuerfel'+i).prop('alt', wuerfel[i]);
        }
    }

    //get dice values
    function getValues() {
        var values = [0, 0, 0, 0, 0, 0];
        for(var i=0; i<5; i++) {
            values[wuerfel[i]-1]++;
        }
        return values;
    }

    //set up game
    function setupGame() {
        wuerfel = [0, 0, 0, 0, 0];
        tabelle = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        belegt = [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true];
        $('#block td').each(function() {
            $(this).html("");
        });
        reset();
    }

    $('#wuerfel0').click(function() {
        $(this).toggleClass('chosen');
        if($(this).hasClass('chosen')) {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[0]+'_disabled.png');
        } else {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[0]+'.png');
        }
    });

    $('#wuerfel1').click(function() {
        $(this).toggleClass('chosen');
        if($(this).hasClass('chosen')) {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[1]+'_disabled.png');
        } else {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[1]+'.png');
        }
    });

    $('#wuerfel2').click(function() {
        $(this).toggleClass('chosen');
        if($(this).hasClass('chosen')) {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[2]+'_disabled.png');
        } else {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[2]+'.png');
        }
    });

    $('#wuerfel3').click(function() {
        $(this).toggleClass('chosen');
        if($(this).hasClass('chosen')) {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[3]+'_disabled.png');
        } else {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[3]+'.png');
        }
    });

    $('#wuerfel4').click(function() {
        $(this).toggleClass('chosen');
        if($(this).hasClass('chosen')) {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[4]+'_disabled.png');
        } else {
            $(this).prop('src', 'img/wuerfel_'+wuerfel[4]+'.png');
        }
    });

    $('#btn_wuerfeln').click(function() {
        var count = getCount();
        for(var i=0; i<5; i++) {
            //if not marked -> reroll dice
            if(!$('#wuerfel'+i).hasClass('chosen')) {
                wuerfel[i] = getRandom();
                $('#wuerfel'+i).prop('src', 'img/wuerfel_'+wuerfel[i]+'.png');
                $('#wuerfel'+i).prop('alt', wuerfel[i]);
            } else {
                $('#wuerfel'+i).removeClass('chosen');
                $('#wuerfel'+i).prop('src', 'img/wuerfel_'+wuerfel[i]+'.png');
            }
        }
        //disable button after three rolls
        if(count==3) {
            $(this).prop('disabled', true);
        }
    });

    $('#block tr').click(function() {
        var eingetragen = false;
        $('#block tr').each(function() {
            $(this).removeClass('selected');
        });
        $(this).addClass('selected');
        switch($(this).index()) {
            //1en
            case 1: if(belegt[0]) {
                        break;
                    }
                    tabelle[0] = 1*getValues()[0];
                    belegt[0] = true;
                    eingetragen = true;
                    break;
            //2en
            case 2: if(belegt[1]) {
                        break;
                    }
                    tabelle[1] = 2*getValues()[1];
                    belegt[1] = true;
                    eingetragen = true;
                    break;
            //3en
            case 3: if(belegt[2]) {
                        break;
                    }
                    tabelle[2] = 3*getValues()[2];
                    belegt[2] = true;
                    eingetragen = true;
                    break;
            //4en
            case 4: if(belegt[3]) {
                        break;
                    }
                    tabelle[3] = 4*getValues()[3];
                    belegt[3] = true;
                    eingetragen = true;
                    break;
            //5en
            case 5: if(belegt[4]) {
                        break;
                    }
                    tabelle[4] = 5*getValues()[4];
                    belegt[4] = true;
                    eingetragen = true;
                    break;
            //6en
            case 6: if(belegt[5]) {
                        break;
                    }
                    tabelle[5] = 6*getValues()[5];
                    belegt[5] = true;
                    eingetragen = true;
                    break;
            //Dreierpasch
            case 9: if(belegt[8]) {
                        break;
                    }
                    if(getValues().some(function(value) {
                        return value>=3;
                    })) {
                        var values = getValues();
                        tabelle[8] = 1*values[0]+2*values[1]+3*values[2]+4*values[3]+5*values[4]+6*values[5];
                    }
                    belegt[8] = true;
                    eingetragen = true;
                    break;
            //Viererpasch
            case 10: if(belegt[9]) {
                         break;
                     }
                     if(getValues().some(function(value) {
                         return value>=4;
                     })) {
                         var values = getValues();
                         tabelle[9] = 1*values[0]+2*values[1]+3*values[2]+4*values[3]+5*values[4]+6*values[5];
                     }
                     belegt[9] = true;
                     eingetragen = true;
                     break;
            //Full House
            case 11: if(belegt[10]) {
                         break;
                     }
                     if(getValues().some(function(value) {
                         return value==2;
                     }) && getValues().some(function(value) {
                         return value==3;
                     })) {
                         tabelle[10] = 25;
                     }
                     belegt[10] = true;
                     eingetragen = true;
                     break;
            //Kleine Strasse
            case 12: if(belegt[11]) {
                         break;
                     }
                     var values = getValues();
                     if((values[0]>=1 && values[1]>=1 && values[2]>=1 && values[3]>=1) || (values[1]>=1 && values[2]>=1 &&
                        values[3]>=1 && values[4]>=1) || (values[2]>=1 && values[3]>=1 && values[4]>=1 && values[5]>=1)) {
                         tabelle[11] = 30;
                     }
                     belegt[11] = true;
                     eingetragen = true;
                     break;
            //Grosse Strasse
            case 13: if(belegt[12]) {
                         break;
                     }
                     if(!getValues().some(function(value) {
                         return value>1;
                     })) {
                         tabelle[12] = 40;
                     }
                     belegt[12] = true;
                     eingetragen = true;
                     break;
            //Kniffel
            case 14: if(belegt[13] && tabelle[13]==0) {
                         break;
                     }
                     if(getValues().some(function(value) {
                         return value==5;
                     })) {
                         tabelle[13] += 50;
                     } else {
                         if(belegt[13]) {
                             break;
                         }
                     }
                     belegt[13] = true;
                     eingetragen = true;
                     break;
            //Chance
            case 15: if(belegt[14]) {
                         break;
                     }
                     var values = getValues();
                     tabelle[14] = 1*values[0]+2*values[1]+3*values[2]+4*values[3]+5*values[4]+6*values[5];
                     belegt[14] = true;
                     eingetragen = true;
                     break;
        }
        //check if anything changed
        if(eingetragen) {
            //calculate upper sum
            tabelle[7] = tabelle[0]+tabelle[1]+tabelle[2]+tabelle[3]+tabelle[4]+tabelle[5]+tabelle[6];
            //check for bonus
            if(!belegt[6] && tabelle[7]>62) {
                tabelle[6] = 35;
                belegt[6] = true;
                tabelle[7] += tabelle[6];
            }
            //calculate lower sum
            tabelle[15] = tabelle[8]+tabelle[9]+tabelle[10]+tabelle[11]+tabelle[12]+tabelle[13]+tabelle[14];
            //calculate total sum
            tabelle[16] = tabelle[7]+tabelle[15];
            //write values into table and check for end of game
            var ende = true;
            for(var i=0; i<tabelle.length; i++) {
                if(belegt[i]) {
                    $($('#block td').get(i)).html(tabelle[i]);
                } else if(i!=6) {
                    ende = false;
                }
            }
            if(!ende) {
                reset();
            } else {
                $('#btn_wuerfeln').prop('disabled', true);
		if(isLoggedIn()) {
		    var data = JSON.stringify({token: Cookies.get('token'), score: tabelle[16]});
		    $.ajax({
			url: 'scores.php',
			type: 'POST',
			contentType: 'application/json',
			charSet:'utf-8',
			dataType: 'json',
			data: data,
			success: function(response) {
			    if(response.status!==0) {
				var error_msg = "Es konnte keine Verbindung zum Server hergestellt werden.";
				$('#error_msg').empty().append(error_msg);
			    }
			},
			error: function(xhr, ajaxOptions, thrownError) {
			    // set the error message
			    var error_msg = "Es konnte keine Verbindung zum Server hergestellt werden.";
			    $('#error_msg').empty().append(error_msg);
			}
		    });
		}
            }
        }
    });
    setupGame();
});
