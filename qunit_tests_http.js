"use strict";

QUnit.test("http-0 hello", function (assert) {
    assert.ok(1 === 1, "Passed! Makes sure file is working in qunit");
});


QUnit.test("http-1 Query is correctly returned from async call", function (assert) {
    let done = assert.async();
    let correct = true; 
    setTimeout(async function ()
    {
        let returned = await innerTest(); 
        assert.equal(returned, correct, "Call returned query successfully");  
        done(); 
    });

async function innerTest() {
    const searchTerm = "Apache";
    const searchUrl = buildFoodListSearchUrl(searchTerm); // tested in site-4
    var response = await fetchUsers(searchUrl);
    let passOrFail = false;
    if (response.list.q === "Apache") {
        passOrFail = true;
    }
   return passOrFail;  
}; 
});

 


var getArr = function () {
    const arr = {
        "item": [
            { "offset": 1, "group": "Branded Food Products Database", "name": "Uncle Jim's Cigar Jam", "ndbno": "45136115", "ds": "LI" },
            { "offset": 2, "group": "Branded Food Products Database", "name": "X-Wing Soup;[]#$%#@", "ndbno": "Farley", "ds": "LI" },
            { "offset": 3, "group": "Branded Food Products Database", "name": "Aunt Sopapilla's Happy, Slappy Juice: NEW!!", "ndbno": "Farley-007", "ds": "LI" },
            { "offset": 4, "group": "Branded Food Products Database", "name": "ABBOTT, EAS, MYOPLEX 30 BUILD MUSCLE BAR, CHOCOLATE PEANUT BUTTER, UPC: 791083622813", "ndbno": "45258948", "ds": "LI" },
            { "offset": 5, "group": "Branded Food Products, Database", "name": " €1ز234و22", "ndbno": "،ششقش", "ds": "LI" }
        ]
    };
    return arr;
};




QUnit.test("http-2 buildAnArrayOfNamesAndNdbnos() returns the right result", function (assert) {
    assert.expect(11);
    var arr = getArr();
    var returned = buildAnArrayOfNamesAndNdbnos(arr);

    var correctArray = [{ "name": "Uncle Jim's Cigar Jam", "ndbno": "45136115" }, { "name": "X-Wing Soup;[]#$%#@", "ndbno": "Farley" }, { "name": "Aunt Sopapilla's Happy, Slappy Juice: NEW!!", "ndbno": "Farley-007" }, { "name": "ABBOTT, EAS, MYOPLEX 30 BUILD MUSCLE BAR, CHOCOLATE PEANUT BUTTER, UPC: 791083622813", "ndbno": "45258948" }, { "name": " €1ز234و22", "ndbno": "،ششقش" }];

    assert.equal(correctArray[0].name, returned[0].name);
    assert.equal(correctArray[1].name, returned[1].name);
    assert.equal(correctArray[2].name, returned[2].name);
    assert.equal(correctArray[3].name, returned[3].name);
    assert.equal(correctArray[4].name, returned[4].name);
    assert.equal(correctArray[0].ndbno, returned[0].ndbno);
    assert.equal(correctArray[1].ndbno, returned[1].ndbno);
    assert.equal(correctArray[2].ndbno, returned[2].ndbno);
    assert.equal(correctArray[3].ndbno, returned[3].ndbno);
    assert.equal(correctArray[4].ndbno, returned[4].ndbno);
    var correct = "Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.";
    arr = "qqq111";
    returned = buildAnArrayOfNamesAndNdbnos(arr);
    console.log(returned);
    assert.equal(returned, correct);
});

//QUnit.test("http-2 httpCall", function (assert) {
//    let done = assert.async();
//    const searchTerm = "Apache";
//    const searchUrl = buildFoodListSearchUrl(searchTerm); // tested in site-4


//    const correct = '{"list": { "q": "Apache", "sr": "1", "ds": "any", "start": 0, "end": 4, total": 4, "group": "", "sort": "r",' +
//        ' "item": [{"offset": 0, "group": "American Indian/Alaska Native Foods", "name": "Acorn stew (Apache)", "ndbno": "35182", "ds": "SR", "manu":"none"},' +
//        '{ "offset": 1, "group": "American Indian/Alaska Native Foods", "name": "Tennis Bread, plain (Apache)", "ndbno": "35187", "ds": "SR", "manu": "none" },' +
//        '{ "offset": 2, "group": "American Indian/Alaska Native Foods", "name": "Frybread, made with lard (Apache)", "ndbno": "35185", "ds": "SR", "manu": "none" },' +
//        '{ "offset": 3, "group": "American Indian/Alaska Native Foods", "name": "Corned beef and potatoes in tortilla (Apache)", "ndbno": "35186", "ds": "SR", "manu": "none"}' +
//        ']' +
//        '}' +
//        '}';


//   let returned = httpCall(searchUrl);

//    console.log("foo");

//    setTimeout(function () {

//        assert.equal(returned, correct, "Call was successful on searchterm of ff");

//        done();
//    }, 500);

//});

QUnit.test("multiple call test()",  function (assert) {
    var done = assert.async(1);

    const searchTerm = "Apache";
    const searchUrl = buildFoodListSearchUrl(searchTerm); // tested in site-4


    //setTimeout(function () {
    //    assert.ok(true, "first callback.");
    //    done();
    //}, 500);

    //setTimeout(function () {
    //    assert.ok(true, "second callback.");
    //    done();
    //}, 500);

    //setTimeout(function () {
    //    assert.ok(true, "third callback.");
    //    done();
    //}, 500);
    let returned = "foobar";
    let correct = "foo";

    setTimeout(function () {
        console.log("test");
        assert.timeout(5000); // Timeout of 5 seconds
        returned = fetchUsers(searchUrl);
        return returned.then(function () {
            assert.deepEqual(returned, correct, "my 5:32 revised callback.");
        });
    });
});
  
 