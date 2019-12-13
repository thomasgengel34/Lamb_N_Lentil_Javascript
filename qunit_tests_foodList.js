"use strict";

const qunit_tests_foodList = {
    apache: {
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
    },
    twoItemList: [
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
    ]
};


QUnit.test("foodList-1 A Hello World Test", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

QUnit.test("foodList-2 The search shows up in the results for search on Apache", function (assert) {
    let done = assert.async();
    const searchTerm = "Apache";
    const searchUrl = foodList.buildSearchUrl(searchTerm);
    let passOrFail = false;
    const correct = qunit_tests_http.getApacheList();

    setTimeout(async function () {
        let returned = await innerTest1();
        assert.equal(returned, true, "Call returned query successfully for name from search on Apache");
        done();
    });

    async function innerTest1() {
        let response = await httpFoodList.httpCall(searchUrl);
        response = JSON.stringify(response);
        if (response.replace(/\s+/g, '').valueOf() === correct.replace(/\s+/g, '').valueOf()) {
            passOrFail = true;
        }
        return passOrFail;
    }
});


QUnit.test("foodList-3 Obtain Total", function (assert) {
    const list = '"list": {"q": "butter","sr": "Legacy","ds": "any","start": 0,"end": 25,"total": 4415,"group": "","sort": "n", ';
    const returned = foodReport.displayTotal(list);
    assert.equal(returned, "4415", "");
});

QUnit.test("foodList-4 food list header is correct", function (assert) {
    const response = JSON.parse(qunit_tests_http.getApacheList());
    let listHeader = "<div id=\"listHeaderDiv\" >Your search for  <span style=\"font-weight: bold; color:green\">Apache</span> found 4 items. </div>";
    let result = foodList.formatFoodListHeader(response.list.item, response);

    assert.equal(result, listHeader);
});

QUnit.test("foodList-5 food list body is correct", function (assert) {
    const line1 = "<div>Acorn stew (Apache)<input id=\"fetchReportBtn\" type=\"submit\" value=\"Fetch Report\" onclick=\"fetchReport(35182)\"</div>";
    const line2 = "<div>Tennis Bread, plain (Apache)<input id=\"fetchReportBtn\" type=\"submit\" value=\"Fetch Report\" onclick=\"fetchReport(35187)\"></div>";
    const line3 = "<div>Frybread, made with lard (Apache)<input id=\"fetchReportBtn\" type=\"submit\" value=\"Fetch Report\" onclick=\"fetchReport(35185)\"></div>";
    const line4 = "<div>Corned beef and potatoes in tortilla (Apache)<input id=\"fetchReportBtn\" type=\"submit\" value=\"Fetch Report\" onclick=\"fetchReport(35186)\"></div>";
    let correct = "<div>" + line1 + line2 + line3 + line4 + "</div>";

    const list = qunit_tests_http.getApacheList();
    const parsedList = JSON.parse(list);
    const result = foodList.formatFoodListBody(parsedList); 
    assert.equal(correct.replace(" ", "").valueOf, result.replace(" ", "").valueOf);
});


QUnit.test("foodList-6 formatFoodListBody", function (assert) {
    const response = qunit_tests_foodList.apache;

    const correct = "<div>" +
        "<a href=\"#\" id=\"fetchReportBtn35182\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=foodReport.fetchReport(35182)  draggable=\"true\" ondragstart=\"dragging.drag(event)\">Acorn stew (Apache)</a>" +
        "<a href=\"#\" id=\"fetchReportBtn35187\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=foodReport.fetchReport(35187)  draggable=\"true\" ondragstart=\"dragging.drag(event)\">Tennis Bread, plain (Apache)</a>" +
        "<a href=\"#\" id=\"fetchReportBtn35185\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=foodReport.fetchReport(35185)  draggable=\"true\" ondragstart=\"dragging.drag(event)\">Frybread, made with lard (Apache)</a>" +
        "<a href=\"#\" id=\"fetchReportBtn35186\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=foodReport.fetchReport(35186)  draggable=\"true\" ondragstart=\"dragging.drag(event)\">Corned beef and potatoes in tortilla (Apache)</a>" +
        "</div>";
    let returned = foodList.formatFoodListBody(response.list.item);
   
    assert.deepEqual(returned, correct, "formatFoodListBody returns correctly for good input"); 
    const badInput = "I am not a correctly reformed response";
    const expectedResult = "<div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
    returned = foodList.formatFoodListBody(badInput);
   
    assert.deepEqual(returned, expectedResult);

});

QUnit.test("foodList-7 formatFoodListBody filtered", function (assert) {
    const testNumber = 1;
    assert.expect(testNumber);
    var done = assert.async(testNumber);
    const unfilteredList = qunit_tests_getFF.list;
    const filterText = "OLD";
    const IsChecked = false;
    const correct = qunit_tests_foodList.twoItemList;


    const fixture = qunit_tests_setup.setupDivForTesting();  

    let returned = [];


    setTimeout(function (assert) {
        returned = foodList.filterList(unfilteredList, filterText, IsChecked);
        done();


    }, 3000);


    QUnit.assert.deepEqual(returned.valueOf, correct.valueOf);
}
);

QUnit.test("foodList-8 check a bad value in sorted", function (assert) {
    const returned = foodList.sortList("this is not a list", "");
    assert.equal(returned, "bad value");
});

QUnit.test("foodList-9 check a bad value in formatFoodList", function (assert) {
    const returned = foodList.formatFoodList("this is not a list", "");
    assert.equal(returned, "bad value");
});

QUnit.test("foodList-10 check for correct plural for count higher than 51", function (assert) {

    const food = { 
        "list": {
            "q": "Apache", 
            "item": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                21,22,23 
            ] 
        }
    };

    const list = food.list.item;  
    const returned = foodList.formatFoodListHeader(list, food);
    const expected = "<div id=\"listHeaderDiv\" >Your search for  <span style=\"font-weight: bold; color:green\">Apache</span> found 63 items. </div>"
    assert.equal(returned, expected);
});