#!/usr/bin/env bash

find ./lib -name *.d.ts -exec rm {} \;
npx -p typescript -c tsc