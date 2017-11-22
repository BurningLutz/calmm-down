#!/usr/bin/env fish

set -x NODE_ENV build

# remove old dist
rm -rf dist

# ensure complete dependencies
yarn

# build with webpack.config.js, this is the default behavior of webpack
webpack
