#!/bin/bash
cd hello-world
npm run test
if [ $? -ne 0 ]; then
  exit 1
fi

cd ../component-routing
npm run test
if [ $? -ne 0 ]; then
  exit 1
fi

cd ../spa-app
npm run test
if [ $? -ne 0 ]; then
  exit 1
fi

cd ..