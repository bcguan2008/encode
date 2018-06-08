var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var Base64 = require('../src/base64');

describe('Test Base64', function () {

    var base = new Base64();

    it('Base64 has encode function', function () {
        base.encode.should.be.a('function');
    });

    it('Test ASCII encode', function () {
        var encodeTextMan = base.encode('Man'),
            encodeTextMa = base.encode('Ma'),
            encodeTextM = base.encode('M');

        encodeTextMan.should.be.equal('TWFu');
        encodeTextMa.should.be.equal('TWE=');
        encodeTextM.should.be.equal('TQ==');
    });

    it('Test ASCII decode', function () {
        var decodeTextMan = base.decode('TWFu'),
            decodeTextMa = base.decode('TWE='),
            decodeTextM = base.decode('TQ==');

        decodeTextMan.should.be.equal('Man');
        decodeTextMa.should.be.equal('Ma');
        decodeTextM.should.be.equal('M');
    })

    it('Test Unicode encode', function () {
        var encodeText = base.encode('管');
        encodeText.should.be.equal('566h');
    })

    it('Test Unicode decode', function () {
        var decodeText = base.decode('566h');
        decodeText.should.be.equal('管');
    })
})