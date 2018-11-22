 async function testTemp() {
    const searchTerm = "Apache";
    const searchUrl = buildFoodListSearchUrl(searchTerm); // tested in site-4
    var foo = await fetchUsers(searchUrl);
    console.log(foo);
    let passOrFail = false;
    if (foo.list.q ==="Apache") {
        passOrFail =  true;
    }
    alert(passOrFail);
};

QUnit.test("http hello", function (assert) {
    assert.ok(1 === 1, "Passed! Makes sure file is working in qunit");
});