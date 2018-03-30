(function () {

    'use strict';

    var controller_name = "app.test";

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
        function testCtrl($scope,
                          $rootScope,
                          $log,
                          $state) {

            $log.info("controller ", controller_name, "started");

        } // end function homeCtl
    ]);

    'use strict';

    var controller_name = "app.test";

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
        function testCtrl($scope,
                          $rootScope,
                          $log,
                          $state) {

            $log.info("controller ", controller_name, "started");

            $scope.bytes32toTextInput = null;
            $scope.bytes32toTextResult = null;

            $scope.textToHexInput = null;
            $scope.textToHexResult = null;

            $scope.toHex = function () {
                $log.debug("$scope.toHex input: ", $scope.textToHexInput);
                // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3tohex
                // $scope.textToHexResult = $rootScope.web3.toHex($scope.textToHexInput);
                $scope.textToHexResult = $rootScope.web3.fromUtf8($scope.textToHexInput, 32);
                // $scope.$apply(); //
                $log.debug("$scope.toHex result: ", $scope.textToHexResult);
            };

            $scope.toText = function () {
                $log.debug("$scope.toText input: ", $scope.bytes32toTextInput);
                // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3tohex
                $scope.bytes32toTextResult = $rootScope.web3.toUtf8($scope.bytes32toTextInput, 32);
                // $scope.$apply();

                $log.debug("$scope.toText result: ", $scope.textToHexResult);
            }

        } // end function homeCtl
    ]);
})();