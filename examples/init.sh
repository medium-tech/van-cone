#!/bin/bash

# argument parser, boolean flag -link or -l, default false, plus help menu
link=false
while [ $# -gt 0 ]; do
  case "$1" in
    -l|--link) link=true ;;
    -h|--help)
      echo "Usage: $0 [-l|--link]"
      echo "run this script to install all dependencies for examples, optionally link van-cone to your npm install for develeopment"
      echo "  -l, --link    link van-cone package in each example, your npm must have a 'van-cone' link"
      echo "  -h, --help    show this help menu"
      exit 0
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
  shift
done

cd hello-world
npm install
if [ "$link" = true ] ; then
  npm link van-cone
fi

cd ../component-routing
npm install
if [ "$link" = true ] ; then
  npm link van-cone
fi

cd ../spa-app
npm install
if [ "$link" = true ] ; then
  npm link van-cone
fi

cd ..