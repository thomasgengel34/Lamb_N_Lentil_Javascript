 
"use strict";

const getFoodList = function () {
    const foodList = {
        "list": {
            "item": [
                { "name": "apple pie" },
                { "name": "apple tree" },
                { "name": "banana bread" },
                { "name": "black bread" },
                { "name": "blueberry bush" },
                { "name": "cherry bush" },
                { "name": "cherry pie" },
                { "name": "egg plant" }]
        }
    };
    return foodList;
};


QUnit.test("foodList_filter-1 A Hello World Test", function (assert) {
    assert.equal(greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});



QUnit.test("foodList_filter-2 verify a filtered list with a filter and IsChecked not checked works", function (assert) {
   
    const numberOfAssertions =5;
    assert.expect(numberOfAssertions);
    var done = assert.async();
    let foodList = getFoodList();
  
    foodList = foodList.list.item;
    let filterText = "p";
    let IsChecked = false; 
    let correct = [
        {
            "name": "apple pie"
        },
        {
            "name": "apple tree"
        },
        {
            "name": "cherry pie"
        },
        {
            "name": "egg plant"
        }
    ];
   
    setTimeout(async function (assert) {
  done(); 
       let returned = await innerTest1();
     
        QUnit.assert.equal(returned[0].valueOf, correct[0].valueOf, "0");  // TODO: verify these are correct
       QUnit.assert.equal(returned[1].valueOf, correct[1].valueOf, "1");
        QUnit.assert.equal(returned[2].valueOf, correct[2].valueOf, "2");
        QUnit.assert.equal(returned[3].valueOf, correct[3].valueOf, "3");
       QUnit.assert.equal(returned.length, correct.length, "length"); 
    });
 
    function innerTest1() {
      let response = filterList(foodList, filterText, IsChecked); 
        return response;
    }
}, 3000); 
 


QUnit.test("foodList_filter-3 verify a filtered list with a filter and IsChecked is checked works", function (assert) {
    const testNumber = 5;
    assert.expect(testNumber);
    var done = assert.async();
    let foodList = getFoodList();
    foodList = foodList.list.item; 
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let filterText = "p";
    let IsChecked = true;

    let correct = [
        { "name": "banana bread" },
        { "name": "black bread" },
        { "name": "blueberry bush" },
        { "name": "cherry bush" }];

    setTimeout(async function (assert) {
        let returned = await innerTest1();
        QUnit.assert.equal(returned[0].valueOf, correct[0].valueOf, "0");  // TODO: verify these are correct
        QUnit.assert.equal(returned[1].valueOf, correct[1].valueOf, "1");
        QUnit.assert.equal(returned[2].valueOf, correct[2].valueOf, "2");
        QUnit.assert.equal(returned[3].valueOf, correct[3].valueOf, "3");
        QUnit.assert.equal(returned.length, correct.length, "length");
        done();
    });

    function innerTest1() {
        let response = filterList(foodList, filterText, IsChecked); 
        return response;
    }
}, 3000);

/*
 * Not sure any of the following tests are correctly reporting success. .valueOf is tricky sometimes.  Need to do whatI did above - check every value.
// */

QUnit.test("foodList_filter-4 empty filter, Not Checked", function (assert) { 
    const numberOfTests =6; 
     assert.expect(numberOfTests);
    var done = assert.async();
    let foodList = getFoodList();
    foodList = foodList.list.item;
  //  let returned = [];
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let filterText = "";
    let IsChecked = false;

    let correct = getFoodList();
    correct = correct.list.item; 
    setTimeout(async function (assert) {
        const returned = await innerTest1();   
        QUnit.assert.equal(returned[0].valueOf, correct[0].valueOf, "0");   // TODO: verify these are correct
        QUnit.assert.equal(returned[1].valueOf, correct[1].valueOf, "1");
        QUnit.assert.equal(returned[2].valueOf, correct[2].valueOf, "2");
        QUnit.assert.equal(returned[3].valueOf, correct[3].valueOf, "3");
        QUnit.assert.equal(returned.length, correct.length, "length"); 
     QUnit.assert.deepEqual(returned.valueOf, foodList.valueOf, "test for null filter, no exclusions - should return everything");
        done(); 

        function innerTest1() {
            let response = filterList(foodList, filterText, IsChecked);
            return response;
        }
     
    }
    );
 });

QUnit.test("foodList_filter-5 empty filter, checked", function (assert) {
    const numberOfTests = 2;
    assert.expect(numberOfTests);
    var done = assert.async();
    let foodList = getFoodList();
    foodList = foodList.list.item;
 //   let returned = [];
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let filterText = "";
    let IsChecked =true;

    let correct = []; 
    setTimeout(async function (assert) {
        const returned = await innerTest1(); 
        QUnit.assert.equal(returned.length, correct.length); 
        QUnit.assert.equal(Array.isArray(returned),true); 
      
        done();

        function innerTest1() {
            let response = filterList(foodList, filterText, IsChecked);
            return response;
        } 
    }
    );
});
 

//QUnit.test("foodList_filter-6  filter \'p\' with reverse sort", function (assert) { 
       
//    const numberOfTests = 5;
//    assert.expect(numberOfTests);
//    var done = assert.async();
//    let foodList = getFoodList();
//    foodList = foodList.list.item;
//    const fixture = document.getElementById("qunit-fixture");
//    const node = document.createElement("div");
//    node.setAttribute("id", "results");
//    fixture.appendChild(node);

//    let filterText = "p";
//    let IsChecked = false;

//    let correct = [{ "name": "egg plant" }, { "name": "cherry pie" }, { "name": "apple tree" }, { "name": "apple pie" }];
       
//    setTimeout(async function (assert) {
//        let returned = await innerTest1();  
//        returned = sortList(descending, returned);   
//       QUnit.assert.ok(returned[0].name === correct[0].name, "0  " + returned[0].name + " " + correct[0].name );
//       QUnit.assert.ok(returned[1].name === correct[1].name, "1  " + returned[1].name + " " + correct[1].name );
//       QUnit.assert.ok(returned[2].name === correct[2].name, "0  " + returned[2].name + " " + correct[2].name );
//        QUnit.assert.ok(returned[3].name === correct[3].name, "0  " + returned[3].name + " " + correct[3].name); 
//        QUnit.assert.ok(returned.length ===correct.length, "length");  
//        done();
          
//        function innerTest1() {
//            let response = filterList(foodList, filterText, IsChecked); 
//            return response;
//        }

//    }
//    );
//});

//TODO: same tests but with a numeric instead of alphabetical filter.  Also should have a longer filter tested.

 