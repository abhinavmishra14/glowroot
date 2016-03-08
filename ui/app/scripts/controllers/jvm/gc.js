/*
 * Copyright 2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global glowroot */

glowroot.controller('JvmGcCtrl', [
  '$scope',
  '$http',
  'httpErrors',
  function ($scope, $http, httpErrors) {

    $scope.$parent.heading = 'GC';

    if ($scope.hideMainContent()) {
      return;
    }

    $scope.gc = function (deferred) {
      var postData = {
        agentId: $scope.agentId
      };
      $http.post('backend/jvm/gc', postData)
          .success(function (data) {
            deferred.resolve('Success');
          })
          .error(httpErrors.handler($scope, deferred));
    };

    $http.get('backend/jvm/agent-connected?agent-id=' + encodeURIComponent($scope.agentId))
        .success(function (data) {
          $scope.loaded = true;
          $scope.agentNotConnected = !data;
          if ($scope.agentNotConnected) {
            return;
          }
        })
        .error(httpErrors.handler($scope));
  }
]);