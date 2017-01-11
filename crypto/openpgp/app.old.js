"use strict";

$(document).ready(function () {

    var myPublicKey;
    var myPrivateKey;

    console.log("app.js is loaded");

    if (!window.crypto.getRandomValues) {
        window.alert("This browser isn't supported!");
    }

    $("#pubkeyShow").change(function () {

        var armoredKey = $('#pubkeyShow').val();
        var publicKey = openpgp.key.readArmored(armoredKey);
        console.log(publicKey);
        console.log(JSON.stringify(publicKey));

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
            console.log(ciphertext);
            console.log(JSON.stringify(ciphertext));
            encryptedASCIIarmored = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
            console.log("ciphertext.data: " + ciphertext.data);
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

        var passphrase = "mypassword";
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

    $("#generateKeys").click(function (event) {

        var options = {
            userIds: [{
                name: 'Jon Smith',
                email: 'jon@example.com'
            }], // multiple user IDs
            numBits: 1024, // RSA key size
            passphrase: 'mypassword' // protects the private key
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
            console.log("-----------");
            var publicKey = openpgp.key.readArmored(myPublicKey);
            console.log(publicKey);
            // console.log(JSON.stringify(publicKey));
            console.log("User ID:");
            console.log(openpgp.key.readArmored(myPublicKey).keys[0].users[0].userId.userid);
            console.log("created:" + openpgp.key.readArmored(myPublicKey).keys[0].primaryKey.created);
            console.log("valid for: "
                + (openpgp.key.readArmored(myPublicKey).keys[0].primaryKey.expirationTimeV3 * 24 * 3600 * 1000)
                + " days");
            var exp = new Date(
                openpgp.key.readArmored(myPublicKey).keys[0].primaryKey.created.getTime()
                + openpgp.key.readArmored(myPublicKey).keys[0].primaryKey.expirationTimeV3 * 24 * 3600 * 1000
            );
            console.log(exp);

        });

    });

});
