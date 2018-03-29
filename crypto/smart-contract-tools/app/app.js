'use strict';

var app = angular.module('smartContractTools', [
        'ui.router',
        // ---- my:
        'app.ui.router',
        'app.controllers',
        'app.directives'
    ]
);

app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // 'self', // Allow same origin resource loads
        'self'
        // 'https://cryptonomica-test.appspot.com/**',
        // 'https://raw.githubusercontent.com/Cryptonomica/arbitration-rules/**' // works!
    ]);
});

// // see:
// // https://stackoverflow.com/questions/41460772/angularjs-how-to-remove-bang-prefix-from-url/41461312
// app.config(['$locationProvider', function ($locationProvider) {
//     $locationProvider.hashPrefix('');
// }]);

app.run([
    '$state',
    '$rootScope',
    '$window',
    '$sce',
    '$anchorScroll',
    '$location',
    '$log',
    function ($state,
              $rootScope,
              $window,
              $sce,
              $anchorScroll,
              $location,
              $log) {

        $log.debug('app started,  version: ', 0.2);

        /* === Utility functions === */

        $rootScope.goTo = function (id) {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            // $location.hash('about');
            $location.hash(id);
            // call $anchorScroll()
            $anchorScroll();
        };

        $rootScope.stringIsNullUndefinedOrEmpty = function (str) {
            return typeof str === 'undefined' || str === null || str.length === 0;
        };

        $rootScope.unixTimeFromDate = function (date) {
            return Math.round(date.getTime() / 1000);
        };

        $rootScope.dateFromUnixTime = function (unixTime) {
            return new Date(unixTime * 1000);
        };

        /* === web3.js === */
        // example from:
        // https://github.com/trufflesuite/truffle-artifactor#artifactorgenerateoptions-networks
        $rootScope.networks = {
            "1": {
                "networkName": "Main Ethereum Network",
                "etherscanLinkPrefix": "https://etherscan.io/",
                "etherscanApiLink": "https://api.etherscan.io/"
            },
            "2": {
                "networkName": "Morden TestNet",
                "etherscanLinkPrefix": undefined,
                "etherscanApiLink": undefined
            },
            "3": {
                "networkName": "Ropsten TestNet",
                "etherscanLinkPrefix": "https://ropsten.etherscan.io/",
                "etherscanApiLink": "https://api-ropsten.etherscan.io/"
            },
            "4": {        //
                "networkName": "Rinkeby TestNet",
                "etherscanLinkPrefix": "https://rinkeby.etherscan.io/",
                "etherscanApiLink": "https://api-rinkeby.etherscan.io/"
            },
            "5777": {
                "networkName": "Ganache",
                "etherscanLinkPrefix": "https://etherscan.io/",
                "etherscanApiLink": "https://api.etherscan.io/"
            }
        };

        /* web3 instantiation */
        // to access web3 instance in browser console:
        // angular.element('body').scope().$root.web3
        // see 'NOTE FOR DAPP DEVELOPERS' on https://github.com/ethereum/mist/releases/tag/v0.9.0
        try {
            if (typeof window.web3 !== 'undefined') {
                $log.debug('web3 object presented by provider:', window.web3.currentProvider);
                $rootScope.web3 = new Web3(window.web3.currentProvider);
            } else {
                $rootScope.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
                if (!$rootScope.web3.isConnected()) {
                    $rootScope.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
                    if (!$rootScope.web3.isConnected()) {
                        $log.debug("[error] no connection to node");
                        $rootScope.web3 = null;
                        $rootScope.noConnectionToNodeError = true;
                    }
                }
            }
        } catch (error) {
            $log.error(error);
            $rootScope.noConnectionToNodeError = true;
        }

        $rootScope.currentNetwork = {};
        if (!$rootScope.noConnectionToNodeError) {

            $rootScope.currentNetwork.connected = true;

            $rootScope.web3.version.getNetwork(function (error, result) {
                if (!error) {
                    $rootScope.currentNetwork.network_id = result; // "3" for Ropsten, "1" for MainNet etc.
                    if (result === "1" || result === "2" || result === "3" || result === "4" || result === "5777") {
                        $rootScope.currentNetwork.networkName = $rootScope.networks[result].networkName;
                        $rootScope.currentNetwork.etherscanLinkPrefix = $rootScope.networks[result].etherscanLinkPrefix;
                        $rootScope.currentNetwork.etherscanApiLink = $rootScope.networks[result].etherscanApiLink;

                    } else {
                        $rootScope.currentNetwork.networkName = "unknown network";
                        $rootScope.currentNetwork.etherscanLinkPrefix = $rootScope.networks["1"].etherscanLinkPrefix;
                        $rootScope.currentNetwork.etherscanApiLink = $rootScope.networks["1"].etherscanApiLink;
                    }
                    $rootScope.$apply(); // needed here

                } else {
                    $log.error(error);
                    $rootScope.getNetworkError = true;
                }
            });

            $rootScope.web3.version.getNode(function (error, result) {
                if (error) {
                    $log.debug(error);
                } else {
                    $rootScope.currentNetwork.node = result;
                    $rootScope.$apply();
                    $log.debug('web3.version.node: ' + $rootScope.currentNetwork.node);
                    // "Geth/v1.7.2-stable-1db4ecdc/linux-amd64/go1.9"
                }
            });

            $rootScope.web3.version.getEthereum(function (error, result) {
                if (error) {
                    $log.debug(error);
                } else {
                    $rootScope.currentNetwork.ethereumProtocolVersion = result;
                    $rootScope.$apply();
                    // $log.debug('[app.run] web3.version.ethereum: ' + $rootScope.currentNetwork.ethereumProtocolVersion);
                    // the Ethereum protocol version
                }
            });

            if ($rootScope.web3.eth.accounts.length > 0) {
                if (!$rootScope.web3.eth.defaultAccount) {
                    $rootScope.web3.eth.defaultAccount = $rootScope.web3.eth.accounts[0];
                }
            } else {
                $log.warn("accounts not detected");
                $rootScope.accountNotDetectedError = true;
            }
        }


    } // end main func
]);