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
            $scope.allEvents = [];
            // $scope.allEvents.push({}); // <<< test

            $scope.monitorEvents = function () {
                $log.debug("$scope.monitorEvents triggered");
                $scope.contractSource = null;
                // 'http://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359'
                var url =
                    $rootScope.currentNetwork.etherscanApiLink + "api?module=contract&action=getabi&address=" + $scope.contractAddress;

                $.getJSON(url, function (data) {
                    $log.debug("$.getJSON(url, function (data)");
                    $log.debug(data);
                    $log.debug();
                    var contractABI = "";
                    contractABI = JSON.parse(data.result);
                    $log.debug("contractABI:");
                    $log.debug(contractABI);
                    $log.debug();
                    if (contractABI != '') {
                        var MyContract = $rootScope.web3.eth.contract(contractABI);
                        $scope.myContractInstance = MyContract.at($scope.contractAddress);
                        // $log.debug($scope.myContractInstance);

                        // <<<< events:
                        console.log("---------------------------");
                        console.log("listening to events");
                        $scope.listeningToEvents = true;
                        $scope.$apply(); // <<< needed
                        var eventsCounter = 0;
                        $scope.events = $scope.myContractInstance.allEvents(function (error, result) {
                                if (!error) {
                                    console.log('event # ', eventsCounter++, ': --------------------');
                                    console.log("event: ", result.event);
                                    console.log(result);
                                    console.log(); // empty line

                                    // for (var property in result.args) {
                                    //     if (result.args.hasOwnProperty(property)) {
                                    //         console.log("typeof", property, " is ", typeof result.args[property]);
                                    //         if (typeof result.args[property] === "BigNumber" || typeof result.args[property] === "BigDecimal") {
                                    //             result.args[property] = result.args[property].toNumber();
                                    //         }
                                    //     }
                                    // }

                                    if ($scope.allEvents.length > 100) {
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
            };

            // $scope.stopMonitoringEvents = function () {
            //     $log.debug("$scope.stopMonitoringEvents triggered");
            //     $scope.reloadRoute = function () {
            //         $state.reload();
            //     };
            // };
            $scope.stopMonitoringEvents = function () {
                $log.debug("$scope.stopMonitoringEvents triggered");
                $scope.events.stopWatching();
                // $scope.myContractInstance = null;
                $scope.listeningToEvents = false;
                // $scope.$apply(); // <<< not needed here
            };

        } // end function homeCtl
    ]);
})();