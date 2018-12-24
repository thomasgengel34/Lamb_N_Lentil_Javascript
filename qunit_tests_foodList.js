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
    listHeader += "<h3>Filter Your Results</h3> <p>Capitalization and EXACT spelling are important!</p> <input id=\"foodListFilterTextBox\" type=\"text\" placeholder=\"Enter a word to filter by\" />  <p>To Get items that the filter phrase is not in, check here  <input id=\"Checkbox1\" type=\"checkbox\" /></p><input id=\"foodListFilterBtn\" type=\"submit\" value=\"Go!\" onclick=filterList() /><h3>Sort Your Results</h3>  </div> ";
    listHeader += "<div><p>Select a sort option:</p ><input type=\"radio\" id=\"originalOrder\" name=\"sortChoices\" value=\"original\" checked>";
    listHeader += "<label for=\"originalOrder\">Original Order</label><input type=\"radio\" id=\"AtoZ\" name=\"sortChoices\" value=\"AtoZ\">";
    listHeader += "<label for=\"a2z\">A to Z</label><input type=\"radio\" id=\"ZtoA\" name=\"sortChoices\" value=\"ZtoA\"><label for=\"ZtoA\">Z to A</label></div></div>";

    const testResult = formatFoodListHeader(response);
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
    let filterText = "";
    let IsChecked = false; 
    let returned = filterList(testFood, filterText, IsChecked); 
    assert.deepEqual(returned, testFood , "test for null filter, no exclusions - should return everything"); 

    filterText = "";
    IsChecked = true;
    let correct = [];
    returned = filterList(testFood, filterText, IsChecked);
    assert.deepEqual(returned, correct, "test for null filter, all exclusions - should return nothing");

    filterText = "pie";
    IsChecked = false;
    correct = [{ "name": "apple pie" }, { "name": "cherry pie" }];
    returned = filterList(testFood, filterText, IsChecked);
    assert.deepEqual(returned, correct, "test for null filter, filter for pie");

    filterText = "a";
    IsChecked = true;
    correct = [{ "name": "blueberry bush" }, { "name": "cherry bush" },
    { "name": "cherry pie" }];
    returned = filterList(testFood, filterText, IsChecked);
    assert.deepEqual(returned, correct, "test for null filter, filter for pie");

    filterText = "qqq";
    IsChecked = false;
    correct = [];
    returned = filterList(testFood, filterText, IsChecked);
    assert.deepEqual(returned, correct, "nothing is in the filter requested");

    filterText = "p";
    IsChecked = false;
    correct = [{ "name": "egg plant" }, { "name": "cherry pie" }, { "name": "apple tree" }, { "name": "apple pie" }];
    returned = filterList(testFood, filterText, IsChecked); 
    returned = sortList("ZtoA", returned); 
    assert.deepEqual(returned, correct, "filter and reverse sort"); 
});