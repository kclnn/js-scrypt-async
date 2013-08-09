function output(x) {
    document.getElementById("output").innerHTML += x + "\n";
}

function clear_output() {
    document.getElementById("output").innerHTML = "";
}

var num_progress_callbacks;

var hex_digit_value = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 10,
    "A": 10,
    "b": 11,
    "B": 11,
    "c": 12,
    "C": 12,
    "d": 13,
    "D": 13,
    "e": 14,
    "E": 14,
    "f": 15,
    "F": 15
};

function from_hex(s) {
    if (s.length & 1) throw {
        message: "from_hex: odd-length input"
    };
    var result = new Uint8Array(s.length / 2);
    for (var i = 0; i < s.length; i += 2) {
        var v1 = hex_digit_value[s[i]];
        var v2 = hex_digit_value[s[i + 1]];
        if ((typeof v1 === "undefined")) throw {
            message: "Illegal hex digit: " + s[i]
        };
        if ((typeof v2 === "undefined")) throw {
            message: "Illegal hex digit: " + s[i + 1]
        };
        result[i >> 1] = (v1 << 4) | v2;
    }
    return result;
}
var tests = [{
    password: "",
    salt: "",
    N: 16,
    r: 1,
    p: 1,
    expected: "77d6576238657b203b19ca42c18a0497f16b4844e3074ae8dfdffa3fede21442fcd0069ded0948f8326a753a0fc81f17e8d3e0fb2e0d3628cf35e20c38d18906"
}, {
    password: "password",
    salt: "NaCl",
    N: 1024,
    r: 8,
    p: 16,
    expected: "fdbabe1c9d3472007856e7190d01e9fe7c6ad7cbc8237830e77376634b3731622eaf30d92e22a3886ff109279d9830dac727afb94a83ee6d8360cbdfa2cc0640"
}, {
    password: "pleaseletmein",
    salt: "SodiumChloride",
    N: 16384,
    r: 8,
    p: 1,
    expected: "7023bdcb3afd7348461c06cd81fd38ebfda8fbba904f8e3ea9b543f6545da1f2d5432955613f0fcf62d49705242a9af9e61e85dc0d651e40dfcf017b45575887"
}];

function do_test_sync(testnum) {
    if (testnum < 0 || testnum >= tests.length) {
        output("Invalid testnum.");
        return;
    }
    var expected = from_hex(tests[testnum].expected);
    var startTime = new Date().getTime();
    var res = scrypt.crypto_scrypt(scrypt.encode_utf8(tests[testnum].password),
        scrypt.encode_utf8(tests[testnum].salt),
        tests[testnum].N, tests[testnum].r, tests[testnum].p, expected.length);
    var stopTime = new Date().getTime();
    output("Milliseconds for " + tests[testnum].password + "/" + tests[testnum].salt + "/" + tests[testnum].N + "/" + tests[testnum].r + "/" + tests[testnum].p + ": " +
        (stopTime - startTime));
    if (scrypt.to_hex(res) !== tests[testnum].expected) {
        output("FAILED");
    }
    output("expected: " + tests[testnum].expected);
    output("output:   " + scrypt.to_hex(res));
}

function do_test_async(testnum) {
    if (testnum < 0 || testnum >= tests.length) {
        output("Invalid testnum.");
        return;
    }
    var async_steps = get_async_steps();
    if (isNaN(async_steps)) {
        output("Invalid async steps.");
        return;
    }
    var expected = from_hex(tests[testnum].expected);
    var startTime = new Date().getTime();
    var running = scrypt.crypto_scrypt_async(scrypt.encode_utf8(tests[testnum].password),
        scrypt.encode_utf8(tests[testnum].salt),
        tests[testnum].N, tests[testnum].r, tests[testnum].p, expected.length,
        function (success, result) {
            var stopTime = new Date().getTime();
            async_progress(100);
            output("Milliseconds for " + tests[testnum].password + "/" + tests[testnum].salt + "/" + tests[testnum].N + "/" + tests[testnum].r + "/" + tests[testnum].p + " (ASYNC, " + num_progress_callbacks + " progress callbacks): " +
                (stopTime - startTime));
            if (scrypt.to_hex(result) !== tests[testnum].expected) {
                output("FAILED");
            }
            output("expected: " + tests[testnum].expected);
            output("output:   " + scrypt.to_hex(result));
        },
        async_progress,
        async_steps
    );
    if (running === 0) {
        num_progress_callbacks = 0;
        output("Starting...");
    } else {
        output("Could not start async key derivation. Maybe it is still running?");
    }
}

function async_progress(progress) {
    num_progress_callbacks++;
    document.getElementById("progress").innerHTML = Math.round(progress) + "%";
}


