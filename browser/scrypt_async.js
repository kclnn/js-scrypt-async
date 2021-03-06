var scrypt = (function () {
        var Module = {};
        var scrypt_raw = Module;

        function a(b) {
            throw b
        }
        var la = void 0,
            n = !0,
            t = null,
            v = !1,
            w;
        try {
            this.Module = Module
        } catch (qa) {
            this.Module = Module = {}
        }
        var za = "object" === typeof process && "function" === typeof require,
            gb = "object" === typeof window,
            rb = "function" === typeof importScripts,
            sb = !gb && !za && !rb;
        if (za) {
            Module.print = (function (b) {
                process.stdout.write(b + "\n")
            });
            Module.printErr = (function (b) {
                process.stderr.write(b + "\n")
            });
            var Bb = require("fs"),
                Hb = require("path");
            Module.read = (function (b) {
                var b = Hb.normalize(b),
                    e = Bb.readFileSync(b).toString();
                !e && b != Hb.resolve(b) && (b = path.join(__dirname, "..", "src", b), e = Bb.readFileSync(b).toString());
                return e
            });
            Module.load = (function (b) {
                Ib(read(b))
            });
            Module.arguments || (Module.arguments = process.argv.slice(2))
        }
        sb && (Module.print = print, "undefined" != typeof printErr && (Module.printErr = printErr), Module.read = "undefined" != typeof read ? read : (function (b) {
            snarf(b)
        }), Module.arguments || ("undefined" != typeof scriptArgs ? Module.arguments = scriptArgs : "undefined" != typeof arguments && (Module.arguments = arguments)));
        gb && !rb && (Module.print || (Module.print = (function (b) {
            console.log(b)
        })), Module.printErr || (Module.printErr = (function (b) {
            console.log(b)
        })));
        if (gb || rb) {
            Module.read = (function (b) {
                var e = new XMLHttpRequest;
                e.open("GET", b, v);
                e.send(t);
                return e.responseText
            }), Module.arguments || "undefined" != typeof arguments && (Module.arguments = arguments)
        }
        rb && (Module.print || (Module.print = (function () {})), Module.load = importScripts);
        !rb && !gb && !za && !sb && a("Unknown runtime environment. Where are we?");

        function Ib(b) {
            eval.call(t, b)
        }
        "undefined" == !Module.load && Module.read && (Module.load = (function (b) {
            Ib(Module.read(b))
        }));
        Module.print || (Module.print = (function () {}));
        Module.printErr || (Module.printErr = Module.print);
        Module.arguments || (Module.arguments = []);
        Module.print = Module.print;
        Module.u = Module.printErr;
        Module.preRun || (Module.preRun = []);
        Module.postRun || (Module.postRun = []);
        var Kb;

        function Lb() {
            var b = [],
                e = 0;
            this.qa = (function (c) {
                c &= 255;
                e && (b.push(c), e--);
                if (0 == b.length) {
                    if (128 > c) {
                        return String.fromCharCode(c)
                    }
                    b.push(c);
                    e = 191 < c && 224 > c ? 1 : 2;
                    return ""
                }
                if (0 < e) {
                    return ""
                }
                var c = b[0],
                    d = b[1],
                    f = b[2],
                    c = 191 < c && 224 > c ? String.fromCharCode((c & 31) << 6 | d & 63) : String.fromCharCode((c & 15) << 12 | (d & 63) << 6 | f & 63);
                b.length = 0;
                return c
            });
            this.Ha = (function (b) {
                for (var b = unescape(encodeURIComponent(b)), d = [], e = 0; e < b.length; e++) {
                    d.push(b.charCodeAt(e))
                }
                return d
            })
        }

        function Mb(b) {
            var e = y;
            y = y + b | 0;
            y = y + 3 >> 2 << 2;
            return e
        }

        function Nb(b) {
            var e = Ic;
            Ic = Ic + b | 0;
            Ic = Ic + 3 >> 2 << 2;
            if (Ic >= Jc) {
                for (; Jc <= Ic;) {
                    Jc = 2 * Jc + 4095 >> 12 << 12
                }
                var b = z,
                    c = new ArrayBuffer(Jc);
                Module.HEAP8 = z = new Int8Array(c);
                Module.HEAP16 = Kc = new Int16Array(c);
                Module.HEAP32 = A = new Int32Array(c);
                Module.HEAPU8 = C = new Uint8Array(c);
                Module.HEAPU16 = Lc = new Uint16Array(c);
                Module.HEAPU32 = Mc = new Uint32Array(c);
                Module.HEAPF32 = Pc = new Float32Array(c);
                Module.HEAPF64 = Jd = new Float64Array(c);
                z.set(b)
            }
            return e
        }
        var Kd = 4,
            Ld = {}, Md, Nd;

        function Od(b) {
            Module.print(b + ":\n" + Error().stack);
            a("Assertion: " + b)
        }

        function Pd(b, e) {
            b || Od("Assertion failed: " + e)
        }
        var Qd = this;
        Module.ccall = (function (b, e, c, d) {
            return Rd(Sd(b), e, c, d)
        });

        function Sd(b) {
            try {
                var e = eval("_" + b)
            } catch (c) {
                try {
                    e = Qd.Module["_" + b]
                } catch (d) {}
            }
            Pd(e, "Cannot call unknown function " + b + " (perhaps LLVM optimizations or closure removed it?)");
            return e
        }

        function Rd(b, e, c, d) {
            function f(b, c) {
                if ("string" == c) {
                    if (b === t || b === la || 0 === b) {
                        return 0
                    }
                    h || (h = y);
                    var d = Mb(b.length + 1);
                    Td(b, d);
                    return d
                }
                return "array" == c ? (h || (h = y), d = Mb(b.length), Ud(b, d), d) : b
            }
            var h = 0,
                g = 0,
                d = d ? d.map((function (b) {
                    return f(b, c[g++])
                })) : [];
            b = b.apply(t, d);
            "string" == e ? e = Vd(b) : (Pd("array" != e), e = b);
            h && (y = h);
            return e
        }
        Module.cwrap = (function (b, e, c) {
            var d = Sd(b);
            return (function () {
                return Rd(d, e, c, Array.prototype.slice.call(arguments))
            })
        });

        function Wd(b, e, c) {
            c = c || "i8";
            "*" === c.charAt(c.length - 1) && (c = "i32");
            switch (c) {
            case "i1":
                z[b] = e;
                break;
            case "i8":
                z[b] = e;
                break;
            case "i16":
                Kc[b >> 1] = e;
                break;
            case "i32":
                A[b >> 2] = e;
                break;
            case "i64":
                Md = [e >>> 0, Math.min(Math.floor(e / 4294967296), 4294967295)];
                A[b >> 2] = Md[0];
                A[b + 4 >> 2] = Md[1];
                break;
            case "float":
                Pc[b >> 2] = e;
                break;
            case "double":
                Jd[G >> 3] = e;
                A[b >> 2] = A[G >> 2];
                A[b + 4 >> 2] = A[G + 4 >> 2];
                break;
            default:
                Od("invalid type for setValue: " + c)
            }
        }
        Module.setValue = Wd;
        Module.getValue = (function (b, e) {
            e = e || "i8";
            "*" === e.charAt(e.length - 1) && (e = "i32");
            switch (e) {
            case "i1":
                return z[b];
            case "i8":
                return z[b];
            case "i16":
                return Kc[b >> 1];
            case "i32":
                return A[b >> 2];
            case "i64":
                return A[b >> 2];
            case "float":
                return Pc[b >> 2];
            case "double":
                return A[G >> 2] = A[b >> 2], A[G + 4 >> 2] = A[b + 4 >> 2], Jd[G >> 3];
            default:
                Od("invalid type for setValue: " + e)
            }
            return t
        });
        var ee = 2,
            J = 3;
        Module.ALLOC_NORMAL = 0;
        Module.ALLOC_STACK = 1;
        Module.ALLOC_STATIC = ee;
        Module.ALLOC_NONE = J;

        function K(b, e, c, d) {
            var f, h;
            "number" === typeof b ? (f = n, h = b) : (f = v, h = b.length);
            var g = "string" === typeof e ? e : t,
                c = c == J ? d : [fe, Mb, Nb][c === la ? ee : c](Math.max(h, g ? 1 : e.length));
            if (f) {
                return ge(c, 0, h), c
            }
            for (d = 0; d < h;) {
                var i = b[d];
                "function" === typeof i && (i = Ld.Sa(i));
                f = g || e[d];
                0 === f ? d++ : ("i64" == f && (f = "i32"), Wd(c + d, i, f), 1 == Kd ? f = 1 : (i = {
                    "%i1": 1,
                    "%i8": 1,
                    "%i16": 2,
                    "%i32": 4,
                    "%i64": 8,
                    "%float": 4,
                    "%double": 8
                }["%" + f], i || ("*" == f.charAt(f.length - 1) ? i = Kd : "i" == f[0] && (f = parseInt(f.substr(1)), Pd(0 == f % 8), i = f / 8)), f = i), d += f)
            }
            return c
        }
        Module.allocate = K;

        function Vd(b, e) {
            for (var c = new Lb, d = "undefined" == typeof e, f = "", h = 0, g;;) {
                g = C[b + h];
                if (d && 0 == g) {
                    break
                }
                f += c.qa(g);
                h += 1;
                if (!d && h == e) {
                    break
                }
            }
            return f
        }
        Module.Pointer_stringify = Vd;
        Module.Array_stringify = (function (b) {
            for (var e = "", c = 0; c < b.length; c++) {
                e += String.fromCharCode(b[c])
            }
            return e
        });
        var he = 4096,
            z, C, Kc, Lc, A, Mc, Pc, Jd, y, Ic, ie = Module.TOTAL_STACK || 5242880,
            Jc = Module.TOTAL_MEMORY || 16777216;
        Pd( !! Int32Array && !! Float64Array && !! (new Int32Array(1)).subarray && !! (new Int32Array(1)).set, "Cannot fallback to non-typed array case: Code is too specialized");
        var je = new ArrayBuffer(Jc);
        z = new Int8Array(je);
        Kc = new Int16Array(je);
        A = new Int32Array(je);
        C = new Uint8Array(je);
        Lc = new Uint16Array(je);
        Mc = new Uint32Array(je);
        Pc = new Float32Array(je);
        Jd = new Float64Array(je);
        A[0] = 255;
        Pd(255 === C[0] && 0 === C[3], "Typed arrays 2 must be run on a little-endian system");
        Module.HEAP = la;
        Module.HEAP8 = z;
        Module.HEAP16 = Kc;
        Module.HEAP32 = A;
        Module.HEAPU8 = C;
        Module.HEAPU16 = Lc;
        Module.HEAPU32 = Mc;
        Module.HEAPF32 = Pc;
        Module.HEAPF64 = Jd;
        y = 4 * Math.ceil(.25);
        var G, ke = K(12, "i8", 1);
        G = 8 * Math.ceil(ke / 8);
        Pd(0 == G % 8);
        Ic = ie;
        Pd(Ic < Jc);
        K(le("(null)"), "i8", 1);

        function me(b) {
            for (; 0 < b.length;) {
                var e = b.shift(),
                    c = e.T;
                if ("number" === typeof c) {
                    if (e.O === la) {
                        ne[c]()
                    } else {
                        (e = [e.O]) && e.length ? ne[c].apply(t, e) : ne[c]()
                    }
                } else {
                    c(e.O === la ? t : e.O)
                }
            }
        }
        var oe = [],
            pe = [],
            qe = [];
        Module.String_len = (function (b) {
            for (var e = b; z[e++];) {}
            return e - b - 1
        });

        function le(b, e, c) {
            b = (new Lb).Ha(b);
            c && (b.length = c);
            e || b.push(0);
            return b
        }
        Module.intArrayFromString = le;
        Module.intArrayToString = (function (b) {
            for (var e = [], c = 0; c < b.length; c++) {
                var d = b[c];
                255 < d && (d &= 255);
                e.push(String.fromCharCode(d))
            }
            return e.join("")
        });

        function Td(b, e, c) {
            b = le(b, c);
            for (c = 0; c < b.length;) {
                z[e + c] = b[c], c += 1
            }
        }
        Module.writeStringToMemory = Td;

        function Ud(b, e) {
            for (var c = 0; c < b.length; c++) {
                z[e + c] = b[c]
            }
        }
        Module.writeArrayToMemory = Ud;
        var re = 0,
            se = {}, te = v,
            ue = t;

        function ve(b) {
            re++;
            Module.monitorRunDependencies && Module.monitorRunDependencies(re);
            b ? (Pd(!se[b]), se[b] = 1, ue === t && "undefined" !== typeof setInterval && (ue = setInterval((function () {
                var b = v,
                    c;
                for (c in se) {
                    b || (b = n, Module.u("still waiting on run dependencies:")), Module.u("dependency: " + c)
                }
                b && Module.u("(end of list)")
            }), 6e3))) : Module.u("warning: run dependency added without ID")
        }
        Module.addRunDependency = ve;

        function we(b) {
            re--;
            Module.monitorRunDependencies && Module.monitorRunDependencies(re);
            b ? (Pd(se[b]), delete se[b]) : Module.u("warning: run dependency removed without ID");
            0 == re && (ue !== t && (clearInterval(ue), ue = t), !te && xe && ye())
        }
        Module.removeRunDependency = we;
        Module.preloadedImages = {};
        Module.preloadedAudios = {};
        Pd(Ic == ie);
        Pd(ie == ie);
        Ic += 804;
        Pd(Ic < Jc);
        var ze, Ae;
        K(24, "i8", J, 5242880);
        K([115, 116, 100, 58, 58, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", J, 5242904);
        K([105, 110, 32, 117, 115, 101, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", J, 5242920);
        K([98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", J, 5242948);
        K([115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", J, 5242972);
        K([109, 97, 120, 32, 115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", J, 5243e3);
        K(468, "i8", J, 5243028);
        K([0, 0, 0, 0, 5243588, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], J, 5243496);
        K(1, "i8", J, 5243516);
        K([0, 0, 0, 0, 5243600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], J, 5243520);
        K(1, "i8", J, 5243540);
        K([83, 116, 57, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", J, 5243544);
        K([83, 116, 50, 48, 98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", J, 5243560);
        K(12, "i8", J, 5243588);
        K([0, 0, 0, 0, 0, 0, 0, 0, 5243588, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], J, 5243600);
        K(1, "i8", J, 5243612);
        K(4, "i8", J, 5243616);
        K([128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "i8", J, 5243620);
        A[1310876] = 4;
        A[1310877] = 10;
        A[1310878] = 6;
        A[1310882] = 12;
        A[1310883] = 2;
        A[1310884] = 8;
        Ae = K([2, 0, 0, 0], ["i8*", 0, 0, 0], ee);
        A[1310897] = Ae + 8 | 0;
        A[1310898] = 5243544;
        A[1310899] = la;
        A[1310900] = Ae + 8 | 0;
        A[1310901] = 5243560;

        function Be(b) {
            Ce || (Ce = K([0], "i32", ee));
            A[Ce >> 2] = b
        }
        var Ce;

        function ge(b, e, c) {
            if (20 <= c) {
                for (c = b + c; b % 4;) {
                    z[b++] = e
                }
                0 > e && (e += 256);
                for (var b = b >> 2, d = c >> 2, f = e | e << 8 | e << 16 | e << 24; b < d;) {
                    A[b++] = f
                }
                for (b <<= 2; b < c;) {
                    z[b++] = e
                }
            } else {
                for (; c--;) {
                    z[b++] = e
                }
            }
        }

        function U() {
            a("abort() at " + Error().stack)
        }
        var De = 22,
            Ee = K(1, "i32*", 1),
            Fe = K(1, "i32*", 1);
        ze = K(1, "i32*", 1);
        var Ge = K(1, "i32*", 1),
            He = 2,
            Ie = [t],
            Je = n;

        function Ke(b, e) {
            if ("string" !== typeof b) {
                return t
            }
            e === la && (e = "/");
            b && "/" == b[0] && (e = "");
            for (var c = (e + "/" + b).split("/").reverse(), d = [""]; c.length;) {
                var f = c.pop();
                "" == f || "." == f || (".." == f ? 1 < d.length && d.pop() : d.push(f))
            }
            return 1 == d.length ? "/" : d.join("/")
        }

        function Le(b, e, c) {
            var d = {
                Ea: v,
                S: v,
                error: 0,
                name: t,
                path: t,
                object: t,
                na: v,
                pa: t,
                oa: t
            }, b = Ke(b);
            if ("/" == b) {
                d.Ea = n, d.S = d.na = n, d.name = "/", d.path = d.pa = "/", d.object = d.oa = Me
            } else {
                if (b !== t) {
                    for (var c = c || 0, b = b.slice(1).split("/"), f = Me, h = [""]; b.length;) {
                        1 == b.length && f.B && (d.na = n, d.pa = 1 == h.length ? "/" : h.join("/"), d.oa = f, d.name = b[0]);
                        var g = b.shift();
                        if (f.B) {
                            if (f.ra) {
                                if (!f.i.hasOwnProperty(g)) {
                                    d.error = 2;
                                    break
                                }
                            } else {
                                d.error = 13;
                                break
                            }
                        } else {
                            d.error = 20;
                            break
                        }
                        f = f.i[g];
                        if (f.link && !(e && 0 == b.length)) {
                            if (40 < c) {
                                d.error = 40;
                                break
                            }
                            d = Ke(f.link, h.join("/"));
                            d = Le([d].concat(b).join("/"), e, c + 1);
                            break
                        }
                        h.push(g);
                        0 == b.length && (d.S = n, d.path = h.join("/"), d.object = f)
                    }
                }
            }
            return d
        }

        function Ne(b) {
            Oe();
            b = Le(b, la);
            if (b.S) {
                return b.object
            }
            Be(b.error);
            return t
        }

        function Pe(b, e, c, d, f) {
            b || (b = "/");
            "string" === typeof b && (b = Ne(b));
            b || (Be(13), a(Error("Parent path must exist.")));
            b.B || (Be(20), a(Error("Parent must be a folder.")));
            !b.write && !Je && (Be(13), a(Error("Parent folder must be writeable.")));
            if (!e || "." == e || ".." == e) {
                Be(2), a(Error("Name must not be empty."))
            }
            b.i.hasOwnProperty(e) && (Be(17), a(Error("Can't overwrite object.")));
            b.i[e] = {
                ra: d === la ? n : d,
                write: f === la ? v : f,
                timestamp: Date.now(),
                Da: He++
            };
            for (var h in c) {
                c.hasOwnProperty(h) && (b.i[e][h] = c[h])
            }
            return b.i[e]
        }

        function Qe(b, e, c, d) {
            return Pe(b, e, {
                B: n,
                w: v,
                i: {}
            }, c, d)
        }

        function Re(b, e, c, d) {
            b = Ne(b);
            b === t && a(Error("Invalid parent."));
            for (e = e.split("/").reverse(); e.length;) {
                var f = e.pop();
                f && (b.i.hasOwnProperty(f) || Qe(b, f, c, d), b = b.i[f])
            }
            return b
        }

        function Se(b, e, c, d, f) {
            c.B = v;
            return Pe(b, e, c, d, f)
        }

        function Te(b, e, c, d, f) {
            if ("string" === typeof c) {
                for (var h = Array(c.length), g = 0, i = c.length; g < i; ++g) {
                    h[g] = c.charCodeAt(g)
                }
                c = h
            }
            c = {
                w: v,
                i: c.subarray ? c.subarray(0) : c
            };
            return Se(b, e, c, d, f)
        }

        function Ue(b, e, c, d) {
            !c && !d && a(Error("A device must have at least one callback defined."));
            return Se(b, e, {
                w: n,
                input: c,
                H: d
            }, Boolean(c), Boolean(d))
        }

        function Oe() {
            Me || (Me = {
                ra: n,
                write: n,
                B: n,
                w: v,
                timestamp: Date.now(),
                Da: 1,
                i: {}
            })
        }
        var Ve, Me;

        function We() {
            switch (8) {
            case 8:
                return he;
            case 54:
                ;
            case 56:
                ;
            case 21:
                ;
            case 61:
                ;
            case 63:
                ;
            case 22:
                ;
            case 67:
                ;
            case 23:
                ;
            case 24:
                ;
            case 25:
                ;
            case 26:
                ;
            case 27:
                ;
            case 69:
                ;
            case 28:
                ;
            case 101:
                ;
            case 70:
                ;
            case 71:
                ;
            case 29:
                ;
            case 30:
                ;
            case 199:
                ;
            case 75:
                ;
            case 76:
                ;
            case 32:
                ;
            case 43:
                ;
            case 44:
                ;
            case 80:
                ;
            case 46:
                ;
            case 47:
                ;
            case 45:
                ;
            case 48:
                ;
            case 49:
                ;
            case 42:
                ;
            case 82:
                ;
            case 33:
                ;
            case 7:
                ;
            case 108:
                ;
            case 109:
                ;
            case 107:
                ;
            case 112:
                ;
            case 119:
                ;
            case 121:
                return 200809;
            case 13:
                ;
            case 104:
                ;
            case 94:
                ;
            case 95:
                ;
            case 34:
                ;
            case 35:
                ;
            case 77:
                ;
            case 81:
                ;
            case 83:
                ;
            case 84:
                ;
            case 85:
                ;
            case 86:
                ;
            case 87:
                ;
            case 88:
                ;
            case 89:
                ;
            case 90:
                ;
            case 91:
                ;
            case 94:
                ;
            case 95:
                ;
            case 110:
                ;
            case 111:
                ;
            case 113:
                ;
            case 114:
                ;
            case 115:
                ;
            case 116:
                ;
            case 117:
                ;
            case 118:
                ;
            case 120:
                ;
            case 40:
                ;
            case 16:
                ;
            case 79:
                ;
            case 19:
                return -1;
            case 92:
                ;
            case 93:
                ;
            case 5:
                ;
            case 72:
                ;
            case 6:
                ;
            case 74:
                ;
            case 92:
                ;
            case 93:
                ;
            case 96:
                ;
            case 97:
                ;
            case 98:
                ;
            case 99:
                ;
            case 102:
                ;
            case 103:
                ;
            case 105:
                return 1;
            case 38:
                ;
            case 66:
                ;
            case 50:
                ;
            case 51:
                ;
            case 4:
                return 1024;
            case 15:
                ;
            case 64:
                ;
            case 41:
                return 32;
            case 55:
                ;
            case 37:
                ;
            case 17:
                return 2147483647;
            case 18:
                ;
            case 1:
                return 47839;
            case 59:
                ;
            case 57:
                return 99;
            case 68:
                ;
            case 58:
                return 2048;
            case 0:
                return 2097152;
            case 3:
                return 65536;
            case 14:
                return 32768;
            case 73:
                return 32767;
            case 39:
                return 16384;
            case 60:
                return 1e3;
            case 106:
                return 700;
            case 52:
                return 256;
            case 62:
                return 255;
            case 2:
                return 100;
            case 65:
                return 64;
            case 36:
                return 20;
            case 100:
                return 16;
            case 20:
                return 6;
            case 53:
                return 4
            }
            Be(De);
            return -1
        }

        function Xe(b) {
            Ye || (Ic = Ic + 4095 >> 12 << 12, Ye = n);
            var e = Ic;
            0 != b && Nb(b);
            return e
        }
        var Ye, Ze = v,
            $e, af, bf, cf;
        Be(0);
        oe.unshift({
            T: (function () {
                if (!Module.noFSInit && !Ve) {
                    var b, e, c, d = (function (b) {
                            b === t || 10 === b ? (e.I(e.buffer.join("")), e.buffer = []) : e.buffer.push(i.qa(b))
                        });
                    Pd(!Ve, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
                    Ve = n;
                    Oe();
                    b = b || Module.stdin;
                    e = e || Module.stdout;
                    c = c || Module.stderr;
                    var f = n,
                        h = n,
                        g = n;
                    b || (f = v, b = (function () {
                        if (!b.P || !b.P.length) {
                            var c;
                            "undefined" != typeof window && "function" == typeof window.prompt ? (c = window.prompt("Input: "), c === t && (c = String.fromCharCode(0))) : "function" == typeof readline && (c = readline());
                            c || (c = "");
                            b.P = le(c + "\n", n)
                        }
                        return b.P.shift()
                    }));
                    var i = new Lb;
                    e || (h = v, e = d);
                    e.I || (e.I = Module.print);
                    e.buffer || (e.buffer = []);
                    c || (g = v, c = d);
                    c.I || (c.I = Module.print);
                    c.buffer || (c.buffer = []);
                    try {
                        Qe("/", "tmp", n, n)
                    } catch (j) {}
                    var d = Qe("/", "dev", n, n),
                        m = Ue(d, "stdin", b),
                        p = Ue(d, "stdout", t, e);
                    c = Ue(d, "stderr", t, c);
                    Ue(d, "tty", b, e);
                    Ie[1] = {
                        path: "/dev/stdin",
                        object: m,
                        position: 0,
                        ha: n,
                        ja: v,
                        fa: v,
                        ia: !f,
                        error: v,
                        da: v,
                        sa: []
                    };
                    Ie[2] = {
                        path: "/dev/stdout",
                        object: p,
                        position: 0,
                        ha: v,
                        ja: n,
                        fa: v,
                        ia: !h,
                        error: v,
                        da: v,
                        sa: []
                    };
                    Ie[3] = {
                        path: "/dev/stderr",
                        object: c,
                        position: 0,
                        ha: v,
                        ja: n,
                        fa: v,
                        ia: !g,
                        error: v,
                        da: v,
                        sa: []
                    };
                    Pd(128 > Math.max(Ee, Fe, ze));
                    A[Ee >> 2] = 1;
                    A[Fe >> 2] = 2;
                    A[ze >> 2] = 3;
                    Re("/", "dev/shm/tmp", n, n);
                    for (f = Ie.length; f < Math.max(Ee, Fe, ze) + 4; f++) {
                        Ie[f] = t
                    }
                    Ie[Ee] = Ie[1];
                    Ie[Fe] = Ie[2];
                    Ie[ze] = Ie[3];
                    K([K([0, 0, 0, 0, Ee, 0, 0, 0, Fe, 0, 0, 0, ze, 0, 0, 0], "void*", ee)], "void*", J, Ge)
                }
            })
        });
        pe.push({
            T: (function () {
                Je = v
            })
        });
        qe.push({
            T: (function () {
                Ve && (Ie[2] && 0 < Ie[2].object.H.buffer.length && Ie[2].object.H(10), Ie[3] && 0 < Ie[3].object.H.buffer.length && Ie[3].object.H(10))
            })
        });
        Module.FS_createFolder = Qe;
        Module.FS_createPath = Re;
        Module.FS_createDataFile = Te;
        Module.FS_createPreloadedFile = (function (b, e, c, d, f, h, g, i) {
            function j(b) {
                return {
                    jpg: "image/jpeg",
                    png: "image/png",
                    bmp: "image/bmp",
                    ogg: "audio/ogg",
                    wav: "audio/wav",
                    mp3: "audio/mpeg"
                }[b.substr(-3)]
            }

            function m(c) {
                function j(c) {
                    i || Te(b, e, c, d, f);
                    h && h();
                    we("cp " + k)
                }
                var l = v;
                Module.preloadPlugins.forEach((function (b) {
                    !l && b.canHandle(k) && (b.handle(c, k, j, (function () {
                        g && g();
                        we("cp " + k)
                    })), l = n)
                }));
                l || j(c)
            }
            if (!$e) {
                $e = n;
                try {
                    new Blob, af = n
                } catch (p) {
                    af = v, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
                }
                bf = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : !af ? console.log("warning: no BlobBuilder") : t;
                cf = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : console.log("warning: cannot create object URLs");
                Module.preloadPlugins || (Module.preloadPlugins = []);
                Module.preloadPlugins.push({
                    canHandle: (function (b) {
                        return b.substr(-4) in {
                            ".jpg": 1,
                            ".png": 1,
                            ".bmp": 1
                        }
                    }),
                    handle: (function (b, c, d, e) {
                        var f = t;
                        if (af) {
                            try {
                                f = new Blob([b], {
                                    type: j(c)
                                })
                            } catch (h) {
                                var g = "Blob constructor present but fails: " + h + "; falling back to blob builder";
                                Kb || (Kb = {});
                                Kb[g] || (Kb[g] = 1, Module.u(g))
                            }
                        }
                        f || (f = new bf, f.append((new Uint8Array(b)).buffer), f = f.getBlob());
                        var i = cf.createObjectURL(f);
                        Pd("string" == typeof i, "createObjectURL must return a url as a string");
                        var k = new Image;
                        k.onload = (function () {
                            Pd(k.complete, "Image " + c + " could not be decoded");
                            var e = document.createElement("canvas");
                            e.width = k.width;
                            e.height = k.height;
                            e.getContext("2d").drawImage(k, 0, 0);
                            Module.preloadedImages[c] = e;
                            cf.revokeObjectURL(i);
                            d && d(b)
                        });
                        k.onerror = (function () {
                            console.log("Image " + i + " could not be decoded");
                            e && e()
                        });
                        k.src = i
                    })
                });
                Module.preloadPlugins.push({
                    canHandle: (function (b) {
                        return b.substr(-4) in {
                            ".ogg": 1,
                            ".wav": 1,
                            ".mp3": 1
                        }
                    }),
                    handle: (function (b, c, d, e) {
                        function f(e) {
                            h || (h = n, Module.preloadedAudios[c] = e, d && d(b))
                        }

                        function g() {
                            h || (h = n, Module.preloadedAudios[c] = new Audio, e && e())
                        }
                        var h = v;
                        if (af) {
                            try {
                                var i = new Blob([b], {
                                    type: j(c)
                                })
                            } catch (k) {
                                return g()
                            }
                            i = cf.createObjectURL(i);
                            Pd("string" == typeof i, "createObjectURL must return a url as a string");
                            var l = new Audio;
                            l.addEventListener("canplaythrough", (function () {
                                f(l)
                            }), v);
                            l.onerror = (function () {
                                if (!h) {
                                    console.log("warning: browser could not fully decode audio " + c + ", trying slower base64 approach");
                                    for (var d = "", e = 0, g = 0, i = 0; i < b.length; i++) {
                                        e = e << 8 | b[i];
                                        for (g += 8; 6 <= g;) {
                                            var j = e >> g - 6 & 63,
                                                g = g - 6,
                                                d = d + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [j]
                                        }
                                    }
                                    2 == g ? (d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(e & 3) << 4], d += "==") : 4 == g && (d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(e & 15) << 2], d += "=");
                                    l.src = "data:audio/x-" + c.substr(-3) + ";base64," + d;
                                    f(l)
                                }
                            });
                            l.src = i;
                            setTimeout((function () {
                                f(l)
                            }), 1e4)
                        } else {
                            return g()
                        }
                    })
                })
            }
            for (var k, q = [b, e], l = q[0], r = 1; r < q.length; r++) {
                "/" != l[l.length - 1] && (l += "/"), l += q[r]
            }
            "/" == l[0] && (l = l.substr(1));
            k = l;
            ve("cp " + k);
            if ("string" == typeof c) {
                var s = g,
                    x = (function () {
                        s ? s() : a('Loading data file "' + c + '" failed.')
                    }),
                    u = new XMLHttpRequest;
                u.open("GET", c, n);
                u.responseType = "arraybuffer";
                u.onload = (function () {
                    if (200 == u.status) {
                        var b = u.response;
                        Pd(b, 'Loading data file "' + c + '" failed (no arrayBuffer).');
                        b = new Uint8Array(b);
                        m(b);
                        we("al " + c)
                    } else {
                        x()
                    }
                });
                u.onerror = x;
                u.send(t);
                ve("al " + c)
            } else {
                m(c)
            }
        });
        Module.FS_createLazyFile = (function (b, e, c, d, f) {
            if ("undefined" !== typeof XMLHttpRequest) {
                rb || a("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
                var h = (function (b, c) {
                    this.length = c;
                    this.A = b;
                    this.C = []
                });
                h.prototype.La = (function (b) {
                    this.Ta = b
                });
                var g = new XMLHttpRequest;
                g.open("HEAD", c, v);
                g.send(t);
                200 <= g.status && 300 > g.status || 304 === g.status || a(Error("Couldn't load " + c + ". Status: " + g.status));
                var i = Number(g.getResponseHeader("Content-length")),
                    j, m = 1048576;
                if (!((j = g.getResponseHeader("Accept-Ranges")) && "bytes" === j)) {
                    m = i
                }
                var p = new h(m, i);
                p.La((function (b) {
                    var d = b * p.A,
                        e = (b + 1) * p.A - 1,
                        e = Math.min(e, i - 1);
                    if ("undefined" === typeof p.C[b]) {
                        var f = p.C;
                        d > e && a(Error("invalid range (" + d + ", " + e + ") or no bytes requested!"));
                        e > i - 1 && a(Error("only " + i + " bytes available! programmer error!"));
                        var g = new XMLHttpRequest;
                        g.open("GET", c, v);
                        i !== m && g.setRequestHeader("Range", "bytes=" + d + "-" + e);
                        "undefined" != typeof Uint8Array && (g.responseType = "arraybuffer");
                        g.overrideMimeType && g.overrideMimeType("text/plain; charset=x-user-defined");
                        g.send(t);
                        200 <= g.status && 300 > g.status || 304 === g.status || a(Error("Couldn't load " + c + ". Status: " + g.status));
                        d = g.response !== la ? new Uint8Array(g.response || []) : le(g.responseText || "", n);
                        f[b] = d
                    }
                    "undefined" === typeof p.C[b] && a(Error("doXHR failed!"));
                    return p.C[b]
                }));
                h = {
                    w: v,
                    i: p
                }
            } else {
                h = {
                    w: v,
                    url: c
                }
            }
            return Se(b, e, h, d, f)
        });
        Module.FS_createLink = (function (b, e, c, d, f) {
            return Se(b, e, {
                w: v,
                link: c
            }, d, f)
        });
        Module.FS_createDevice = Ue;
        K(12, "void*", ee);
        Module.requestFullScreen = (function () {
            function b() {}

            function e() {
                var b = v;
                if ((document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement) === c) {
                    c.Ka = c.requestPointerLock || c.mozRequestPointerLock || c.webkitRequestPointerLock, c.Ka(), b = n
                }
                if (Module.onFullScreen) {
                    Module.onFullScreen(b)
                }
            }
            var c = Module.canvas;
            document.addEventListener("fullscreenchange", e, v);
            document.addEventListener("mozfullscreenchange", e, v);
            document.addEventListener("webkitfullscreenchange", e, v);
            document.addEventListener("pointerlockchange", b, v);
            document.addEventListener("mozpointerlockchange", b, v);
            document.addEventListener("webkitpointerlockchange", b, v);
            c.Ja = c.requestFullScreen || c.mozRequestFullScreen || (c.webkitRequestFullScreen ? (function () {
                c.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
            }) : t);
            c.Ja()
        });
        Module.requestAnimationFrame = (function (b) {
            window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || window.setTimeout);
            window.requestAnimationFrame(b)
        });
        Module.pauseMainLoop = (function () {});
        Module.resumeMainLoop = (function () {
            Ze && (Ze = v, t())
        });
        var ne = [0, 0, df, 0, ef, 0, ff, 0, gf, 0, hf, 0, jf, 0];

        function kf(b, e, c) {
            if (0 != (c | 0)) {
                for (var d = 0; !(z[b + d | 0] = z[e + d | 0], d = d + 1 | 0, (d | 0) == (c | 0));) {}
            }
        }

        function lf(b, e, c) {
            if (0 != (c | 0)) {
                for (var d = 0;;) {
                    var f = b + d | 0;
                    z[f] ^= z[e + d | 0];
                    d = d + 1 | 0;
                    if ((d | 0) == (c | 0)) {
                        break
                    }
                }
            }
        }

        function mf(b) {
            var e = C[b + 1 | 0],
                c = C[b + 2 | 0],
                d = C[b + 3 | 0],
                f = C[b + 7 | 0] << 24 | 0,
                b = (nf.add((nf.add(e << 8 | 0 | C[b] | (c << 16 | 0) | (d << 24 | 0) | 0, 0 | e >>> 24 | (0 | c >>> 16) | (0 | d >>> 8) | C[b + 4 | 0] | C[b + 5 | 0] << 8 | 0, 0, C[b + 6 | 0] << 16 | 0), A[G >> 2]), A[G + 4 >> 2], 0, f), A[G >> 2]);
            return Nd = A[G + 4 >> 2], b
        }
        mf.X = 1;

        function of(b) {
            b >>= 2;
            A[b + 9] = 0;
            A[b + 8] = 0;
            A[b] = 1779033703;
            A[b + 1] = -1150833019;
            A[b + 2] = 1013904242;
            A[b + 3] = -1521486534;
            A[b + 4] = 1359893119;
            A[b + 5] = -1694144372;
            A[b + 6] = 528734635;
            A[b + 7] = 1541459225
        }

        var m_pf_b, m_pf_e, m_pf_c, m_pf_d, m_pf_f, m_pf_h, m_pf_g, m_pf_i, m_pf_j, m_pf_m;
        var m_pf_p, m_pf_k, m_pf_q, m_pf_p, m_pf_l, m_pf_iteration_d, m_pf_iteration_r;
        var m_pf_callback_func;
        var m_steps_per_iteration;
        var m_total_steps;
        var m_steps_done;
        var m_progress_callback_func;
        var m_total_rounds;
        var m_rounds_done;

        var m_timeout = 1;

        function pf_async(my_b, my_e, my_c, my_d, my_f, my_h, my_g, my_i, my_j, my_m, callback_func, progress_callback_func, steps) {
        	m_pf_b = my_b;
        	m_pf_e = my_e;
        	m_pf_c = my_c;
        	m_pf_d = my_d;
        	m_pf_f = my_f;
        	m_pf_h = my_h;
        	m_pf_g = my_g;
        	m_pf_i = my_i;
        	m_pf_j = my_j;
        	m_pf_m = my_m;
        	m_pf_callback_func = callback_func;

        	m_total_rounds = my_i;
        	m_rounds_done = 0;

        	m_steps_per_iteration = my_f*2*my_i / steps;
        	m_total_steps = my_f;
        	m_progress_callback_func = progress_callback_func;



            m_pf_p = (nf.multiply(m_pf_i, 0, m_pf_g, 0), A[G >> 2]);
            m_pf_k = A[G + 4 >> 2];
            if (0 < m_pf_k >>> 0 | 0 == m_pf_k >>> 0 & 1073741823 < m_pf_p >>> 0) {
                return A[Ce >> 2] = 27, -1
            }
            if (0 != ((nf.add(m_pf_f, m_pf_h, -1, -1), A[G >> 2]) & m_pf_f | 0) | 0 != (A[G + 4 >> 2] & m_pf_h | 0) | 0 == (m_pf_f | 0) & 0 == (m_pf_h | 0)) {
                return A[Ce >> 2] = 22, -1
            }
                if (!(Math.floor(33554431 / (m_pf_i >>> 0)) >>> 0 < m_pf_g >>> 0 | 16777215 < m_pf_g >>> 0) && !(0 < m_pf_h >>> 0 | 0 == m_pf_h >>> 0 & Math.floor(33554431 / (m_pf_g >>> 0)) >>> 0 < m_pf_f >>> 0)) {
                    m_pf_q = m_pf_g << 7;
                    m_pf_p = fe(m_pf_q * m_pf_i | 0);
                    if (0 == (m_pf_p | 0)) {
                        return m_pf_b = -1
                    }
                    m_pf_k = fe(m_pf_g << 8);
                        if (0 != (m_pf_k | 0)) {
                            m_pf_l = fe((nf.multiply(m_pf_q, 0, m_pf_f, m_pf_h), A[G >> 2]));
                            if (0 == (m_pf_l | 0)) {
                                qf(m_pf_k)
                            } else {
                                m_pf_q = (m_pf_i << 7) * m_pf_g | 0;
                                bj(m_pf_b, m_pf_e, m_pf_c, m_pf_d, 1, 0, m_pf_p, m_pf_q);
                                m_pf_c = 0 == (m_pf_i | 0);


                                    if (!m_pf_c) {
                                    	m_pf_iteration_d = m_pf_g << 7, m_pf_iteration_r = 0;
                                    	pf_async_iterate();
                                    }
                                return 0;
                            }
                        }
                    qf(m_pf_p);
                    return m_pf_b = -1
                }
            A[Ce >> 2] = 12;
            return -1
        }
        Module._crypto_scrypt_async = pf_async;
        pf_async.X = 1;

        function pf_async_iterate()
        {
        	cj_async(m_pf_p + m_pf_iteration_d * m_pf_iteration_r | 0, m_pf_g, m_pf_f, m_pf_h, m_pf_l, m_pf_k);
		}

		function pf_async_reiterate()
		{
			if ( m_pf_iteration_r = m_pf_iteration_r + 1 | 0, (m_pf_iteration_r | 0) == (m_pf_i | 0))
			{
				pf_async_after_iteration();
				return;
			}
			else
			{
				pf_async_iterate();
			}
		}

		function pf_async_after_iteration()
		{
			 bj(m_pf_b, m_pf_e, m_pf_p, m_pf_q, 1, 0, m_pf_j, m_pf_m);
             qf(m_pf_l);
             qf(m_pf_k);
             qf(m_pf_p);
             m_pf_callback_func(m_pf_b = 0);
        }

        var m_b, m_e, m_c, m_d, m_f, m_h, m_g, m_i, m_j, m_m, m_p, m_k;

        function cj_async(l_b, l_e, l_c, l_d, l_f, l_h) {
        	m_b = l_b;
        	m_e = l_e;
        	m_c = l_c;
        	m_d = l_d;
        	m_f = l_f;
        	m_h = l_h;

            m_g = m_e << 7;
            m_i = m_h + m_g | 0;

            kf(m_h, m_b, m_g);
            if (!(0 == (m_c | 0) & 0 == (m_d | 0))) {
	            var iters1 = 0, iters2 = 0;
	            m_j = 0;
	            m_m = 0;
	            m_steps_done = 0;
	            setTimeout(cj_iter1, m_timeout);
	            return;
            }
            cj_finish();
        }
        cj_async.X = 1;

        function cj_iter1()
        {

        	for (counter = 0; counter < m_steps_per_iteration; counter++)
        	{
        		if (!(kf(m_f + (nf.multiply(m_m, m_j, m_g, 0), A[G >> 2]) | 0, m_h, m_g), dj(m_h, m_i, m_e), m_m = (nf.add(m_m, m_j, 1, 0), A[G >> 2]), m_j = A[G + 4 >> 2], !(m_j >>> 0 < m_d >>> 0 | m_j >>> 0 == m_d >>> 0 & m_m >>> 0 < m_c >>> 0)))
        		{
        			continue;
        		}
        		cj_after_iter1();
        		return;
        	}
        	m_steps_done += m_steps_per_iteration;
        	m_progress_callback_func(((m_steps_done/m_total_steps)*50 + 100*m_rounds_done)/m_total_rounds);
        	setTimeout(cj_iter1, m_timeout);
        }

        function cj_after_iter1()
        {
        	if (!(0 == (m_c | 0) & 0 == (m_d | 0))) {

                    m_j = (nf.add(m_c, m_d, -1, -1), A[G >> 2]);
                    m_m = A[G + 4 >> 2];
                    m_p = 0;
                    m_k = 0;
                    m_progress_callback_func((50 + 100*m_rounds_done)/m_total_rounds);
                    m_steps_done = 0;
                    setTimeout(cj_iter2, m_timeout);
                	return;
                }
            cj_finish();
		}
        function cj_finish()
        {
        	m_rounds_done++;
        	if (m_rounds_done != m_total_rounds)
        	{
        		m_progress_callback_func(100*m_rounds_done/m_total_rounds);
        	}
        	kf(m_b, m_h, m_g);
        	pf_async_reiterate();

        }

        function cj_iter2()
        {
        	for (counter = 0; counter < m_steps_per_iteration; counter++)
        	{
	        	if (!(lf(m_h, m_f + (nf.multiply(mf(m_h + ((m_e << 7) - 64) | 0) & m_j, Nd & m_m, m_g, 0), A[G >> 2]) | 0, m_g), dj(m_h, m_i, m_e), m_k = (nf.add(m_k, m_p, 1, 0), A[G >> 2]), m_p = A[G + 4 >> 2], !(m_p >>> 0 < m_d >>> 0 | m_p >>> 0 == m_d >>> 0 & m_k >>> 0 < m_c >>> 0)))
    	    	{
        			continue;
        		}
        		cj_finish();
        		return;
        	}
        	m_steps_done += m_steps_per_iteration;
        	m_progress_callback_func((50 + (m_steps_done/m_total_steps)*50 + 100*m_rounds_done)/m_total_rounds);
        	setTimeout(cj_iter2, m_timeout);
        }

        function pf(b, e, c, d, f, h, g, i, j, m) {
	        var p = (nf.multiply(i, 0, g, 0), A[G >> 2]),
	            k = A[G + 4 >> 2];
	        if (0 < k >>> 0 | 0 == k >>> 0 & 1073741823 < p >>> 0) {
    	        return A[Ce >> 2] = 27, -1
	        }
	        if (0 != ((nf.add(f, h, -1, -1), A[G >> 2]) & f | 0) | 0 != (A[G + 4 >> 2] & h | 0) | 0 == (f | 0) & 0 == (h | 0)) {
	            return A[Ce >> 2] = 22, -1
	        }
	        do {
	            if (!(Math.floor(33554431 / (i >>> 0)) >>> 0 < g >>> 0 | 16777215 < g >>> 0) && !(0 < h >>> 0 | 0 == h >>> 0 & Math.floor(33554431 / (g >>> 0)) >>> 0 < f >>> 0)) {
	                var q = g << 7,
	                    p = fe(q * i | 0);
	                if (0 == (p | 0)) {
	                    return b = -1
	                }
	                k = fe(g << 8);
	                do {
	                    if (0 != (k | 0)) {
	                        var l = fe((nf.multiply(q, 0, f, h), A[G >> 2]));
	                        if (0 == (l | 0)) {
	                            qf(k)
	                        } else {
	                            q = (i << 7) * g | 0;
	                            bj(b, e, c, d, 1, 0, p, q);
	                            c = 0 == (i | 0);
	                            a: do {
	                                if (!c) {
	                                    for (var d = g << 7, r = 0;;) {
	                                        if (cj(p + d * r | 0, g, f, h, l, k), r = r + 1 | 0, (r | 0) == (i | 0)) {
	                                            break a
	                                        }
	                                    }
	                                }
	                            } while (0);
	                            bj(b, e, p, q, 1, 0, j, m);
	                            qf(l);
	                            qf(k);
	                            qf(p);
	                            return b = 0
	                        }
	                    }
	                } while (0);
	                qf(p);
	                return b = -1
	            }
	        } while (0);
	        A[Ce >> 2] = 12;
	        return -1
	    }
	    Module._crypto_scrypt = pf;
	    pf.X = 1;
	
	    function cj(b, e, c, d, f, h) {
	        var g = e << 7,
	            i = h + g | 0;
	        kf(h, b, g);
	        if (!(0 == (c | 0) & 0 == (d | 0))) {
	            for (var j = 0, m = 0; !(kf(f + (nf.multiply(m, j, g, 0), A[G >> 2]) | 0, h, g), dj(h, i, e), m = (nf.add(m, j, 1, 0), A[G >> 2]), j = A[G + 4 >> 2], !(j >>> 0 < d >>> 0 | j >>> 0 == d >>> 0 & m >>> 0 < c >>> 0));) 	{}
	            if (!(0 == (c | 0) & 0 == (d | 0))) {
	                for (var j = (nf.add(c, d, -1, -1), A[G >> 2]), m = A[G + 4 >> 2], p = 0, k = 0; !(lf(h, f + (nf.multiply(mf(h + ((e << 7) - 64) | 0) & j, Nd & m, g, 0), A[G >> 2]) | 0, g), dj(h, i, e), k = (nf.add(k, p, 1, 0), A[G >> 2]), p = A[G + 4 >> 2], !(p >>> 0 < d >>> 0 | p >>> 0 == d >>> 0 & k >>> 0 < c >>> 0));) {}
	            }
	        }
	        kf(b, h, g)
	    }
	    cj.X = 1;

        function dj(b, e, c) {
            var d = y;
            y = y + 64 | 0;
            var f = d | 0;
            kf(f, b + ((c << 7) - 64) | 0, 64);
            var h = 0 == (c & 2147483647 | 0);
            a: do {
                if (!h) {
                    for (var g = c << 1, i = 0;;) {
                        var j = i << 6;
                        lf(f, b + j | 0, 64);
                        ej(f);
                        kf(e + j | 0, f, 64);
                        i = i + 1 | 0;
                        if ((i | 0) == (g | 0)) {
                            break a
                        }
                    }
                }
            } while (0);
            if (0 != (c | 0)) {
                for (f = 0; !(kf((f << 6) + b | 0, (f << 7) + e | 0, 64), f = f + 1 | 0, (f | 0) == (c | 0));) {}
                if (0 != (c | 0)) {
                    for (f = 0; !(kf((f + c << 6) + b | 0, e + (f << 7 | 64) | 0, 64), f = f + 1 | 0, (f | 0) == (c | 0));) {}
                }
            }
            y = d
        }

        function ej(b) {
            var e, c = y;
            y = y + 128 | 0;
            var d = c + 64;
            e = d >> 2;
            for (var f = 0;;) {
                A[c + (f << 2) >> 2] = C[((f << 2) + b | 0) + 1 | 0] << 8 | C[(f << 2) + b | 0] | C[((f << 2) + b | 0) + 2 | 0] << 16 | C[((f << 2) + b | 0) + 3 | 0] << 24;
                var h = f + 1 | 0;
                if (16 == (h | 0)) {
                    break
                } else {
                    f = h
                }
            }
            for (var g = c >> 2, i = d >> 2, j = g + 16; g < j; g++, i++) {
                A[i] = A[g]
            }
            for (var m = d | 0, p = d + 48 | 0, k = d + 16 | 0, q = d + 32 | 0, l = d + 20 | 0, r = d + 4 | 0, s = d + 36 | 0, x = d + 52 | 0, u = d + 40 | 0, D = d + 24 | 0, H = d + 56 | 0, L = d + 8 | 0, E = d + 60 | 0, F = d + 44 | 0, M = d + 12 | 0, S = d + 28 | 0, Q = 0, B = A[m >> 2], V = A[p >> 2], I = A[k >> 2], aa = A[q >> 2], ba = A[l >> 2], eb = A[r >> 2], fb = A[s >> 2], hb = A[x >> 2], Sa = A[u >> 2], ma = A[D >> 2], N = A[H >> 2], Ia = A[L >> 2], Aa = A[E >> 2], ib = A[F >> 2], tb = A[M >> 2], na = A[S >> 2];;) {
                var ra = V + B | 0,
                    Ta = (ra << 7 | ra >>> 25) ^ I,
                    ub = Ta + B | 0,
                    jb = (ub << 9 | ub >>> 23) ^ aa,
                    Ua = jb + Ta | 0,
                    ha = (Ua << 13 | Ua >>> 19) ^ V,
                    Ja = ha + jb | 0,
                    R = (Ja << 18 | Ja >>> 14) ^ B,
                    P = eb + ba | 0,
                    oa = (P << 7 | P >>> 25) ^ fb,
                    Ka = oa + ba | 0,
                    X = (Ka << 9 | Ka >>> 23) ^ hb,
                    La = X + oa | 0,
                    Cb = (La << 13 | La >>> 19) ^ eb,
                    Ma = Cb + X | 0,
                    Ba = (Ma << 18 | Ma >>> 14) ^ ba,
                    vb = ma + Sa | 0,
                    da = (vb << 7 | vb >>> 25) ^ N,
                    ea = da + Sa | 0,
                    sa = (ea << 9 | ea >>> 23) ^ Ia,
                    Db = sa + da | 0,
                    Va = (Db << 13 | Db >>> 19) ^ ma,
                    Pa = Va + sa | 0,
                    fa = (Pa << 18 | Pa >>> 14) ^ Sa,
                    Na = ib + Aa | 0,
                    T = (Na << 7 | Na >>> 25) ^ tb,
                    Wa = T + Aa | 0,
                    Oa = (Wa << 9 | Wa >>> 23) ^ na,
                    wb = Oa + T | 0,
                    O = (wb << 13 | wb >>> 19) ^ ib,
                    ia = O + Oa | 0,
                    Ca = (ia << 18 | ia >>> 14) ^ Aa,
                    xb = T + R | 0,
                    Xa = (xb << 7 | xb >>> 25) ^ Cb,
                    kb = Xa + R | 0,
                    Y = (kb << 9 | kb >>> 23) ^ sa,
                    ta = Y + Xa | 0,
                    ja = (ta << 13 | ta >>> 19) ^ T,
                    lb = ja + Y | 0,
                    mb = (lb << 18 | lb >>> 14) ^ R,
                    Ya = Ta + Ba | 0,
                    ca = (Ya << 7 | Ya >>> 25) ^ Va,
                    ua = ca + Ba | 0,
                    Za = (ua << 9 | ua >>> 23) ^ Oa,
                    Qa = Za + ca | 0,
                    $a = (Qa << 13 | Qa >>> 19) ^ Ta,
                    Da = $a + Za | 0,
                    va = (Da << 18 | Da >>> 14) ^ Ba,
                    wa = oa + fa | 0,
                    ab = (wa << 7 | wa >>> 25) ^ O,
                    xa = ab + fa | 0,
                    Ra = (xa << 9 | xa >>> 23) ^ jb,
                    Ea = Ra + ab | 0,
                    ka = (Ea << 13 | Ea >>> 19) ^ oa,
                    Fa = ka + Ra | 0,
                    yb = (Fa << 18 | Fa >>> 14) ^ fa,
                    nb = da + Ca | 0,
                    pa = (nb << 7 | nb >>> 25) ^ ha,
                    ob = pa + Ca | 0,
                    ga = (ob << 9 | ob >>> 23) ^ X,
                    Ga = ga + pa | 0,
                    bb = (Ga << 13 | Ga >>> 19) ^ da,
                    pb = bb + ga | 0,
                    Ha = (pb << 18 | pb >>> 14) ^ Ca,
                    qb = Q + 2 | 0;
                if (8 > qb >>> 0) {
                    Q = qb, B = mb, V = pa, I = $a, aa = Ra, ba = va, eb = Xa, fb = ka, hb = ga, Sa = yb, ma = ca, N = bb, Ia = Y, Aa = Ha, ib = ab, tb = ja, na = Za
                } else {
                    break
                }
            }
            A[S >> 2] = Za;
            A[M >> 2] = ja;
            A[F >> 2] = ab;
            A[E >> 2] = Ha;
            A[L >> 2] = Y;
            A[H >> 2] = bb;
            A[D >> 2] = ca;
            A[u >> 2] = yb;
            A[x >> 2] = ga;
            A[s >> 2] = ka;
            A[r >> 2] = Xa;
            A[l >> 2] = va;
            A[q >> 2] = Ra;
            A[k >> 2] = $a;
            A[p >> 2] = pa;
            A[m >> 2] = mb;
            var ya = c | 0;
            A[ya >> 2] = A[ya >> 2] + mb | 0;
            var cb = c + 4 | 0;
            A[cb >> 2] = A[cb >> 2] + A[e + 1] | 0;
            var Jb = c + 8 | 0;
            A[Jb >> 2] = A[Jb >> 2] + A[e + 2] | 0;
            var Ob = c + 12 | 0;
            A[Ob >> 2] = A[Ob >> 2] + A[e + 3] | 0;
            var Xd = c + 16 | 0;
            A[Xd >> 2] = A[Xd >> 2] + A[e + 4] | 0;
            var Yd = c + 20 | 0;
            A[Yd >> 2] = A[Yd >> 2] + A[e + 5] | 0;
            var zb = c + 24 | 0;
            A[zb >> 2] = A[zb >> 2] + A[e + 6] | 0;
            var Eb = c + 28 | 0;
            A[Eb >> 2] = A[Eb >> 2] + A[e + 7] | 0;
            var Zd = c + 32 | 0;
            A[Zd >> 2] = A[Zd >> 2] + A[e + 8] | 0;
            var $d = c + 36 | 0;
            A[$d >> 2] = A[$d >> 2] + A[e + 9] | 0;
            var ae = c + 40 | 0;
            A[ae >> 2] = A[ae >> 2] + A[e + 10] | 0;
            var be = c + 44 | 0;
            A[be >> 2] = A[be >> 2] + A[e + 11] | 0;
            var Ab = c + 48 | 0;
            A[Ab >> 2] = A[Ab >> 2] + A[e + 12] | 0;
            var Fb = c + 52 | 0;
            A[Fb >> 2] = A[Fb >> 2] + A[e + 13] | 0;
            var ce = c + 56 | 0;
            A[ce >> 2] = A[ce >> 2] + A[e + 14] | 0;
            var de = c + 60 | 0;
            A[de >> 2] = A[de >> 2] + A[e + 15] | 0;
            for (var Nc = 0;;) {
                var Oc = (Nc << 2) + b | 0,
                    db = A[c + (Nc << 2) >> 2];
                z[Oc] = db & 255;
                z[Oc + 1 | 0] = db >>> 8 & 255;
                z[Oc + 2 | 0] = db >>> 16 & 255;
                z[Oc + 3 | 0] = db >>> 24 & 255;
                var Gb = Nc + 1 | 0;
                if (16 == (Gb | 0)) {
                    break
                } else {
                    Nc = Gb
                }
            }
            y = c
        }
        ej.X = 1;

        function fj(b, e, c) {
            var d = b + 32 | 0,
                f = b + 36 | 0,
                h = A[f >> 2],
                g = h >>> 3 & 63,
                i, h = h >>> 0;
            i = c << 3 >>> 0;
            h = (Nd = 4294967295 < h + i, h + i >>> 0);
            A[f >> 2] = h;
            Nd && (f = d | 0, A[f >> 2] = A[f >> 2] + 1 | 0);
            d |= 0;
            A[d >> 2] = A[d >> 2] + (c >>> 29) | 0;
            d = 64 - g | 0;
            g = b + (g + 40) | 0;
            if (d >>> 0 > c >>> 0) {
                gj(g, e, c)
            } else {
                gj(g, e, d);
                g = b | 0;
                b = b + 40 | 0;
                hj(g, b);
                e = e + d | 0;
                c = c - d | 0;
                d = 63 < c >>> 0;
                a: do {
                    if (d) {
                        f = c;
                        for (h = e;;) {
                            if (hj(g, h), h = h + 64 | 0, f = f - 64 | 0, 63 >= f >>> 0) {
                                var j = f,
                                    m = h;
                                break a
                            }
                        }
                    } else {
                        j = c, m = e
                    }
                } while (0);
                gj(b, m, j)
            }
        }

        function hj(b, e) {
            var c, d, f, h, g, i, j, m, p, k, q, l, r = y;
            y = y + 288 | 0;
            l = r >> 2;
            var s = r + 256;
            q = s >> 2;
            for (var x = r | 0, u = 0;;) {
                A[x + (u << 2) >> 2] = C[((u << 2) + e | 0) + 2 | 0] << 8 | C[((u << 2) + e | 0) + 3 | 0] | C[((u << 2) + e | 0) + 1 | 0] << 16 | C[(u << 2) + e | 0] << 24;
                var D = u + 1 | 0;
                if (16 == (D | 0)) {
                    break
                } else {
                    u = D
                }
            }
            for (var H = 16;;) {
                var L = A[(H - 2 << 2 >> 2) + l],
                    E = A[(H - 15 << 2 >> 2) + l];
                A[(H << 2 >> 2) + l] = A[(H - 16 << 2 >> 2) + l] + A[(H - 7 << 2 >> 2) + l] + ((L >>> 19 | L << 13) ^ L >>> 10 ^ (L >>> 17 | L << 15)) + ((E >>> 18 | E << 14) ^ E >>> 3 ^ (E >>> 7 | E << 25)) | 0;
                var F = H + 1 | 0;
                if (64 == (F | 0)) {
                    break
                } else {
                    H = F
                }
            }
            k = (s | 0) >> 2;
            p = s >> 2;
            m = b >> 2;
            A[p] = A[m];
            A[p + 1] = A[m + 1];
            A[p + 2] = A[m + 2];
            A[p + 3] = A[m + 3];
            A[p + 4] = A[m + 4];
            A[p + 5] = A[m + 5];
            A[p + 6] = A[m + 6];
            A[p + 7] = A[m + 7];
            j = (s + 28 | 0) >> 2;
            i = (s + 16 | 0) >> 2;
            var M = A[i];
            g = (s + 20 | 0) >> 2;
            h = (s + 24 | 0) >> 2;
            var S = A[h],
                Q = A[j] + A[x >> 2] + ((M >>> 11 | M << 21) ^ (M >>> 25 | M << 7) ^ (M >>> 6 | M << 26)) + ((S ^ A[g]) & M ^ S) + 1116352408 | 0,
                B = A[k];
            f = (s + 4 | 0) >> 2;
            var V = A[f];
            d = (s + 8 | 0) >> 2;
            var I = A[d];
            c = (s + 12 | 0) >> 2;
            A[c] = A[c] + Q | 0;
            var aa = ((B >>> 13 | B << 19) ^ (B >>> 22 | B << 10) ^ (B >>> 2 | B << 30)) + Q + ((I | V) & B | I & V) | 0;
            A[j] = aa;
            var ba = A[c],
                eb = A[g],
                fb = A[h] + A[l + 1] + ((ba >>> 11 | ba << 21) ^ (ba >>> 25 | ba << 7) ^ (ba >>> 6 | ba << 26)) + ((eb ^ A[i]) & ba ^ eb) + 1899447441 | 0,
                hb = A[k],
                Sa = A[f];
            A[d] = A[d] + fb | 0;
            var ma = fb + ((aa >>> 13 | aa << 19) ^ (aa >>> 22 | aa << 10) ^ (aa >>> 2 | aa << 30)) + ((Sa | hb) & aa | Sa & hb) | 0;
            A[h] = ma;
            var N = A[d],
                Ia = A[i],
                Aa = A[g] - 1245643825 + A[l + 2] + ((N >>> 11 | N << 21) ^ (N >>> 25 | N << 7) ^ (N >>> 6 | N << 26)) + ((Ia ^ A[c]) & N ^ Ia) | 0,
                ib = A[j],
                tb = A[k];
            A[f] = A[f] + Aa | 0;
            var na = Aa + ((ma >>> 13 | ma << 19) ^ (ma >>> 22 | ma << 10) ^ (ma >>> 2 | ma << 30)) + ((tb | ib) & ma | tb & ib) | 0;
            A[g] = na;
            var ra = A[f],
                Ta = A[c],
                ub = A[i] - 373957723 + A[l + 3] + ((ra >>> 11 | ra << 21) ^ (ra >>> 25 | ra << 7) ^ (ra >>> 6 | ra << 26)) + ((Ta ^ A[d]) & ra ^ Ta) | 0,
                jb = A[h],
                Ua = A[j];
            A[k] = A[k] + ub | 0;
            var ha = ub + ((na >>> 13 | na << 19) ^ (na >>> 22 | na << 10) ^ (na >>> 2 | na << 30)) + ((Ua | jb) & na | Ua & jb) | 0;
            A[i] = ha;
            var Ja = A[k],
                R = A[d],
                P = A[c] + A[l + 4] + ((Ja >>> 11 | Ja << 21) ^ (Ja >>> 25 | Ja << 7) ^ (Ja >>> 6 | Ja << 26)) + ((R ^ A[f]) & Ja ^ R) + 961987163 | 0,
                oa = A[g],
                Ka = A[h];
            A[j] = A[j] + P | 0;
            var X = P + ((ha >>> 13 | ha << 19) ^ (ha >>> 22 | ha << 10) ^ (ha >>> 2 | ha << 30)) + ((Ka | oa) & ha | Ka & oa) | 0;
            A[c] = X;
            var La = A[j],
                Cb = A[f],
                Ma = A[d] + A[l + 5] + ((La >>> 11 | La << 21) ^ (La >>> 25 | La << 7) ^ (La >>> 6 | La << 26)) + ((Cb ^ A[k]) & La ^ Cb) + 1508970993 | 0,
                Ba = A[i],
                vb = A[g];
            A[h] = A[h] + Ma | 0;
            var da = Ma + ((X >>> 13 | X << 19) ^ (X >>> 22 | X << 10) ^ (X >>> 2 | X << 30)) + ((vb | Ba) & X | vb & Ba) | 0;
            A[d] = da;
            var ea = A[h],
                sa = A[k],
                Db = A[f] - 1841331548 + A[l + 6] + ((ea >>> 11 | ea << 21) ^ (ea >>> 25 | ea << 7) ^ (ea >>> 6 | ea << 26)) + ((sa ^ A[j]) & ea ^ sa) | 0,
                Va = A[c],
                Pa = A[i];
            A[g] = A[g] + Db | 0;
            var fa = Db + ((da >>> 13 | da << 19) ^ (da >>> 22 | da << 10) ^ (da >>> 2 | da << 30)) + ((Pa | Va) & da | Pa & Va) | 0;
            A[f] = fa;
            var Na = A[g],
                T = A[j],
                Wa = A[k] - 1424204075 + A[l + 7] + ((Na >>> 11 | Na << 21) ^ (Na >>> 25 | Na << 7) ^ (Na >>> 6 | Na << 26)) + ((T ^ A[h]) & Na ^ T) | 0,
                Oa = A[d],
                wb = A[c];
            A[i] = A[i] + Wa | 0;
            var O = Wa + ((fa >>> 13 | fa << 19) ^ (fa >>> 22 | fa << 10) ^ (fa >>> 2 | fa << 30)) + ((wb | Oa) & fa | wb & Oa) | 0;
            A[k] = O;
            var ia = A[i],
                Ca = A[h],
                xb = A[j] - 670586216 + A[l + 8] + ((ia >>> 11 | ia << 21) ^ (ia >>> 25 | ia << 7) ^ (ia >>> 6 | ia << 26)) + ((Ca ^ A[g]) & ia ^ Ca) | 0,
                Xa = A[f],
                kb = A[d];
            A[c] = A[c] + xb | 0;
            var Y = xb + ((O >>> 13 | O << 19) ^ (O >>> 22 | O << 10) ^ (O >>> 2 | O << 30)) + ((kb | Xa) & O | kb & Xa) | 0;
            A[j] = Y;
            var ta = A[c],
                ja = A[g],
                lb = A[h] + A[l + 9] + ((ta >>> 11 | ta << 21) ^ (ta >>> 25 | ta << 7) ^ (ta >>> 6 | ta << 26)) + ((ja ^ A[i]) & ta ^ ja) + 310598401 | 0,
                mb = A[k],
                Ya = A[f];
            A[d] = A[d] + lb | 0;
            var ca = lb + ((Y >>> 13 | Y << 19) ^ (Y >>> 22 | Y << 10) ^ (Y >>> 2 | Y << 30)) + ((Ya | mb) & Y | Ya & mb) | 0;
            A[h] = ca;
            var ua = A[d],
                Za = A[i],
                Qa = A[g] + A[l + 10] + ((ua >>> 11 | ua << 21) ^ (ua >>> 25 | ua << 7) ^ (ua >>> 6 | ua << 26)) + ((Za ^ A[c]) & ua ^ Za) + 607225278 | 0,
                $a = A[j],
                Da = A[k];
            A[f] = A[f] + Qa | 0;
            var va = Qa + ((ca >>> 13 | ca << 19) ^ (ca >>> 22 | ca << 10) ^ (ca >>> 2 | ca << 30)) + ((Da | $a) & ca | Da & $a) | 0;
            A[g] = va;
            var wa = A[f],
                ab = A[c],
                xa = A[i] + A[l + 11] + ((wa >>> 11 | wa << 21) ^ (wa >>> 25 | wa << 7) ^ (wa >>> 6 | wa << 26)) + ((ab ^ A[d]) & wa ^ ab) + 1426881987 | 0,
                Ra = A[h],
                Ea = A[j];
            A[k] = A[k] + xa | 0;
            var ka = xa + ((va >>> 13 | va << 19) ^ (va >>> 22 | va << 10) ^ (va >>> 2 | va << 30)) + ((Ea | Ra) & va | Ea & Ra) | 0;
            A[i] = ka;
            var Fa = A[k],
                yb = A[d],
                nb = A[c] + A[l + 12] + ((Fa >>> 11 | Fa << 21) ^ (Fa >>> 25 | Fa << 7) ^ (Fa >>> 6 | Fa << 26)) + ((yb ^ A[f]) & Fa ^ yb) + 1925078388 | 0,
                pa = A[g],
                ob = A[h];
            A[j] = A[j] + nb | 0;
            var ga = nb + ((ka >>> 13 | ka << 19) ^ (ka >>> 22 | ka << 10) ^ (ka >>> 2 | ka << 30)) + ((ob | pa) & ka | ob & pa) | 0;
            A[c] = ga;
            var Ga = A[j],
                bb = A[f],
                pb = A[d] - 2132889090 + A[l + 13] + ((Ga >>> 11 | Ga << 21) ^ (Ga >>> 25 | Ga << 7) ^ (Ga >>> 6 | Ga << 26)) + ((bb ^ A[k]) & Ga ^ bb) | 0,
                Ha = A[i],
                qb = A[g];
            A[h] = A[h] + pb | 0;
            var ya = pb + ((ga >>> 13 | ga << 19) ^ (ga >>> 22 | ga << 10) ^ (ga >>> 2 | ga << 30)) + ((qb | Ha) & ga | qb & Ha) | 0;
            A[d] = ya;
            var cb = A[h],
                Jb = A[k],
                Ob = A[f] - 1680079193 + A[l + 14] + ((cb >>> 11 | cb << 21) ^ (cb >>> 25 | cb << 7) ^ (cb >>> 6 | cb << 26)) + ((Jb ^ A[j]) & cb ^ Jb) | 0,
                Xd = A[c],
                Yd = A[i];
            A[g] = A[g] + Ob | 0;
            var zb = Ob + ((ya >>> 13 | ya << 19) ^ (ya >>> 22 | ya << 10) ^ (ya >>> 2 | ya << 30)) + ((Yd | Xd) & ya | Yd & Xd) | 0;
            A[f] = zb;
            var Eb = A[g],
                Zd = A[j],
                $d = A[k] - 1046744716 + A[l + 15] + ((Eb >>> 11 | Eb << 21) ^ (Eb >>> 25 | Eb << 7) ^ (Eb >>> 6 | Eb << 26)) + ((Zd ^ A[h]) & Eb ^ Zd) | 0,
                ae = A[d],
                be = A[c];
            A[i] = A[i] + $d | 0;
            var Ab = $d + ((zb >>> 13 | zb << 19) ^ (zb >>> 22 | zb << 10) ^ (zb >>> 2 | zb << 30)) + ((be | ae) & zb | be & ae) | 0;
            A[k] = Ab;
            var Fb = A[i],
                ce = A[h],
                de = A[j] - 459576895 + A[l + 16] + ((Fb >>> 11 | Fb << 21) ^ (Fb >>> 25 | Fb << 7) ^ (Fb >>> 6 | Fb << 26)) + ((ce ^ A[g]) & Fb ^ ce) | 0,
                Nc = A[f],
                Oc = A[d];
            A[c] = A[c] + de | 0;
            var db = de + ((Ab >>> 13 | Ab << 19) ^ (Ab >>> 22 | Ab << 10) ^ (Ab >>> 2 | Ab << 30)) + ((Oc | Nc) & Ab | Oc & Nc) | 0;
            A[j] = db;
            var Gb = A[c],
                rf = A[g],
                sf = A[h] - 272742522 + A[l + 17] + ((Gb >>> 11 | Gb << 21) ^ (Gb >>> 25 | Gb << 7) ^ (Gb >>> 6 | Gb << 26)) + ((rf ^ A[i]) & Gb ^ rf) | 0,
                tf = A[k],
                uf = A[f];
            A[d] = A[d] + sf | 0;
            var Pb = sf + ((db >>> 13 | db << 19) ^ (db >>> 22 | db << 10) ^ (db >>> 2 | db << 30)) + ((uf | tf) & db | uf & tf) | 0;
            A[h] = Pb;
            var Qc = A[d],
                vf = A[i],
                wf = A[g] + A[l + 18] + ((Qc >>> 11 | Qc << 21) ^ (Qc >>> 25 | Qc << 7) ^ (Qc >>> 6 | Qc << 26)) + ((vf ^ A[c]) & Qc ^ vf) + 264347078 | 0,
                xf = A[j],
                yf = A[k];
            A[f] = A[f] + wf | 0;
            var Qb = wf + ((Pb >>> 13 | Pb << 19) ^ (Pb >>> 22 | Pb << 10) ^ (Pb >>> 2 | Pb << 30)) + ((yf | xf) & Pb | yf & xf) | 0;
            A[g] = Qb;
            var Rc = A[f],
                zf = A[c],
                Af = A[i] + A[l + 19] + ((Rc >>> 11 | Rc << 21) ^ (Rc >>> 25 | Rc << 7) ^ (Rc >>> 6 | Rc << 26)) + ((zf ^ A[d]) & Rc ^ zf) + 604807628 | 0,
                Bf = A[h],
                Cf = A[j];
            A[k] = A[k] + Af | 0;
            var Rb = Af + ((Qb >>> 13 | Qb << 19) ^ (Qb >>> 22 | Qb << 10) ^ (Qb >>> 2 | Qb << 30)) + ((Cf | Bf) & Qb | Cf & Bf) | 0;
            A[i] = Rb;
            var Sc = A[k],
                Df = A[d],
                Ef = A[c] + A[l + 20] + ((Sc >>> 11 | Sc << 21) ^ (Sc >>> 25 | Sc << 7) ^ (Sc >>> 6 | Sc << 26)) + ((Df ^ A[f]) & Sc ^ Df) + 770255983 | 0,
                Ff = A[g],
                Gf = A[h];
            A[j] = A[j] + Ef | 0;
            var Sb = Ef + ((Rb >>> 13 | Rb << 19) ^ (Rb >>> 22 | Rb << 10) ^ (Rb >>> 2 | Rb << 30)) + ((Gf | Ff) & Rb | Gf & Ff) | 0;
            A[c] = Sb;
            var Tc = A[j],
                Hf = A[f],
                If = A[d] + A[l + 21] + ((Tc >>> 11 | Tc << 21) ^ (Tc >>> 25 | Tc << 7) ^ (Tc >>> 6 | Tc << 26)) + ((Hf ^ A[k]) & Tc ^ Hf) + 1249150122 | 0,
                Jf = A[i],
                Kf = A[g];
            A[h] = A[h] + If | 0;
            var Tb = If + ((Sb >>> 13 | Sb << 19) ^ (Sb >>> 22 | Sb << 10) ^ (Sb >>> 2 | Sb << 30)) + ((Kf | Jf) & Sb | Kf & Jf) | 0;
            A[d] = Tb;
            var Uc = A[h],
                Lf = A[k],
                Mf = A[f] + A[l + 22] + ((Uc >>> 11 | Uc << 21) ^ (Uc >>> 25 | Uc << 7) ^ (Uc >>> 6 | Uc << 26)) + ((Lf ^ A[j]) & Uc ^ Lf) + 1555081692 | 0,
                Nf = A[c],
                Of = A[i];
            A[g] = A[g] + Mf | 0;
            var Ub = Mf + ((Tb >>> 13 | Tb << 19) ^ (Tb >>> 22 | Tb << 10) ^ (Tb >>> 2 | Tb << 30)) + ((Of | Nf) & Tb | Of & Nf) | 0;
            A[f] = Ub;
            var Vc = A[g],
                Pf = A[j],
                Qf = A[k] + A[l + 23] + ((Vc >>> 11 | Vc << 21) ^ (Vc >>> 25 | Vc << 7) ^ (Vc >>> 6 | Vc << 26)) + ((Pf ^ A[h]) & Vc ^ Pf) + 1996064986 | 0,
                Rf = A[d],
                Sf = A[c];
            A[i] = A[i] + Qf | 0;
            var Vb = Qf + ((Ub >>> 13 | Ub << 19) ^ (Ub >>> 22 | Ub << 10) ^ (Ub >>> 2 | Ub << 30)) + ((Sf | Rf) & Ub | Sf & Rf) | 0;
            A[k] = Vb;
            var Wc = A[i],
                Tf = A[h],
                Uf = A[j] - 1740746414 + A[l + 24] + ((Wc >>> 11 | Wc << 21) ^ (Wc >>> 25 | Wc << 7) ^ (Wc >>> 6 | Wc << 26)) + ((Tf ^ A[g]) & Wc ^ Tf) | 0,
                Vf = A[f],
                Wf = A[d];
            A[c] = A[c] + Uf | 0;
            var Wb = Uf + ((Vb >>> 13 | Vb << 19) ^ (Vb >>> 22 | Vb << 10) ^ (Vb >>> 2 | Vb << 30)) + ((Wf | Vf) & Vb | Wf & Vf) | 0;
            A[j] = Wb;
            var Xc = A[c],
                Xf = A[g],
                Yf = A[h] - 1473132947 + A[l + 25] + ((Xc >>> 11 | Xc << 21) ^ (Xc >>> 25 | Xc << 7) ^ (Xc >>> 6 | Xc << 26)) + ((Xf ^ A[i]) & Xc ^ Xf) | 0,
                Zf = A[k],
                $f = A[f];
            A[d] = A[d] + Yf | 0;
            var Xb = Yf + ((Wb >>> 13 | Wb << 19) ^ (Wb >>> 22 | Wb << 10) ^ (Wb >>> 2 | Wb << 30)) + (($f | Zf) & Wb | $f & Zf) | 0;
            A[h] = Xb;
            var Yc = A[d],
                ag = A[i],
                bg = A[g] - 1341970488 + A[l + 26] + ((Yc >>> 11 | Yc << 21) ^ (Yc >>> 25 | Yc << 7) ^ (Yc >>> 6 | Yc << 26)) + ((ag ^ A[c]) & Yc ^ ag) | 0,
                cg = A[j],
                dg = A[k];
            A[f] = A[f] + bg | 0;
            var Yb = bg + ((Xb >>> 13 | Xb << 19) ^ (Xb >>> 22 | Xb << 10) ^ (Xb >>> 2 | Xb << 30)) + ((dg | cg) & Xb | dg & cg) | 0;
            A[g] = Yb;
            var Zc = A[f],
                eg = A[c],
                fg = A[i] - 1084653625 + A[l + 27] + ((Zc >>> 11 | Zc << 21) ^ (Zc >>> 25 | Zc << 7) ^ (Zc >>> 6 | Zc << 26)) + ((eg ^ A[d]) & Zc ^ eg) | 0,
                gg = A[h],
                hg = A[j];
            A[k] = A[k] + fg | 0;
            var Zb = fg + ((Yb >>> 13 | Yb << 19) ^ (Yb >>> 22 | Yb << 10) ^ (Yb >>> 2 | Yb << 30)) + ((hg | gg) & Yb | hg & gg) | 0;
            A[i] = Zb;
            var $c = A[k],
                ig = A[d],
                jg = A[c] - 958395405 + A[l + 28] + (($c >>> 11 | $c << 21) ^ ($c >>> 25 | $c << 7) ^ ($c >>> 6 | $c << 26)) + ((ig ^ A[f]) & $c ^ ig) | 0,
                kg = A[g],
                lg = A[h];
            A[j] = A[j] + jg | 0;
            var $b = jg + ((Zb >>> 13 | Zb << 19) ^ (Zb >>> 22 | Zb << 10) ^ (Zb >>> 2 | Zb << 30)) + ((lg | kg) & Zb | lg & kg) | 0;
            A[c] = $b;
            var ad = A[j],
                mg = A[f],
                ng = A[d] - 710438585 + A[l + 29] + ((ad >>> 11 | ad << 21) ^ (ad >>> 25 | ad << 7) ^ (ad >>> 6 | ad << 26)) + ((mg ^ A[k]) & ad ^ mg) | 0,
                og = A[i],
                pg = A[g];
            A[h] = A[h] + ng | 0;
            var ac = ng + (($b >>> 13 | $b << 19) ^ ($b >>> 22 | $b << 10) ^ ($b >>> 2 | $b << 30)) + ((pg | og) & $b | pg & og) | 0;
            A[d] = ac;
            var bd = A[h],
                qg = A[k],
                rg = A[f] + A[l + 30] + ((bd >>> 11 | bd << 21) ^ (bd >>> 25 | bd << 7) ^ (bd >>> 6 | bd << 26)) + ((qg ^ A[j]) & bd ^ qg) + 113926993 | 0,
                sg = A[c],
                tg = A[i];
            A[g] = A[g] + rg | 0;
            var bc = rg + ((ac >>> 13 | ac << 19) ^ (ac >>> 22 | ac << 10) ^ (ac >>> 2 | ac << 30)) + ((tg | sg) & ac | tg & sg) | 0;
            A[f] = bc;
            var cd = A[g],
                ug = A[j],
                vg = A[k] + A[l + 31] + ((cd >>> 11 | cd << 21) ^ (cd >>> 25 | cd << 7) ^ (cd >>> 6 | cd << 26)) + ((ug ^ A[h]) & cd ^ ug) + 338241895 | 0,
                wg = A[d],
                xg = A[c];
            A[i] = A[i] + vg | 0;
            var cc = vg + ((bc >>> 13 | bc << 19) ^ (bc >>> 22 | bc << 10) ^ (bc >>> 2 | bc << 30)) + ((xg | wg) & bc | xg & wg) | 0;
            A[k] = cc;
            var dd = A[i],
                yg = A[h],
                zg = A[j] + A[l + 32] + ((dd >>> 11 | dd << 21) ^ (dd >>> 25 | dd << 7) ^ (dd >>> 6 | dd << 26)) + ((yg ^ A[g]) & dd ^ yg) + 666307205 | 0,
                Ag = A[f],
                Bg = A[d];
            A[c] = A[c] + zg | 0;
            var dc = zg + ((cc >>> 13 | cc << 19) ^ (cc >>> 22 | cc << 10) ^ (cc >>> 2 | cc << 30)) + ((Bg | Ag) & cc | Bg & Ag) | 0;
            A[j] = dc;
            var ed = A[c],
                Cg = A[g],
                Dg = A[h] + A[l + 33] + ((ed >>> 11 | ed << 21) ^ (ed >>> 25 | ed << 7) ^ (ed >>> 6 | ed << 26)) + ((Cg ^ A[i]) & ed ^ Cg) + 773529912 | 0,
                Eg = A[k],
                Fg = A[f];
            A[d] = A[d] + Dg | 0;
            var ec = Dg + ((dc >>> 13 | dc << 19) ^ (dc >>> 22 | dc << 10) ^ (dc >>> 2 | dc << 30)) + ((Fg | Eg) & dc | Fg & Eg) | 0;
            A[h] = ec;
            var fd = A[d],
                Gg = A[i],
                Hg = A[g] + A[l + 34] + ((fd >>> 11 | fd << 21) ^ (fd >>> 25 | fd << 7) ^ (fd >>> 6 | fd << 26)) + ((Gg ^ A[c]) & fd ^ Gg) + 1294757372 | 0,
                Ig = A[j],
                Jg = A[k];
            A[f] = A[f] + Hg | 0;
            var fc = Hg + ((ec >>> 13 | ec << 19) ^ (ec >>> 22 | ec << 10) ^ (ec >>> 2 | ec << 30)) + ((Jg | Ig) & ec | Jg & Ig) | 0;
            A[g] = fc;
            var gd = A[f],
                Kg = A[c],
                Lg = A[i] + A[l + 35] + ((gd >>> 11 | gd << 21) ^ (gd >>> 25 | gd << 7) ^ (gd >>> 6 | gd << 26)) + ((Kg ^ A[d]) & gd ^ Kg) + 1396182291 | 0,
                Mg = A[h],
                Ng = A[j];
            A[k] = A[k] + Lg | 0;
            var gc = Lg + ((fc >>> 13 | fc << 19) ^ (fc >>> 22 | fc << 10) ^ (fc >>> 2 | fc << 30)) + ((Ng | Mg) & fc | Ng & Mg) | 0;
            A[i] = gc;
            var hd = A[k],
                Og = A[d],
                Pg = A[c] + A[l + 36] + ((hd >>> 11 | hd << 21) ^ (hd >>> 25 | hd << 7) ^ (hd >>> 6 | hd << 26)) + ((Og ^ A[f]) & hd ^ Og) + 1695183700 | 0,
                Qg = A[g],
                Rg = A[h];
            A[j] = A[j] + Pg | 0;
            var hc = Pg + ((gc >>> 13 | gc << 19) ^ (gc >>> 22 | gc << 10) ^ (gc >>> 2 | gc << 30)) + ((Rg | Qg) & gc | Rg & Qg) | 0;
            A[c] = hc;
            var id = A[j],
                Sg = A[f],
                Tg = A[d] + A[l + 37] + ((id >>> 11 | id << 21) ^ (id >>> 25 | id << 7) ^ (id >>> 6 | id << 26)) + ((Sg ^ A[k]) & id ^ Sg) + 1986661051 | 0,
                Ug = A[i],
                Vg = A[g];
            A[h] = A[h] + Tg | 0;
            var ic = Tg + ((hc >>> 13 | hc << 19) ^ (hc >>> 22 | hc << 10) ^ (hc >>> 2 | hc << 30)) + ((Vg | Ug) & hc | Vg & Ug) | 0;
            A[d] = ic;
            var jd = A[h],
                Wg = A[k],
                Xg = A[f] - 2117940946 + A[l + 38] + ((jd >>> 11 | jd << 21) ^ (jd >>> 25 | jd << 7) ^ (jd >>> 6 | jd << 26)) + ((Wg ^ A[j]) & jd ^ Wg) | 0,
                Yg = A[c],
                Zg = A[i];
            A[g] = A[g] + Xg | 0;
            var jc = Xg + ((ic >>> 13 | ic << 19) ^ (ic >>> 22 | ic << 10) ^ (ic >>> 2 | ic << 30)) + ((Zg | Yg) & ic | Zg & Yg) | 0;
            A[f] = jc;
            var kd = A[g],
                $g = A[j],
                ah = A[k] - 1838011259 + A[l + 39] + ((kd >>> 11 | kd << 21) ^ (kd >>> 25 | kd << 7) ^ (kd >>> 6 | kd << 26)) + (($g ^ A[h]) & kd ^ $g) | 0,
                bh = A[d],
                ch = A[c];
            A[i] = A[i] + ah | 0;
            var kc = ah + ((jc >>> 13 | jc << 19) ^ (jc >>> 22 | jc << 10) ^ (jc >>> 2 | jc << 30)) + ((ch | bh) & jc | ch & bh) | 0;
            A[k] = kc;
            var ld = A[i],
                dh = A[h],
                eh = A[j] - 1564481375 + A[l + 40] + ((ld >>> 11 | ld << 21) ^ (ld >>> 25 | ld << 7) ^ (ld >>> 6 | ld << 26)) + ((dh ^ A[g]) & ld ^ dh) | 0,
                fh = A[f],
                gh = A[d];
            A[c] = A[c] + eh | 0;
            var lc = eh + ((kc >>> 13 | kc << 19) ^ (kc >>> 22 | kc << 10) ^ (kc >>> 2 | kc << 30)) + ((gh | fh) & kc | gh & fh) | 0;
            A[j] = lc;
            var md = A[c],
                hh = A[g],
                ih = A[h] - 1474664885 + A[l + 41] + ((md >>> 11 | md << 21) ^ (md >>> 25 | md << 7) ^ (md >>> 6 | md << 26)) + ((hh ^ A[i]) & md ^ hh) | 0,
                jh = A[k],
                kh = A[f];
            A[d] = A[d] + ih | 0;
            var mc = ih + ((lc >>> 13 | lc << 19) ^ (lc >>> 22 | lc << 10) ^ (lc >>> 2 | lc << 30)) + ((kh | jh) & lc | kh & jh) | 0;
            A[h] = mc;
            var nd = A[d],
                lh = A[i],
                mh = A[g] - 1035236496 + A[l + 42] + ((nd >>> 11 | nd << 21) ^ (nd >>> 25 | nd << 7) ^ (nd >>> 6 | nd << 26)) + ((lh ^ A[c]) & nd ^ lh) | 0,
                nh = A[j],
                oh = A[k];
            A[f] = A[f] + mh | 0;
            var nc = mh + ((mc >>> 13 | mc << 19) ^ (mc >>> 22 | mc << 10) ^ (mc >>> 2 | mc << 30)) + ((oh | nh) & mc | oh & nh) | 0;
            A[g] = nc;
            var od = A[f],
                ph = A[c],
                qh = A[i] - 949202525 + A[l + 43] + ((od >>> 11 | od << 21) ^ (od >>> 25 | od << 7) ^ (od >>> 6 | od << 26)) + ((ph ^ A[d]) & od ^ ph) | 0,
                rh = A[h],
                sh = A[j];
            A[k] = A[k] + qh | 0;
            var oc = qh + ((nc >>> 13 | nc << 19) ^ (nc >>> 22 | nc << 10) ^ (nc >>> 2 | nc << 30)) + ((sh | rh) & nc | sh & rh) | 0;
            A[i] = oc;
            var pd = A[k],
                th = A[d],
                uh = A[c] - 778901479 + A[l + 44] + ((pd >>> 11 | pd << 21) ^ (pd >>> 25 | pd << 7) ^ (pd >>> 6 | pd << 26)) + ((th ^ A[f]) & pd ^ th) | 0,
                vh = A[g],
                wh = A[h];
            A[j] = A[j] + uh | 0;
            var pc = uh + ((oc >>> 13 | oc << 19) ^ (oc >>> 22 | oc << 10) ^ (oc >>> 2 | oc << 30)) + ((wh | vh) & oc | wh & vh) | 0;
            A[c] = pc;
            var qd = A[j],
                xh = A[f],
                yh = A[d] - 694614492 + A[l + 45] + ((qd >>> 11 | qd << 21) ^ (qd >>> 25 | qd << 7) ^ (qd >>> 6 | qd << 26)) + ((xh ^ A[k]) & qd ^ xh) | 0,
                zh = A[i],
                Ah = A[g];
            A[h] = A[h] + yh | 0;
            var qc = yh + ((pc >>> 13 | pc << 19) ^ (pc >>> 22 | pc << 10) ^ (pc >>> 2 | pc << 30)) + ((Ah | zh) & pc | Ah & zh) | 0;
            A[d] = qc;
            var rd = A[h],
                Bh = A[k],
                Ch = A[f] - 200395387 + A[l + 46] + ((rd >>> 11 | rd << 21) ^ (rd >>> 25 | rd << 7) ^ (rd >>> 6 | rd << 26)) + ((Bh ^ A[j]) & rd ^ Bh) | 0,
                Dh = A[c],
                Eh = A[i];
            A[g] = A[g] + Ch | 0;
            var rc = Ch + ((qc >>> 13 | qc << 19) ^ (qc >>> 22 | qc << 10) ^ (qc >>> 2 | qc << 30)) + ((Eh | Dh) & qc | Eh & Dh) | 0;
            A[f] = rc;
            var sd = A[g],
                Fh = A[j],
                Gh = A[k] + A[l + 47] + ((sd >>> 11 | sd << 21) ^ (sd >>> 25 | sd << 7) ^ (sd >>> 6 | sd << 26)) + ((Fh ^ A[h]) & sd ^ Fh) + 275423344 | 0,
                Hh = A[d],
                Ih = A[c];
            A[i] = A[i] + Gh | 0;
            var sc = Gh + ((rc >>> 13 | rc << 19) ^ (rc >>> 22 | rc << 10) ^ (rc >>> 2 | rc << 30)) + ((Ih | Hh) & rc | Ih & Hh) | 0;
            A[k] = sc;
            var td = A[i],
                Jh = A[h],
                Kh = A[j] + A[l + 48] + ((td >>> 11 | td << 21) ^ (td >>> 25 | td << 7) ^ (td >>> 6 | td << 26)) + ((Jh ^ A[g]) & td ^ Jh) + 430227734 | 0,
                Lh = A[f],
                Mh = A[d];
            A[c] = A[c] + Kh | 0;
            var tc = Kh + ((sc >>> 13 | sc << 19) ^ (sc >>> 22 | sc << 10) ^ (sc >>> 2 | sc << 30)) + ((Mh | Lh) & sc | Mh & Lh) | 0;
            A[j] = tc;
            var ud = A[c],
                Nh = A[g],
                Oh = A[h] + A[l + 49] + ((ud >>> 11 | ud << 21) ^ (ud >>> 25 | ud << 7) ^ (ud >>> 6 | ud << 26)) + ((Nh ^ A[i]) & ud ^ Nh) + 506948616 | 0,
                Ph = A[k],
                Qh = A[f];
            A[d] = A[d] + Oh | 0;
            var uc = Oh + ((tc >>> 13 | tc << 19) ^ (tc >>> 22 | tc << 10) ^ (tc >>> 2 | tc << 30)) + ((Qh | Ph) & tc | Qh & Ph) | 0;
            A[h] = uc;
            var vd = A[d],
                Rh = A[i],
                Sh = A[g] + A[l + 50] + ((vd >>> 11 | vd << 21) ^ (vd >>> 25 | vd << 7) ^ (vd >>> 6 | vd << 26)) + ((Rh ^ A[c]) & vd ^ Rh) + 659060556 | 0,
                Th = A[j],
                Uh = A[k];
            A[f] = A[f] + Sh | 0;
            var vc = Sh + ((uc >>> 13 | uc << 19) ^ (uc >>> 22 | uc << 10) ^ (uc >>> 2 | uc << 30)) + ((Uh | Th) & uc | Uh & Th) | 0;
            A[g] = vc;
            var wd = A[f],
                Vh = A[c],
                Wh = A[i] + A[l + 51] + ((wd >>> 11 | wd << 21) ^ (wd >>> 25 | wd << 7) ^ (wd >>> 6 | wd << 26)) + ((Vh ^ A[d]) & wd ^ Vh) + 883997877 | 0,
                Xh = A[h],
                Yh = A[j];
            A[k] = A[k] + Wh | 0;
            var wc = Wh + ((vc >>> 13 | vc << 19) ^ (vc >>> 22 | vc << 10) ^ (vc >>> 2 | vc << 30)) + ((Yh | Xh) & vc | Yh & Xh) | 0;
            A[i] = wc;
            var xd = A[k],
                Zh = A[d],
                $h = A[c] + A[l + 52] + ((xd >>> 11 | xd << 21) ^ (xd >>> 25 | xd << 7) ^ (xd >>> 6 | xd << 26)) + ((Zh ^ A[f]) & xd ^ Zh) + 958139571 | 0,
                ai = A[g],
                bi = A[h];
            A[j] = A[j] + $h | 0;
            var xc = $h + ((wc >>> 13 | wc << 19) ^ (wc >>> 22 | wc << 10) ^ (wc >>> 2 | wc << 30)) + ((bi | ai) & wc | bi & ai) | 0;
            A[c] = xc;
            var yd = A[j],
                ci = A[f],
                di = A[d] + A[l + 53] + ((yd >>> 11 | yd << 21) ^ (yd >>> 25 | yd << 7) ^ (yd >>> 6 | yd << 26)) + ((ci ^ A[k]) & yd ^ ci) + 1322822218 | 0,
                ei = A[i],
                fi = A[g];
            A[h] = A[h] + di | 0;
            var yc = di + ((xc >>> 13 | xc << 19) ^ (xc >>> 22 | xc << 10) ^ (xc >>> 2 | xc << 30)) + ((fi | ei) & xc | fi & ei) | 0;
            A[d] = yc;
            var zd = A[h],
                gi = A[k],
                hi = A[f] + A[l + 54] + ((zd >>> 11 | zd << 21) ^ (zd >>> 25 | zd << 7) ^ (zd >>> 6 | zd << 26)) + ((gi ^ A[j]) & zd ^ gi) + 1537002063 | 0,
                ii = A[c],
                ji = A[i];
            A[g] = A[g] + hi | 0;
            var zc = hi + ((yc >>> 13 | yc << 19) ^ (yc >>> 22 | yc << 10) ^ (yc >>> 2 | yc << 30)) + ((ji | ii) & yc | ji & ii) | 0;
            A[f] = zc;
            var Ad = A[g],
                ki = A[j],
                li = A[k] + A[l + 55] + ((Ad >>> 11 | Ad << 21) ^ (Ad >>> 25 | Ad << 7) ^ (Ad >>> 6 | Ad << 26)) + ((ki ^ A[h]) & Ad ^ ki) + 1747873779 | 0,
                mi = A[d],
                ni = A[c];
            A[i] = A[i] + li | 0;
            var Ac = li + ((zc >>> 13 | zc << 19) ^ (zc >>> 22 | zc << 10) ^ (zc >>> 2 | zc << 30)) + ((ni | mi) & zc | ni & mi) | 0;
            A[k] = Ac;
            var Bd = A[i],
                oi = A[h],
                pi = A[j] + A[l + 56] + ((Bd >>> 11 | Bd << 21) ^ (Bd >>> 25 | Bd << 7) ^ (Bd >>> 6 | Bd << 26)) + ((oi ^ A[g]) & Bd ^ oi) + 1955562222 | 0,
                qi = A[f],
                ri = A[d];
            A[c] = A[c] + pi | 0;
            var Bc = pi + ((Ac >>> 13 | Ac << 19) ^ (Ac >>> 22 | Ac << 10) ^ (Ac >>> 2 | Ac << 30)) + ((ri | qi) & Ac | ri & qi) | 0;
            A[j] = Bc;
            var Cd = A[c],
                si = A[g],
                ti = A[h] + A[l + 57] + ((Cd >>> 11 | Cd << 21) ^ (Cd >>> 25 | Cd << 7) ^ (Cd >>> 6 | Cd << 26)) + ((si ^ A[i]) & Cd ^ si) + 2024104815 | 0,
                ui = A[k],
                vi = A[f];
            A[d] = A[d] + ti | 0;
            var Cc = ti + ((Bc >>> 13 | Bc << 19) ^ (Bc >>> 22 | Bc << 10) ^ (Bc >>> 2 | Bc << 30)) + ((vi | ui) & Bc | vi & ui) | 0;
            A[h] = Cc;
            var Dd = A[d],
                wi = A[i],
                xi = A[g] - 2067236844 + A[l + 58] + ((Dd >>> 11 | Dd << 21) ^ (Dd >>> 25 | Dd << 7) ^ (Dd >>> 6 | Dd << 26)) + ((wi ^ A[c]) & Dd ^ wi) | 0,
                yi = A[j],
                zi = A[k];
            A[f] = A[f] + xi | 0;
            var Dc = xi + ((Cc >>> 13 | Cc << 19) ^ (Cc >>> 22 | Cc << 10) ^ (Cc >>> 2 | Cc << 30)) + ((zi | yi) & Cc | zi & yi) | 0;
            A[g] = Dc;
            var Ed = A[f],
                Ai = A[c],
                Bi = A[i] - 1933114872 + A[l + 59] + ((Ed >>> 11 | Ed << 21) ^ (Ed >>> 25 | Ed << 7) ^ (Ed >>> 6 | Ed << 26)) + ((Ai ^ A[d]) & Ed ^ Ai) | 0,
                Ci = A[h],
                Di = A[j];
            A[k] = A[k] + Bi | 0;
            var Ec = Bi + ((Dc >>> 13 | Dc << 19) ^ (Dc >>> 22 | Dc << 10) ^ (Dc >>> 2 | Dc << 30)) + ((Di | Ci) & Dc | Di & Ci) | 0;
            A[i] = Ec;
            var Fd = A[k],
                Ei = A[d],
                Fi = A[c] - 1866530822 + A[l + 60] + ((Fd >>> 11 | Fd << 21) ^ (Fd >>> 25 | Fd << 7) ^ (Fd >>> 6 | Fd << 26)) + ((Ei ^ A[f]) & Fd ^ Ei) | 0,
                Gi = A[g],
                Hi = A[h];
            A[j] = A[j] + Fi | 0;
            var Fc = Fi + ((Ec >>> 13 | Ec << 19) ^ (Ec >>> 22 | Ec << 10) ^ (Ec >>> 2 | Ec << 30)) + ((Hi | Gi) & Ec | Hi & Gi) | 0;
            A[c] = Fc;
            var Gd = A[j],
                Ii = A[f],
                Ji = A[d] - 1538233109 + A[l + 61] + ((Gd >>> 11 | Gd << 21) ^ (Gd >>> 25 | Gd << 7) ^ (Gd >>> 6 | Gd << 26)) + ((Ii ^ A[k]) & Gd ^ Ii) | 0,
                Ki = A[i],
                Li = A[g];
            A[h] = A[h] + Ji | 0;
            var Gc = Ji + ((Fc >>> 13 | Fc << 19) ^ (Fc >>> 22 | Fc << 10) ^ (Fc >>> 2 | Fc << 30)) + ((Li | Ki) & Fc | Li & Ki) | 0;
            A[d] = Gc;
            var Hd = A[h],
                Mi = A[k],
                Ni = A[f] - 1090935817 + A[l + 62] + ((Hd >>> 11 | Hd << 21) ^ (Hd >>> 25 | Hd << 7) ^ (Hd >>> 6 | Hd << 26)) + ((Mi ^ A[j]) & Hd ^ Mi) | 0,
                Oi = A[c],
                Pi = A[i];
            A[g] = A[g] + Ni | 0;
            var Hc = Ni + ((Gc >>> 13 | Gc << 19) ^ (Gc >>> 22 | Gc << 10) ^ (Gc >>> 2 | Gc << 30)) + ((Pi | Oi) & Gc | Pi & Oi) | 0;
            A[f] = Hc;
            var Id = A[g],
                Qi = A[j],
                Ri = A[k] - 965641998 + A[l + 63] + ((Id >>> 11 | Id << 21) ^ (Id >>> 25 | Id << 7) ^ (Id >>> 6 | Id << 26)) + ((Qi ^ A[h]) & Id ^ Qi) | 0,
                Si = A[d],
                Ti = A[c];
            A[i] = A[i] + Ri | 0;
            var Ui = Ri + ((Hc >>> 13 | Hc << 19) ^ (Hc >>> 22 | Hc << 10) ^ (Hc >>> 2 | Hc << 30)) + ((Ti | Si) & Hc | Ti & Si) | 0;
            A[k] = Ui;
            A[b >> 2] = A[b >> 2] + Ui | 0;
            var Vi = b + 4 | 0;
            A[Vi >> 2] = A[Vi >> 2] + A[q + 1] | 0;
            var Wi = b + 8 | 0;
            A[Wi >> 2] = A[Wi >> 2] + A[q + 2] | 0;
            var Xi = b + 12 | 0;
            A[Xi >> 2] = A[Xi >> 2] + A[q + 3] | 0;
            var Yi = b + 16 | 0;
            A[Yi >> 2] = A[Yi >> 2] + A[q + 4] | 0;
            var Zi = b + 20 | 0;
            A[Zi >> 2] = A[Zi >> 2] + A[q + 5] | 0;
            var $i = b + 24 | 0;
            A[$i >> 2] = A[$i >> 2] + A[q + 6] | 0;
            var aj = b + 28 | 0;
            A[aj >> 2] = A[aj >> 2] + A[q + 7] | 0;
            y = r
        }
        hj.X = 1;

        function ij(b, e) {
            z[b + 3 | 0] = e & 255;
            z[b + 2 | 0] = e >>> 8 & 255;
            z[b + 1 | 0] = e >>> 16 & 255;
            z[b] = e >>> 24 & 255
        }

        function jj(b, e) {
            var c = y;
            y = y + 8 | 0;
            var d = c | 0;
            kj(d, e + 32 | 0, 8);
            var f = A[e + 36 >> 2] >>> 3 & 63;
            fj(e, 5243620, (56 > f >>> 0 ? 56 : 120) - f | 0);
            fj(e, d, 8);
            y = c;
            kj(b, e | 0, 32);
            ge(e, 0, 104)
        }

        function kj(b, e, c) {
            c >>>= 2;
            if (0 != (c | 0)) {
                for (var d = 0; !(ij((d << 2) + b | 0, A[e + (d << 2) >> 2]), d = d + 1 | 0, d >>> 0 >= c >>> 0);) {}
            }
        }

        function lj(b, e, c) {
            var d = y;
            y = y + 96 | 0;
            if (64 < c >>> 0) {
                var f = b | 0;
                of(f);
                fj(f, e, c);
                c = d + 64 | 0;
                jj(c, f);
                f = c;
                c = 32
            } else {
                f = e
            }
            var h = b | 0;
            of(h);
            e = d | 0;
            ge(e, 54, 64);
            var g = 0 == (c | 0);
            a: do {
                if (!g) {
                    for (var i = 0;;) {
                        var j = d + i | 0;
                        z[j] ^= z[f + i | 0];
                        i = i + 1 | 0;
                        if ((i | 0) == (c | 0)) {
                            break a
                        }
                    }
                }
            } while (0);
            fj(h, e, 64);
            b = b + 104 | 0;
            of(b);
            ge(e, 92, 64);
            if (0 != (c | 0)) {
                for (h = 0; !(g = d + h | 0, z[g] ^= z[f + h | 0], h = h + 1 | 0, (h | 0) == (c | 0));) {}
            }
            fj(b, e, 64);
            y = d
        }

        function mj(b, e) {
            var c = y;
            y = y + 32 | 0;
            var d = c | 0;
            jj(d, e | 0);
            var f = e + 104 | 0;
            fj(f, d, 32);
            jj(b, f);
            y = c
        }

        function bj(b, e, c, d, f, h, g, i) {
            var j = y;
            y = y + 484 | 0;
            var m = j + 208,
                p = j + 420,
                k = j + 452;
            lj(j, b, e);
            fj(j | 0, c, d);
            if (0 != (i | 0)) {
                for (var c = j + 416 | 0, d = p | 0, q = k | 0, l = 0 > h >>> 0 | 0 == h >>> 0 & 2 > f >>> 0, r = 0, s = 0;;) {
                    r = r + 1 | 0;
                    ij(c, r);
                    for (var x = j >> 2, u = m >> 2, D = x + 52; x < D; x++, u++) {
                        A[u] = A[x]
                    }
                    fj(m | 0, c, 4);
                    mj(d, m);
                    gj(q, d, 32);
                    a: do {
                        if (!l) {
                            x = 0;
                            for (u = 2;;) {
                                lj(m, b, e);
                                fj(m | 0, d, 32);
                                mj(d, m);
                                for (D = 0;;) {
                                    var H = k + D | 0;
                                    z[H] ^= z[p + D | 0];
                                    D = D + 1 | 0;
                                    if (32 == (D | 0)) {
                                        break
                                    }
                                }
                                u = (nf.add(u, x, 1, 0), A[G >> 2]);
                                x = A[G + 4 >> 2];
                                if (x >>> 0 > h >>> 0 | x >>> 0 == h >>> 0 & u >>> 0 > f >>> 0) {
                                    break a
                                }
                            }
                        }
                    } while (0);
                    x = i - s | 0;
                    gj(g + s | 0, q, 32 < x >>> 0 ? 32 : x);
                    s = r << 5;
                    if (s >>> 0 >= i >>> 0) {
                        break
                    }
                }
            }
            y = j
        }
        bj.X = 1;

        function fe(b) {
            do {
                if (245 > b >>> 0) {
                    var e = 11 > b >>> 0 ? 16 : b + 11 & -8,
                        c = e >>> 3,
                        d = A[1310757],
                        f = d >>> (c >>> 0);
                    if (0 != (f & 3 | 0)) {
                        var e = (f & 1 ^ 1) + c | 0,
                            h = e << 1,
                            b = (h << 2) + 5243068 | 0,
                            f = (h + 2 << 2) + 5243068 | 0,
                            c = A[f >> 2],
                            h = c + 8 | 0,
                            g = A[h >> 2];
                        (b | 0) == (g | 0) ? A[1310757] = d & (1 << e ^ -1) : g >>> 0 < A[1310761] >>> 0 ? U() : (A[f >> 2] = g, A[g + 12 >> 2] = b);
                        d = e << 3;
                        A[c + 4 >> 2] = d | 3;
                        d = c + (d | 4) | 0;
                        A[d >> 2] |= 1;
                        return h
                    }
                    if (e >>> 0 > A[1310759] >>> 0) {
                        if (0 == (f | 0)) {
                            if (0 == (A[1310758] | 0)) {
                                d = e;
                                break
                            }
                            h = nj(e);
                            if (0 == (h | 0)) {
                                d = e;
                                break
                            }
                            return h
                        }
                        var b = 2 << c,
                            b = f << c & (b | -b),
                            c = (b & -b) - 1 | 0,
                            b = c >>> 12 & 16,
                            f = c >>> (b >>> 0),
                            c = f >>> 5 & 8,
                            g = f >>> (c >>> 0),
                            f = g >>> 2 & 4,
                            i = g >>> (f >>> 0),
                            g = i >>> 1 & 2,
                            i = i >>> (g >>> 0),
                            j = i >>> 1 & 1,
                            f = (c | b | f | g | j) + (i >>> (j >>> 0)) | 0,
                            b = f << 1,
                            g = (b << 2) + 5243068 | 0,
                            i = (b + 2 << 2) + 5243068 | 0,
                            c = A[i >> 2],
                            b = c + 8 | 0,
                            j = A[b >> 2];
                        (g | 0) == (j | 0) ? A[1310757] = d & (1 << f ^ -1) : j >>> 0 < A[1310761] >>> 0 ? U() : (A[i >> 2] = j, A[j + 12 >> 2] = g);
                        f <<= 3;
                        d = f - e | 0;
                        A[c + 4 >> 2] = e | 3;
                        g = c;
                        c = g + e | 0;
                        A[g + (e | 4) >> 2] = d | 1;
                        A[g + f >> 2] = d;
                        j = A[1310759];
                        0 != (j | 0) && (e = A[1310762], f = j >>> 2 & 1073741822, g = (f << 2) + 5243068 | 0, i = A[1310757], j = 1 << (j >>> 3), 0 == (i & j | 0) ? (A[1310757] = i | j, h = g) : (i = A[(f + 2 << 2) + 5243068 >> 2], i >>> 0 < A[1310761] >>> 0 ? U() : h = i), A[(f + 2 << 2) + 5243068 >> 2] = e, A[h + 12 >> 2] = e, A[e + 8 >> 2] = h, A[e + 12 >> 2] = g);
                        A[1310759] = d;
                        A[1310762] = c;
                        return h = b
                    }
                    d = e
                } else {
                    if (4294967231 < b >>> 0) {
                        d = -1
                    } else {
                        if (d = b + 11 & -8, 0 != (A[1310758] | 0) && (e = oj(d), 0 != (e | 0))) {
                            return h = e
                        }
                    }
                }
            } while (0);
            e = A[1310759];
            d >>> 0 > e >>> 0 ? (h = A[1310760], d >>> 0 < h >>> 0 ? (h = h - d | 0, A[1310760] = h, e = A[1310763], A[1310763] = e + d | 0, A[d + (e + 4) >> 2] = h | 1, A[e + 4 >> 2] = d | 3, h = e + 8 | 0) : h = pj(d)) : (b = e - d | 0, h = A[1310762], 15 < b >>> 0 ? (A[1310762] = h + d | 0, A[1310759] = b, A[d + (h + 4) >> 2] = b | 1, A[h + e >> 2] = b, A[h + 4 >> 2] = d | 3) : (A[1310759] = 0, A[1310762] = 0, A[h + 4 >> 2] = e | 3, d = e + (h + 4) | 0, A[d >> 2] |= 1), h = h + 8 | 0);
            return h
        }
        Module._malloc = fe;
        fe.X = 1;

        function nj(b) {
            var e, c, d = A[1310758],
                f = (d & -d) - 1 | 0,
                d = f >>> 12 & 16;
            c = f >>> (d >>> 0);
            var f = c >>> 5 & 8,
                h = c >>> (f >>> 0);
            c = h >>> 2 & 4;
            var g = h >>> (c >>> 0),
                h = g >>> 1 & 2,
                g = g >>> (h >>> 0),
                i = g >>> 1 & 1,
                d = h = f = A[((f | d | c | h | i) + (g >>> (i >>> 0)) << 2) + 5243332 >> 2];
            c = d >> 2;
            for (f = (A[f + 4 >> 2] & -8) - b | 0;;) {
                g = A[h + 16 >> 2];
                if (0 == (g | 0)) {
                    if (h = A[h + 20 >> 2], 0 == (h | 0)) {
                        break
                    } else {
                        c = h
                    }
                } else {
                    c = g
                }
                g = (A[c + 4 >> 2] & -8) - b | 0;
                i = g >>> 0 < f >>> 0;
                h = c;
                d = i ? c : d;
                c = d >> 2;
                f = i ? g : f
            }
            var g = d,
                j = A[1310761];
            g >>> 0 < j >>> 0 && U();
            h = g + b | 0;
            g >>> 0 < h >>> 0 || U();
            var i = A[c + 6],
                m = A[c + 3],
                p = (m | 0) == (d | 0);
            a: do {
                if (p) {
                    var k = d + 20 | 0,
                        q = A[k >> 2];
                    do {
                        if (0 == (q | 0)) {
                            var l = d + 16 | 0,
                                r = A[l >> 2];
                            if (0 == (r | 0)) {
                                var s = 0;
                                e = s >> 2;
                                break a
                            }
                        } else {
                            l = k, r = q
                        }
                    } while (0);
                    for (;;) {
                        k = r + 20 | 0;
                        if (0 == (A[k >> 2] | 0) && (k = r + 16 | 0, 0 == (A[k >> 2] | 0))) {
                            break
                        }
                        l = k;
                        r = A[k >> 2]
                    }
                    l >>> 0 < A[1310761] >>> 0 ? U() : (A[l >> 2] = 0, s = r, e = s >> 2)
                } else {
                    l = A[c + 2], l >>> 0 < j >>> 0 ? U() : (A[l + 12 >> 2] = m, A[m + 8 >> 2] = l, s = m, e = s >> 2)
                }
            } while (0);
            j = 0 == (i | 0);
            a: do {
                if (!j) {
                    m = d + 28 | 0;
                    p = (A[m >> 2] << 2) + 5243332 | 0;
                    do {
                        if ((d | 0) == (A[p >> 2] | 0)) {
                            if (A[p >> 2] = s, 0 == (s | 0)) {
                                A[1310758] &= 1 << A[m >> 2] ^ -1;
                                break a
                            }
                        } else {
                            if (i >>> 0 < A[1310761] >>> 0 && U(), l = i + 16 | 0, (A[l >> 2] | 0) == (d | 0) ? A[l >> 2] = s : A[i + 20 >> 2] = s, 0 == (s | 0)) {
                                break a
                            }
                        }
                    } while (0);
                    s >>> 0 < A[1310761] >>> 0 && U();
                    A[e + 6] = i;
                    m = A[c + 4];
                    0 != (m | 0) && (m >>> 0 < A[1310761] >>> 0 ? U() : (A[e + 4] = m, A[m + 24 >> 2] = s));
                    m = A[c + 5];
                    0 != (m | 0) && (m >>> 0 < A[1310761] >>> 0 ? U() : (A[e + 5] = m, A[m + 24 >> 2] = s))
                }
            } while (0);
            if (16 > f >>> 0) {
                var x = f + b | 0;
                A[c + 1] = x | 3;
                x = x + (g + 4) | 0;
                A[x >> 2] |= 1;
                return x = d + 8 | 0
            }
            A[c + 1] = b | 3;
            A[b + (g + 4) >> 2] = f | 1;
            A[g + f + b >> 2] = f;
            g = A[1310759];
            0 != (g | 0) && (b = A[1310762], e = g >>> 2 & 1073741822, s = (e << 2) + 5243068 | 0, c = A[1310757], g = 1 << (g >>> 3), 0 == (c & g | 0) ? (A[1310757] = c | g, x = s) : (c = A[(e + 2 << 2) + 5243068 >> 2], c >>> 0 < A[1310761] >>> 0 ? U() : x = c), A[(e + 2 << 2) + 5243068 >> 2] = b, A[x + 12 >> 2] = b, A[b + 8 >> 2] = x, A[b + 12 >> 2] = s);
            A[1310759] = f;
            A[1310762] = h;
            return x = d + 8 | 0
        }
        nj.X = 1;

        function pj(b) {
            var e, c = 0;
            0 == (A[1310720] | 0) && qj();
            e = 0 == (A[1310867] & 4 | 0);
            a: do {
                if (e) {
                    var d = A[1310763];
                    if (0 == (d | 0)) {
                        c = 216
                    } else {
                        if (d = rj(d), 0 == (d | 0)) {
                            c = 216
                        } else {
                            var f = A[1310722],
                                f = b + 47 - A[1310760] + f & -f;
                            if (2147483647 > f >>> 0) {
                                var c = Xe(f),
                                    h = (c | 0) == (A[d >> 2] + A[d + 4 >> 2] | 0),
                                    g = h ? c : -1,
                                    h = h ? f : 0,
                                    i = f,
                                    j = c,
                                    c = 223
                            } else {
                                var m = 0
                            }
                        }
                    } if (216 == c) {
                        if (d = Xe(0), -1 == (d | 0)) {
                            m = 0
                        } else {
                            var f = A[1310722],
                                f = f + (b + 47) & -f,
                                p = d,
                                k = A[1310721],
                                q = k - 1 | 0,
                                f = 0 == (q & p | 0) ? f : f - p + (q + p & -k) | 0;
                            2147483647 > f >>> 0 ? (c = Xe(f), g = (h = (c | 0) == (d | 0)) ? d : -1, h = h ? f : 0, i = f, j = c, c = 223) : m = 0
                        }
                    }
                    b: do {
                        if (223 == c) {
                            c = -i | 0;
                            if (-1 != (g | 0)) {
                                var l = h,
                                    r = g,
                                    c = 236;
                                break a
                            }
                            do {
                                if (-1 != (j | 0) & 2147483647 > i >>> 0) {
                                    if (i >>> 0 < (b + 48 | 0) >>> 0) {
                                        if (m = A[1310722], m = b + 47 - i + m & -m, 2147483647 > m >>> 0) {
                                            if (-1 == (Xe(m) | 0)) {
                                                Xe(c);
                                                m = h;
                                                break b
                                            } else {
                                                m = m + i | 0
                                            }
                                        } else {
                                            m = i
                                        }
                                    } else {
                                        m = i
                                    }
                                } else {
                                    m = i
                                }
                            } while (0);
                            if (-1 != (j | 0)) {
                                l = m;
                                r = j;
                                c = 236;
                                break a
                            }
                            A[1310867] |= 4;
                            var s = h,
                                c = 233;
                            break a
                        }
                    } while (0);
                    A[1310867] |= 4;
                    s = m
                } else {
                    s = 0
                }
                c = 233
            } while (0);
            233 == c && (e = A[1310722], e = e + (b + 47) & -e, 2147483647 > e >>> 0 && (e = Xe(e), g = Xe(0), -1 != (g | 0) & -1 != (e | 0) & e >>> 0 < g >>> 0 && (g = g - e | 0, e = (h = g >>> 0 > (b + 40 | 0) >>> 0) ? e : -1, -1 != (e | 0) && (l = h ? g : s, r = e, c = 236))));
            do {
                if (236 == c) {
                    s = A[1310865] + l | 0;
                    A[1310865] = s;
                    s >>> 0 > A[1310866] >>> 0 && (A[1310866] = s);
                    s = 0 == (A[1310763] | 0);
                    a: do {
                        if (s) {
                            e = A[1310761];
                            0 == (e | 0) | r >>> 0 < e >>> 0 && (A[1310761] = r);
                            A[1310868] = r;
                            A[1310869] = l;
                            A[1310871] = 0;
                            A[1310766] = A[1310720];
                            A[1310765] = -1;
                            for (e = 0; !(g = e << 1, h = (g << 2) + 5243068 | 0, A[(g + 3 << 2) + 5243068 >> 2] = h, A[(g + 2 << 2) + 5243068 >> 2] = h, e = e + 1 | 0, 32 == (e | 0));) {}
                            sj(r, l - 40 | 0)
                        } else {
                            g = 5243472;
                            for (e = g >> 2; 0 != (g | 0);) {
                                var x = A[e],
                                    u = g + 4 | 0,
                                    D = A[u >> 2],
                                    H = x + D | 0;
                                if ((r | 0) == (H | 0)) {
                                    c = 245;
                                    break
                                }
                                g = A[e + 2];
                                e = g >> 2
                            }
                            do {
                                if (245 == c && 0 == (A[e + 3] & 8 | 0) && (g = A[1310763], g >>> 0 >= x >>> 0 & g >>> 0 < H >>> 0)) {
                                    A[u >> 2] = D + l | 0;
                                    sj(A[1310763], A[1310760] + l | 0);
                                    break a
                                }
                            } while (0);
                            r >>> 0 < A[1310761] >>> 0 && (A[1310761] = r);
                            e = r + l | 0;
                            for (g = 5243472; 0 != (g | 0);) {
                                var L = g | 0,
                                    E = A[L >> 2];
                                if ((E | 0) == (e | 0)) {
                                    c = 254;
                                    break
                                }
                                g = A[g + 8 >> 2]
                            }
                            if (254 == c && 0 == (A[g + 12 >> 2] & 8 | 0)) {
                                return A[L >> 2] = r, x = g + 4 | 0, A[x >> 2] = A[x >> 2] + l | 0, b = tj(r, E, b)
                            }
                            uj(r, l)
                        }
                    } while (0);
                    s = A[1310760];
                    if (s >>> 0 > b >>> 0) {
                        return l = s - b | 0, A[1310760] = l, E = r = A[1310763], A[1310763] = E + b | 0, A[b + (E + 4) >> 2] = l | 1, A[r + 4 >> 2] = b | 3, b = r + 8 | 0
                    }
                }
            } while (0);
            A[Ce >> 2] = 12;
            return 0
        }
        pj.X = 1;

        function oj(b) {
            var e, c, d, f, h, g = b >> 2,
                i = 0,
                j = -b | 0,
                m = b >>> 8;
            if (0 == (m | 0)) {
                var p = 0
            } else {
                if (16777215 < b >>> 0) {
                    p = 31
                } else {
                    var k = (m + 1048320 | 0) >>> 16 & 8,
                        q = m << k,
                        l = (q + 520192 | 0) >>> 16 & 4,
                        r = q << l,
                        s = (r + 245760 | 0) >>> 16 & 2,
                        x = 14 - (l | k | s) + (r << s >>> 15) | 0,
                        p = b >>> ((x + 7 | 0) >>> 0) & 1 | x << 1
                }
            }
            var u = A[(p << 2) + 5243332 >> 2],
                D = 0 == (u | 0);
            a: do {
                if (D) {
                    var H = 0,
                        L = j,
                        E = 0
                } else {
                    var F = 31 == (p | 0) ? 0 : 25 - (p >>> 1) | 0,
                        M = 0,
                        S = j,
                        Q = u;
                    h = Q >> 2;
                    for (var B = b << F, V = 0;;) {
                        var I = A[h + 1] & -8,
                            aa = I - b | 0;
                        if (aa >>> 0 < S >>> 0) {
                            if ((I | 0) == (b | 0)) {
                                H = Q;
                                L = aa;
                                E = Q;
                                break a
                            } else {
                                var ba = Q,
                                    eb = aa
                            }
                        } else {
                            ba = M, eb = S
                        }
                        var fb = A[h + 5],
                            hb = A[((B >>> 31 << 2) + 16 >> 2) + h],
                            Sa = 0 == (fb | 0) | (fb | 0) == (hb | 0) ? V : fb;
                        if (0 == (hb | 0)) {
                            H = ba;
                            L = eb;
                            E = Sa;
                            break a
                        } else {
                            M = ba, S = eb, Q = hb, h = Q >> 2, B <<= 1, V = Sa
                        }
                    }
                }
            } while (0);
            if (0 == (E | 0) & 0 == (H | 0)) {
                var ma = 2 << p,
                    N = A[1310758] & (ma | -ma);
                if (0 == (N | 0)) {
                    var Ia = E
                } else {
                    var Aa = (N & -N) - 1 | 0,
                        ib = Aa >>> 12 & 16,
                        tb = Aa >>> (ib >>> 0),
                        na = tb >>> 5 & 8,
                        ra = tb >>> (na >>> 0),
                        Ta = ra >>> 2 & 4,
                        ub = ra >>> (Ta >>> 0),
                        jb = ub >>> 1 & 2,
                        Ua = ub >>> (jb >>> 0),
                        ha = Ua >>> 1 & 1,
                        Ia = A[((na | ib | Ta | jb | ha) + (Ua >>> (ha >>> 0)) << 2) + 5243332 >> 2]
                }
            } else {
                Ia = E
            }
            var Ja = 0 == (Ia | 0);
            a: do {
                if (Ja) {
                    var R = L,
                        P = H;
                    f = P >> 2
                } else {
                    var oa = Ia;
                    d = oa >> 2;
                    for (var Ka = L, X = H;;) {
                        var La = (A[d + 1] & -8) - b | 0,
                            Cb = La >>> 0 < Ka >>> 0,
                            Ma = Cb ? La : Ka,
                            Ba = Cb ? oa : X,
                            vb = A[d + 4];
                        if (0 != (vb | 0)) {
                            oa = vb, d = oa >> 2, Ka = Ma, X = Ba
                        } else {
                            var da = A[d + 5];
                            if (0 == (da | 0)) {
                                R = Ma;
                                P = Ba;
                                f = P >> 2;
                                break a
                            } else {
                                oa = da, d = oa >> 2, Ka = Ma, X = Ba
                            }
                        }
                    }
                }
            } while (0);
            if (0 == (P | 0)) {
                var ea = 0;
                return ea
            }
            if (R >>> 0 >= (A[1310759] - b | 0) >>> 0) {
                return ea = 0
            }
            var sa = P;
            c = sa >> 2;
            var Db = A[1310761];
            sa >>> 0 < Db >>> 0 && U();
            var Va = sa + b | 0;
            sa >>> 0 < Va >>> 0 || U();
            var Pa = A[f + 6],
                fa = A[f + 3],
                Na = (fa | 0) == (P | 0);
            a: do {
                if (Na) {
                    var T = P + 20 | 0,
                        Wa = A[T >> 2];
                    do {
                        if (0 == (Wa | 0)) {
                            var Oa = P + 16 | 0,
                                wb = A[Oa >> 2];
                            if (0 == (wb | 0)) {
                                var O = 0;
                                e = O >> 2;
                                break a
                            } else {
                                var ia = Oa,
                                    Ca = wb
                            }
                        } else {
                            ia = T, Ca = Wa
                        }
                    } while (0);
                    for (;;) {
                        var xb = Ca + 20 | 0;
                        if (0 == (A[xb >> 2] | 0)) {
                            var Xa = Ca + 16 | 0;
                            if (0 == (A[Xa >> 2] | 0)) {
                                break
                            } else {
                                var kb = Xa
                            }
                        } else {
                            kb = xb
                        }
                        ia = kb;
                        Ca = A[kb >> 2]
                    }
                    ia >>> 0 < A[1310761] >>> 0 ? U() : (A[ia >> 2] = 0, O = Ca, e = O >> 2)
                } else {
                    var Y = A[f + 2];
                    Y >>> 0 < Db >>> 0 ? U() : (A[Y + 12 >> 2] = fa, A[fa + 8 >> 2] = Y, O = fa, e = O >> 2)
                }
            } while (0);
            var ta = 0 == (Pa | 0);
            a: do {
                if (!ta) {
                    var ja = P + 28 | 0,
                        lb = (A[ja >> 2] << 2) + 5243332 | 0;
                    do {
                        if ((P | 0) == (A[lb >> 2] | 0)) {
                            if (A[lb >> 2] = O, 0 == (O | 0)) {
                                A[1310758] &= 1 << A[ja >> 2] ^ -1;
                                break a
                            }
                        } else {
                            Pa >>> 0 < A[1310761] >>> 0 && U();
                            var mb = Pa + 16 | 0;
                            (A[mb >> 2] | 0) == (P | 0) ? A[mb >> 2] = O : A[Pa + 20 >> 2] = O;
                            if (0 == (O | 0)) {
                                break a
                            }
                        }
                    } while (0);
                    O >>> 0 < A[1310761] >>> 0 && U();
                    A[e + 6] = Pa;
                    var Ya = A[f + 4];
                    0 != (Ya | 0) && (Ya >>> 0 < A[1310761] >>> 0 ? U() : (A[e + 4] = Ya, A[Ya + 24 >> 2] = O));
                    var ca = A[f + 5];
                    0 != (ca | 0) && (ca >>> 0 < A[1310761] >>> 0 ? U() : (A[e + 5] = ca, A[ca + 24 >> 2] = O))
                }
            } while (0);
            do {
                if (16 > R >>> 0) {
                    var ua = R + b | 0;
                    A[f + 1] = ua | 3;
                    var Za = ua + (sa + 4) | 0;
                    A[Za >> 2] |= 1
                } else {
                    if (A[f + 1] = b | 3, A[g + (c + 1)] = R | 1, A[(R >> 2) + c + g] = R, 256 > R >>> 0) {
                        var Qa = R >>> 2 & 1073741822,
                            $a = (Qa << 2) + 5243068 | 0,
                            Da = A[1310757],
                            va = 1 << (R >>> 3);
                        if (0 == (Da & va | 0)) {
                            A[1310757] = Da | va;
                            var wa = $a
                        } else {
                            var ab = A[(Qa + 2 << 2) + 5243068 >> 2];
                            ab >>> 0 < A[1310761] >>> 0 ? U() : wa = ab
                        }
                        A[(Qa + 2 << 2) + 5243068 >> 2] = Va;
                        A[wa + 12 >> 2] = Va;
                        A[g + (c + 2)] = wa;
                        A[g + (c + 3)] = $a
                    } else {
                        var xa = Va,
                            Ra = R >>> 8;
                        if (0 == (Ra | 0)) {
                            var Ea = 0
                        } else {
                            if (16777215 < R >>> 0) {
                                Ea = 31
                            } else {
                                var ka = (Ra + 1048320 | 0) >>> 16 & 8,
                                    Fa = Ra << ka,
                                    yb = (Fa + 520192 | 0) >>> 16 & 4,
                                    nb = Fa << yb,
                                    pa = (nb + 245760 | 0) >>> 16 & 2,
                                    ob = 14 - (yb | ka | pa) + (nb << pa >>> 15) | 0,
                                    Ea = R >>> ((ob + 7 | 0) >>> 0) & 1 | ob << 1
                            }
                        }
                        var ga = (Ea << 2) + 5243332 | 0;
                        A[g + (c + 7)] = Ea;
                        A[g + (c + 5)] = 0;
                        A[g + (c + 4)] = 0;
                        var Ga = A[1310758],
                            bb = 1 << Ea;
                        if (0 == (Ga & bb | 0)) {
                            A[1310758] = Ga | bb, A[ga >> 2] = xa, A[g + (c + 6)] = ga, A[g + (c + 3)] = xa, A[g + (c + 2)] = xa
                        } else {
                            for (var pb = R << (31 == (Ea | 0) ? 0 : 25 - (Ea >>> 1) | 0), Ha = A[ga >> 2];
                                (A[Ha + 4 >> 2] & -8 | 0) != (R | 0);) {
                                var qb = (pb >>> 31 << 2) + Ha + 16 | 0,
                                    ya = A[qb >> 2];
                                if (0 == (ya | 0)) {
                                    i = 334;
                                    break
                                } else {
                                    pb <<= 1, Ha = ya
                                }
                            }
                            if (334 == i) {
                                if (qb >>> 0 < A[1310761] >>> 0) {
                                    U()
                                } else {
                                    A[qb >> 2] = xa;
                                    A[g + (c + 6)] = Ha;
                                    A[g + (c + 3)] = xa;
                                    A[g + (c + 2)] = xa;
                                    break
                                }
                            }
                            var cb = Ha + 8 | 0,
                                Jb = A[cb >> 2],
                                Ob = A[1310761];
                            Ha >>> 0 < Ob >>> 0 && U();
                            Jb >>> 0 < Ob >>> 0 ? U() : (A[Jb + 12 >> 2] = xa, A[cb >> 2] = xa, A[g + (c + 2)] = Jb, A[g + (c + 3)] = Ha, A[g + (c + 6)] = 0)
                        }
                    }
                }
            } while (0);
            return ea = P + 8 | 0
        }
        oj.X = 1;

        function qf(b) {
            var e, c, d, f, h, g, i, j = b >> 2,
                m = 0;
            if (0 != (b | 0)) {
                var p = b - 8 | 0,
                    k = A[1310761];
                p >>> 0 < k >>> 0 && U();
                var q = A[b - 4 >> 2],
                    l = q & 3;
                1 == (l | 0) && U();
                var r = q & -8;
                i = r >> 2;
                var s = b + (r - 8) | 0,
                    x = 0 == (q & 1 | 0);
                a: do {
                    if (x) {
                        var u = A[p >> 2];
                        if (0 == (l | 0)) {
                            return
                        }
                        var D = -8 - u | 0;
                        g = D >> 2;
                        var H = b + D | 0,
                            L = H,
                            E = u + r | 0;
                        H >>> 0 < k >>> 0 && U();
                        if ((L | 0) == (A[1310762] | 0)) {
                            h = (b + (r - 4) | 0) >> 2;
                            if (3 != (A[h] & 3 | 0)) {
                                var F = L;
                                f = F >> 2;
                                var M = E;
                                break
                            }
                            A[1310759] = E;
                            A[h] &= -2;
                            A[g + (j + 1)] = E | 1;
                            A[s >> 2] = E;
                            return
                        }
                        var S = u >>> 3;
                        if (256 > u >>> 0) {
                            var Q = A[g + (j + 2)],
                                B = A[g + (j + 3)];
                            if ((Q | 0) == (B | 0)) {
                                A[1310757] &= 1 << S ^ -1;
                                F = L;
                                f = F >> 2;
                                M = E;
                                break
                            }
                            var V = ((u >>> 2 & 1073741822) << 2) + 5243068 | 0;
                            (Q | 0) != (V | 0) & Q >>> 0 < k >>> 0 && U();
                            if ((B | 0) == (V | 0) | B >>> 0 >= k >>> 0) {
                                A[Q + 12 >> 2] = B;
                                A[B + 8 >> 2] = Q;
                                F = L;
                                f = F >> 2;
                                M = E;
                                break
                            } else {
                                U()
                            }
                        }
                        var I = H,
                            aa = A[g + (j + 6)],
                            ba = A[g + (j + 3)],
                            eb = (ba | 0) == (I | 0);
                        b: do {
                            if (eb) {
                                var fb = D + (b + 20) | 0,
                                    hb = A[fb >> 2];
                                do {
                                    if (0 == (hb | 0)) {
                                        var Sa = D + (b + 16) | 0,
                                            ma = A[Sa >> 2];
                                        if (0 == (ma | 0)) {
                                            var N = 0;
                                            d = N >> 2;
                                            break b
                                        } else {
                                            var Ia = Sa,
                                                Aa = ma
                                        }
                                    } else {
                                        Ia = fb, Aa = hb
                                    }
                                } while (0);
                                for (;;) {
                                    var ib = Aa + 20 | 0;
                                    if (0 == (A[ib >> 2] | 0)) {
                                        var tb = Aa + 16 | 0;
                                        if (0 == (A[tb >> 2] | 0)) {
                                            break
                                        } else {
                                            var na = tb
                                        }
                                    } else {
                                        na = ib
                                    }
                                    Ia = na;
                                    Aa = A[na >> 2]
                                }
                                Ia >>> 0 < A[1310761] >>> 0 ? U() : (A[Ia >> 2] = 0, N = Aa, d = N >> 2)
                            } else {
                                var ra = A[g + (j + 2)];
                                ra >>> 0 < k >>> 0 ? U() : (A[ra + 12 >> 2] = ba, A[ba + 8 >> 2] = ra, N = ba, d = N >> 2)
                            }
                        } while (0);
                        if (0 == (aa | 0)) {
                            F = L, f = F >> 2, M = E
                        } else {
                            var Ta = D + (b + 28) | 0,
                                ub = (A[Ta >> 2] << 2) + 5243332 | 0;
                            do {
                                if ((I | 0) == (A[ub >> 2] | 0)) {
                                    if (A[ub >> 2] = N, 0 == (N | 0)) {
                                        A[1310758] &= 1 << A[Ta >> 2] ^ -1;
                                        F = L;
                                        f = F >> 2;
                                        M = E;
                                        break a
                                    }
                                } else {
                                    aa >>> 0 < A[1310761] >>> 0 && U();
                                    var jb = aa + 16 | 0;
                                    (A[jb >> 2] | 0) == (I | 0) ? A[jb >> 2] = N : A[aa + 20 >> 2] = N;
                                    if (0 == (N | 0)) {
                                        F = L;
                                        f = F >> 2;
                                        M = E;
                                        break a
                                    }
                                }
                            } while (0);
                            N >>> 0 < A[1310761] >>> 0 && U();
                            A[d + 6] = aa;
                            var Ua = A[g + (j + 4)];
                            0 != (Ua | 0) && (Ua >>> 0 < A[1310761] >>> 0 ? U() : (A[d + 4] = Ua, A[Ua + 24 >> 2] = N));
                            var ha = A[g + (j + 5)];
                            0 == (ha | 0) ? (F = L, f = F >> 2, M = E) : ha >>> 0 < A[1310761] >>> 0 ? U() : (A[d + 5] = ha, A[ha + 24 >> 2] = N, F = L, f = F >> 2, M = E)
                        }
                    } else {
                        F = p, f = F >> 2, M = r
                    }
                } while (0);
                var Ja = F;
                c = Ja >> 2;
                Ja >>> 0 < s >>> 0 || U();
                var R = b + (r - 4) | 0,
                    P = A[R >> 2];
                0 == (P & 1 | 0) && U();
                do {
                    if (0 == (P & 2 | 0)) {
                        if ((s | 0) == (A[1310763] | 0)) {
                            var oa = A[1310760] + M | 0;
                            A[1310760] = oa;
                            A[1310763] = F;
                            A[f + 1] = oa | 1;
                            (F | 0) == (A[1310762] | 0) && (A[1310762] = 0, A[1310759] = 0);
                            if (oa >>> 0 <= A[1310764] >>> 0) {
                                return
                            }
                            vj(0);
                            return
                        }
                        if ((s | 0) == (A[1310762] | 0)) {
                            var Ka = A[1310759] + M | 0;
                            A[1310759] = Ka;
                            A[1310762] = F;
                            A[f + 1] = Ka | 1;
                            A[(Ka >> 2) + c] = Ka;
                            return
                        }
                        var X = (P & -8) + M | 0,
                            La = P >>> 3,
                            Cb = 256 > P >>> 0;
                        a: do {
                            if (Cb) {
                                var Ma = A[j + i],
                                    Ba = A[((r | 4) >> 2) + j];
                                if ((Ma | 0) == (Ba | 0)) {
                                    A[1310757] &= 1 << La ^ -1
                                } else {
                                    var vb = ((P >>> 2 & 1073741822) << 2) + 5243068 | 0;
                                    (Ma | 0) != (vb | 0) && Ma >>> 0 < A[1310761] >>> 0 && U();
                                    (Ba | 0) != (vb | 0) && Ba >>> 0 < A[1310761] >>> 0 && U();
                                    A[Ma + 12 >> 2] = Ba;
                                    A[Ba + 8 >> 2] = Ma
                                }
                            } else {
                                var da = s,
                                    ea = A[i + (j + 4)],
                                    sa = A[((r | 4) >> 2) + j],
                                    Db = (sa | 0) == (da | 0);
                                b: do {
                                    if (Db) {
                                        var Va = r + (b + 12) | 0,
                                            Pa = A[Va >> 2];
                                        do {
                                            if (0 == (Pa | 0)) {
                                                var fa = r + (b + 8) | 0,
                                                    Na = A[fa >> 2];
                                                if (0 == (Na | 0)) {
                                                    var T = 0;
                                                    e = T >> 2;
                                                    break b
                                                } else {
                                                    var Wa = fa,
                                                        Oa = Na
                                                }
                                            } else {
                                                Wa = Va, Oa = Pa
                                            }
                                        } while (0);
                                        for (;;) {
                                            var wb = Oa + 20 | 0;
                                            if (0 == (A[wb >> 2] | 0)) {
                                                var O = Oa + 16 | 0;
                                                if (0 == (A[O >> 2] | 0)) {
                                                    break
                                                } else {
                                                    var ia = O
                                                }
                                            } else {
                                                ia = wb
                                            }
                                            Wa = ia;
                                            Oa = A[ia >> 2]
                                        }
                                        Wa >>> 0 < A[1310761] >>> 0 ? U() : (A[Wa >> 2] = 0, T = Oa, e = T >> 2)
                                    } else {
                                        var Ca = A[j + i];
                                        Ca >>> 0 < A[1310761] >>> 0 ? U() : (A[Ca + 12 >> 2] = sa, A[sa + 8 >> 2] = Ca, T = sa, e = T >> 2)
                                    }
                                } while (0);
                                if (0 != (ea | 0)) {
                                    var xb = r + (b + 20) | 0,
                                        Xa = (A[xb >> 2] << 2) + 5243332 | 0;
                                    do {
                                        if ((da | 0) == (A[Xa >> 2] | 0)) {
                                            if (A[Xa >> 2] = T, 0 == (T | 0)) {
                                                A[1310758] &= 1 << A[xb >> 2] ^ -1;
                                                break a
                                            }
                                        } else {
                                            ea >>> 0 < A[1310761] >>> 0 && U();
                                            var kb = ea + 16 | 0;
                                            (A[kb >> 2] | 0) == (da | 0) ? A[kb >> 2] = T : A[ea + 20 >> 2] = T;
                                            if (0 == (T | 0)) {
                                                break a
                                            }
                                        }
                                    } while (0);
                                    T >>> 0 < A[1310761] >>> 0 && U();
                                    A[e + 6] = ea;
                                    var Y = A[i + (j + 2)];
                                    0 != (Y | 0) && (Y >>> 0 < A[1310761] >>> 0 ? U() : (A[e + 4] = Y, A[Y + 24 >> 2] = T));
                                    var ta = A[i + (j + 3)];
                                    0 != (ta | 0) && (ta >>> 0 < A[1310761] >>> 0 ? U() : (A[e + 5] = ta, A[ta + 24 >> 2] = T))
                                }
                            }
                        } while (0);
                        A[f + 1] = X | 1;
                        A[(X >> 2) + c] = X;
                        if ((F | 0) != (A[1310762] | 0)) {
                            var ja = X
                        } else {
                            A[1310759] = X;
                            return
                        }
                    } else {
                        A[R >> 2] = P & -2, A[f + 1] = M | 1, ja = A[(M >> 2) + c] = M
                    }
                } while (0);
                if (256 > ja >>> 0) {
                    var lb = ja >>> 2 & 1073741822,
                        mb = (lb << 2) + 5243068 | 0,
                        Ya = A[1310757],
                        ca = 1 << (ja >>> 3);
                    if (0 == (Ya & ca | 0)) {
                        A[1310757] = Ya | ca;
                        var ua = mb
                    } else {
                        var Za = A[(lb + 2 << 2) + 5243068 >> 2];
                        Za >>> 0 < A[1310761] >>> 0 ? U() : ua = Za
                    }
                    A[(lb + 2 << 2) + 5243068 >> 2] = F;
                    A[ua + 12 >> 2] = F;
                    A[f + 2] = ua;
                    A[f + 3] = mb
                } else {
                    var Qa = F,
                        $a = ja >>> 8;
                    if (0 == ($a | 0)) {
                        var Da = 0
                    } else {
                        if (16777215 < ja >>> 0) {
                            Da = 31
                        } else {
                            var va = ($a + 1048320 | 0) >>> 16 & 8,
                                wa = $a << va,
                                ab = (wa + 520192 | 0) >>> 16 & 4,
                                xa = wa << ab,
                                Ra = (xa + 245760 | 0) >>> 16 & 2,
                                Ea = 14 - (ab | va | Ra) + (xa << Ra >>> 15) | 0,
                                Da = ja >>> ((Ea + 7 | 0) >>> 0) & 1 | Ea << 1
                        }
                    }
                    var ka = (Da << 2) + 5243332 | 0;
                    A[f + 7] = Da;
                    A[f + 5] = 0;
                    A[f + 4] = 0;
                    var Fa = A[1310758],
                        yb = 1 << Da;
                    do {
                        if (0 == (Fa & yb | 0)) {
                            A[1310758] = Fa | yb, A[ka >> 2] = Qa, A[f + 6] = ka, A[f + 3] = F, A[f + 2] = F
                        } else {
                            for (var nb = ja << (31 == (Da | 0) ? 0 : 25 - (Da >>> 1) | 0), pa = A[ka >> 2];
                                (A[pa + 4 >> 2] & -8 | 0) != (ja | 0);) {
                                var ob = (nb >>> 31 << 2) + pa + 16 | 0,
                                    ga = A[ob >> 2];
                                if (0 == (ga | 0)) {
                                    m = 469;
                                    break
                                } else {
                                    nb <<= 1, pa = ga
                                }
                            }
                            if (469 == m) {
                                if (ob >>> 0 < A[1310761] >>> 0) {
                                    U()
                                } else {
                                    A[ob >> 2] = Qa;
                                    A[f + 6] = pa;
                                    A[f + 3] = F;
                                    A[f + 2] = F;
                                    break
                                }
                            }
                            var Ga = pa + 8 | 0,
                                bb = A[Ga >> 2],
                                pb = A[1310761];
                            pa >>> 0 < pb >>> 0 && U();
                            bb >>> 0 < pb >>> 0 ? U() : (A[bb + 12 >> 2] = Qa, A[Ga >> 2] = Qa, A[f + 2] = bb, A[f + 3] = pa, A[f + 6] = 0)
                        }
                    } while (0);
                    var Ha = A[1310765] - 1 | 0;
                    A[1310765] = Ha;
                    if (0 == (Ha | 0)) {
                        for (var qb = 5243480;;) {
                            var ya = A[qb >> 2];
                            if (0 == (ya | 0)) {
                                break
                            } else {
                                qb = ya + 8 | 0
                            }
                        }
                        A[1310765] = -1
                    }
                }
            }
        }
        Module._free = qf;
        qf.X = 1;

        function vj(b) {
            var e;
            0 == (A[1310720] | 0) && qj();
            if (4294967232 <= b >>> 0) {
                var c;
                return 0
            }
            c = A[1310763];
            if (0 == (c | 0)) {
                return 0
            }
            var d = A[1310760];
            if (d >>> 0 > (b + 40 | 0) >>> 0) {
                var f = A[1310722],
                    d = (Math.floor(((-40 - b - 1 + d + f | 0) >>> 0) / (f >>> 0)) - 1) * f | 0,
                    b = rj(c);
                e = b >> 2;
                if (0 == (A[e + 3] & 8 | 0) && (c = Xe(0), (c | 0) == (A[e] + A[e + 1] | 0) && (d = Xe(-(2147483646 < d >>> 0 ? -2147483648 - f | 0 : d) | 0), f = Xe(0), -1 != (d | 0) & f >>> 0 < c >>> 0 && (d = c - f | 0, (c | 0) != (f | 0))))) {
                    return b = b + 4 | 0, A[b >> 2] = A[b >> 2] - d | 0, A[1310865] = A[1310865] - d | 0, sj(A[1310763], A[1310760] - d | 0), c = (c | 0) != (f | 0) & 1
                }
            }
            if (A[1310760] >>> 0 <= A[1310764] >>> 0) {
                return c = 0
            }
            A[1310764] = -1;
            return c = 0
        }
        vj.X = 1;
        Module._calloc = (function (b, e) {
            if (0 == (b | 0)) {
                var c = 0
            } else {
                c = e * b | 0, c = 65535 < (e | b) >>> 0 ? (Math.floor((c >>> 0) / (b >>> 0)) | 0) == (e | 0) ? c : -1 : c
            }
            var d = fe(c);
            if (0 == (d | 0) || 0 == (A[d - 4 >> 2] & 3 | 0)) {
                return d
            }
            ge(d, 0, c);
            return d
        });

        function qj() {
            if (0 == (A[1310720] | 0)) {
                var b = We();
                0 != (b - 1 & b | 0) && U();
                A[1310722] = b;
                A[1310721] = b;
                A[1310723] = -1;
                A[1310724] = 2097152;
                A[1310725] = 0;
                A[1310867] = 0;
                b = Math.floor(Date.now() / 1e3);
                A[1310720] = b & -16 ^ 1431655768
            }
        }

        function rj(b) {
            var e, c = 0,
                d = 5243472;
            for (e = d >> 2;;) {
                var f = A[e];
                if (f >>> 0 <= b >>> 0 && (f + A[e + 1] | 0) >>> 0 > b >>> 0) {
                    var h = d,
                        c = 680;
                    break
                }
                e = A[e + 2];
                if (0 == (e | 0)) {
                    h = 0;
                    c = 681;
                    break
                } else {
                    d = e, e = d >> 2
                }
            }
            if (681 == c || 680 == c) {
                return h
            }
        }

        function sj(b, e) {
            var c = b + 8 | 0,
                c = 0 == (c & 7 | 0) ? 0 : -c & 7,
                d = e - c | 0;
            A[1310763] = b + c | 0;
            A[1310760] = d;
            A[c + (b + 4) >> 2] = d | 1;
            A[e + (b + 4) >> 2] = 40;
            A[1310764] = A[1310724]
        }

        function tj(b, e, c) {
            var d, f, h, g = e >> 2,
                i = b >> 2,
                j = 0,
                m = b + 8 | 0,
                m = 0 == (m & 7 | 0) ? 0 : -m & 7;
            f = e + 8 | 0;
            var p = 0 == (f & 7 | 0) ? 0 : -f & 7;
            h = p >> 2;
            var k = e + p | 0,
                q = m + c | 0;
            f = q >> 2;
            var q = b + q | 0,
                l = k - (b + m) - c | 0;
            A[(m + 4 >> 2) + i] = c | 3;
            if ((k | 0) == (A[1310763] | 0)) {
                return j = A[1310760] + l | 0, A[1310760] = j, A[1310763] = q, A[f + (i + 1)] = j | 1, b = b + (m | 8) | 0
            }
            if ((k | 0) == (A[1310762] | 0)) {
                return j = A[1310759] + l | 0, A[1310759] = j, A[1310762] = q, A[f + (i + 1)] = j | 1, A[(j >> 2) + i + f] = j, b = b + (m | 8) | 0
            }
            var r = A[h + (g + 1)];
            if (1 == (r & 3 | 0)) {
                var c = r & -8,
                    s = r >>> 3,
                    x = 256 > r >>> 0;
                a: do {
                    if (x) {
                        var u = A[((p | 8) >> 2) + g],
                            D = A[h + (g + 3)];
                        if ((u | 0) == (D | 0)) {
                            A[1310757] &= 1 << s ^ -1
                        } else {
                            var H = ((r >>> 2 & 1073741822) << 2) + 5243068 | 0;
                            (u | 0) != (H | 0) && u >>> 0 < A[1310761] >>> 0 && U();
                            (D | 0) != (H | 0) && D >>> 0 < A[1310761] >>> 0 && U();
                            A[u + 12 >> 2] = D;
                            A[D + 8 >> 2] = u
                        }
                    } else {
                        var u = k,
                            D = A[((p | 24) >> 2) + g],
                            H = A[h + (g + 3)],
                            L = (H | 0) == (u | 0);
                        b: do {
                            if (L) {
                                var E = p | 16,
                                    F = E + (e + 4) | 0,
                                    M = A[F >> 2];
                                do {
                                    if (0 == (M | 0)) {
                                        var S = e + E | 0,
                                            Q = A[S >> 2];
                                        if (0 == (Q | 0)) {
                                            var B = 0;
                                            d = B >> 2;
                                            break b
                                        }
                                    } else {
                                        S = F, Q = M
                                    }
                                } while (0);
                                for (;;) {
                                    E = Q + 20 | 0;
                                    if (0 == (A[E >> 2] | 0) && (E = Q + 16 | 0, 0 == (A[E >> 2] | 0))) {
                                        break
                                    }
                                    S = E;
                                    Q = A[E >> 2]
                                }
                                S >>> 0 < A[1310761] >>> 0 ? U() : (A[S >> 2] = 0, B = Q, d = B >> 2)
                            } else {
                                S = A[((p | 8) >> 2) + g], S >>> 0 < A[1310761] >>> 0 ? U() : (A[S + 12 >> 2] = H, A[H + 8 >> 2] = S, B = H, d = B >> 2)
                            }
                        } while (0);
                        if (0 != (D | 0)) {
                            H = p + (e + 28) | 0;
                            L = (A[H >> 2] << 2) + 5243332 | 0;
                            do {
                                if ((u | 0) == (A[L >> 2] | 0)) {
                                    if (A[L >> 2] = B, 0 == (B | 0)) {
                                        A[1310758] &= 1 << A[H >> 2] ^ -1;
                                        break a
                                    }
                                } else {
                                    if (D >>> 0 < A[1310761] >>> 0 && U(), S = D + 16 | 0, (A[S >> 2] | 0) == (u | 0) ? A[S >> 2] = B : A[D + 20 >> 2] = B, 0 == (B | 0)) {
                                        break a
                                    }
                                }
                            } while (0);
                            B >>> 0 < A[1310761] >>> 0 && U();
                            A[d + 6] = D;
                            u = p | 16;
                            D = A[(u >> 2) + g];
                            0 != (D | 0) && (D >>> 0 < A[1310761] >>> 0 ? U() : (A[d + 4] = D, A[D + 24 >> 2] = B));
                            u = A[(u + 4 >> 2) + g];
                            0 != (u | 0) && (u >>> 0 < A[1310761] >>> 0 ? U() : (A[d + 5] = u, A[u + 24 >> 2] = B))
                        }
                    }
                } while (0);
                d = e + (c | p) | 0;
                e = c + l | 0
            } else {
                d = k, e = l
            }
            d = d + 4 | 0;
            A[d >> 2] &= -2;
            A[f + (i + 1)] = e | 1;
            A[(e >> 2) + i + f] = e;
            if (256 > e >>> 0) {
                var j = e >>> 2 & 1073741822,
                    V = (j << 2) + 5243068 | 0;
                d = A[1310757];
                e = 1 << (e >>> 3);
                if (0 == (d & e | 0)) {
                    A[1310757] = d | e;
                    var I = V
                } else {
                    e = A[(j + 2 << 2) + 5243068 >> 2], e >>> 0 < A[1310761] >>> 0 ? U() : I = e
                }
                A[(j + 2 << 2) + 5243068 >> 2] = q;
                A[I + 12 >> 2] = q;
                A[f + (i + 2)] = I;
                A[f + (i + 3)] = V;
                return b = b + (m | 8) | 0
            }
            d = e >>> 8;
            0 == (d | 0) ? d = 0 : 16777215 < e >>> 0 ? d = 31 : (I = (d + 1048320 | 0) >>> 16 & 8, g = d << I, d = (g + 520192 | 0) >>> 16 & 4, g <<= d, B = (g + 245760 | 0) >>> 16 & 2, I = 14 - (d | I | B) + (g << B >>> 15) | 0, d = e >>> ((I + 7 | 0) >>> 0) & 1 | I << 1);
            I = (d << 2) + 5243332 | 0;
            A[f + (i + 7)] = d;
            A[f + (i + 5)] = 0;
            A[f + (i + 4)] = 0;
            g = A[1310758];
            B = 1 << d;
            if (0 == (g & B | 0)) {
                return A[1310758] = g | B, A[I >> 2] = q, A[f + (i + 6)] = I, A[f + (i + 3)] = q, A[f + (i + 2)] = q, b = b + (m | 8) | 0
            }
            d = e << (31 == (d | 0) ? 0 : 25 - (d >>> 1) | 0);
            for (I = A[I >> 2];
                (A[I + 4 >> 2] & -8 | 0) != (e | 0);) {
                if (V = (d >>> 31 << 2) + I + 16 | 0, g = A[V >> 2], 0 == (g | 0)) {
                    j = 781;
                    break
                } else {
                    d <<= 1, I = g
                }
            }
            if (781 == j) {
                return V >>> 0 < A[1310761] >>> 0 && U(), A[V >> 2] = q, A[f + (i + 6)] = I, A[f + (i + 3)] = q, A[f + (i + 2)] = q, b = b + (m | 8) | 0
            }
            j = I + 8 | 0;
            V = A[j >> 2];
            e = A[1310761];
            I >>> 0 < e >>> 0 && U();
            V >>> 0 < e >>> 0 && U();
            A[V + 12 >> 2] = q;
            A[j >> 2] = q;
            A[f + (i + 2)] = V;
            A[f + (i + 3)] = I;
            A[f + (i + 6)] = 0;
            return b = b + (m | 8) | 0
        }
        tj.X = 1;

        function ff() {
            return 5242904
        }

        function gf() {
            return 5242948
        }

        function gj(b, e, c) {
            if (0 == ((e ^ b) & 3 | 0)) {
                var d = 0 == (c | 0),
                    f = 0 == (b & 3 | 0) | d;
                a: do {
                    if (f) {
                        var h = e,
                            g = b,
                            i = c,
                            j = d
                    } else {
                        for (var m = e, p = b, k = c;;) {
                            var q = m + 1 | 0,
                                l = p + 1 | 0;
                            z[p] = z[m];
                            k = k - 1 | 0;
                            m = 0 == (k | 0);
                            if (0 == (l & 3 | 0) | m) {
                                h = q;
                                g = l;
                                i = k;
                                j = m;
                                break a
                            } else {
                                m = q, p = l
                            }
                        }
                    }
                } while (0);
                if (j) {
                    return b
                }
                e = g;
                c = 3 < i >>> 0;
                a: do {
                    if (c) {
                        g = i;
                        j = e;
                        for (q = h;;) {
                            if (d = q + 4 | 0, f = j + 4 | 0, A[j >> 2] = A[q >> 2], g = g - 4 | 0, 3 < g >>> 0) {
                                j = f, q = d
                            } else {
                                var r = g,
                                    s = f,
                                    x = d;
                                break a
                            }
                        }
                    } else {
                        r = i, s = e, x = h
                    }
                } while (0);
                i = r
            } else {
                i = c, s = b, x = e
            } if (0 == (i | 0)) {
                return b
            }
            for (; !(z[s] = z[x], i = i - 1 | 0, 0 == (i | 0));) {
                x = x + 1 | 0, s = s + 1 | 0
            }
            return b
        }
        Module._memcpy = gj;
        gj.X = 1;

        function ef() {}

        function hf(b) {
            0 != (b | 0) && qf(b)
        }

        function df(b) {
            0 != (b | 0) && qf(b)
        }

        function jf() {}

        function uj(b, e) {
            var c, d, f = 0,
                h = A[1310763];
            d = h >> 2;
            var g = rj(h),
                i = A[g >> 2];
            c = A[g + 4 >> 2];
            var g = i + c | 0,
                j = i + (c - 39) | 0,
                i = i + (c - 47) + (0 == (j & 7 | 0) ? 0 : -j & 7) | 0,
                i = i >>> 0 < (h + 16 | 0) >>> 0 ? h : i,
                j = i + 8 | 0;
            c = j >> 2;
            sj(b, e - 40 | 0);
            A[i + 4 >> 2] = 27;
            A[c] = A[1310868];
            A[c + 1] = A[1310869];
            A[c + 2] = A[1310870];
            A[c + 3] = A[1310871];
            A[1310868] = b;
            A[1310869] = e;
            A[1310871] = 0;
            A[1310870] = j;
            c = i + 28 | 0;
            A[c >> 2] = 7;
            j = (i + 32 | 0) >>> 0 < g >>> 0;
            a: do {
                if (j) {
                    for (var m = c;;) {
                        var p = m + 4 | 0;
                        A[p >> 2] = 7;
                        if ((m + 8 | 0) >>> 0 < g >>> 0) {
                            m = p
                        } else {
                            break a
                        }
                    }
                }
            } while (0);
            if ((i | 0) != (h | 0)) {
                if (g = i - h | 0, i = g + (h + 4) | 0, A[i >> 2] &= -2, A[d + 1] = g | 1, A[h + g >> 2] = g, 256 > g >>> 0) {
                    var f = g >>> 2 & 1073741822,
                        k = (f << 2) + 5243068 | 0,
                        i = A[1310757],
                        g = 1 << (g >>> 3);
                    if (0 == (i & g | 0)) {
                        A[1310757] = i | g;
                        var q = k
                    } else {
                        g = A[(f + 2 << 2) + 5243068 >> 2], g >>> 0 < A[1310761] >>> 0 ? U() : q = g
                    }
                    A[(f + 2 << 2) + 5243068 >> 2] = h;
                    A[q + 12 >> 2] = h;
                    A[d + 2] = q;
                    A[d + 3] = k
                } else {
                    if (i = g >>> 8, 0 == (i | 0) ? i = 0 : 16777215 < g >>> 0 ? i = 31 : (q = (i + 1048320 | 0) >>> 16 & 8, c = i << q, i = (c + 520192 | 0) >>> 16 & 4, c <<= i, j = (c + 245760 | 0) >>> 16 & 2, q = 14 - (i | q | j) + (c << j >>> 15) | 0, i = g >>> ((q + 7 | 0) >>> 0) & 1 | q << 1), q = (i << 2) + 5243332 | 0, A[d + 7] = i, A[d + 5] = 0, A[d + 4] = 0, c = A[1310758], j = 1 << i, 0 == (c & j | 0)) {
                        A[1310758] = c | j, A[q >> 2] = h, A[d + 6] = q, A[d + 3] = h, A[d + 2] = h
                    } else {
                        i = g << (31 == (i | 0) ? 0 : 25 - (i >>> 1) | 0);
                        for (q = A[q >> 2];
                            (A[q + 4 >> 2] & -8 | 0) != (g | 0);) {
                            if (k = (i >>> 31 << 2) + q + 16 | 0, c = A[k >> 2], 0 == (c | 0)) {
                                f = 855;
                                break
                            } else {
                                i <<= 1, q = c
                            }
                        }
                        855 == f ? (k >>> 0 < A[1310761] >>> 0 && U(), A[k >> 2] = h, A[d + 6] = q, A[d + 3] = h, A[d + 2] = h) : (f = q + 8 | 0, k = A[f >> 2], g = A[1310761], q >>> 0 < g >>> 0 && U(), k >>> 0 < g >>> 0 && U(), A[k + 12 >> 2] = h, A[f >> 2] = h, A[d + 2] = k, A[d + 3] = q, A[d + 6] = 0)
                    }
                }
            }
        }
        uj.X = 1;
        var nf;

        function W(b, e) {
            b != t && ("number" == typeof b ? this.k(b) : e == t && "string" != typeof b ? this.g(b, 256) : this.g(b, e))
        }

        function wj() {
            return new W(t)
        }

        function xj(b, e) {
            var c = yj[b.charCodeAt(e)];
            return c == t ? -1 : c
        }

        function zj(b) {
            var e = wj();
            e.r(b);
            return e
        }

        function Z(b, e) {
            this.d = b | 0;
            this.e = e | 0
        }
        Z.Z = {};
        Z.r = (function (b) {
            if (-128 <= b && 128 > b) {
                var e = Z.Z[b];
                if (e) {
                    return e
                }
            }
            e = new Z(b | 0, 0 > b ? -1 : 0); - 128 <= b && 128 > b && (Z.Z[b] = e);
            return e
        });
        Z.k = (function (b) {
            return isNaN(b) || !isFinite(b) ? Z.ZERO : b <= -Z.aa ? Z.MIN_VALUE : b + 1 >= Z.aa ? Z.MAX_VALUE : 0 > b ? Z.k(-b).f() : new Z(b % Z.p | 0, b / Z.p | 0)
        });
        Z.o = (function (b, e) {
            return new Z(b, e)
        });
        Z.g = (function (b, e) {
            0 == b.length && a(Error("number format error: empty string"));
            var c = e || 10;
            (2 > c || 36 < c) && a(Error("radix out of range: " + c));
            if ("-" == b.charAt(0)) {
                return Z.g(b.substring(1), c).f()
            }
            0 <= b.indexOf("-") && a(Error('number format error: interior "-" character: ' + b));
            for (var d = Z.k(Math.pow(c, 8)), f = Z.ZERO, h = 0; h < b.length; h += 8) {
                var g = Math.min(8, b.length - h),
                    i = parseInt(b.substring(h, h + g), c);
                8 > g ? (g = Z.k(Math.pow(c, g)), f = f.multiply(g).add(Z.k(i))) : (f = f.multiply(d), f = f.add(Z.k(i)))
            }
            return f
        });
        Z.L = 65536;
        Z.Oa = 16777216;
        Z.p = Z.L * Z.L;
        Z.Pa = Z.p / 2;
        Z.Qa = Z.p * Z.L;
        Z.va = Z.p * Z.p;
        Z.aa = Z.va / 2;
        Z.ZERO = Z.r(0);
        Z.ONE = Z.r(1);
        Z.$ = Z.r(-1);
        Z.MAX_VALUE = Z.o(-1, 2147483647);
        Z.MIN_VALUE = Z.o(0, -2147483648);
        Z.ua = Z.r(16777216);
        w = Z.prototype;
        w.J = (function () {
            return this.e * Z.p + this.Aa()
        });
        w.toString = (function (b) {
            b = b || 10;
            (2 > b || 36 < b) && a(Error("radix out of range: " + b));
            if (this.t()) {
                return "0"
            }
            if (this.h()) {
                if (this.j(Z.MIN_VALUE)) {
                    var e = Z.k(b),
                        c = this.n(e),
                        e = c.multiply(e).s(this);
                    return c.toString(b) + e.d.toString(b)
                }
                return "-" + this.f().toString(b)
            }
            for (var c = Z.k(Math.pow(b, 6)), e = this, d = "";;) {
                var f = e.n(c),
                    h = e.s(f.multiply(c)).d.toString(b),
                    e = f;
                if (e.t()) {
                    return h + d
                }
                for (; 6 > h.length;) {
                    h = "0" + h
                }
                d = "" + h + d
            }
        });
        w.Aa = (function () {
            return 0 <= this.d ? this.d : Z.p + this.d
        });
        w.t = (function () {
            return 0 == this.e && 0 == this.d
        });
        w.h = (function () {
            return 0 > this.e
        });
        w.ga = (function () {
            return 1 == (this.d & 1)
        });
        w.j = (function (b) {
            return this.e == b.e && this.d == b.d
        });
        w.la = (function () {
            return 0 > this.Q(Z.ua)
        });
        w.Ba = (function (b) {
            return 0 < this.Q(b)
        });
        w.Ca = (function (b) {
            return 0 <= this.Q(b)
        });
        w.Q = (function (b) {
            if (this.j(b)) {
                return 0
            }
            var e = this.h(),
                c = b.h();
            return e && !c ? -1 : !e && c ? 1 : this.s(b).h() ? -1 : 1
        });
        w.f = (function () {
            return this.j(Z.MIN_VALUE) ? Z.MIN_VALUE : this.Ga().add(Z.ONE)
        });
        w.add = (function (b) {
            var e = this.e >>> 16,
                c = this.e & 65535,
                d = this.d >>> 16,
                f = b.e >>> 16,
                h = b.e & 65535,
                g = b.d >>> 16,
                i;
            i = 0 + ((this.d & 65535) + (b.d & 65535));
            b = 0 + (i >>> 16);
            b += d + g;
            d = 0 + (b >>> 16);
            d += c + h;
            c = 0 + (d >>> 16);
            c = c + (e + f) & 65535;
            return Z.o((b & 65535) << 16 | i & 65535, c << 16 | d & 65535)
        });
        w.s = (function (b) {
            return this.add(b.f())
        });
        w.multiply = (function (b) {
            if (this.t() || b.t()) {
                return Z.ZERO
            }
            if (this.j(Z.MIN_VALUE)) {
                return b.ga() ? Z.MIN_VALUE : Z.ZERO
            }
            if (b.j(Z.MIN_VALUE)) {
                return this.ga() ? Z.MIN_VALUE : Z.ZERO
            }
            if (this.h()) {
                return b.h() ? this.f().multiply(b.f()) : this.f().multiply(b).f()
            }
            if (b.h()) {
                return this.multiply(b.f()).f()
            }
            if (this.la() && b.la()) {
                return Z.k(this.J() * b.J())
            }
            var e = this.e >>> 16,
                c = this.e & 65535,
                d = this.d >>> 16,
                f = this.d & 65535,
                h = b.e >>> 16,
                g = b.e & 65535,
                i = b.d >>> 16,
                b = b.d & 65535,
                j, m, p, k;
            k = 0 + f * b;
            p = 0 + (k >>> 16);
            p += d * b;
            m = 0 + (p >>> 16);
            p = (p & 65535) + f * i;
            m += p >>> 16;
            p &= 65535;
            m += c * b;
            j = 0 + (m >>> 16);
            m = (m & 65535) + d * i;
            j += m >>> 16;
            m &= 65535;
            m += f * g;
            j += m >>> 16;
            m &= 65535;
            j = j + (e * b + c * i + d * g + f * h) & 65535;
            return Z.o(p << 16 | k & 65535, j << 16 | m)
        });
        w.n = (function (b) {
            b.t() && a(Error("division by zero"));
            if (this.t()) {
                return Z.ZERO
            }
            if (this.j(Z.MIN_VALUE)) {
                if (b.j(Z.ONE) || b.j(Z.$)) {
                    return Z.MIN_VALUE
                }
                if (b.j(Z.MIN_VALUE)) {
                    return Z.ONE
                }
                var e = this.Ma().n(b).shiftLeft(1);
                if (e.j(Z.ZERO)) {
                    return b.h() ? Z.ONE : Z.$
                }
                var c = this.s(b.multiply(e));
                return e.add(c.n(b))
            }
            if (b.j(Z.MIN_VALUE)) {
                return Z.ZERO
            }
            if (this.h()) {
                return b.h() ? this.f().n(b.f()) : this.f().n(b).f()
            }
            if (b.h()) {
                return this.n(b.f()).f()
            }
            for (var d = Z.ZERO, c = this; c.Ca(b);) {
                for (var e = Math.max(1, Math.floor(c.J() / b.J())), f = Math.ceil(Math.log(e) / Math.LN2), f = 48 >= f ? 1 : Math.pow(2, f - 48), h = Z.k(e), g = h.multiply(b); g.h() || g.Ba(c);) {
                    e -= f, h = Z.k(e), g = h.multiply(b)
                }
                h.t() && (h = Z.ONE);
                d = d.add(h);
                c = c.s(g)
            }
            return d
        });
        w.ma = (function (b) {
            return this.s(this.n(b).multiply(b))
        });
        w.Ga = (function () {
            return Z.o(~this.d, ~this.e)
        });
        w.shiftLeft = (function (b) {
            b &= 63;
            if (0 == b) {
                return this
            }
            var e = this.d;
            return 32 > b ? Z.o(e << b, this.e << b | e >>> 32 - b) : Z.o(0, e << b - 32)
        });
        w.Ma = (function () {
            var b;
            b = 1;
            if (0 == b) {
                return this
            }
            var e = this.e;
            return 32 > b ? Z.o(this.d >>> b | e << 32 - b, e >> b) : Z.o(e >> b - 32, 0 <= e ? 0 : -1)
        });
        w = W.prototype;
        w.N = (function (b, e, c, d) {
            for (var f = 0, h = 0; 0 <= --d;) {
                var g = b * this[f++] + e[c] + h,
                    h = Math.floor(g / 67108864);
                e[c++] = g & 67108863
            }
            return h
        });
        w.c = 26;
        w.m = 67108863;
        w.z = 67108864;
        w.ta = Math.pow(2, 52);
        w.W = 26;
        w.Y = 0;
        var yj = [],
            Aj, Bj;
        Aj = 48;
        for (Bj = 0; 9 >= Bj; ++Bj) {
            yj[Aj++] = Bj
        }
        Aj = 97;
        for (Bj = 10; 36 > Bj; ++Bj) {
            yj[Aj++] = Bj
        }
        Aj = 65;
        for (Bj = 10; 36 > Bj; ++Bj) {
            yj[Aj++] = Bj
        }
        w = W.prototype;
        w.copyTo = (function (b) {
            for (var e = this.a - 1; 0 <= e; --e) {
                b[e] = this[e]
            }
            b.a = this.a;
            b.b = this.b
        });
        w.r = (function (b) {
            this.a = 1;
            this.b = 0 > b ? -1 : 0;
            0 < b ? this[0] = b : -1 > b ? this[0] = b + DV : this.a = 0
        });
        w.g = (function (b, e) {
            var c;
            if (16 == e) {
                c = 4
            } else {
                if (8 == e) {
                    c = 3
                } else {
                    if (256 == e) {
                        c = 8
                    } else {
                        if (2 == e) {
                            c = 1
                        } else {
                            if (32 == e) {
                                c = 5
                            } else {
                                if (4 == e) {
                                    c = 2
                                } else {
                                    this.za(b, e);
                                    return
                                }
                            }
                        }
                    }
                }
            }
            this.b = this.a = 0;
            for (var d = b.length, f = v, h = 0; 0 <= --d;) {
                var g = 8 == c ? b[d] & 255 : xj(b, d);
                0 > g ? "-" == b.charAt(d) && (f = n) : (f = v, 0 == h ? this[this.a++] = g : h + c > this.c ? (this[this.a - 1] |= (g & (1 << this.c - h) - 1) << h, this[this.a++] = g >> this.c - h) : this[this.a - 1] |= g << h, h += c, h >= this.c && (h -= this.c))
            }
            8 == c && 0 != (b[0] & 128) && (this.b = -1, 0 < h && (this[this.a - 1] |= (1 << this.c - h) - 1 << h));
            this.q();
            f && W.ZERO.l(this, this)
        });
        w.q = (function () {
            for (var b = this.b & this.m; 0 < this.a && this[this.a - 1] == b;) {
                --this.a
            }
        });
        w.R = (function (b, e) {
            var c;
            for (c = this.a - 1; 0 <= c; --c) {
                e[c + b] = this[c]
            }
            for (c = b - 1; 0 <= c; --c) {
                e[c] = 0
            }
            e.a = this.a + b;
            e.b = this.b
        });
        w.xa = (function (b, e) {
            for (var c = b; c < this.a; ++c) {
                e[c - b] = this[c]
            }
            e.a = Math.max(this.a - b, 0);
            e.b = this.b
        });
        w.ka = (function (b, e) {
            var c = b % this.c,
                d = this.c - c,
                f = (1 << d) - 1,
                h = Math.floor(b / this.c),
                g = this.b << c & this.m,
                i;
            for (i = this.a - 1; 0 <= i; --i) {
                e[i + h + 1] = this[i] >> d | g, g = (this[i] & f) << c
            }
            for (i = h - 1; 0 <= i; --i) {
                e[i] = 0
            }
            e[h] = g;
            e.a = this.a + h + 1;
            e.b = this.b;
            e.q()
        });
        w.Ia = (function (b, e) {
            e.b = this.b;
            var c = Math.floor(b / this.c);
            if (c >= this.a) {
                e.a = 0
            } else {
                var d = b % this.c,
                    f = this.c - d,
                    h = (1 << d) - 1;
                e[0] = this[c] >> d;
                for (var g = c + 1; g < this.a; ++g) {
                    e[g - c - 1] |= (this[g] & h) << f, e[g - c] = this[g] >> d
                }
                0 < d && (e[this.a - c - 1] |= (this.b & h) << f);
                e.a = this.a - c;
                e.q()
            }
        });
        w.l = (function (b, e) {
            for (var c = 0, d = 0, f = Math.min(b.a, this.a); c < f;) {
                d += this[c] - b[c], e[c++] = d & this.m, d >>= this.c
            }
            if (b.a < this.a) {
                for (d -= b.b; c < this.a;) {
                    d += this[c], e[c++] = d & this.m, d >>= this.c
                }
                d += this.b
            } else {
                for (d += this.b; c < b.a;) {
                    d -= b[c], e[c++] = d & this.m, d >>= this.c
                }
                d -= b.b
            }
            e.b = 0 > d ? -1 : 0; - 1 > d ? e[c++] = this.z + d : 0 < d && (e[c++] = d);
            e.a = c;
            e.q()
        });
        w.Fa = (function (b) {
            var e = $.K,
                c = this.abs(),
                d = e.abs(),
                f = c.a;
            for (b.a = f + d.a; 0 <= --f;) {
                b[f] = 0
            }
            for (f = 0; f < d.a; ++f) {
                b[f + c.a] = c.N(d[f], b, f, c.a)
            }
            b.b = 0;
            b.q();
            this.b != e.b && W.ZERO.l(b, b)
        });
        w.v = (function (b, e, c) {
            var d = b.abs();
            if (!(0 >= d.a)) {
                var f = this.abs();
                if (f.a < d.a) {
                    e != t && e.r(0), c != t && this.copyTo(c)
                } else {
                    c == t && (c = wj());
                    var h = wj(),
                        g = this.b,
                        b = b.b,
                        i = d[d.a - 1],
                        j = 1,
                        m;
                    if (0 != (m = i >>> 16)) {
                        i = m, j += 16
                    }
                    if (0 != (m = i >> 8)) {
                        i = m, j += 8
                    }
                    if (0 != (m = i >> 4)) {
                        i = m, j += 4
                    }
                    if (0 != (m = i >> 2)) {
                        i = m, j += 2
                    }
                    0 != i >> 1 && (j += 1);
                    i = this.c - j;
                    0 < i ? (d.ka(i, h), f.ka(i, c)) : (d.copyTo(h), f.copyTo(c));
                    d = h.a;
                    f = h[d - 1];
                    if (0 != f) {
                        m = f * (1 << this.W) + (1 < d ? h[d - 2] >> this.Y : 0);
                        j = this.ta / m;
                        m = (1 << this.W) / m;
                        var p = 1 << this.Y,
                            k = c.a,
                            q = k - d,
                            l = e == t ? wj() : e;
                        h.R(q, l);
                        0 <= c.D(l) && (c[c.a++] = 1, c.l(l, c));
                        W.ONE.R(d, l);
                        for (l.l(h, h); h.a < d;) {
                            h[h.a++] = 0
                        }
                        for (; 0 <= --q;) {
                            var r = c[--k] == f ? this.m : Math.floor(c[k] * j + (c[k - 1] + p) * m);
                            if ((c[k] += h.N(r, c, q, d)) < r) {
                                h.R(q, l);
                                for (c.l(l, c); c[k] < --r;) {
                                    c.l(l, c)
                                }
                            }
                        }
                        e != t && (c.xa(d, e), g != b && W.ZERO.l(e, e));
                        c.a = d;
                        c.q();
                        0 < i && c.Ia(i, c);
                        0 > g && W.ZERO.l(c, c)
                    }
                }
            }
        });
        w.toString = (function (b) {
            if (0 > this.b) {
                return "-" + this.f().toString(b)
            }
            if (16 == b) {
                b = 4
            } else {
                if (8 == b) {
                    b = 3
                } else {
                    if (2 == b) {
                        b = 1
                    } else {
                        if (32 == b) {
                            b = 5
                        } else {
                            if (4 == b) {
                                b = 2
                            } else {
                                return this.Na(b)
                            }
                        }
                    }
                }
            }
            var e = (1 << b) - 1,
                c, d = v,
                f = "",
                h = this.a,
                g = this.c - h * this.c % b;
            if (0 < h--) {
                if (g < this.c && 0 < (c = this[h] >> g)) {
                    d = n, f = "0123456789abcdefghijklmnopqrstuvwxyz".charAt(c)
                }
                for (; 0 <= h;) {
                    g < b ? (c = (this[h] & (1 << g) - 1) << b - g, c |= this[--h] >> (g += this.c - b)) : (c = this[h] >> (g -= b) & e, 0 >= g && (g += this.c, --h)), 0 < c && (d = n), d && (f += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(c))
                }
            }
            return d ? f : "0"
        });
        w.f = (function () {
            var b = wj();
            W.ZERO.l(this, b);
            return b
        });
        w.abs = (function () {
            return 0 > this.b ? this.f() : this
        });
        w.D = (function (b) {
            var e = this.b - b.b;
            if (0 != e) {
                return e
            }
            var c = this.a,
                e = c - b.a;
            if (0 != e) {
                return 0 > this.b ? -e : e
            }
            for (; 0 <= --c;) {
                if (0 != (e = this[c] - b[c])) {
                    return e
                }
            }
            return 0
        });
        W.ZERO = zj(0);
        W.ONE = zj(1);
        w = W.prototype;
        w.za = (function (b, e) {
            this.r(0);
            e == t && (e = 10);
            for (var c = this.A(e), d = Math.pow(e, c), f = v, h = 0, g = 0, i = 0; i < b.length; ++i) {
                var j = xj(b, i);
                0 > j ? "-" == b.charAt(i) && 0 == this.U() && (f = n) : (g = e * g + j, ++h >= c && (this.ca(d), this.ba(g), g = h = 0))
            }
            0 < h && (this.ca(Math.pow(e, h)), this.ba(g));
            f && W.ZERO.l(this, this)
        });
        w.A = (function (b) {
            return Math.floor(Math.LN2 * this.c / Math.log(b))
        });
        w.U = (function () {
            return 0 > this.b ? -1 : 0 >= this.a || 1 == this.a && 0 >= this[0] ? 0 : 1
        });
        w.ca = (function (b) {
            this[this.a] = this.N(b - 1, this, 0, this.a);
            ++this.a;
            this.q()
        });
        w.ba = (function (b) {
            var e = 0;
            if (0 != b) {
                for (; this.a <= e;) {
                    this[this.a++] = 0
                }
                for (this[e] += b; this[e] >= this.z;) {
                    this[e] -= this.z, ++e >= this.a && (this[this.a++] = 0), ++this[e]
                }
            }
        });
        w.Na = (function (b) {
            b == t && (b = 10);
            if (0 == this.U() || 2 > b || 36 < b) {
                return "0"
            }
            var e = this.A(b),
                e = Math.pow(b, e),
                c = zj(e),
                d = wj(),
                f = wj(),
                h = "";
            for (this.v(c, d, f); 0 < d.U();) {
                h = (e + f.ea()).toString(b).substr(1) + h, d.v(c, d, f)
            }
            return f.ea().toString(b) + h
        });
        w.ea = (function () {
            if (0 > this.b) {
                if (1 == this.a) {
                    return this[0] - this.z
                }
                if (0 == this.a) {
                    return -1
                }
            } else {
                if (1 == this.a) {
                    return this[0]
                }
                if (0 == this.a) {
                    return 0
                }
            }
            return (this[1] & (1 << 32 - this.c) - 1) << this.c | this[0]
        });
        w.M = (function (b, e) {
            for (var c = 0, d = 0, f = Math.min(b.a, this.a); c < f;) {
                d += this[c] + b[c], e[c++] = d & this.m, d >>= this.c
            }
            if (b.a < this.a) {
                for (d += b.b; c < this.a;) {
                    d += this[c], e[c++] = d & this.m, d >>= this.c
                }
                d += this.b
            } else {
                for (d += this.b; c < b.a;) {
                    d += b[c], e[c++] = d & this.m, d >>= this.c
                }
                d += b.b
            }
            e.b = 0 > d ? -1 : 0;
            0 < d ? e[c++] = d : -1 > d && (e[c++] = this.z + d);
            e.a = c;
            e.q()
        });
        var $ = {
            add: (function (b, e, c, d) {
                b = (new Z(b, e)).add(new Z(c, d));
                A[G >> 2] = b.d;
                A[G + 4 >> 2] = b.e
            }),
            s: (function (b, e, c, d) {
                b = (new Z(b, e)).s(new Z(c, d));
                A[G >> 2] = b.d;
                A[G + 4 >> 2] = b.e
            }),
            multiply: (function (b, e, c, d) {
                b = (new Z(b, e)).multiply(new Z(c, d));
                A[G >> 2] = b.d;
                A[G + 4 >> 2] = b.e
            }),
            F: (function () {
                $.ya || ($.ya = n, $.K = new W, $.K.g("4294967296", 10), $.V = new W, $.V.g("18446744073709551616", 10), $.Va = new W, $.Wa = new W)
            }),
            G: (function (b, e) {
                var c = new W;
                c.g(e.toString(), 10);
                var d = new W;
                c.Fa(d);
                c = new W;
                c.g(b.toString(), 10);
                var f = new W;
                c.M(d, f);
                return f
            }),
            Ra: (function (b, e, c, d, f) {
                $.F();
                f ? (b = $.G(b >>> 0, e >>> 0), d = $.G(c >>> 0, d >>> 0), c = new W, b.v(d, c, t), d = new W, b = new W, c.v($.K, b, d), A[G >> 2] = parseInt(d.toString()) | 0, A[G + 4 >> 2] = parseInt(b.toString()) | 0) : (b = new Z(b, e), d = new Z(c, d), c = b.n(d), A[G >> 2] = c.d, A[G + 4 >> 2] = c.e)
            }),
            ma: (function (b, e, c, d, f) {
                $.F();
                f ? (b = $.G(b >>> 0, e >>> 0), d = $.G(c >>> 0, d >>> 0), c = new W, b.v(d, t, c), d = new W, b = new W, c.v($.K, b, d), A[G >> 2] = parseInt(d.toString()) | 0, A[G + 4 >> 2] = parseInt(b.toString()) | 0) : (b = new Z(b, e), d = new Z(c, d), c = b.ma(d), A[G >> 2] = c.d, A[G + 4 >> 2] = c.e)
            }),
            stringify: (function (b, e, c) {
                b = (new Z(b, e)).toString();
                c && "-" == b[0] && ($.F(), c = new W, c.g(b, 10), b = new W, $.V.M(c, b), b = b.toString(10));
                return b
            }),
            g: (function (b, e, c, d, f) {
                $.F();
                var h = new W;
                h.g(b, e);
                b = new W;
                b.g(c, 10);
                c = new W;
                c.g(d, 10);
                f && 0 > h.D(W.ZERO) && (d = new W, h.M($.V, d), h = d);
                d = v;
                0 > h.D(b) ? (h = b, d = n) : 0 < h.D(c) && (h = c, d = n);
                h = Z.g(h.toString());
                A[G >> 2] = h.d;
                A[G + 4 >> 2] = h.e;
                d && a("range error")
            })
        };
        nf = $;
        Module.wa = (function (b) {
            function e() {
                for (var b = 0; 3 > b; b++) {
                    d.push(0)
                }
            }
            var c = b.length + 1,
                d = [K(le("/bin/this.program"), "i8", ee)];
            e();
            for (var f = 0; f < c - 1; f += 1) {
                d.push(K(le(b[f]), "i8", ee)), e()
            }
            d.push(0);
            d = K(d, "i32", ee);
            return Module._main(c, d, 0)
        });

        function ye(b) {
            function e() {
                var c = 0;
                te = n;
                Module._main && (me(pe), c = Module.wa(b), Module.noExitRuntime || me(qe));
                if (Module.postRun) {
                    for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); 0 < Module.postRun.length;) {
                        Module.postRun.pop()()
                    }
                }
                return c
            }
            b = b || Module.arguments;
            if (0 < re) {
                return Module.u("run() called, but dependencies remain, so not running"), 0
            }
            if (Module.preRun) {
                "function" == typeof Module.preRun && (Module.preRun = [Module.preRun]);
                var c = Module.preRun;
                Module.preRun = [];
                for (var d = c.length - 1; 0 <= d; d--) {
                    c[d]()
                }
                if (0 < re) {
                    return 0
                }
            }
            return Module.setStatus ? (Module.setStatus("Running..."), setTimeout((function () {
                setTimeout((function () {
                    Module.setStatus("")
                }), 1);
                e()
            }), 1), 0) : e()
        }
        Module.run = Module.Ua = ye;
        if (Module.preInit) {
            for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); 0 < Module.preInit.length;) {
                Module.preInit.pop()()
            }
        }
        me(oe);
        var xe = n;
        Module.noInitialRun && (xe = v);
        xe && ye()




var scrypt = (function () {
    var exports = {};

    //---------------------------------------------------------------------------
    // Horrifying UTF-8 and hex codecs

    function encode_utf8(s) {
	return encode_latin1(unescape(encodeURIComponent(s)));
    }

    function encode_latin1(s) {
	var result = new Uint8Array(s.length);
	for (var i = 0; i < s.length; i++) {
	    var c = s.charCodeAt(i);
	    if ((c & 0xff) !== c) throw {message: "Cannot encode string in Latin1", str: s};
	    result[i] = (c & 0xff);
	}
	return result;
    }

    function decode_utf8(bs) {
	return decodeURIComponent(escape(decode_latin1(bs)));
    }

    function decode_latin1(bs) {
	var encoded = [];
	for (var i = 0; i < bs.length; i++) {
	    encoded.push(String.fromCharCode(bs[i]));
	}
	return encoded.join('');
    }

    function to_hex(bs) {
	var encoded = [];
	for (var i = 0; i < bs.length; i++) {
	    encoded.push("0123456789abcdef"[(bs[i] >> 4) & 15]);
	    encoded.push("0123456789abcdef"[bs[i] & 15]);
	}
	return encoded.join('');
    }

    //---------------------------------------------------------------------------

    function injectBytes(bs, leftPadding) {
	var p = leftPadding || 0;
	var address = scrypt_raw._malloc(bs.length + p);
	scrypt_raw.HEAPU8.set(bs, address + p);
	for (var i = address; i < address + p; i++) {
	    scrypt_raw.HEAPU8[i] = 0;
	}
	return address;
    }

    function check_injectBytes(function_name, what, thing, expected_length, leftPadding) {
	check_length(function_name, what, thing, expected_length);
	return injectBytes(thing, leftPadding);
    }

    function extractBytes(address, length) {
	var result = new Uint8Array(length);
	result.set(scrypt_raw.HEAPU8.subarray(address, address + length));
	return result;
    }

    //---------------------------------------------------------------------------

    function check(function_name, result) {
	if (result !== 0) {
	    throw {message: "scrypt_raw." + function_name + " signalled an error"};
	}
    }

    function check_length(function_name, what, thing, expected_length) {
	if (thing.length !== expected_length) {
	    throw {message: "scrypt." + function_name + " expected " +
	           expected_length + "-byte " + what + " but got length " + thing.length};
	}
    }

    function Target(length) {
	this.length = length;
	this.address = scrypt_raw._malloc(length);
    }

    Target.prototype.extractBytes = function (offset) {
	var result = extractBytes(this.address + (offset || 0), this.length - (offset || 0));
	scrypt_raw._free(this.address);
	this.address = null;
	return result;
    };

    function free_all(addresses) {
	for (var i = 0; i < addresses.length; i++) {
	    scrypt_raw._free(addresses[i]);
	}
    }

    //---------------------------------------------------------------------------

    function crypto_scrypt(passwd, salt, n, r, p, buflen) {
	var buf = new Target(buflen);
	var pa = injectBytes(passwd);
	var sa = injectBytes(salt);
	check("_crypto_scrypt",
	      scrypt_raw._crypto_scrypt(pa, passwd.length,
					sa, salt.length,
					n, 0, // 64 bits; zero upper half
					r,
					p,
					buf.address, buf.length));
	free_all([pa, sa]);
	return buf.extractBytes();
    }

    //---------------------------------------------------------------------------

    var m_async_running = false;
    var m_async_buf, m_async_pa, m_async_sa, m_async_callback_func;
    function crypto_scrypt_async(passwd, salt, n, r, p, buflen, callback_func, progress_callback_func, numsteps) {
	    if (m_async_running)
	    {
	    	return null;
	    }
	    m_async_running = true;

		m_async_buf = new Target(buflen);
		m_async_pa = injectBytes(passwd);
		m_async_sa = injectBytes(salt);
		m_async_callback_func = callback_func;

		var result = scrypt_raw._crypto_scrypt_async(m_async_pa, passwd.length,
						m_async_sa, salt.length,
						n, 0, // 64 bits; zero upper half
						r,
						p,
						m_async_buf.address, m_async_buf.length, crypto_scrypt_async_finished_callback, progress_callback_func, numsteps);
		if (result !== 0)
		{
			// error
			crypto_scrypt_async_cleanup();
		}
		return result;
    }

    function crypto_scrypt_async_cleanup()
    {
    	free_all([m_async_pa, m_async_sa]);
		m_async_running = false;
	}
    function crypto_scrypt_async_finished_callback(result)
    {
    	if (result === 0)
    	{
    		m_async_callback_func(result, m_async_buf.extractBytes());
    	}
    	else
    	{
    		m_async_callback_func(result, "");
    	}
    	crypto_scrypt_async_cleanup();
    }

    //---------------------------------------------------------------------------

    exports.encode_utf8 = encode_utf8;
    exports.encode_latin1 = encode_latin1;
    exports.decode_utf8 = decode_utf8;
    exports.decode_latin1 = decode_latin1;
    exports.to_hex = to_hex;

    exports.crypto_scrypt = crypto_scrypt;
    exports.crypto_scrypt_async = crypto_scrypt_async;

    return exports;
})();
    return scrypt;
})();
