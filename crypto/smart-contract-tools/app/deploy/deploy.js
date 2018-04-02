(function () {

    'use strict';

    var controller_name = "app.deploy";

    var controller = angular.module(controller_name, []);

// https://docs.angularjs.org/api/ng/provider/$logProvider
    controller.config(function ($logProvider) {
            // $logProvider.debugEnabled(false);
            $logProvider.debugEnabled(true);
        }
    );

    controller.controller(controller_name, [
        '$scope',
        '$rootScope',
        '$log',
        '$state',
        // 'uiUploader',
        function deployCtrl($scope,
                            $rootScope,
                            $log,
                            $state
                            // uiUploader
        ) {

            $log.debug("controller ", controller_name, "started");

            //Get a list of all possibile solc versions
            BrowserSolc.getVersions(
                function (soljsonSources, soljsonReleases) {
                    $scope.allSolcVersions = soljsonSources;
                    $scope.$apply();
                    $log.debug($scope.allSolcVersions);
                    // $log.debug();
                    // $log.debug(soljsonReleases);
                });
            $scope.solcVersionToUse = "soljson-v0.4.19+commit.c4cbbb05.js";
            $scope.optimize = true;
            $scope.compilerIsWorking = false;

            // --------------------------------------------------

            $scope.readFileContent = function ($fileContent) {
                $scope.contractSource = $fileContent;
                $log.debug("$scope.contractSource : ");
                $log.debug($scope.contractSource);
            };

            $scope.contract = {};
            $scope.compile = function () {
                $scope.compilerIsWorking = true;
                try {
                    BrowserSolc.loadVersion($scope.solcVersionToUse, function (compiler) {
                            // source = 'contract x { function g() {} }';
                            // optimize = 1;
                            try {
                                $scope.contract.contractCompiled = compiler.compile($scope.contractSource, $scope.optimize);
                            } catch (error) {
                                $log.debug(error);
                                if (error.toString().indexOf("Maximum call stack size exceeded") !== -1) {
                                    error = error + " (Browsers can't handle that many arguments, try not browser-based compiler or another compiler version)"
                                }
                                $scope.compilerError = error;
                                $scope.compilerIsWorking = false;
                                $scope.$apply();
                                return;
                            }
                            $log.debug("$scope.contract.contractCompiled:");
                            $log.debug($scope.contract.contractCompiled);

                            if ($scope.contract.contractCompiled.errors) {
                                $scope.compilerError = $scope.contract.contractCompiled.errors;
                                $scope.compilerIsWorking = false;
                                $scope.$apply();
                                return;
                            }

                            try {
                                $scope.contractNames = Object.keys($scope.contract.contractCompiled.contracts);
                            } catch (error) {
                                $scope.compilerError = error;
                                $scope.compilerIsWorking = false;
                                $scope.$apply();
                                return;
                            }

                            $log.debug("$scope.contractNames:");
                            $log.debug($scope.contractNames);
                            $scope.compilerIsWorking = false;
                            $scope.$apply();
                        }
                    );
                } catch (error) {
                    $scope.compilerError = error;
                    $scope.$apply();
                    $log.debug($scope.compilerError);
                    $scope.compilerIsWorking = false;
                    $scope.$apply();
                    return;
                }
            };

            $scope.contractDeployed = {};
            $scope.deployIsWorking = false;
            $scope.deploy = function () {

                $scope.deployIsWorking = true;

                if ($rootScope.web3.eth.accounts.length === 0) {
                    $scope.deployError = 'no accounts detected';
                    $scope.deployIsWorking = false;
                    // $scope.$apply();
                    return;
                }
                if (!$scope.contractName || $scope.contractName === "") {
                    $scope.deployError = "please provide contract name";
                    $scope.deployIsWorking = false;
                    // $scope.$apply();
                    return;
                }
                if (!$rootScope.web3.eth.defaultAccount) {
                    $rootScope.web3.eth.defaultAccount = $rootScope.web3.eth.accounts[0];
                }
                // var compiledContract = $scope.contract.contractCompiled[':' + $scope.contractName];
                // $scope.$apply(); // - not needed here
                $log.debug("$scope.contractName:", $scope.contractName);
                $log.debug("$scope.contract.contractCompiled");
                $log.debug($scope.contract.contractCompiled);
                $log.debug("$scope.contract.contractCompiled.contracts[$scope.contractName]:");
                $log.debug($scope.contract.contractCompiled.contracts[$scope.contractName]);

                var compiledContract = $scope.contract.contractCompiled.contracts[$scope.contractName];
                $log.debug("compiledContract:");
                $log.debug(compiledContract);

                var abi = compiledContract.interface;
                var bytecode = '0x' + compiledContract.bytecode; // (!!!) <- needs '0x' prefix
                var contract = $rootScope.web3.eth.contract(JSON.parse(abi));

                // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethestimategas
                var gasEstimate = 0;
                $rootScope.web3.eth.estimateGas({data: bytecode}, function (error, result) {
                    if (!error) {
                        gasEstimate = result;
                        contract.new({
                                from: $rootScope.web3.eth.defaultAccount,
                                data: bytecode, // <<< needs "0x" prefix
                                gas: gasEstimate
                            }, function (error, contractDeployed) {
                                if (!error) {
                                    // NOTE: The callback will fire twice!
                                    // Once the contract has the transactionHash property set and once its deployed on an address.

                                    $scope.contractDeployed = contractDeployed;

                                    // e.g. check tx hash on the first call (transaction send)
                                    if (!contractDeployed.address) {
                                        $log.debug('contract created, tx hash: ' + contractDeployed.transactionHash); // The hash of the transaction, which deploys the contract
                                        $scope.contractDeployed.transactionHash = contractDeployed.transactionHash;
                                        $scope.$apply();

                                        // check address on the second call (contract deployed)
                                    } else {
                                        $log.debug('contract address: ' + contractDeployed.address); // the contract address
                                        $scope.contractDeployed.address = contractDeployed.address;
                                        $scope.deployIsWorking = false;
                                        $scope.$apply();
                                    }
                                } else {
                                    $scope.deployError = error;
                                    $log.debug(error);
                                    $scope.deployIsWorking = false;
                                    $scope.$apply();
                                }
                            }
                        ) // end of contract.new

                    } else {
                        $scope.deployError = "can not estimate gas for deployment";
                        $scope.deployIsWorking = false;
                        $scope.$apply();
                        $log.debug($scope.deployWarning);
                    }
                });

            }; // end of $scope.deploy

            // --------------------------------------------------

        } // end function testCtl
    ]);
})();