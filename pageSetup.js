"use strict";

(function () {   
    document.getElementById('home').addEventListener("click", toggleDisplay); 
        document.getElementById('displayHomePage').style.display = "block";
        document.getElementById('displayAboutPage').style.display = "none"; 
})();


function toggleDisplay() {
    showHide('displayHomePage');
    showHide('displayAboutPage');
}

function showHide(division) {
    let x = document.getElementById(division);
    console.log(x);

    if (x.style.display === "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
}

function show(division) {
    document.getElementById(division).style.display = "block";
}

function hide(division) {
    document.getElementById(division).style.display = "none";
}