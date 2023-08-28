#! /bin/bash

case $1 in
  "init-project")
    chmod +x pre-commit && cp -t .git/hooks/ pre-commit && cd typescript && npm i
  ;;
  "copy-docs")
    cd ./docs/copy-docs/ && ./copy
  ;;
  *)
    echo "Unknown command $1"
  ;;
esac