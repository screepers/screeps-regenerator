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

// The locals function takes a FunctionExpression or FunctionDeclaration and
// replaces any references to the named variables in its body with property
// references.
exports.locals = function(funPath, localsId, contextId, variables) {
  t.assertFunction(funPath.node);
  t.assertIdentifier(localsId);
  t.assertIdentifier(contextId);

  var protectedSelfReference = t.isFunctionExpression(funPath.node) && funPath.node.id;

  funPath.get("body").traverse({
    Identifier: function(path) {
      if (!t.isReferenced(path.node, path.parent)) return;
      if (path.node == localsId) return;
      if (variables.indexOf(path.node.name) == -1) return;
      if (path.node.name == contextId.name) return;
      if (protectedSelfReference && funPath.node.id.name == path.node.name) {
        path.replaceWith(t.memberExpression(contextId, t.identifier("genFun"), false));
      } else {
        path.replaceWith(t.memberExpression(localsId, path.node, false));
      }
    },

    AssignmentExpression: function(path) {
      if (variables.indexOf(path.node.left.name) == -1) return;
      if (path.node.left.name == contextId.name) return;
      if (protectedSelfReference && funPath.node.id.name == path.node.left.name) {
        path.replaceWith(t.memberExpression(contextId, t.identifier("genFun"), false));
      } else {
        path.get('left').replaceWith(t.memberExpression(localsId, path.node.left, false));
      }
    },
  });
};
