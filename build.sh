#!/usr/bin/env bash

cd ./log-client
npm run build
ng build --prod
# cp -R dist/ path_to_destination/