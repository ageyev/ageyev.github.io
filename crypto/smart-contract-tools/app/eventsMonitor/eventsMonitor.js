(function () {

    'use strict';

    var controller_name = "app.eventsMonitor";

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
        function eventsMonCtrl($scope,
                               $rootScope,
                               $log,
                               $state) {

            $log.info("controller ", controller_name, "started");

            $scope.contractAddress = null;
            $scope.showFilterOptions = false;

            $scope.additionalFilterObjectInput = {};
            $scope.additionalFilterObjectInput.fromBlock = undefined; // "latest"
            $scope.additionalFilterObjectInput.toBlock = undefined; // "latest"
            // $scope.additionalFilterObjectInput.address = undefined;
            // $scope.additionalFilterObjectInput.topics = null;
            $scope.maxEventsNumber = 100;

            $scope.userProvidedABI = null;
            $scope.clearUserProvidedABI = function () {
                $scope.userProvidedABI = null;
            };
            $scope.showABI = false;
            $scope.showTableFilter = false;

            $scope.showTableFilterOptions = {};
            $scope.showTableFilterOptions.event = null;
            $scope.showTableFilterOptions.eventData = null;


            $scope.allEvents = [];
            // $scope.allEvents.push({}); // <<< test

            // $scope.monitorEvents = function (additionalFilterObject) {
            $scope.monitorEvents = function (additionalFilterObject) {
                $log.debug("$scope.monitorEvents triggered");
                if ($scope.listeningToEvents) {
                    $scope.stopMonitoringEvents();
                }
                $scope.allEvents = [];
                $scope.contractSource = null;
                // 'http://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359'
                var url =
                    $rootScope.currentNetwork.etherscanApiLink
                    + "api?module=contract&action=getabi&address="
                    + $scope.contractAddress
                    + "&apikey=Q2F763YZ19UY8UJ6WX9P7E2ZKC4YS5DQ97";
                $log.debug("sending request to:");
                $log.debug(url);
                if (!$scope.userProvidedABI || $scope.userProvidedABI === "") {
                    $.getJSON(url, function (data) {
                        $log.debug("$.getJSON(url, function (data):");
                        $log.debug(data);
                        $log.debug();
                        var contractABI = "";

                        if (data.status === "0") {
                            $scope.etherscanError = "Etherscan error: " + data.result;
                            $scope.$apply(); // <<< needed
                            $log.debug("$scope.etherscanError: ", $scope.etherscanError);
                            return;
                        }

                        contractABI = JSON.parse(data.result);
                        $log.debug("contractABI:");
                        $log.debug(contractABI);
                        $log.debug();
                        if (contractABI !== '') {
                            var MyContract = $rootScope.web3.eth.contract(contractABI);
                            $scope.myContractInstance = MyContract.at($scope.contractAddress);
                            // $log.debug($scope.myContractInstance);

                            // <<<< events:
                            $log.debug("additionalFilterObject:");
                            $log.debug(additionalFilterObject);

                            console.log("---------------------------");
                            console.log("listening to events");
                            $scope.listeningToEvents = true;
                            $scope.$apply(); // <<< needed
                            var eventsCounter = 0;

                            $scope.events = $scope.myContractInstance.allEvents(additionalFilterObject, function (error, result) {
                                    if (!error) {

                                        /* https://github.com/ethereum/wiki/wiki/JavaScript-API#callback-return
                                        Callback return Object - An event object as follows:
                                        * address: String, 32 Bytes - address from which this log originated.
                                        * args: Object - The arguments coming from the event.
                                        * blockHash: String, 32 Bytes - hash of the block where this log was in. null when its pending.
                                        * blockNumber: Number - the block number where this log was in. null when its pending.
                                        * logIndex: Number - integer of the log index position in the block.
                                        * event: String - The event name.
                                        * removed: bool - indicate if the transaction this event was created from was removed from the blockchain
                                                        (due to orphaned block) or never get to it (due to rejected transaction).
                                        * transactionIndex: Number - integer of the transactions index position log was created from.
                                        * transactionHash: String, 32 Bytes - hash of the transactions this log was created from.
                                        >>>> $$hashKey is from AngularJS
                                        */

                                        console.log('event # ', eventsCounter++, ': --------------------');
                                        console.log("event: ", result.event);
                                        console.log(result);
                                        console.log(); // empty line
                                        if (result.args && result.args !== '') {
                                            result.argsStr = JSON.stringify(result.args);
                                        }

                                        if ($scope.maxEventsNumber && $scope.allEvents.length > $scope.maxEventsNumber) {
                                            $scope.allEvents.shift();
                                        }
                                        $scope.allEvents.push(result);
                                        $scope.$apply(); // <<<
                                    } else {
                                        $scope.allEventsError = error;
                                    }
                                }
                            );
                        } else {
                            $scope.allEventsError = "No contract source code on etherscan.io";
                        }
                    });

                } else {

                    try {
                        $scope.contractABI = JSON.parse($scope.userProvidedABI);
                        // $scope.$apply(); // not needed here
                    } catch (error) {
                        $scope.etherscanError = "Invalid ABI provided: " + error;
                        // $scope.$apply(); // not needed here
                        return;
                    }

                    $log.debug("contractABI:");
                    $log.debug($scope.contractABI);
                    $log.debug();

                    if ($scope.contractABI !== '') {
                        var MyContract = $rootScope.web3.eth.contract($scope.contractABI);
                        $scope.myContractInstance = MyContract.at($scope.contractAddress);
                        // $log.debug($scope.myContractInstance);

                        // <<<< events:
                        $log.debug("additionalFilterObject:");
                        $log.debug(additionalFilterObject);
                        console.log("---------------------------");
                        console.log("listening to events");
                        $scope.listeningToEvents = true;
                        // $scope.$apply(); // <<< (!!!) not needed here
                        var eventsCounter = 0;

                        $scope.events = $scope.myContractInstance.allEvents(additionalFilterObject, function (error, result) {
                                if (!error) {

                                    /* https://github.com/ethereum/wiki/wiki/JavaScript-API#callback-return
                                    Callback return Object - An event object as follows:
                                    * address: String, 32 Bytes - address from which this log originated.
                                    * args: Object - The arguments coming from the event.
                                    * blockHash: String, 32 Bytes - hash of the block where this log was in. null when its pending.
                                    * blockNumber: Number - the block number where this log was in. null when its pending.
                                    * logIndex: Number - integer of the log index position in the block.
                                    * event: String - The event name.
                                    * removed: bool - indicate if the transaction this event was created from was removed from the blockchain
                                                    (due to orphaned block) or never get to it (due to rejected transaction).
                                    * transactionIndex: Number - integer of the transactions index position log was created from.
                                    * transactionHash: String, 32 Bytes - hash of the transactions this log was created from.
                                    >>>> $$hashKey is from AngularJS
                                    */

                                    console.log('event # ', eventsCounter++, ': --------------------');
                                    console.log("event: ", result.event);
                                    console.log(result);
                                    console.log(); // empty line
                                    if (result.args && result.args !== '') {
                                        result.argsStr = JSON.stringify(result.args);
                                    }

                                    if ($scope.maxEventsNumber && $scope.allEvents.length > $scope.maxEventsNumber) {
                                        $scope.allEvents.shift();
                                    }

                                    $scope.allEvents.push(result);
                                    $scope.$apply(); // <<<
                                } else {
                                    $scope.allEventsError = error;
                                }
                            }
                        );
                    } else {
                        $scope.allEventsError = "provided string does not contain ABI";
                    }
                }

            };

            $scope.stopMonitoringEvents = function () {
                $log.debug("$scope.stopMonitoringEvents triggered");
                $scope.events.stopWatching();
                // $scope.myContractInstance = null;
                $scope.listeningToEvents = false;
                // $scope.$apply(); // <<< not needed here
            };

            $scope.applyFilter = function () {
                // if ($scope.listeningToEvents) {
                //     $scope.stopMonitoringEvents();
                // }
                // $scope.allEvents = [];
                // if ($scope.additionalFilterObjectInput.topics) {
                //     let topic = $scope.additionalFilterObjectInput.topics;
                //     $scope.additionalFilterObjectInput.topics = [];
                //     $scope.additionalFilterObjectInput.topics.push(topic);
                // }
                // $log.debug("$scope.additionalFilterObjectInput");
                // $log.debug($scope.additionalFilterObjectInput);
                $scope.monitorEvents($scope.additionalFilterObjectInput);
            };

            $scope.clearFilter = function () {
                if ($scope.listeningToEvents) {
                    $scope.stopMonitoringEvents();
                }
                $scope.additionalFilterObjectInput = {};
                $scope.additionalFilterObjectInput.fromBlock = undefined; // "latest"
                $scope.additionalFilterObjectInput.toBlock = undefined; // "latest"
                // $scope.additionalFilterObjectInput.address = undefined;
                // $scope.additionalFilterObjectInput.topics = null;
                $scope.maxEventsNumber = 100;
            };

        } // end function homeCtl
    ]);
})();
