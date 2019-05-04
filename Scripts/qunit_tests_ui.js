"use strict";

QUnit.test("ui hello test", function (assert) {
    QUnit.assert.ok(1 === 1, "Passed!");
});


const getTestABCList = function () {
    const testList = {
        "list": {
            "item": [
                { "name": "Z", "ndbno": 4300 },
                { "name": "M", "ndbno": 8 },
                { "name": "A", "ndbno": 82 },
                { "name": "R", "ndbno": 800 },
                { "name": "C", "ndbno": 18 },
                { "name": "C", "ndbno": 8 },
                { "name": "1", "ndbno": 888 },
                { "name": "B", "ndbno": 1 }]
        }
    };
    const z = { "list": testList, "item": testList.list.item };
    return z;
};

const getTestABCList_filter = function () {
    const testList = {
        "list": {
            "item": [
                { "name": "Zx", "ndbno": 4300 },
                { "name": "M", "ndbno": 8 },
                { "name": "A", "ndbno": 82 },
                { "name": "Rx", "ndbno": 800 },
                { "name": "C", "ndbno": 18 },
                { "name": "Cx", "ndbno": 8 },
                { "name": "1x", "ndbno": 888 },
                { "name": "Bx", "ndbno": 1 }]
        }
    };
    const z = { "list": testList, "item": testList.list.item };
    return z;
};


//QUnit.test("ui-1 returns a set of food items in proper order with the textbox populated", function (assert) {
//    setupDivForTesting(); 
//    const testNumber = 2;
//    assert.expect(testNumber);
//    let done = assert.async();
//    const testABCList = getTestABCList();
//    const items = testABCList.item;
//    let correct = "<div id=\"listBody\">" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(4300)\>Z</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(8)\>M</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(82)\>A</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(800)\>R</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(18)\>C</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(8)\>C</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(888)\>1</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(1)>B</a>" +
//        "</div>";
//    innerTest(); 
//    async function innerTest(items) {
//        done();
//        returned = await formatFoodList(items);

//        QUnit.assert.equal(returned, correct, "Echo the file correctly with formatFoodList");
//    }




//    correct = "<div id=\"listBody\">" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(888)\>1</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(82)\>A</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(1)>B</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(18)\>C</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(8)\>C</a>" +

//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(8)\>M</a>" +

//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(800)\>R</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(4300)\>Z</a>" +


//        "</div>"; 
//    //let sortedList = formatFoodList(items, true);       //  sortList(ascendingList, items);
//    let returned = formatFoodList(items, true);
//    // returned = formatFoodListBody(sortedList);
//    QUnit.assert.equal(returned, correct, "Present a sorted output");
//});


//QUnit.test("ui-2 returns an error message with empty input", function (assert) {
//    let items = "";
//    let returned = formatFoodListBody(items);
//    const correct = "div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
//    QUnit.assert.equal(returned, correct, "Echo the file correctly with formatFoodListBody");
//});

//QUnit.test("ui-3  returns an error when the list is not an array", function (assert) {
//    let items = "this is a string.  This needs to be an array or you get an error message.";
//    let returned = formatFoodListBody(items);
//    const correct = "div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
//    QUnit.assert.equal(returned, correct);
//});

//// really we should be testing the whole path.  This is just making sure the functions work independently.
//QUnit.test("ui-4  returns a filtered set correctly", function (assert) {
//    const unfilteredList = getTestABCList_filter();
//    const items = unfilteredList.item;
//    const filterText = "x";
//    const isChecked = false;
//    var done = assert.async();
//    innerTest(items);

//    const correct = "<div id=\"listBody\">" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(4300)\>Zx</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(800)\>Rx</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(8)\>Cx</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(888)\>1x</a>" +
//        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(1)>Bx</a>" +
//        "</div>";

//    async function innerTest(items) {
//        const filteredList = await  filterList(items, filterText, isChecked);
//        done();
//        let returned = formatFoodList(filteredList) // formatFoodListBody(filteredList);
//        QUnit.assert.equal(returned, correct);
//    }

//    //  QUnit.assert.equal(returned, correct, "Echo the file correctly with formatFoodListBody");
//});

QUnit.test("ui-5 for search on ff, there is normally no error message in div. ", function (assert) {
    const query = "ff";
    let done = assert.async();
    let text = "";
    const errorMessage = "div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
    innerTest();

    async function innerTest() {
        const response = await httpFoodList.ingredientSearchSubmit(query);
        text = await foodList.formatFoodList(response);
        done();

        let shouldBeNo = text.includes(errorMessage);
        assert.equal(shouldBeNo, false);
    }
});
 
/*
  * returns a reverse filter set correctly
  * returns a sorted set a to z
  * returns a sorted set z to a
  *
  * selecting sort option a to z will trigger a to z sort
  * selectiong sort option z to a will trigger z to a sort
  *
  *   You can set up a filter and sort and then run the search and get the results
  *   reverse filtering works when running the search and getting the results
  *   You get the count for a filtered set, not just the total from the initial search
  *   sort and reverse sorting works
  *
  *
  * changing the search text will still retain the filter text and the filter checkbox and sort
  *
  * changing the filter text will not change the search - it should operate on the set already present
  *
  * changing the sort will not change the search text or the filter text
  *
  */