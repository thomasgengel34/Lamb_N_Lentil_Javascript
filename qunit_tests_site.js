"use strict"

QUnit.test("site-1 A Hello World Test", function (assert) {
    assert.equal(greeting, "Hello World", "Expect greeting of Hello World  . Tests that qunit is working.");
});

QUnit.test("site-2 Key is correct", function (assert) {
    const key = getKey();
    assert.equal(key, "sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm", "Verify key is correct: simple variable check. ");
});



QUnit.test("site-x buildFoodListSearchUrl() Obtain Food List Search Url", function (assert) {
    const searchTerm = 'ff';
    const searchUrl = buildFoodListSearchUrl(searchTerm);
    const correctUrl = "https://api.nal.usda.gov/ndb/search?format=json&q=ff&max=50&offset=0&api_key=sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm";
    assert.equal(searchUrl, correctUrl, "Obtain Food List Search Url");
});

QUnit.test("site-5 Obtain Food Report Search Url for search term ff", function (assert) {
    const searchTerm = 'ff';
    const searchUrl = buildFoodReportSearchUrl(searchTerm);
    const correctUrl = " https://api.nal.usda.gov/ndb/V2/reports?ndbno=ff&type=b&format=json&api_key=sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm";
    assert.equal(searchUrl, correctUrl, "");
});

QUnit.test("site-6 checkForErrorReturned", function (assert) {
    assert.expect(2);
    let list = "xxxxerrorxxxxx";
    let returned = checkForErrorReturned(list);
    let correct = "<div id=\"errorMessage\">Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.</div>";
    assert.equal(returned, correct);
    list = "just a string without the big e word in it";
    correct = "";
    returned = checkForErrorReturned(list);
    assert.equal(returned, correct);
});

QUnit.test("site-7 populateResultsButtonText", function (assert) {
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

QUnit.test("site-8 handleErrors() outcomes are correct",
    function (assert) {
        const correct = "<div id=\"errorMessage\">Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.</div>";
        const returned = getErrorMessage();
        assert.equal(returned, correct);
    });

QUnit.test("site-9 getErrorMessage() is correct", function (assert) {
    const correct = "<div id=\"errorMessage\">Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.</div>";
    const returned = getErrorMessage();
    assert.equal(returned, correct);
});

