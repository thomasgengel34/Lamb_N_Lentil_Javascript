"use strict";

const getFoodList_IsraeliCities = function () {
    const cities = {
        "list": {
            "item": [
                { "name": "Tel Aviv-Yafo" },
                { "name": "Jerusalem" },
                { "name": "Eliat" },
                { "name": "Beer Sheba" },
                { "name": "Tiberias" },
                { "name": "Haifa" },
                { "name": "Dimona" },
                { "name": "Lod" }]
        }
    };
    return cities;
};


QUnit.test("foodList_sort-1 A Hello World Test", function (assert) {
    assert.equal(greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

QUnit.test("foodList_sort-2  Sort Ascending", function (assert) {
    const cities = getFoodList_IsraeliCities();
    const correct = cities.list.item.sort();
    const returned = sortList(ascending, cities.list.item);
    assert.equal(returned.length, correct.length); 
});


QUnit.test("foodlist_sort-2 sort", function (assert) {
    const testArray = ["a", "b", "c"];
    const list = '"list": {"q": "butter","sr": "Legacy","ds": "any","start": 0,"end": 25,"total": 4415,"group": "","sort": "n", '; 
    let returned = sortList(descending , testArray); 
    assert.equal(returned, testArray, "original order comes out of sort method initially with bad selector");

    const reversed = ["c", "b", "a"];
    returned = sortList(descending, testArray);
    assert.equal(returned.valueOf, reversed.valueOf, "reversing the order works");
    returned = sortList(ascending, returned);
    assert.equal(returned, testArray, "re-reversing the order works");   
    returned = sortList("bad value", testArray); 
    assert.equal(returned, testArray , "verify that \'bad value\' returns an ascended sort for graceful catching"); 
});

QUnit.test("foodlist_sort-2 sort with bad list", function (assert) {
    const list = "foo";
    let correct = "foo"; 
    const returned = sortList(ascending, list); 
    assert.equal(returned, correct); 
});

QUnit.test("foodlist_sort-3 sort with bad first parameter", function (assert) {
    const testNumber = 4;
    assert.expect(testNumber);
    let foo = "foo";
    let correct = ["a", "b", "c"];
    const list = ["a", "b", "c"];
    const returned = sortList(foo, list);
    assert.equal(returned.length, correct.length);
    assert.equal(returned[0], correct[0]); 
    assert.equal(returned[1], correct[1]); 
    assert.equal(returned[2], correct[2]); 
});


QUnit.test("foodlist_sort-4 sort with null list", function (assert) {
    const testNumber = 2;
    assert.expect(testNumber);
    let returned = sortList(ascending, null);
    assert.equal(returned, null);
      returned = sortList(descending, null);
    assert.equal(returned, null);
});

QUnit.test("foodlist_sort-3 sort with null first parameter", function (assert) { 
    const list = ["a", "b", "c"];
    const returned = sortList(null, list);
    assert.equal(returned, list);
});
 