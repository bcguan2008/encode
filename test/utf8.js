var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var Utf8 = require('../src/utf8');

describe('Test Base64', function () {

    var base = new Utf8();
   
    it('Test Unicode encode', function () {
        var encodeText = base.encode('管');
        encodeText.should.be.equal('ç®¡');
    })

    it('Test Unicode decode',function(){
        base.decode('ç®¡').should.be.equal('管');
    })

    it('Test ASCII encode',function(){
        var encodeText = base.encode('A');
        encodeText.should.be.equal('A');
    })

})