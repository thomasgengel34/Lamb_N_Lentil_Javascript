"use strict";

QUnit.test("qunit_tests_ui A Hello World Test", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

QUnit.test("qunit_tests_ui 1 returns correct default settings", function (assert) {
    const returned = ui.getDataFromFoodSearchInput();
    const expected = {
        "searchString":"",
        "filterString": "",
        "excludeOrInclude": ui.excludeInclude.include,
        "sortOrder": ui.ascendDescend.ascend
    }; 
    assert.deepEqual(returned, expected);

});

QUnit.test("qunit_tests_ui 2 returns correct changd settings", function (assert) {
    const returned = ui.getDataFromFoodSearchInput("aardvark","aaa",ui.excludeInclude.exclude,ui.ascendDescend.descend);
    const expected = {
        "searchString": "aardvark",
        "filterString": "aaa",
        "excludeOrInclude": ui.excludeInclude.exclude,
        "sortOrder": ui.ascendDescend.descend
    };
    assert.deepEqual(returned, expected);

});