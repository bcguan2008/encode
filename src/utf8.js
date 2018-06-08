function UTF8() {
    this.encode = function (input) {
        var i = 0, utfText = "",
            enchr1, enchr2, enchr3;
        while (i < input.length) {
            var code = input.charCodeAt(i++),
                outputArray = [];
            if (code < 128) {
                enchr1 = String.fromCharCode(code);
            } else if (code > 127 && code < 2048) {
                enchr1 = String.fromCharCode((192 | (code >> 6)));
                enchr2 = String.fromCharCode((128 | (code & 63)));
            } else if (code > 2047 && code < 65536) {
                enchr1 = String.fromCharCode((224 | (code >> 12)));
                enchr2 = String.fromCharCode((128 | ((code >> 6) & 63)));
                enchr3 = String.fromCharCode((128 | (code & 63)));
            } else if (code > 65535) {
                'TODO';
            }
            outputArray.push(enchr1);
            enchr2 && outputArray.push(enchr2);
            enchr3 && outputArray.push(enchr3);
            utfText += outputArray.reduce(function (a, b) {
                return a + b;
            });
        }
        return utfText;
    }

    this.decode = function (utfText) {
        var output = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utfText.length) {
            c = utfText.charCodeAt(i);
            if (c < 128) {
                output += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utfText.charCodeAt(i + 1);
                output += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utfText.charCodeAt(i + 1);
                c3 = utfText.charCodeAt(i + 2);
                output += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return output;
    }
}

module.exports = UTF8;