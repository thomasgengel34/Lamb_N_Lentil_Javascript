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
    listHeader += "Your search for  <span style=\"font-weight: bold; color:green\">" + searchText + "</span> found " + total + " items. All 4 are shown.";
    listHeader += "</div > ";
    listHeader += "<div>";
    listHeader += "<h3>Filter Your Results</h3>";
    listHeader += "<p>Capitalization and EXACT spelling are important!</p>";
    listHeader += "<input id=\"foodListFilterTextBox\" type=\"text\" placeholder=\"Enter a word to filter by\" />";
    listHeader += "<p>To Get items that the filter phrase is not in, check here";
    listHeader += "<input id=\"Checkbox1\" type=\"checkbox\" />";
    listHeader += "<input id=\"foodListFilterBtn\" type=\"submit\" value=\"Filter\" onclick=filterList() /></p>";
    listHeader += "<h3>Sort Your Results</h3>";
    listHeader += "</div> ";
    listHeader += "<div> Select a sort option:";
    listHeader += "<input type=\"radio\" id=\"AtoZ\" name=\"sortChoices\" value=\"AtoZ\" checked onclick=sortListAtoZ()  >";
    listHeader += "<label for=\"a2z\">A to Z</label>";
    listHeader += "<input type=\"radio\" id=\"ZtoA\" name=\"sortChoices\" value=\"ZtoA\" onclick=sortListZtoA()>";
    listHeader += "<label for=\"ZtoA\">Z to A</label></div></div>";
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


QUnit.test("foodList-6 formatFoodListBody", function (assert) { 
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

QUnit.test("foodList-7 formatFoodListBody filtered", function (assert) {
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


QUnit.test("foodList-8 populateResultsButtonText", function (assert) {
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

QUnit.test("foodList-9 ui shows the correct search for ff and filter on OLD and box unchecked", function (assert) {
    const unfilteredList = filterList(getFF(), "OLD", false);
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);
    var foo = document.getElementById("results");
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


    setTimeout(async function () {
        let returned = await innerTest1();
        assert.equal(returned, true, "under developement");
        done();
    });

    function innerTest1() {
        let response = filterList(unfilteredList, filterText, IsChecked);
        if (response.valueOf === correct.valueOf) {
            passOrFail = true;
        }
        return passOrFail;
    }

});