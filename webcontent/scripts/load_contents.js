$(function(){
    // refresh the page
    refresh();
    
    // first load the content of the starting page
    loadContent('contents/starting_page.html');

    // now build up the navigation functionality
    refreshNav();
});

/**
* adds the corresponding handlers for the navigation
*/
function refreshNav() {
    // now add the handlers for each navigation element
    $('#nav_startpage').click(function() {
	loadContent('contents/starting_page.html');
    });

    $('#nav_newgame a').click(function() {
	loadContent('contents/start_game.html');
    });

    $('#nav_highscores a').click(function() {
	loadContent('contents/highscores.html');
    });

    $('#nav_login a').click(function() {
	loadContent('contents/login.html');
    });

    $('#nav_register a').click(function() {
	loadContent('contents/register.html');
    });

    $('#nav_profile a').click(function() {
	loadContent('contents/profile.html');
    });

    $('#nav_logout a').click(function() {
	removeCookies();
	refresh();
    });
}

/**
* Performs the loading of content into the content element
*/
function loadContent(url) {
    // load the url and place it in the content div
    $.get(url, function(data) {
	// place the data into the div
	$('#content').empty().append(data);
    });
}
