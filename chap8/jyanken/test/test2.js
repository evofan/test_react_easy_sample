import Nightmare from "nightmare";
import assert from "assert";

describe("ジャンケンアプリ", () => {

    const nightmare = new Nightmare({ show: false });

    it("アクセスすると「ジャンケンぽん！」と表示されている", (done) => {
        nightmare
            .goto('http://localhost:8080/index.html')
            .evaluate(() => {
                return document.querySelector('h1').innerText
            })
            .then((title) => {
                assert.equal(title, 'ジャンケンぽん！')
            })
    });

});
