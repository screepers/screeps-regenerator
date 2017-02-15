/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

import * as t from "babel-types";
let hasOwn = Object.prototype.hasOwnProperty;

// The locals function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
exports.locals = function(funPath, localsId) {
  t.assertFunction(funPath.node);
  t.assertIdentifier(localsId);

  funPath.get("body").traverse({
    Identifier: function(path) {
      if (!t.isReferenced(path.node, path.parent)) return;
      if (path.node == localsId) return;
      if (!funPath.scope.hasOwnBinding(path.node.name)) return;
      path.replaceWith(t.memberExpression(localsId, path.node, false));
    },

    AssignmentExpression: function(path) {
      if (!funPath.scope.hasOwnBinding(path.node.left.name)) return;
      path.get('left').replaceWith(t.memberExpression(localsId, path.node.left, false));
    },
  });
};
