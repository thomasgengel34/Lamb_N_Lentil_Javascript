"use strict";

//$(document).ready(function () { 
//    displayHomePage();
//});

$('#home').click(displayHomePage);

$('#about').click(displayAboutPage);

function displayHomePage() {
    $('#displayHomePage').show();
    $('#displayAboutPage').hide(); 
}

function displayAboutPage() {
    $('#displayHomePage').hide();
    $('#displayAboutPage').show();
}
