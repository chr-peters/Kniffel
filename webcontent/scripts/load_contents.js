$(function(){
    // first load the content of the starting page
    loadContent('contents/starting_page.html');

    // now add the handlers for each navigation element
    $('#nav_startpage').click(function() {
	loadContent('contents/starting_page.html');
    });

    $('#nav_newgame').click(function() {
	loadContent('contents/start_game.html');
    });

    $('#nav_highscores').click(function() {
	loadContent('contents/highscores.html');
    });

    $('#nav_login').click(function() {
	loadContent('contents/login.html');
    });

    $('#nav_register').click(function() {
	loadContent('contents/register.html');
    });

    function loadContent(url) {
	// load the url and place it in the content div
	$.get(url, function(data) {
	    // place the data into the div
	    $('#content').empty().append(data);
	});
	
    }
});
