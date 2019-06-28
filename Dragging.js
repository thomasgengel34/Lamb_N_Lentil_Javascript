/// <reference path="qunit_tests_foodlist.js" />
"use strict";
 
const dragging = {

    allowDrop: function allowDrop(ev) {
        console.log(7);
        ev.preventDefault();
    },

    drag: function drag(ev) {
        console.log(12); 
        ev.dataTransfer.setData("text", ev.target.id);
    },

    drop: function drop(ev) {
        ev.preventDefault();
        console.log(18); 
        var data = ev.dataTransfer.getData("text");
        console.log(data);
        console.log(21);
        ev.target.appendChild(document.getElementById(data));
    }
}; 