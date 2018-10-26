test("A Hello World Test", 1, function () {
    equal(greeting, "Hello World", "Expect greeting of Hello World  . Tests that qunit is working Test 1.");
});

test("Test 2 Key is correct", 1, function () {
    var key = getKey();
    equal(key, "sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm", "Verify key is correct: simple variable check. ");
});
 

test("Test 3 Obtain Query", 1, function () { 
    var list = '"list": {"q": "butter","sr": "Legacy","ds": "any","start": 0,"end": 25,"total": 4415,"group": "","sort": "n", ';
    var returned = displayQuery(list);  
    equal("butter", returned, ""); 
});

test("Test 4 Obtain Total", 1, function () {
    var list = '"list": {"q": "butter","sr": "Legacy","ds": "any","start": 0,"end": 25,"total": 4415,"group": "","sort": "n", ';
    var returned = displayTotal(list); 
    equal(returned, "4415", ""); 
});

test("Test 5 Obtain Food List Search Url", 1, function () {
    var searchTerm='ff';
    var searchUrl = buildFoodListSearchUrl(searchTerm);
    var correctUrl = "https://api.nal.usda.gov/ndb/search?format=json&q=ff&max=50&offset=0&api_key=sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm"; 
    equal(searchUrl, correctUrl, "");
});

test("Test 6 Obtain Food Report Search Url", 1, function () {
    var searchTerm = 'ff'; 
    var searchUrl = buildFoodReportSearchUrl(searchTerm);
    var correctUrl = " https://api.nal.usda.gov/ndb/V2/reports?ndbno=ff&type=b&format=json&api_key=sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm";
    equal(searchUrl, correctUrl, "");
});

test("Test 7 checkForErrorReturned", 2, function () {
    var list = "xxxxerrorxxxxx";
    var returned = checkForErrorReturned(list);
    var correct = "Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.";
   equal(returned, correct);
    list  = "yabba dabba doo";
     correct  = "";
     returned = checkForErrorReturned(list);
    equal(returned, correct);
});

test("Test 8 populateResultsButtonText", 7, function () {
    var total = 0;
    var correct = "Show Result";
    var returned = populateResultsButtonText(total);
    equal(returned, correct);
    total = 0.999;
    correct = "Show Result";
    returned = populateResultsButtonText(total);
    equal(returned, correct);
    total = 1;
    correct = "Show Result";
    returned = populateResultsButtonText(total);
    equal(returned, correct);
    total = 2;
    correct =  "Show the " + total + " Results" ;
    returned = populateResultsButtonText(total);
    equal(returned, correct);
    total = 49;
    correct = "Show the " + total + " Results";
    returned = populateResultsButtonText(total);
    equal(returned, correct);
    total = 50;
    correct = "Show Fifty Results";
    returned = populateResultsButtonText(total);
    equal(returned, correct);
    total = 51;
    correct = "Show First Fifty Results";
    returned = populateResultsButtonText(total);
    equal(returned, correct);
});