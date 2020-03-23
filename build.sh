#!/usr/bin/env bash

cd ./log-client
npm install
ng build --prod
# cp -R dist/ path_to_destination/