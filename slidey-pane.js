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
    scope.$on('$destroy', listenDestroy);
  }

  function controller ($scope) {
    var vm = this;
    vm.close = $scope.close;

    return vm;
  }

  function listenDestroy (opts) {
    var pos = revealedPanes.indexOf(opts.currentScope.$id);
    if (pos >= 0) {
      revealedPanes.splice(pos, 1); 
    }

    updateClip();
  }

  function toggleBodyClipping (reveal, old, scope) {
    var id = scope.$id;
    var pos = revealedPanes.indexOf(id);
    if (reveal && pos === -1) {  
      // we want to reveal a brand new pane (not already revealed)
      revealedPanes.push(id);
    } else if (!reveal && pos >= 0){
      // we want to hide a pane that is already revealed
      revealedPanes.splice(pos, 1);
    }

    updateClip();
  }

  function updateClip () {
    angular.element($document[0].body).toggleClass('jbsp-clipped', revealedPanes.length >= 1);
    angular.element($document[0].body).toggleClass('jbsp-unclipped', revealedPanes.length == 0);
  }
}
