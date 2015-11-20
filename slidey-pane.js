angular
.module('jbSlideyPane', [])
.directive('jbSlideyPane', jbSlideyPaneDirective);

function jbSlideyPaneDirective($document) {
  // static array to keep track of panes that are visible
  var revealedPanes = [];

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      close: '&onClose',
      reveal: '=reveal'
    },
    template: '<div class="jbas-mask" ng-class="reveal ? \'jbas-mask--revealed\' : \'jbas-mask--hidden\'"></div>' +
      '<div class="jbas-sheet" ng-class="reveal ? \'jbas-sheet--revealed\' : \'jbas-sheet--hidden\'">' +
      '<button type="button" class="jbas-sheet__close" ng-click="pane.close()">X</button>' +
      '<div class="jbas-sheet__restrict-y"><div class="jbas-sheet__restrict-x">' +
      '<ng-transclude></ng-transclude>' +
      '</div></div>' +
      '</div>',
    link: link,
    controller: controller,
    controllerAs: 'pane'
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
    var pos = revealedPanes.indexOf(scope);
    if (reveal && pos === -1) {  
      revealedPanes.push(scope);
    } else if (!reveal && pos >= 0){
      revealedPanes.splice(pos, 1);
    }

    angular.element($document[0].body).toggleClass('jbas-clipped', revealedPanes.length >= 1);
    angular.element($document[0].body).toggleClass('jbas-unclipped', revealedPanes.length == 0);
  }
}
