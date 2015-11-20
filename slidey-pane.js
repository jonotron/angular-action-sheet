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
    template: '<div class="jbsp-mask" ng-class="reveal ? \'jbsp-mask--revealed\' : \'jbsp-mask--hidden\'"></div>' +
      '<div class="jbsp-pane" ng-class="reveal ? \'jbsp-pane--revealed\' : \'jbsp-pane--hidden\'">' +
      '<button type="button" class="jbsp-pane__close" ng-click="pane.close()">X</button>' +
      '<div class="jbsp-pane__restrict-y"><div class="jbsp-pane__restrict-x">' +
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

    angular.element($document[0].body).toggleClass('jbsp-clipped', revealedPanes.length >= 1);
    angular.element($document[0].body).toggleClass('jbsp-unclipped', revealedPanes.length == 0);
  }
}
