"use strict";

var openpgp = require('./vendors/openpgpjs-2.3.5/dist/openpgp.min');

var options = {
    userIds: [{name: 'Jon Smith', email: 'jon@example.com'}],
    numBits: 1024,
    passphrase: 'passphrase',
    expire_in: 60 * 60 * 24 * 365 * 2// seconds
};

console.log("options:");
console.log(options);

var key;

openpgp.generateKey(options).then(function (generatedKey) {
    key = generatedKey;
    console.log(key);
    console.log(key.key.primaryKey.created);
    // 2017-01-11T14:56:51.354Z

    console.log("key.key.getExpirationTime() :");
    console.log(key.key.getExpirationTime());
    //

    /* https://github.com/openpgpjs/openpgpjs/blob/master/src/key.js#L442*/
    console.log(key.key.primaryKey.expirationTimeV3);
    // 0

    /* https://github.com/openpgpjs/openpgpjs/blob/master/src/key.js#L463 */
    console.log(key.key.getPrimaryUser().selfCertificate.keyExpirationTime);
    // null
    console.log(key.key.getPrimaryUser().selfCertificate.keyNeverExpires);
    // null
});



