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
      reveal: '=reveal'
    },
    template: '<div class="jbas-mask" ng-click="sheet.close()" ng-class="reveal ? \'jbas-mask--revealed\' : \'jbas-mask--hidden\'"></div>' +
      '<div class="jbas-sheet" ng-class="reveal ? \'jbas-sheet--revealed\' : \'jbas-sheet--hidden\'">' +
      '<button type="button" class="jbas-sheet__close" ng-click="sheet.close()">X</button>' +
      '<div class="jbas-sheet__restrict-y"><div class="jbas-sheet__restrict-x">' +
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
    $document.bind('keydown', function(e) {
      if (e.charCode === 27 || e.keyCode === 27) {
        $scope.close();
      }
    });

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

    angular.element($document[0].body).toggleClass('jbas-clipped', revealedSheets.length >= 1);
    angular.element($document[0].body).toggleClass('jbas-unclipped', revealedSheets.length == 0);
  }
}
