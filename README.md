# js-scrypt: Pure-Javascript Emscripten-compiled scrypt routine

[Emscripten](https://github.com/kripken/emscripten)-compiled
[scrypt](http://www.tarsnap.com/scrypt.html), a Password-Based Key
Derivation Function from Colin Percival.

For general background on what `scrypt` is, and why it's useful, see
[these slides (PDF)](http://www.tarsnap.com/scrypt/scrypt-slides.pdf)
and [Colin Percival's page on
scrypt](http://www.tarsnap.com/scrypt.html).

This library is intended only for use in the browser; for node.js,
there are [plenty](https://github.com/cheongwy/node-scrypt)
[of](https://github.com/barrysteyn/node-scrypt)
[existing](https://github.com/hatchan/scrypt) options.

This library was written in order to interoperate with
[js-nacl](https://github.com/tonyg/js-nacl), a cryptographic toolkit
library.

This fork of the [original js-scrypt](https://github.com/tonyg/js-scrypt)
adds support for asynchronous key derivation by hacking some iterative
structure combined with JavaScript timeouts into the Emscripten-compiled
code.

## Building the library

The git checkout includes a pre-compiled version of the library, so
you won't need Emscripten unless you want to change something about
the underlying library itself or how it is compiled.

Essentially, the source checkout contains everything you will need to
use the library in the browser.

Note that the JavaScript files have been modified for asynchronism.
This means that you won't be able directly compile the `browser/scrypt_async.js`
file with Emscripten.


## Strings vs. Binary Data

The library enforces a strict distinction between strings and binary
data. Binary data is represented using instances of
[`Uint8Array`](https://developer.mozilla.org/en-US/docs/JavaScript/Typed_arrays/Uint8Array).

### scrypt.to_hex(Uint8Array) → String

Returns a lower-case hexadecimal representation of the given binary
data.

### scrypt.encode_utf8(String) → Uint8Array

Returns the binary equivalent of the argument, encoded using UTF-8.

### scrypt.encode_latin1(String) → Uint8Array

Returns the binary equivalent of the argument, encoded using Latin1
(an 8-bit clean encoding). If any of the character codes in the
argument string are greater than 255, an exception is thrown.

### scrypt.decode_utf8(Uint8Array) → String

Decodes the binary data in the argument using the UTF-8 encoding,
producing the corresponding string.

### scrypt.decode_latin1(Uint8Array) → String

Decodes the binary data in the argument using the Latin1 8-bit clean
encoding, producing the corresponding string.

## Using `crypto_scrypt`

To generate *L* bytes of derived key material from a password *passwd*
and a salt *salt*,

 - choose *N*, **which must be a power of two**, which will set the
   overall difficulty of the computation. The scrypt paper uses
   2<sup>14</sup>=16384 for interactive logins, and
   2<sup>20</sup>=1048576 for file encryption, but running in the
   browser is slow so Your Mileage Will Almost Certainly Vary.

 - choose *r* and *p*. Good values are r=8 and p=1. See the scrypt
   paper for details on these parameters.

Choose wisely! Picking good values for N, r and p is important for
making your keys sufficiently hard to brute-force.

Ensure your password and salt are both represented as
[`Uint8Array`](https://developer.mozilla.org/en-US/docs/JavaScript/Typed_arrays/Uint8Array)
instances, perhaps by calling `scrypt.encode_utf8` or similar.

Then,

    var keyBytes = scrypt.crypto_scrypt(password, salt, N, r, p, L);

and `keyBytes` will contain *L* bytes of key material.

For example,

    scrypt.crypto_scrypt(scrypt.encode_utf8("pleaseletmein"),
                         scrypt.encode_utf8("SodiumChloride"),
                         16384, 8, 1, 64)

produces 64 bytes of key material,

    7023bdcb3afd7348461c06cd81fd38eb
    fda8fbba904f8e3ea9b543f6545da1f2
    d5432955613f0fcf62d49705242a9af9
    e61e85dc0d651e40dfcf017b45575887

as a `Uint8Array`.

## Using `crypto_scrypt_async`

The asynchronous function has the same parameters as `crypto_scrypt`,
plus:

 - a result callback function `callback_result(success, result)`, which
   gets called at the end of the computation. *success* is 0 if everything
   went well and *result* then contains the key material as a `Uint8Array`.

 - a progress callback function `callback_progress(progress)`, which gets
   called after every iteration step. *progress* is a number between 0 and
   100, indicating the progress of the key derivation procedure.

 - a parameter *asyncSteps* that sets the number of steps into which the
   key derivation procedure should be divided. A higher number leads to
   more calls of the progress function and less browser lag, but also
   increases overhead and overall runtime. You will want to find a good
   balance between a smooth feel and a total runtime that doen't exceed
   the synchronous runtime too much, depending on the parameters and the
   application. You can try this out using `test_scrypt_browser.html`.
   Note that the number of steps will implicitly always be divisible by
   (2 *p*), so the actual number of steps may differ from the one specified
   here.
   
`crypto_scrypt_async` returns `0` if the procedure was successfully started,
`null` if it could not be started because another asynchronous key derivation 
is in progress (use `===`-check!). Other return values indicate errors 
inside the actual procedure, for example invalid input parameters.

Therefore we have

    var success = scrypt.crypto_scrypt_async(password, salt, N, r, p, L,
        callback_result, callback_progress, asyncSteps);
   
For example,

    scrypt.crypto_scrypt_async(scrypt.encode_utf8("pleaseletmein"),
        scrypt.encode_utf8("SodiumChloride"),
        16384, 8, 1, 64,
        function(success, result){output.innerHTML = scrypt.to_hex(result);},
        function(progress){output.innerHTML = progress;},
        20)

produces the same 64 bytes as the example above and writes them into
an output element (which has to be specified before). This is done in
20 steps. After each step, the output element is updated with a progress
percentage.

## License

js-scrypt is written by Tony Garnock-Jones
<tonygarnockjones@gmail.com> and is licensed under the [2-clause BSD license](http://opensource.org/licenses/BSD-2-Clause):

> Copyright &copy; 2013, Tony Garnock-Jones
> All rights reserved.
>
> Redistribution and use in source and binary forms, with or without
> modification, are permitted provided that the following conditions
> are met:
>
> 1. Redistributions of source code must retain the above copyright
>    notice, this list of conditions and the following disclaimer.
>
> 2. Redistributions in binary form must reproduce the above copyright
>    notice, this list of conditions and the following disclaimer in
>    the documentation and/or other materials provided with the
>    distribution.
>
> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
> "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
> LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
> FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
> COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
> INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
> BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
> LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
> CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
> LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
> ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
> POSSIBILITY OF SUCH DAMAGE.

js-scrypt relies on `scrypt` itself, which is written by Colin
Percival and licensed as follows:

> Copyright 2009 Colin Percival
> All rights reserved.
>
> Redistribution and use in source and binary forms, with or without
> modification, are permitted provided that the following conditions
> are met:
>
> 1. Redistributions of source code must retain the above copyright
>    notice, this list of conditions and the following disclaimer.
> 2. Redistributions in binary form must reproduce the above copyright
>    notice, this list of conditions and the following disclaimer in the
>    documentation and/or other materials provided with the distribution.
>
> THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
> ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
> ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
> DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
> OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
> HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
> LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
> OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
> SUCH DAMAGE.