var glo;
var isZombie;

function main() {
    if (localStorage.getItem("game") != '1') {
        localStorage.setItem('game', '0');
    }
    var message = [
            ndef.textRecord("game" + localStorage.getItem("game"))
    ];
    nfc.share(message, function() {
    }, function() {
        alert("error in sending tag share")
    })
    nfc.addNdefListener(function(tag) {
        glo = tag
        var s = ""
        var g = 0
        var z = 0
        var a = glo.tag.ndefMessage[0].payload;
        for (var i = 3; i < a.length; i++) {
            s += String.fromCharCode(a[i])
        }
        z = s[s.length - 1]
        for (var i = 0; i < s.length - 1; i++) {
            g += s[i]
        }
        if (z == '1') {
            if (localStorage.getItem("game") == "0") { alert("You are a zombie") }
            localStorage.setItem('game', '1');
            main();
        } else if (z == '0') {} else alert("error")
    });
}
setTimeout(function(){main()}, 1000);