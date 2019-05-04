"use strict";

const qunit_default = {
greeting : 'Hello World' 
};
 

(function () { 
    let elemHome = document.createElement('a'); 
    elemHome.id = "home";
    document.body.appendChild(elemHome); 

    let elemDHP = document.createElement('div');
    elemDHP.id = 'displayHomePage';  
    document.body.appendChild(elemDHP); 

    let elemDAP = document.createElement('div');
    elemDAP.id = 'displayAboutPage';
    document.body.appendChild(elemDAP); 

    let elemfSSB = document.createElement('button');
    elemfSSB.id = 'foodsSearchSubmitBtn';
    document.body.appendChild(elemfSSB);  
})();