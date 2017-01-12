"use strict";

$(function () {

    var myPublicKey;
    var myPrivateKey;

    console.log("app.js is loaded");

    if (!window.crypto.getRandomValues) {
        window.alert("This browser isn't supported!");
    }

    // Generate Mockup Data
    $("#useMockupData").click(function (event) {
        $("#passphrase").val("very strong password");
        $("#firstName").val("John");
        $("#lastName").val("Doe");
        $("#userEmail").val("john.doe@gmail.com");
        $("#expire_in").val(1);
        $("#messageText").val("this is a test message we want to encrypt or sign");
        $("#numBits").val(1024);
    });

    // Encrypt
    $("#encrypt").click(function (event) {
        console.log("button clicked");
        var armoredKey = $('#pubkeyShow').val();
        console.log("armoredKey: " + armoredKey);
        var publicKey = openpgp.key.readArmored(armoredKey);

        var message = $("#messageText").val();
        console.log("message: " + message);

        var options, encryptedRaw, encryptedASCIIarmored;

        options = {
            data: message, // input as Uint8Array (or String)
            // passwords: ['secret stuff'],// multiple passwords possible
            publicKeys: publicKey.keys, // <-- !!!!
            // armor: false // don't ASCII armor (for Uint8Array output)
        };

        openpgp.encrypt(options).then(function (ciphertext) {
            console.log(ciphertext)
            console.log(JSON.stringify(ciphertext))
            encryptedASCIIarmored = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
            console.log("ciphertext.data: " + ciphertext.data)
            $("#encryptedText").val(ciphertext.data);
        });
    });

    // Decrypt
    $("#decryptButton").click(function (event) {

        var armoredMessage = $("#encryptedText").val();
        var armoredPubKey = $("#pubkeyShow").val();
        var armoredPrivKey = $("#privkeyShow").val();
        console.log("armoredPrivKey: ");
        console.log(armoredPrivKey);

        // var privateKeyEncrypted = openpgp.key.readArmored(armoredPrivKey).keys[0];
        var privateKeyEncrypted = openpgp.key.readArmored(armoredPrivKey).keys[0];
        console.log("privateKeyEncrypted: ");
        console.log(privateKeyEncrypted);
        var passphrase = document.getElementById("passphrase").value;
        var decrypted = privateKeyEncrypted.decrypt(passphrase); // boolean
        var privateKeyDecrypted = privateKeyEncrypted;

        var options = {
            message: openpgp.message.readArmored(armoredMessage), // parse armored message
            publicKeys: openpgp.key.readArmored(armoredPubKey).keys, // for verification (optional)
            privateKey: privateKeyDecrypted // after privateKeyEncrypted.decrypt(passphrase)
        };

        openpgp.decrypt(options).then(function (plaintext) {

            console.log("plaintext.data: " + plaintext.data);

            $("#decryptedText").val(plaintext.data);

        });

    });

    function makeGenerateKeysOptions() {
        var opts = {};
        opts.passphrase = document.getElementById("passphrase").value;
        opts.firstName = document.getElementById("firstName").value;
        opts.lastName = document.getElementById("lastName").value;
        opts.name = opts.firstName + " " + opts.lastName;
        opts.userEmail = document.getElementById("userEmail").value;
        opts.userId = opts.name + " <" + opts.userEmail + ">";
        opts.numBits = document.getElementById("numBits").value;
        var years = document.getElementById("expire_in").value;
        opts.expire_in = 86400 * 365 * years; // expires in ... years
        console.log("makeGenerateKeysOptions() :");
        console.log(JSON.stringify(opts));
        return opts;
    }

    function generateKeysKbpgpOptions() {

        var F = kbpgp["const"].openpgp;

        var genOpts = makeGenerateKeysOptions();

        var opts = {
            userid: genOpts.userId,
            primary: {
                nbits: genOpts.numBits,
                flags: F.certify_keys | F.sign_data | F.auth | F.encrypt_comm | F.encrypt_storage,
                expire_in: genOpts.expire_in
            }
            ,
            subkeys: [
                {
                    nbits: genOpts.numBits,
                    flags: F.sign_data,
                    expire_in: genOpts.expire_in
                }
            ]
        };
        console.log('generateKeysKbpgpOptions() : ');
        console.log(JSON.stringify(opts));
        return opts;
    }

    function emptyKeyData() {

        $("#fingerprint").text("");
        $("#userId").text("");
        $("#created").text("");
        $("#exp").text("");
        $("#bitsSize").text("");
    }

    $("#generateKeysOpenPGPjs").click(function (event) {

        emptyKeyData();

        var genOpts = makeGenerateKeysOptions();

        var options = {
            userIds: [
                {
                    name: genOpts.name,
                    email: genOpts.userEmail
                }
            ], // multiple user IDs
            numBits: genOpts.numBits, // RSA key size
            passphrase: genOpts.passphrase // protects the private key
            // --- ? validity / expire in ? a
        };

        openpgp.generateKey(options).then(function (key) {

            var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
            console.log("privkey:");
            console.log(privkey);
            myPrivateKey = privkey;
            $("#privkeyShow").val(myPrivateKey);

            var pubkey = key.publicKeyArmored; // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

            myPublicKey = pubkey;
            $('#pubkeyShow').val(myPublicKey);
            console.log("myPublicKey:");
            console.log(myPublicKey);
        });

    }); // end #generateKeysOpenPGPjs

    $("#generateKeysKbpgp").click(function () {

            $("#statusMessage").text("Generating key, please wait ...");
            emptyKeyData();
            var genOpts = makeGenerateKeysOptions();
            var opts = generateKeysKbpgpOptions();
            console.log("start generating key pair...");
            // see: https://keybase.io/kbpgp/docs/generating_a_pair
            kbpgp.KeyManager.generate(opts, function (err, keyPairKbpgp) {
                if (err) {
                    console.log(err);
                }
                if (!err) {
                    // sign subkeys
                    keyPairKbpgp.sign({}, function (err) {

                        console.log(keyPairKbpgp);

                        // export demo; dump the private with a passphrase
                        keyPairKbpgp.export_pgp_private({
                            // passphrase: 'booyeah!'
                            passphrase: genOpts.passphrase
                        }, function (err, pgp_private) {
                            console.log("private key: ", pgp_private);
                            $("#privkeyShow").val(pgp_private);
                        });
                        //
                        keyPairKbpgp.export_pgp_public({}, function (err, pgp_public) {
                            console.log("public key: ", pgp_public);
                            $('#pubkeyShow').val(pgp_public);
                        });
                        //
                    });
                    $("#statusMessage").text("");
                }
            });
            /* --end- */
        }
    );

    // ----- READ PUBLIC KEY - OPENPGP.JS:
    $("#readPublicKeyDataOpenPGPjs").click(function () {

        var publicKey = openpgp.key.readArmored(
            $('#pubkeyShow').val()
        );
        var fingerprint = publicKey.keys[0].primaryKey.fingerprint.toUpperCase();
        var userId = publicKey.keys[0].users[0].userId.userid;
        var created = publicKey.keys[0].primaryKey.created;

        console.log("publicKey.keys[0].primaryKey.created :");
        console.log(publicKey.keys[0].primaryKey.created);
        // Wed Jan 11 2017 17:53:20 GMT+0200 (IST)

        console.log("publicKey.keys[0].primaryKey.created.getTime() : ");
        console.log(publicKey.keys[0].primaryKey.created.getTime());
        // 1484150000000
        // 1,484,150,000,000 (vs. 1,484,150,000 in Kbpgp)

        console.log("publicKey.keys[0].getExpirationTime() :");
        console.log(publicKey.keys[0].getExpirationTime());

        /* https://github.com/openpgpjs/openpgpjs/blob/master/src/key.js#L442*/
        console.log("publicKey.keys[0].primaryKey.expirationTimeV3 : ")
        console.log(publicKey.keys[0].primaryKey.expirationTimeV3);
        // 0

        /* https://github.com/openpgpjs/openpgpjs/blob/master/src/key.js#L463 */
        console.log("publicKey.keys[0].getPrimaryUser().selfCertificate.keyExpirationTime:");
        console.log(publicKey.keys[0].getPrimaryUser().selfCertificate.keyExpirationTime);
        // 31536000

        console.log("publicKey.keys[0].getPrimaryUser().selfCertificate.keyNeverExpires :");
        console.log(publicKey.keys[0].getPrimaryUser().selfCertificate.keyNeverExpires);
        //
        var exp = new Date(
            publicKey.keys[0].primaryKey.created.getTime()
            + (publicKey.keys[0].getPrimaryUser().selfCertificate.keyExpirationTime * 1000)
        );

        //
        /**
         * see: https://github.com/openpgpjs/openpgpjs/blob/master/src/key.js#L472
         * .getExpirationTime() returns the expiration time of the primary key or null if key does not expire
         * @return {Date|null}
         */
        exp = publicKey.keys[0].getExpirationTime(); // <<< ---- use this
        //
        //

        var bitsSize = publicKey.keys[0].primaryKey.getBitSize();

        console.log(fingerprint);
        console.log(publicKey);
        console.log(userId);
        console.log("created: " + created);
        console.log("exp: " + exp);
        console.log("bits size: " + bitsSize);

        $("#fingerprint").text(fingerprint);
        $("#userId").text(userId);
        $("#created").text(created);
        $("#exp").text(exp);
        $("#bitsSize").text(bitsSize);

    });

    // Read Public key data with Kbpgp
    $("#readPublicKeyDataKbpgp").click(function () {

        // var alice_pgp_key = "-----BEGIN PGP PUBLIC ... etc.";
        //
        // kbpgp.KeyManager.import_from_armored_pgp({
        //     armored: alice_pgp_key
        // }, function(err, alice) {
        //     if (!err) {
        //         console.log("alice is loaded");
        //     }
        // });

        var publicKeyArmored = $('#pubkeyShow').val();
        var key;
        kbpgp.KeyManager.import_from_armored_pgp({
            armored: publicKeyArmored
        }, function (err, keyImported) {
            if (!err) {
                console.log("key is loaded");
                key = keyImported;
            }
        });
        console.log(key);

        var fingerprint = key.get_pgp_fingerprint().toString('hex').toUpperCase();
        var userEmail = key.pgp.userids[0].components.email;
        var userName = key.pgp.userids[0].components.username;
        var userId = userName + " <" + userEmail + ">";
        //
        var created = new Date(key.primary.lifespan.generated * 1000);
        //
        /*
         // OpenPGP.js:
         var exp = new Date(
         publicKey.keys[0].primaryKey.created.getTime()
         + (publicKey.keys[0].getPrimaryUser().selfCertificate.keyExpirationTime * 1000)
         );
         */

        var exp = new Date(
            key.primary.lifespan.generated * 1000
            + key.primary.lifespan.expire_in * 1000
        ); // possible bug, see: https://github.com/keybase/kbpgp/issues/75


        console.log(fingerprint);
        console.log(userId);
        console.log(created);
        console.log(exp);

        $("#fingerprint").text(fingerprint);
        $("#userId").text(userId);
        $("#created").text(created);
        $("#exp").text(exp);


    });

    $('#signMessage').click(function (event) {

        var messageToSign = $("#messageText").val();
        var privateKeyArmored = $("#privkeyShow").val();
        var passphrase = $("#passphrase").val();
        var privateKeyEncrypted = openpgp.key.readArmored(privateKeyArmored).keys[0];
        privateKeyEncrypted.decrypt(passphrase); // boolean
        var privateKeyDecrypted = privateKeyEncrypted;
        var signObj = {
            data: messageToSign, // cleartext input to be signed
            privateKeys: privateKeyDecrypted, // array of keys or single key with decrypted secret key data to sign cleartext
            armor: true // (optional) if the return value should be ascii armored or the message object
        };
        var signedMessageObj = {};
        openpgp.sign(signObj).then(function (res) { //
            // @return {Promise<String|CleartextMessage>} ASCII armored message or the message of type CleartextMessage
            signedMessageObj = res;
            console.log(JSON.stringify(signedMessageObj));
            console.log(signedMessageObj.data);
            document.getElementById("signedMessage").value = signedMessageObj.data;
        });
        // document.getElementById("signedMessage").value = signedMessageObj.data;
        // $("#signedMessage").val(signedMessageObj.data.toString()); // ? does not work
    });
});
