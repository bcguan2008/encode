function Base64(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    this.encode = function (input) {
        var index = 0, output = "",
            chr1, chr2, chr3,
            enchr1, enchr2, enchr3, enchr4;
        var val = input;

        while (index < val.length) {
            chr1 = val.charCodeAt(index++),
                chr2 = val.charCodeAt(index++),
                chr3 = val.charCodeAt(index++);
            enchr1 = chr1 >> 2;
            enchr2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enchr3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enchr4 = (chr3 & 63);

            output = output +
                keyStr.charAt(enchr1) + keyStr.charAt(enchr2) +
                keyStr.charAt(enchr3) + keyStr.charAt(enchr4);
        }

        return output;
    }
}

module.exports = Base64;
