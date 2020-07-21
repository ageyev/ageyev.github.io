'use strict';

console.log('Web Crypto API app started');

/* utility functions */

// https://stackoverflow.com/questions/37234333/arraybuffer-to-string-string-to-arraybuffer-methods
// https://stackoverflow.com/a/38291353/1697878
function arrayBufferToString(buffer, encoding, callback) {
 const blob = new Blob([buffer], {type: 'text/plain'});
 const reader = new FileReader();
 reader.onload = function (evt) {
	callback(evt.target.result);
 };
 reader.readAsText(blob, encoding);
}

function stringToArrayBuffer(string, encoding, callback) {
 const blob = new Blob([string], {type: 'text/plain;charset=' + encoding});
 const reader = new FileReader();
 reader.onload = function (evt) {
	callback(evt.target.result);
 };
 reader.readAsArrayBuffer(blob);
}

// global variables, accessible from console:
// (this is for study, not for production)

let keyPair;
let publicKey;
let publicKeyKeyExported;
let privateKey;
let privateKeyExported;
let signature;

const format = 'jwk'
// https://developer.mozilla.org/en-US/docs/Web/API/EcKeyGenParams
const ecKeyGenParams = {
 name: "ECDSA",
 namedCurve: "P-384"
}
const keyExtractable = true;
const keyUsages = ['sign', 'verify'];

const ecdsaParams = {
 name: 'ECDSA',
 hash: 'SHA-512'
}

$(document).ready(() => {

 $("#generateKeyPairBtn").click(() => {

	crypto.subtle.generateKey(
		ecKeyGenParams,
		keyExtractable,
		keyUsages
	).then((result) => {

	 keyPair = result;
	 publicKey = keyPair.publicKey;
	 privateKey = keyPair.privateKey;

	 crypto.subtle.exportKey(format, privateKey)
		 .then((result) => {
			console.log(result);
			privateKeyExported = result;
			$("#privateKey").val(JSON.stringify(privateKeyExported));
		 }).catch((error) => {
		console.log(error);
	 })

	 crypto.subtle.exportKey(format, publicKey)
		 .then((result) => {
			console.log(result);
			publicKeyKeyExported = result;
			$("#publicKey").val(JSON.stringify(publicKeyKeyExported));
		 }).catch((error) => {
		console.log(error);
	 })

	})
		.catch((error) => {
		 console.log(error);
		})

	console.log(keyPair);

 });

 $('#signBtn').click(() => {

	const textToSign = $("#textToSign").val();
	console.log('Text to sign:');
	console.log(textToSign);

	stringToArrayBuffer(textToSign, 'UTF-8', (arrayBuffer) => {
	 crypto.subtle.sign(ecdsaParams, privateKey, arrayBuffer).then((result) => {

		console.log('ArrayBuffer signature:')
		console.log(result);

		arrayBufferToString(result, 'UTF-8', (signature)=>{
		 console.log(signature);
		 $("#signature").val(
			 signature
		 );
		});


		// (!!!) see:
		// https://stackoverflow.com/questions/52067873/how-to-convert-arraybuffer-from-subtlecrypto-sign-to-a-string

	 }).catch((error) => {
		console.log(error);
	 })
	});

 });

});

