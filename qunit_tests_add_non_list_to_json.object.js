"use strict"

QUnit.test("qunit_tests_add_non_List_to_json_object.js - A Hello World Test", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

const qunit_tests_add_non_list_to_json_object = {
    baseObject: { "ichi": 0, "ni": 1, "san": "a" } 
};
