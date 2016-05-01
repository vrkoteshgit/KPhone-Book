'use strict';

/**
 * @ngdoc function
 * @name ktoolsApp.controller:AboutCtrl
 * @description
 * # PhonebookCtrl
 * Controller of the kphoneBookApp
 */
angular.module('kphoneBookApp')
  .controller('PhonebookCtrl', function ($scope, $uibModal, Messages, $rootScope) {
  	$scope.messages = new Messages();
  	$rootScope.alerts = [];
  	$rootScope.uContact = {};
    $rootScope.contacts =
		[
			{firstName:'dave', lastName:'jameson', number:'0546655837'},
			{firstName:'larisa', lastName:'dorfman', number:'050923423'},
			{firstName:'john', lastName:'oxford', number:'0529346353'},
			/*{firstName:'dsdave', lastName:'jameson', number:'0543655837'},
			{firstName:'flarisa', lastName:'dorfman', number:'050923423'},
			{firstName:'sdjohn', lastName:'oxford', number:'0529346353'},
			{firstName:'dave', lastName:'jameson', number:'0546655837'},
			{firstName:'fdlarisa', lastName:'dorfman', number:'050323423'},
			{firstName:'sdjohn', lastName:'oxford', number:'0529346353'},
			{firstName:'daweve', lastName:'jameson', number:'0246655837'},
			{firstName:'larewisa', lastName:'dorfman', number:'010923423'},*/
			{firstName:'joqqhn', lastName:'oxford', number:'0522346353'}
		];
	$scope.isUpdate = false;
	$scope.isView = false;
	$scope.selectedContact = {};
	$scope.addBtnLabel = 'Add';
	$scope.$on('record::add', function(event, eventData) {
		$rootScope.contacts.push({firstName:$scope.firstName,
		lastName:$scope.lastName, number:$scope.number});
		frmPhoneBook.txtFirstName.value = '';
		frmPhoneBook.txtLastName.value = '';
		frmPhoneBook.txtNumber.value = '';
	});
	$scope.addContact = function() {
		if(frmPhoneBook.txtFirstName.value && frmPhoneBook.txtLastName.value && frmPhoneBook.txtNumber.value) {
	        $scope.contacts.push({firstName:frmPhoneBook.txtFirstName.value,
			lastName:frmPhoneBook.txtLastName.value, number:frmPhoneBook.txtNumber.value});
			frmPhoneBook.txtFirstName.value = '';
			frmPhoneBook.txtLastName.value = '';
			frmPhoneBook.txtNumber.value = '';
		}
	};
	$scope.modalOpen = function(updateMode, selContact) {
		$rootScope.selectedContact = {};
		$rootScope.alerts = [];
		if (updateMode === 'Update') {
			$scope.isUpdate = true;
			$scope.isView = false;
			$rootScope.contactToUpdate = angular.copy(selContact);
			$rootScope.uContact.firstName = selContact.firstName;
			$rootScope.uContact.lastName = selContact.lastName;
			$rootScope.uContact.number = selContact.number;
		}else if (updateMode === 'View') {
			$scope.isUpdate = false;
			$scope.isView = true;
			$rootScope.selectedContact.firstName= selContact.firstName;
			$rootScope.selectedContact.lastName = selContact.lastName;
			$rootScope.selectedContact.number = selContact.number;
		}else {
			$rootScope.uContact = {};
		}
		$scope.modalInstance = $uibModal.open({
			templateUrl: 'updatePhonebook.html',
			controller: /*@ngInject*/ function($scope, $uibModalInstance, $rootScope) {
				$scope.addBtnLabel = updateMode;
				if (updateMode === 'View') {
					$scope.isUpdate = false;
					$scope.isView = true;
				}else{
					$scope.isUpdate = true;
					$scope.isView = false;
				}
				$scope.modalYes = function($scope) {
					if (updateMode === 'Add') {
						$rootScope.contacts.push({firstName:$rootScope.uContact.firstName,
						lastName:$rootScope.uContact.lastName, number:$rootScope.uContact.number});
						$rootScope.alerts = [];
						$rootScope.alerts.push({ type: 'success', msg: 'New contact [' + $rootScope.uContact.firstName + '] created successfully' });
						$rootScope.uContact = {};
					} else if (updateMode === 'Update') {
						angular.forEach($rootScope.contacts, function(eachContact) {
							if (eachContact.firstName === $rootScope.contactToUpdate.firstName) {
								eachContact.firstName = $rootScope.uContact.firstName;
								eachContact.lastName = $rootScope.uContact.lastName;
								eachContact.number = $rootScope.uContact.number;
								$rootScope.alerts = [];
								$rootScope.alerts.push({ type: 'success', msg: 'Contact [' + $rootScope.uContact.firstName + '] updated successfully' });
								$rootScope.uContact = {};
							}
						});
					}
					$uibModalInstance.close('Yes');
				};
				$scope.modalNo = function() {
					$uibModalInstance.close('No');
				};
				$scope.modalCancel = function() {
					$uibModalInstance.dismiss('Cancel');
				};
			},
			size: '300',
			backdrop: 'static',
			animation: true,
			resolve: {}
		});
	};
	$scope.deleteContact = function(selContact) {
		$scope.messages.confirm('Are you sure to delete the contact [' + selContact.firstName + ']', function(confirm) {
			if (confirm) {
				$rootScope.contacts.splice($rootScope.contacts.indexOf(selContact), 1);	
				$rootScope.alerts = [];
				$rootScope.alerts.push({ type: 'success', msg: 'Contact [' + $rootScope.uContact.firstName + '] updated successfully' });
			}	
		});
	};
	
	$rootScope.closeAlert = function(index) {
	    $rootScope.alerts.splice(index, 1);
	};
  });
