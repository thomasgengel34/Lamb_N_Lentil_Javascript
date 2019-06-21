"use strict";
/*
const dragging = {
    
    pos1: 0,
     pos2: 0,
     pos3: 0,
     pos4: 0,

    elmnt: "",

    dragElement: function dragElement(elmnt) {    
        dragging.elmnt = elmnt; 
        if (document.getElementById(elmnt.id + "header")) { 
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragging.dragMouseDown;
                    
        } else {
            // otherwise, move the DIV from anywhere inside the DIV: 
            elmnt.onmousedown = dragging.dragMouseDown;
        }
    },

    dragMouseDown: function dragMouseDown(e) { 
        console.log(24);
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        dragging.pos3 = e.clientX || 0;
        dragging.pos4 = e.clientY || 0;
        document.onmouseup = dragging.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = dragging.elementDrag;
    },

    elementDrag: function elementDrag(e) {
        console.log(35);
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        dragging.pos1 = dragging.pos3 - e.clientX;
        dragging.pos2 = dragging.pos4 - e.clientY;
        dragging.pos3 = e.clientX;
        dragging.pos4 = e.clientY;
        // set the element's new position:
        console.log(45);
        console.log(dragging.elmnt.style.top);
        dragging.elmnt.style.top = dragging.elmnt.offsetTop - dragging.pos2  + "px";
        dragging.elmnt.style.left = dragging.elmnt.offsetLeft - dragging.pos1  + "px";
    },

    closeDragElement: function closeDragElement() {
        console.log(50);
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
};

const draggingIIFE = (function () {
    // Make the DIV element draggable (second choice is for running tests when the div is not present: 
    dragging.dragElement(document.getElementById("mydiv") || document.getElementById("qunit"));
    console.log(59);
})();
*/

//function allowDrop(ev) {
//    console.log(67);
//    console.log(ev);
//    ev.preventDefault();
//}

const dragging = {

    allowDrop: function allowDrop(ev) {
     
        ev.preventDefault();
    },

    drag: function drag(ev) {
      
        ev.dataTransfer.setData("text", ev.target.id);
    },

    drop: function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
}; 