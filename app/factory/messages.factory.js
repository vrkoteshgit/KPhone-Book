(function() {
    'use strict';

    /**
     * @ngdoc Factory for the messages model object
     *
     * @description The messages model object to encapsulate loading, information, warning,
     * and error messages
     */
    angular.module('messages.factory', []).factory('Messages', function(
        $filter, $uibModal, $log, $timeout) {

        function Messages() {
            /* Data fields */
            this.loading = null;
            this.error = null;
            this.success = null;
            this.isDownload = null;

            // Scroll settings
            this.scroll = false;

            // Fadeout settings
            this.fadeoutInfo = {};

            /* Chainable set methods */
            this.showLoading = function(msg) {
                var loadingMsg = $filter('translate')('loading');
                loadingMsg += '...';
                this.loading = isPrintable(msg) ? msg : loadingMsg;
                return this;
            };

            this.showError = function(msg, scroll) {
                this.error = isPrintable(msg) ? msg : 'An error has occurred.';
                this.scroll = angular.isUndefined(scroll) ? true : scroll;
                return this;
            };

            this.showSucess = function(msg, scroll) {
                this.success = isPrintable(msg) ? msg : 'Operation successful!';
                this.scroll = angular.isUndefined(scroll) ? true : scroll;

                var that = this;
                this.fadeout(function() {
                    that.success = null;
                });

                return this;
            };

            this.showWarning = function(msg, scroll) {
                this.warning = isPrintable(msg) ? msg : 'Warning';
                this.scroll = angular.isUndefined(scroll) ? true : scroll;
                return this;
            };

            this.clear = function() {
                this.loading = null;
                this.error = null;
                this.success = null;
                this.warning = null;
                return this;
            };

            // Shows an alert modal, expects the following arguments
            // alert(message, callbackFn) or alert(options) - @see showModal function for options
            this.alert = function alert() {
                showModal(parseModalArgs(arguments), false);
            };

            // Shows an confirm modal, expects the following arguments
            // confirm(message, callbackFn) or confirm(options) - @see showModal function for options
            this.confirm = function confirm() {
                showModal(parseModalArgs(arguments), true);
            };

            // Fadeout
            this.fadeout = function fadeout(callback) {
                var FADE_TIMEOUT_MS = 8000;

                // If there is an existing timer, cancel it
                $timeout.cancel(this.fadeoutInfo.timer);

                // Start a new timer for the new message
                this.fadeoutInfo.timer = $timeout(callback, FADE_TIMEOUT_MS);
            };
        }

        return Messages;

        // Returns true if the input message is printable
        function isPrintable(msg) {
            return angular.isDefined(msg) &&
                   (angular.isString(msg) ||
                    angular.isNumber(msg) ||
                    angular.isDate(msg));
        }

        // Opens up a Modal window for alerts and confirmations
        // severity "info" (default), "success", "warning", "error"
        function showModal(options, confirm) {
            options.confirm = confirm;
            options.severity = options.severity ? options.severity : "info";
            options.title = options.title || getDefaultTitle(confirm, options.severity);
            options.message = options.message || ' ';
            options.okLabel = options.okLabel || (confirm ? 'Yes' : 'OK');
            options.cancelLabel = options.cancelLabel || 'No';
            options.callbackFn = options.callbackFn || angular.noop;
            options.size = options.size || 'md';

            // TODO: Throw error if message and callback are not set!

            $uibModal.open({
                animation: true,
                templateUrl: 'templates/confirm.modal.template.html',
                controller: /*@ngInject*/ function($scope, options, $uibModalInstance) {
                    var vm = this;
                    vm.options = options;
                    vm.ok = function() {
                        vm.options.callbackFn(true);
                        $uibModalInstance.close();
                    };
                    vm.cancel = function() {
                        vm.options.callbackFn(false);
                        $uibModalInstance.close();
                    };
                    vm.close = function() {
                        try {
                            if (vm.options.confirm) {
                                vm.cancel();
                            } else {
                                vm.ok();
                            }
                        } catch (e) {
                            $log.log('Error closing via ok or cancel', e);
                            $uibModalInstance.close();
                        }
                    };
                },
                controllerAs: 'vm',
                backdrop: 'static',
                size: options.size,
                windowClass: "alert-confirm-window " + options.severity,
                windowTopClass: "alert-confirm-windowtop",
                backdropClass: "alert-confirm-backdrop",
                resolve: {
                    options: function() {
                        return options;
                    }
                }
            });

            function getDefaultTitle(confirm, severity) {
                if (confirm) {
                    return "confirmation";
                } else { // Alert
                    switch (severity) {
                        case "info":
                            return 'information';
                        case "success":
                            return 'success';
                        case "warning":
                            return 'warning';
                        case "error":
                            return 'error';
                        default:
                            return 'alert';
                    }
                }
            }
        }

        function parseModalArgs(args) {
            var options = {};
            switch (args.length) {
                case 1:
                    options = angular.isObject(args[0]) ?
                              args[0] : {message: args[0]};
                    break;
                case 2:
                    options = {message: args[0],
                               callbackFn: args[1]};
                    break;
                default:
                    throw "Unknown number of arguments, should be either " +
                          "[1 - options] or " +
                          "[2 - message, callback]";
            }
            return options;
        }
    });
})();
