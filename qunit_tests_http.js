"use strict";

QUnit.test("http-0 hello", function (assert) {
    assert.ok(1 === 1, "Passed! Makes sure file is working in qunit");
});

QUnit.test("http-1 Query is correctly returned from async call on search for Apache", function (assert) {
    let done = assert.async(3);
    let correct = true;
    const searchTerm = "Apache";
    const searchUrl = buildFoodListSearchUrl(searchTerm); // tested in site-4

    let passOrFail = false;

    setTimeout(async function () {
        let returned = await innerTest1();
        assert.equal(returned, true, "Call returned query successfully for name from search on Apache");
        done();
    });

    setTimeout(async function () {
        let returned = await innerTest1();
        assert.equal(returned, true, "Call returned query successfully for name from search on Apache");
        done();
    });


    setTimeout(async function () {
        let returned = await innerTest3();
        assert.equal(returned, true, "Call returned correct error message on bad search URL");
        done();
    });

    async function innerTest1() {
        const response = await httpCall(searchUrl);
        if (response.list.q === "Apache") {
            passOrFail = true;
        }
        return passOrFail;
    };




    async function innerTest2() {
        const correct = getApacheList();
        const response = await httpCall(searchUrl);
        const responseString = JSON.stringify(response).replace(/\s+/g, "");
        const correctCompressed = correct.replace(/\s+/g, "");
        var result = responseString.localeCompare(correctCompressed);
        if (result === 0) {
            passOrFail = true;
        }
        return passOrFail;
    };

    async function innerTest3() {
        const response = await httpCall(-1);
        passOrFail = new String(response.statusText).valueOf === new String("Not Found").valueOf;
        return passOrFail;
    }
});



QUnit.test("http-2  Status and Error Message are correctly returned from async call on search for qqq", function (assert) {
    let done = assert.async(2);
    let correct = true;
    const searchTerm = "qqq";
    const searchUrl = buildFoodListSearchUrl(searchTerm); // tested in site-4

    let passOrFail = false;

    setTimeout(async function () {
        let returned = await innerTest1();
        assert.equal(returned, correct, "Call returned query successfully for name from search on Apache");
        done();
    });


    setTimeout(async function () {
        let returned = await innerTest1A();
        assert.equal(returned, true, "Call returned correct status on bad search URL");
        done();
    });

    async function innerTest1() {
        const response = await httpCall(searchUrl);

        passOrFail = (response.errors.error[0].status === 400);
        return passOrFail;
    };

    async function innerTest1A() {
        const response = await httpCall(searchUrl);
        passOrFail = (new String(response.errors.error[0].message).valueOf === new String("Your search resulted in zero results.Change your parameters and try again").valueOf);
        return passOrFail;
    };

});


const getArr = function () {
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

const getApacheList = function () {
    const apacheList = 
        '{"list": { "q": "Apache", "sr": "1", "ds": "any", "start": 0, "end": 4, "total": 4, "group": "", "sort": "r",' +
            ' "item": [{"offset": 0, "group": "American Indian/Alaska Native Foods", "name": "Acorn stew (Apache)", "ndbno": "35182", "ds": "SR", "manu":"none"},' +
            '{ "offset": 1, "group": "American Indian/Alaska Native Foods", "name": "Tennis Bread, plain (Apache)", "ndbno": "35187", "ds": "SR", "manu": "none" },' +
            '{ "offset": 2, "group": "American Indian/Alaska Native Foods", "name": "Frybread, made with lard (Apache)", "ndbno": "35185", "ds": "SR", "manu": "none" },' +
            '{ "offset": 3, "group": "American Indian/Alaska Native Foods", "name": "Corned beef and potatoes in tortilla (Apache)", "ndbno": "35186", "ds": "SR", "manu": "none"}' +
            ']' +
            '}' +
            '}';
        return apacheList;
    };


    QUnit.test("http-3 buildAnArrayOfNamesAndNdbnos() returns the right result", function (assert) {
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
        assert.equal(returned, correct);
    });

    QUnit.test("http-4 Query is correctly returned from async call on search for food report for  01009", function (assert) {
        let done = assert.async(3);
        const searchTerm = "01009";
        const searchUrl = buildFoodReportSearchUrl(searchTerm); // tested site-5
        let passOrFail = false;

        setTimeout(async function () {
            let returned = await innerTest10();
            assert.equal(returned, true, "Call returned query successfully for name from search on 01009");
            done();
        });

        setTimeout(async function () {
            let returned = await innerTest20();
            assert.equal(returned, true, "Call returned query successfully for entire food from search on 01009");
            done();
        });

        setTimeout(async function () {
            let returned = await innerTest30();
            assert.equal(returned, true, "Call returned correct error message on bad search URL");
            done();
        });

        async function innerTest10() {
            const response = await httpCall(searchUrl);
            passOrFail = (new String(response.foods[0].food.desc.name).valueOf === new String("Cheese, cheddar(Includes foods for USDA's Food Distribution Program)").valueOf);
            return passOrFail;
        };

        async function innerTest20() {
            const response = await httpCall(searchUrl);
            const returned = response.foods[0].food.nutrients[0].measures[0].value;
            if (48.51 - returned < 0.01) {
                passOrFail = true;
            }
            return passOrFail;
        };

        async function innerTest30() {
            const response = await httpCall(-1);
            passOrFail = (new String(response.statusText).valueOf === new String("Not Found").valueOf);
            return passOrFail;
        }
    });



    QUnit.test("http-5  Status and Error Message are correctly returned from async call on search for qqq", function (assert) {
        let done = assert.async(1);
        let correct = true;
        const searchTerm = "qqq";
        const searchUrl = buildFoodListSearchUrl(searchTerm);

        let passOrFail = false;

        setTimeout(async function () {
            let returned = await innerTest1();
            assert.equal(returned, correct, "Call returned query successfully for name from search on Apache");
            done();
        });

        async function innerTest1() {
            const response = await httpCall(searchUrl);
            if (response.errors.error[0].status === 400 && response.errors.error[0].message === "Your search resulted in zero results.Change your parameters and try again") {
                passOrFail = true;
            }
            return passOrFail;
        };
    });