function do_my_test(async) {
    var password = document.getElementById("password").value;
    var salt = document.getElementById("salt").value;
    var N = parseInt(document.getElementById("N").value);
    var r = parseInt(document.getElementById("r").value);
    var p = parseInt(document.getElementById("p").value);
    var outputBytes = parseInt(document.getElementById("bytes").value);
    if (!async) {
        var startTime = new Date().getTime();
        var res = scrypt.crypto_scrypt(scrypt.encode_utf8(password),
            scrypt.encode_utf8(salt),
            N, r, p, outputBytes);
        var stopTime = new Date().getTime();
        output("Milliseconds for " + password + "/" + salt + "/" + N + "/" + r + "/" + p + ": " +
            (stopTime - startTime));
        output("output:   " + scrypt.to_hex(res));
    } else {
        var asyncSteps = get_async_steps();
        if (isNaN(asyncSteps)) {
            output("Invalid async steps.");
            return;
        }
        var startTime = new Date().getTime();
        var running = scrypt.crypto_scrypt_async(scrypt.encode_utf8(password),
            scrypt.encode_utf8(salt),
            N, r, p, outputBytes,
            function (success, result) {
                var stopTime = new Date().getTime();
                async_progress(100);
                output("Milliseconds for " + password + "/" + salt + "/" + N + "/" + r + "/" + p + " (ASYNC, " + num_progress_callbacks + " progress callbacks): " +
                    (stopTime - startTime));
                output("output:   " + scrypt.to_hex(result));
            },
            async_progress,
            asyncSteps);
        if (running === 0) {
            num_progress_callbacks = 0;
            output("Starting...");
        } else {
            output("Could not start async key derivation. Maybe it is still running?");
        }
    }

}

function get_async_steps() {
    return parseInt(document.getElementById("asyncsteps").value);
}

function set_async_steps(num) {
    document.getElementById("asyncsteps").value = num;
}

function main() {
    var tbl = document.createElement('table');

    for (var i = 0; i < tests.length; i++) {
        var tr = tbl.insertRow();
        tr.insertCell().appendChild(document.createTextNode(tests[i].password));
        tr.insertCell().appendChild(document.createTextNode(tests[i].salt));
        tr.insertCell().appendChild(document.createTextNode(tests[i].N));
        tr.insertCell().appendChild(document.createTextNode(tests[i].r));
        tr.insertCell().appendChild(document.createTextNode(tests[i].p));
        tr.insertCell().appendChild(document.createTextNode(64));
        tr.insertCell().innerHTML = '<button onclick="do_test_sync(' + i + ');">Sync</button>';
        tr.insertCell().innerHTML = '<button onclick="do_test_async(' + i + ');">Async</button>';
    }
    var inputtr = tbl.insertRow();
    inputtr.insertCell().innerHTML = '<input type="text" id="password" value="pleaseletmein" />';
    inputtr.insertCell().innerHTML = '<input type="text" id="salt" value="SodiumChloride" />';
    inputtr.insertCell().innerHTML = '<select id="N"></select>';
    inputtr.insertCell().innerHTML = '<select id="r"></select>';
    inputtr.insertCell().innerHTML = '<select id="p"></select>';
    inputtr.insertCell().innerHTML = '<select id="bytes"></select>';
    inputtr.insertCell().innerHTML = '<button onclick="do_my_test(false);">Sync</button>';
    inputtr.insertCell().innerHTML = '<button onclick="do_my_test(true);">Async</button>';

    var thead = tbl.createTHead();
    var tr = thead.insertRow();
    tr.insertCell().appendChild(document.createTextNode("Password"));
    tr.insertCell().appendChild(document.createTextNode("Salt"));
    tr.insertCell().appendChild(document.createTextNode("N"));
    tr.insertCell().appendChild(document.createTextNode("r"));
    tr.insertCell().appendChild(document.createTextNode("p"));
    tr.insertCell().appendChild(document.createTextNode("# bytes produced"));
    var testcell = tr.insertCell();
    testcell.colSpan = "2";
    testcell.appendChild(document.createTextNode("Run"));
    document.getElementById("topdiv").appendChild(tbl);

    var Nselect = document.getElementById("N");
    for (var exp = 4; exp <= 19; exp++) {
        var num = Math.pow(2, exp);
        Nselect.options[Nselect.options.length] = new Option(num, num);
    }
    Nselect.selectedIndex = 10;

    var rselect = document.getElementById("r");
    for (var r = 1; r <= 16; r++) {
        rselect.options[rselect.options.length] = new Option(r, r);
    }
    rselect.selectedIndex = 7;

    var pselect = document.getElementById("p");
    for (var p = 1; p <= 16; p++) {
        pselect.options[pselect.options.length] = new Option(p, p);
    }
    pselect.selectedIndex = 0;

    var bytesselect = document.getElementById("bytes");
    for (var exp = 4; exp <= 10; exp++) {
        var num = Math.pow(2, exp);
        bytesselect.options[bytesselect.options.length] = new Option(num, num);
    }
    bytesselect.selectedIndex = 2;
}

window.onload = main;
