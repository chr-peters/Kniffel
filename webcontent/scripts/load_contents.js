$(function(){
    // first load the content of the starting page
    loadContent('contents/starting_page.html');

    // now refresh the page
    refresh();
});

/**
* adds the corresponding handlers for the navigation
*/
function refreshNav() {
    // now add the handlers for each navigation element
    $('#nav_startpage').unbind().click(function() {
	loadContent('contents/starting_page.html');
    });

    $('#nav_newgame a').unbind().click(function() {
	loadContent('contents/start_game.html');
    });

    $('#nav_highscores a').unbind().click(function() {
	loadContent('contents/highscores.html');
    });

    $('#nav_login a').unbind().click(function() {
	loadContent('contents/login.html');
    });

    $('#nav_register a').unbind().click(function() {
	loadContent('contents/register.html');
    });

    $('#nav_profile a').unbind().click(function() {
	loadContent('contents/profile.html');
    });

    $('#nav_logout a').unbind().click(function() {
	removeCookies();
	loadContent('contents/starting_page.html');
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
