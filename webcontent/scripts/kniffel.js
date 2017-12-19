$(function() {
    var bonus = $('#block tr').filter(function(index) {
        return index==7;
    });
    var oben = $('#block tr').filter(function(index) {
        return index==8;
    });
    var unten = $('#block tr').filter(function(index) {
        return index==16;
    });
    var gesamt = $('#block tr').filter(function(index) {
        return index==17;
    });

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
        for(var i=1; i<=5; i++) {
            $('#wuerfel'+i).prop('readonly', false);
            $('#wuerfel'+i).prop('alt', getRandom());
        }
    }

    function getValues() {
        var values = [0, 0, 0, 0, 0, 0];
        for(var i=1; i<=5; i++) {
            values[$('#wuerfel'+i).prop('alt')-1]++;
        }
        return values;
    }

    //set up game
    $('#btn_start_game').click(function() {
        $('#block td').each(function() {
            $(this).html("");
        });
        oben.find('td').html(0);
        unten.find('td').html(0);
        gesamt.find('td').html(0);
        reset();
    });

    $('#wuerfel1').click(function() {
        $(this).prop('readonly', !$(this).prop('readonly'));
    });

    $('#wuerfel2').click(function() {
        $(this).prop('readonly', !$(this).prop('readonly'));
    });

    $('#wuerfel3').click(function() {
        $(this).prop('readonly', !$(this).prop('readonly'));
    });

    $('#wuerfel4').click(function() {
        $(this).prop('readonly', !$(this).prop('readonly'));
    });

    $('#wuerfel5').click(function() {
        $(this).prop('readonly', !$(this).prop('readonly'));
    });

    $('#btn_wuerfeln').click(function() {
        var count = getCount();
        for(var i=1; i<=5; i++) {
            //if not marked reroll dice
            if(!$('#wuerfel'+i).prop('readonly')) {
                $('#wuerfel'+i).prop('alt', getRandom());
            } else {
                $('#wuerfel'+i).prop('readonly', false);
            }
        }
        //disable button after three rolls
        if(count==3) {
            $(this).prop('disabled', true);
        }
    });

    $('#block tr').click(function() {
        var eingetragen = false;
        switch($(this).index()) {
            //1en
            case 1: if($(this).find('td').html()!="") {
                        break;
                    }
                    $(this).find('td').html(getValues()[0]*1);
                    oben.find('td').html(parseInt(oben.find('td').html())+parseInt($(this).find('td').html()));
                    eingetragen = true;
                    break;
            //2en
            case 2: if($(this).find('td').html()!="") {
                        break;
                    }
                    $(this).find('td').html(getValues()[1]*2);
                    oben.find('td').html(parseInt(oben.find('td').html())+parseInt($(this).find('td').html()));
                    eingetragen = true;
                    break;
            //3en
            case 3: if($(this).find('td').html()!="") {
                        break;
                    }
                    $(this).find('td').html(getValues()[2]*3);
                    oben.find('td').html(parseInt(oben.find('td').html())+parseInt($(this).find('td').html()));
                    eingetragen = true;
                    break;
            //4en
            case 4: if($(this).find('td').html()!="") {
                        break;
                    }
                    $(this).find('td').html(getValues()[3]*4);
                    oben.find('td').html(parseInt(oben.find('td').html())+parseInt($(this).find('td').html()));
                    eingetragen = true;
                    break;
            //5en
            case 5: if($(this).find('td').html()!="") {
                        break;
                    }
                    $(this).find('td').html(getValues()[4]*5);
                    oben.find('td').html(parseInt(oben.find('td').html())+parseInt($(this).find('td').html()));
                    eingetragen = true;
                    break;
            //6en
            case 6: if($(this).find('td').html()!="") {
                        break;
                    }
                    $(this).find('td').html(getValues()[5]*6);
                    oben.find('td').html(parseInt(oben.find('td').html())+parseInt($(this).find('td').html()));
                    eingetragen = true;
                    break;
            //Dreierpasch
            case 9: if($(this).find('td').html()!="") {
                        break;
                    }
                    if(getValues().some(function(value) {
                        return value>=3;
                    })) {
                        var values = getValues();
                        $(this).find('td').html(1*values[0]+2*values[1]+3*values[2]+4*values[3]+5*values[4]+6*values[5]);
                    } else {
                        $(this).find('td').html(0);
                    }
                    unten.find('td').html(parseInt(unten.find('td').html())+parseInt($(this).find('td').html()));
                    eingetragen = true;
                    break;
            //Viererpasch
            case 10: if($(this).find('td').html()!="") {
                         break;
                     }
                     if(getValues().some(function(value) {
                         return value>=4;
                     })) {
                         var values = getValues();
                         $(this).find('td').html(1*values[0]+2*values[1]+3*values[2]+4*values[3]+5*values[4]+6*values[5]);
                     } else {
                         $(this).find('td').html(0);
                     }
                     unten.find('td').html(parseInt(unten.find('td').html())+parseInt($(this).find('td').html()));
                     eingetragen = true;
                     break;
            //Full House
            case 11: if($(this).find('td').html()!="") {
                         break;
                     }
                     if(getValues().some(function(value) {
                         return value==2;
                     }) && getValues().some(function(value) {
                         return value==3;
                     })) {
                         $(this).find('td').html(25);
                     } else {
                         $(this).find('td').html(0);
                     }
                     unten.find('td').html(parseInt(unten.find('td').html())+parseInt($(this).find('td').html()));
                     eingetragen = true;
                     break;
            //Kleine Strasse
            case 12: if($(this).find('td').html()!="") {
                         break;
                     }
                     var values = getValues();
                     if((values[0]>=1 && values[1]>=1 && values[2]>=1 && values[3]>=1) || (values[1]>=1 && values[2]>=1 &&
                        values[3]>=1 && values[4]>=1) || (values[2]>=1 && values[3]>=1 && values[4]>=1 && values[5]>=1)) {
                         $(this).find('td').html(30);
                     } else {
                         $(this).find('td').html(0);
                     }
                     unten.find('td').html(parseInt(unten.find('td').html())+parseInt($(this).find('td').html()));
                     eingetragen = true;
                     break;
            //Grosse Strasse
            case 13: if($(this).find('td').html()!="") {
                         break;
                     }
                     if(!getValues().some(function(value) {
                         return value>1;
                     })) {
                         $(this).find('td').html(40);
                     } else {
                         $(this).find('td').html(0);
                     }
                     unten.find('td').html(parseInt(unten.find('td').html())+parseInt($(this).find('td').html()));
                     eingetragen = true;
                     break;
            //Kniffel
            case 14: if(parseInt($(this).find('td').html())==0) {
                         break;
                     }
                     var alt = 0;
                     if(getValues().some(function(value) {
                         return value==5;
                     })) {
                         if($(this).find('td').html()=="") {
                             $(this).find('td').html(50);
                         } else {
                             alt = parseInt($(this).find('td').html());
                             $(this).find('td').html(parseInt($(this).find('td').html())+50);
                         }
                     } else {
                         if($(this).find('td').html()=="") {
                             $(this).find('td').html(0);
                         } else {
                             break;
                         }
                     }
                     unten.find('td').html(parseInt(unten.find('td').html())+parseInt($(this).find('td').html())-alt);
                     eingetragen = true;
                     break;
            //Chance
            case 15: if($(this).find('td').html()!="") {
                         break;
                     }
                     var values = getValues();
                     $(this).find('td').html(1*values[0]+2*values[1]+3*values[2]+4*values[3]+5*values[4]+6*values[5]);
                     unten.find('td').html(parseInt(unten.find('td').html())+parseInt($(this).find('td').html()));
                     eingetragen = true;
                     break;
        }
        if(bonus.find('td').html()=="" && oben.find('td').html()>62) {
            bonus.find('td').html(35);
            oben.find('td').html(parseInt(oben.find('td').html())+35);
        }
        gesamt.find('td').html(parseInt(oben.find('td').html())+parseInt(unten.find('td').html()));
        var ende = false;
        $('#block tr').each(function() {
            if(eingetragen && !ende && $(this).find('td').html()=="" && $(this).html()!=bonus.html()) {
                reset();
                ende = true;
            }
        });
    });
});
