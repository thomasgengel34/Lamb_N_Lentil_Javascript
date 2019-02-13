"use strict";

QUnit.test("ui hello test", function (assert) {
    assert.ok(1 === 1, "Passed!");
});

QUnit.test("ui-1 returns a set of food items in proper order with the textbox populated", function (assert) {
    assert.ok(1 === 2, "Passed!");
});
 
 /* 
  * returns an error message with no returns and filter not checked
  * returns a filtered set correctly
  * returns a reverse filter set correctly
  * returns a sorted set a to z
  * returns a sorted set z to a
  * 
  * selecting sort option a to z will trigger a to z sort
  * selectiong sort option z to a will trigger z to a sort
  * 
  * filter and search options are always visible
  * 
  * changing the search text will still retain the filter text and the filter checkbox and sort
  * 
  * changing the filter text will not change the search - it should operate on the set already present
  * 
  * changing the sort will not change the search text or the filter text
  * 
  */ 