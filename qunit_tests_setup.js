"use strict";

function setupDivForTesting() {
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");

    const node1 = document.createElement("div");
    node1.setAttribute("id", "AtoZ");
    node.appendChild(node1);
    const node2 = document.createElement("div");
    node2.setAttribute("id", "ZtoA");
    node.appendChild(node2);
    fixture.appendChild(node);
    return fixture;
}