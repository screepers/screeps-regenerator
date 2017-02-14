#!/usr/bin/env bash

set -e
set -u

pushd packages/screeps-regenerator-preset
npm install
# Make sure that screeps-regenerator-preset uses the latest version of
# screeps-regenerator-{runtime,transform} when running CI tests. Note that this
# also runs `npm install` for those packages.
npm link ../screeps-regenerator-runtime ../screeps-regenerator-transform
popd

# Make sure that Regenerator uses the latest versions of its helper
# packages when running CI tests. Note that `npm link` also installs any
# other npm dependencies for these two helper packages.
npm link packages/screeps-regenerator-preset packages/screeps-regenerator-runtime

# Now install any other npm dependencies that might be needed.
npm install
