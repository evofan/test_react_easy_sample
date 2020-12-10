import assert from "assert";

it("1+1は2である", () => { // ■it()はテストを行う関数、it(テストの説明文字列、テストコードの無名関数)
    // ■assert.equal(テスト売る式・値, 正解の式・値)
    assert.equal(1 + 1, 2); // ok
    // assert.equal(1 + 1, 3); // err
});
