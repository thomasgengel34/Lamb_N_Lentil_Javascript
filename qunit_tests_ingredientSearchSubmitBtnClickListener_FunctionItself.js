 "use strict";


QUnit.test("ingredientSearchSubmitBtnClickListener_FunctionItself A Hello World Test", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
}); 

QUnit.test("verify the correct default query is coded 1", function (assert) {
    let done = assert.async();
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = "";
        done();
        QUnit.assert.equal(returned, expected);
    });
    async function innerTest1() {
        const throwAway = await foodList.ingredientSearchSubmitBtnClickListener();
        const response = foodList.clickListenerQueryDefaultParameter; 
        return response;
    }

});


QUnit.test("verify the correct default search function is coded 2", function (assert) {
    let done = assert.async();
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = "";
        done();
        QUnit.assert.equal(returned, expected);
    });
    async function innerTest1() {
        const throwAway = await foodList.ingredientSearchSubmitBtnClickListener();
        const response = foodList.clickListenerFilterStringDefaultParameter;
         
        return response;
    }

});


QUnit.test("verify the correct default search function is coded 3", function (assert) {
    let done = assert.async();
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = ui.ascendDescend.ascend;
        done();
        QUnit.assert.equal(returned, expected);
    });
    async function innerTest1() {
        const throwAway = await foodList.ingredientSearchSubmitBtnClickListener();
        const response = foodList.clickListenerSortOrderDefaultParameter; 
        return response;
    }

});

QUnit.test("verify the correct default search function is coded 4", function (assert) {
    let done = assert.async();
    setTimeout(async function () {
        let returned = await innerTest1(); 
       const expected = httpFoodList.ingredientSearchSubmit;
        done();
        QUnit.assert.equal(returned, expected);
    });
    async function innerTest1() {
        const throwAway = await foodList.ingredientSearchSubmitBtnClickListener();
        const response =  foodList.clickListenerSearchFunctionDefaultParameter; 
        return response;
    } 
});


QUnit.test("verify the correct query parameter is passed 5", function (assert) {
    let done = assert.async();
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = "Kaamchatka";
        done();
        QUnit.assert.equal(returned, expected);
    });
    async function innerTest1() {
        const throwAway = await foodList.ingredientSearchSubmitBtnClickListener("Kaamchatka");
        const response = foodList.clickListenerQueryDefaultParameter;
        return response;
    }
});