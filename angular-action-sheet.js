angular
.module('jbActionSheet', [])
.directive('jbActionSheet', jbActionSheetDirective);

function jbActionSheetDirective($document) {
  // static array to keep track of sheets that are visible
  var revealedSheets = [];

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      close: '&onClose',
      reveal: '=reveal',
      size: '='
    },
    template: '<div class="mask" ng-class="reveal ? \'mask--revealed\' : \'mask--hidden\'"></div>' +
      '<div class="sheet sheet--{{ size }}" ng-class="reveal ? \'sheet--revealed\' : \'sheet--hidden\'">' +
      '<button type="button" class="sheet__close" ng-click="sheet.close()">X</button>' +
      '<div class="sheet__restrict-y"><div class="sheet__restrict-x">' +
      '<ng-transclude></ng-transclude>' +
      '</div></div>' +
      '</div>',
    link: link,
    controller: controller,
    controllerAs: 'sheet'
  }

  function link (scope, element, attr) {
    scope.$watch('reveal', toggleBodyClipping);
  }

  function controller ($scope) {
    var vm = this;
    vm.close = $scope.close;

    return vm;
  }

  function toggleBodyClipping (reveal, old, scope) {
    var pos = revealedSheets.indexOf(scope);
    if (reveal && pos === -1) {  
      revealedSheets.push(scope);
    } else if (!reveal && pos >= 0){
      revealedSheets.splice(pos, 1);
    }

    angular.element($document[0].body).toggleClass('clipped', revealedSheets.length >= 1);
    angular.element($document[0].body).toggleClass('unclipped', revealedSheets.length == 0);
  }
}
