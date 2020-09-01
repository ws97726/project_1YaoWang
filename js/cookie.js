function setCookie(key, val, day) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + day);
    document.cookie = key + "=" + val + ";expires=" + oDate;
}

function getCookie(key) {
    var str = document.cookie;
    var arr = str.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split("=");
        if (newArr[0] == key) {
            return newArr[1];
        }
    }
}

function removeCookie(key) {
    setCookie(key, 1, -1);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb29raWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0Q29va2llKGtleSwgdmFsLCBkYXkpIHtcclxuICAgIHZhciBvRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBvRGF0ZS5zZXREYXRlKG9EYXRlLmdldERhdGUoKSArIGRheSk7XHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBrZXkgKyBcIj1cIiArIHZhbCArIFwiO2V4cGlyZXM9XCIgKyBvRGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29va2llKGtleSkge1xyXG4gICAgdmFyIHN0ciA9IGRvY3VtZW50LmNvb2tpZTtcclxuICAgIHZhciBhcnIgPSBzdHIuc3BsaXQoXCI7IFwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIG5ld0FyciA9IGFycltpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgaWYgKG5ld0FyclswXSA9PSBrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUNvb2tpZShrZXkpIHtcclxuICAgIHNldENvb2tpZShrZXksIDEsIC0xKTtcclxufSJdLCJmaWxlIjoiY29va2llLmpzIn0=
