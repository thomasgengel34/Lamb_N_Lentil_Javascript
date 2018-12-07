"use strict"

QUnit.test("foodList-1 A Hello World Test", function (assert) {
    assert.equal(greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

QUnit.test("foodList-2 The search shows up in the results for search on Apache", function (assert) {
    let done = assert.async();
    const searchTerm = "Apache";
    const searchUrl = buildFoodListSearchUrl(searchTerm);
    let passOrFail = false;
    const correct =  getApacheList(); 

    setTimeout(async function () {
        let returned = await innerTest1();
        assert.equal(returned, true, "Call returned query successfully for name from search on Apache");
        done();
    });

    async function innerTest1() {
        let response = await httpCall(searchUrl); 
        response = JSON.stringify(response);

        
        console.log(new String(response.replace(/\s+/g, '')).valueOf() === new String(correct.replace(/\s+/g, '')).valueOf());
        if (new String(response.replace(/\s+/g, '')).valueOf() === new String(correct.replace(/\s+/g, '')).valueOf()) {
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