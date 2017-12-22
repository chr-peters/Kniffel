/**
* This function receives the username and the token and places
* a cookie for each property.
*/
function putCookies(username, token, expiry=7) {
    Cookies.set('name', username, {expires: expiry});
    Cookies.set('token', token, {expires: expiry});
}

/**
* This functions removes the cookies
*/
function removeCookies() {
    Cookies.remove('name');
    Cookies.remove('token');
}

/**
* Returns true if the user is logged in, otherwise false
*/
function isLoggedIn() {
    // test if both cookies exist
    var cookies = Cookies.get();

    if (cookies.hasOwnProperty('name') && cookies.hasOwnProperty('token')) {
	return true;
    }
    return false;
}

function refresh() {
    // test if the user is logged in
    if (isLoggedIn()) {
	createLogin();
    } else {
	createLogout();
    }
}

var detachedElements = {};

/**
* Restructures everything on the page so that the user is logged in.
*/
function createLogin() {
    // remove the login and register buttons if they are available
    if (!detachedElements.hasOwnProperty("nav_login")) {
	detachedElements["nav_login"] = $('#nav_login').detach();
    }
    if (!detachedElements.hasOwnProperty("nav_register")) {
	detachedElements["nav_register"] = $('#nav_register').detach();
    }
    if (detachedElements.hasOwnProperty("nav_profile")) {
	detachedElements["nav_profile"].appendTo($('#nav ul'));
	delete detachedElements["nav_profile"];
    }
    if (detachedElements.hasOwnProperty("nav_logout")) {
	detachedElements["nav_logout"].appendTo($('#nav ul'));
	delete detachedElements["nav_logout"];
    }
    refreshNav();
}

/**
* Restructures everything on the page so that the user is logged out.
*/
function createLogout() {
    if (detachedElements.hasOwnProperty("nav_login")) {
	detachedElements["nav_login"].appendTo($('#nav ul'));
	delete detachedElements["nav_login"];
    }
    if (detachedElements.hasOwnProperty("nav_register")) {
	detachedElements["nav_register"].appendTo($('#nav ul'));
	delete detachedElements["nav_register"];
    }
    if (!detachedElements.hasOwnProperty("nav_profile")) {
	detachedElements["nav_profile"] = $('#nav_profile').detach();
    }
    if (!detachedElements.hasOwnProperty("nav_logout")) {
	detachedElements["nav_logout"] = $('#nav_logout').detach();
    }
    refreshNav();
}
