"use strict";


QUnit.test("foodList-1 A Hello World Test", function (assert) {
    assert.equal(greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

QUnit.test("foodList-2 The search shows up in the results for search on Apache", function (assert) {
    let done = assert.async();
    const searchTerm = "Apache";
    const searchUrl = buildFoodListSearchUrl(searchTerm);
    let passOrFail = false;
    const correct = getApacheList();

    setTimeout(async function () {
        let returned = await innerTest1();
        assert.equal(returned, true, "Call returned query successfully for name from search on Apache");
        done();
    });

    async function innerTest1() {
        let response = await httpCall(searchUrl);
        response = JSON.stringify(response);
        if (response.replace(/\s+/g, '').valueOf() === correct.replace(/\s+/g, '').valueOf()) {
            passOrFail = true;
        }
        return passOrFail;
    }
});


QUnit.test("foodList-3 Obtain Total", function (assert) {
    const list = '"list": {"q": "butter","sr": "Legacy","ds": "any","start": 0,"end": 25,"total": 4415,"group": "","sort": "n", ';
    const returned = displayTotal(list);
    assert.equal(returned, "4415", "");
});

QUnit.test("foodList-4 food list header is correct", function (assert) {
    const response = JSON.parse(getApacheList());
    const searchText = response.list.q;
    const total = response.list.total;
    let listHeader = "<div>";
    listHeader += "Your search for  <span style=\"font-weight: bold; color:green\">" + searchText + "</span> found " + total + " items";
    listHeader += "</div > ";
    listHeader += "<div>";
    listHeader += "<h3>Filter Your Results</h3> <p>Capitalization and EXACT spelling are important!</p> <input id=\"foodListFilterTextBox\" type=\"text\" placeholder=\"Enter a word to filter by\" />  <p>To Get items that the filter phrase is not in, check here  <input id=\"Checkbox1\" type=\"checkbox\" /></p><input id=\"foodListFilterBtn\" type=\"submit\" value=\"Filter and Sort\" onclick=filterList() /><h3>Sort Your Results</h3>  </div> ";
    listHeader += "<div><p>Select a sort option:</p ><input type=\"radio\" id=\"originalOrder\" name=\"sortChoices\" value=\"original\" checked>";
    listHeader += "<label for=\"originalOrder\">Original Order</label><input type=\"radio\" id=\"AtoZ\" name=\"sortChoices\" value=\"AtoZ\">";
    listHeader += "<label for=\"a2z\">A to Z</label><input type=\"radio\" id=\"ZtoA\" name=\"sortChoices\" value=\"ZtoA\"><label for=\"ZtoA\">Z to A</label></div></div>";

    let testResult = formatFoodListHeader(response);
    assert.equal(listHeader, testResult);
});

QUnit.test("foodList-5 food list body is correct", function (assert) {
    const line1 = "<div>Acorn stew (Apache)<input id=\"fetchReportBtn\" type=\"submit\" value=\"Fetch Report\" onclick=\"fetchReport(35182)\"</div>";
    const line2 = "<div>Tennis Bread, plain (Apache)<input id=\"fetchReportBtn\" type=\"submit\" value=\"Fetch Report\" onclick=\"fetchReport(35187)\"></div>";
    const line3 = "<div>Frybread, made with lard (Apache)<input id=\"fetchReportBtn\" type=\"submit\" value=\"Fetch Report\" onclick=\"fetchReport(35185)\"></div>";
    const line4 = "<div>Corned beef and potatoes in tortilla (Apache)<input id=\"fetchReportBtn\" type=\"submit\" value=\"Fetch Report\" onclick=\"fetchReport(35186)\"></div>";
    let correct = "<div>" + line1 + line2 + line3 + line4 + "</div>";

    const list = getApacheList();
    const parsedList = JSON.parse(list);
    const result = formatFoodListBody(parsedList);
    assert.equal(correct.replace(" ", "").valueOf, result.replace(" ", "").valueOf);
});

QUnit.test("foodlist-6 sort", function (assert) {
    const testArray = ["a", "b", "c"];
    let returned = sortList("original", testArray);
    assert.equal(testArray, returned, "original order comes out of sort method initially");
    returned = sortList("random string", testArray);
    assert.equal(testArray, returned, "original order comes out of sort method initially with bad selector");
    const reversed = ["c", "b", "a"];
    returned = sortList("ZtoA", testArray);
    assert.equal(returned.valueOf, reversed.valueOf, "reversing the order works");
    returned = sortList("original", returned);
    assert.equal(returned, testArray, "reversing the order works");
    returned = sortList("original", testArray);
    assert.equal(returned, testArray, "returning to original restores original sort order from an AZ sort");
    returned = sortList("original".valueOf, reversed.valueOf);
    assert.equal(returned.valueOf, testArray.valueOf, "returning to original restores original sort order from an ZA sort");
});

QUnit.test("foodlist-7 filter", function (assert) {
    const testNumber = 5;
    assert.expect(testNumber);
    var done = assert.async(testNumber);
    const testFood = {
        "list": {
            "item": [
                { "name": "apple pie" },
                { "name": "apple tree" },
                { "name": "banana bread" },
                { "name": "black bread" },
                { "name": "blueberry bush" },
                { "name": "cherry bush" },
                { "name": "cherry pie" },
                { "name": "egg plant" }]
        }
    };

    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let filterText = "";
    let IsChecked = false;


    setTimeout(function (assert) {
        const returned = filterList(testFood, filterText, IsChecked);
        done();
        QUnit.assert.deepEqual(returned.valueOf, testFood.valueOf, "test for null filter, no exclusions - should return everything");
    }
    );

    filterText = "";
    IsChecked = true;
    let correct = [];
    setTimeout(function (assert) {
        const returned = filterList(testFood, filterText, IsChecked);
        done();
        QUnit.assert.deepEqual(returned.valueOf, correct.valueOf, "test for null filter, all exclusions - should return nothing");
    });

    filterText = "pie";
    IsChecked = false;
    correct = [{ "name": "apple pie" }, { "name": "cherry pie" }];
    setTimeout(function (assert) {
        const returned = filterList(testFood, filterText, IsChecked);
        done();
        QUnit.assert.deepEqual(returned.valueOf, correct.valueOf, "test for null filter, filter for pie");
    });


    filterText = "qqq";
    IsChecked = false;
    correct = [];
    setTimeout(function (assert) {
        const returned = filterList(testFood, filterText, IsChecked);
        done();
        QUnit.assert.deepEqual(returned.valueOf, correct.valueOf, "nothing is in the filter requested");
    });

    filterText = "p";
    IsChecked = false;
    correct = [{ "name": "egg plant" }, { "name": "cherry pie" }, { "name": "apple tree" }, { "name": "apple pie" }];
    let returned = [];


    setTimeout(function (assert) {
        returned = filterList(testFood, filterText, IsChecked);
        done();


    }, 3000);

    returned = sortList("ZtoA", returned);
    QUnit.assert.deepEqual(returned.valueOf, correct.valueOf, "filter and reverse sort");

});

QUnit.test("foodList-8 formatFoodListBody", function (assert) {
    const response = {
        "list": {
            "q": "Apache",
            "sr": "1",
            "ds": "any",
            "start": 0,
            "end": 4,
            "total": 4,
            "group": "",
            "sort": "r",
            "item": [
                {
                    "offset": 0,
                    "group": "American Indian/Alaska Native Foods",
                    "name": "Acorn stew (Apache)",
                    "ndbno": "35182",
                    "ds": "SR",
                    "manu": "none"
                },
                {
                    "offset": 1,
                    "group": "American Indian/Alaska Native Foods",
                    "name": "Tennis Bread, plain (Apache)",
                    "ndbno": "35187",
                    "ds": "SR",
                    "manu": "none"
                },
                {
                    "offset": 2,
                    "group": "American Indian/Alaska Native Foods",
                    "name": "Frybread, made with lard (Apache)",
                    "ndbno": "35185",
                    "ds": "SR",
                    "manu": "none"
                },
                {
                    "offset": 3,
                    "group": "American Indian/Alaska Native Foods",
                    "name": "Corned beef and potatoes in tortilla (Apache)",
                    "ndbno": "35186",
                    "ds": "SR",
                    "manu": "none"
                }
            ]
        }
    };

    const correct = "<div id=\"listBody\">" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(35182)>Acorn stew (Apache)</a>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(35187)>Tennis Bread, plain (Apache)</a>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(35185)>Frybread, made with lard (Apache)</a>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(35186)>Corned beef and potatoes in tortilla (Apache)</a>" + "</div>";

    let returned = formatFoodListBody(response);
    assert.deepEqual(correct, returned, "formatFoodListBody returns correctly for good input");

    const badInput = "I am not a correctly reformed response";
    const expectedResult = "div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
    returned = formatFoodListBody(badInput);
    assert.deepEqual(expectedResult, returned);

});

QUnit.test("foodList-9 formatFoodListBody filtered", function (assert) {
    const testNumber = 1;
    assert.expect(testNumber);
    var done = assert.async(testNumber);
    const unfilteredList = getFF();
    const filterText = "OLD";
    const IsChecked = false;
    const correct = [
        {
            "ds": "GDSN",
            "group": "Branded Food Products Database",
            "manu": "GENERAL MILLS SALES INC.",
            "name": "OLD EL PASO REFRIED BEANS FF, UNPREPARED, GTIN: 00046000820118",
            "ndbno": "45310780",
            "offset": 0
        },
        {
            "ds": "GDSN",
            "group": "Branded Food Products Database",
            "manu": "GENERAL MILLS SALES INC.",
            "name": "OLD EL PASO REFRIED BEANS SPICY FF, UNPREPARED, GTIN: 00046000843315",
            "ndbno": "45310992",
            "offset": 1
        }
    ];


    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let returned = [];


    setTimeout(function (assert) {
        returned = filterList(unfilteredList, filterText, IsChecked);
        done();


    }, 3000);


    QUnit.assert.deepEqual(returned.valueOf, correct.valueOf);


}
);


QUnit.test("foodList-10 populateResultsButtonText", function (assert) {
    assert.expect(7);
    let total = 0;
    let correct = "Show Result";
    let returned = populateResultsButtonText(total);
    assert.equal(returned, correct);
    total = 0.999;
    correct = "Show Result";
    returned = populateResultsButtonText(total);
    assert.equal(returned, correct);
    total = 1;
    correct = "Show Result";
    returned = populateResultsButtonText(total);
    assert.equal(returned, correct);
    total = 2;
    correct = "Show the " + total + " Results";
    returned = populateResultsButtonText(total);
    assert.equal(returned, correct);
    total = 49;
    correct = "Show the " + total + " Results";
    returned = populateResultsButtonText(total);
    assert.equal(returned, correct);
    total = 50;
    correct = "Show Fifty Results";
    returned = populateResultsButtonText(total);
    assert.equal(returned, correct);
    total = 51;
    correct = "Show First Fifty Results";
    returned = populateResultsButtonText(total);
    assert.equal(returned, correct);
});

QUnit.test("foodList-11 ui shows the correct search for ff and filter on OLD and box unchecked", function (assert) {
    const unfilteredList = filterList(getFF(), "OLD", false); 
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);
    var foo = document.getElementById("results");
    console.log(318);
    console.log(foo);
    const done = assert.async();

    // assert.equal(1, 2, "write the test and get it to work in the browser");


    const correct = [
        {
            "ds": "GDSN",
            "group": "Branded Food Products Database",
            "manu": "GENERAL MILLS SALES INC.",
            "name": "OLD EL PASO REFRIED BEANS FF, UNPREPARED, GTIN: 00046000820118",
            "ndbno": "45310780",
            "offset": 0
        },
        {
            "ds": "GDSN",
            "group": "Branded Food Products Database",
            "manu": "GENERAL MILLS SALES INC.",
            "name": "OLD EL PASO REFRIED BEANS SPICY FF, UNPREPARED, GTIN: 00046000843315",
            "ndbno": "45310992",
            "offset": 1
        }
    ];
    const searchTerm = "ff";
    const filterText = "OLD";
    const IsChecked = false;
    let passOrFail = false; 
  console.log(347);
        console.log(foo);


    setTimeout(async function () {
        console.log(349);
        console.log(foo);
        let returned = await innerTest1();
        assert.equal(returned, true, "under developement");
        done();
    });

     function innerTest1() {
        console.log(357);
        console.log(foo);
        let response =  filterList(unfilteredList, filterText, IsChecked);
        console.log(360);
        console.log(foo);
        if (response.valueOf === correct.valueOf) {
            passOrFail = true;
        }
        return passOrFail;
    }

});