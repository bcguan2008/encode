var UTF8 = require('./utf8');

function Base64(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var utf8 = new UTF8();
    this.encode = function (input) {
        var index = 0, output = "",
            chr1, chr2, chr3,
            enchr1, enchr2, enchr3, enchr4;
        var val = utf8.encode(input);

        while (index < val.length) {
            chr1 = val.charCodeAt(index++),
                chr2 = val.charCodeAt(index++),
                chr3 = val.charCodeAt(index++);
            enchr1 = chr1 >> 2;
            enchr2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enchr3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enchr4 = (chr3 & 63);

            if (isNaN(chr2)) {
                enchr3 = enchr4 = 64;
            } else if (isNaN(chr3)) {
                enchr4 = 64;
            }

            output = output +
                keyStr.charAt(enchr1) + keyStr.charAt(enchr2) +
                keyStr.charAt(enchr3) + keyStr.charAt(enchr4);
        }
        return output;
    }

    this.decode = function (input) {
        var i = 0, output = "",
            chr1, chr2, chr3,
            enchr1, enchr2, enchr3, enchr4;
        var val = input;
        while (i < val.length) {
            enchr1 = keyStr.indexOf(val.charAt(i++));
            enchr2 = keyStr.indexOf(val.charAt(i++));
            enchr3 = keyStr.indexOf(val.charAt(i++));
            enchr4 = keyStr.indexOf(val.charAt(i++));

            chr1 = (enchr1 << 2) | (enchr2 >> 4);
            chr2 = ((enchr2 & 15) << 4) | (enchr3 >> 2);
            chr3 = ((enchr3 & 3) << 6) | enchr4;

            output = output + String.fromCharCode(chr1);
            if (enchr3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enchr4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        return utf8.decode(output);
    }
}

module.exports = Base64;



/**
 * 
 * 
 * 
 * 
 * 
 */