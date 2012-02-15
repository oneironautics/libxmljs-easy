var assert = require("assert");

describe("easy", function() {
    var easy = require("./main.js");

    var sampleXml = '<books><book name="Lord of the Rings">' +
                        '<author name="J. R. R. Tolkien"/>' +
                        '<language>English</language>' +
                    '</book></books>';

    it("should parse XML into JS object", function() {
        var xml = easy.parse(sampleXml);
        assert.ok(xml);
        assert.ok(xml.book);
        assert.equal(xml.book.length, 1);
        assert.equal(xml.book[0].$name, "Lord of the Rings");
        assert.equal(xml.book[0].author[0].$name, "J. R. R. Tolkien");
    });

    it("should save original DOM element in '$' property", function() {
        var xml = easy.parse(sampleXml);
        assert.ok(xml.$);
        assert.equal(xml.book.language[0].$.text(), "English");
    });

    it("should allow non-array shorthands", function() {
        var xml = easy.parse(sampleXml);
        assert.equal(xml.book.$name, "Lord of the Rings");
        assert.equal(xml.book.author.$name, "J. R. R. Tolkien");
    });

    it("should allow conversion back to XML", function() {
        var xml = easy.parse(sampleXml);
        assert.equal(xml.$.toString(), sampleXml);
    });

    it("should allow to modify attributes", function() {
        var xml = easy.parse(sampleXml);
        xml.book[0].$name = "My Book";
        assert.equal(xml.$.toString(),
            '<books><book name="My Book">' +
                '<author name="J. R. R. Tolkien"/>' +
                '<language>English</language>' +
            '</book></books>');
    });

    it("should allow to delete child elements", function() {
        var xml = easy.parse(sampleXml);
        xml.book[0].author = null;
        xml.book[0].language = [];
        assert.equal(xml.$.toString(),
            '<books><book name="Lord of the Rings"/>' +
            '</books>');
    });

    it("should allow to replace element's text", function() {
        var xml = easy.parse(sampleXml);
        xml.book[0].language = "";
        assert.equal(xml.$.toString(),
            '<books><book name="Lord of the Rings">' +
                '<author name="J. R. R. Tolkien"/>' +
                '<language></language>' +
            '</book></books>');
    });
    it("should allow to create new elements with text", function() {
        var xml = easy.parse(sampleXml);
        xml.book[0].genre = "Fantasy";
        assert.equal(xml.$.toString(),
            '<books><book name="Lord of the Rings">' +
                '<author name="J. R. R. Tolkien"/>' +
                '<language>English</language>' +
                '<genre>Fantasy</genre>' +
            '</book></books>');
    });
});
