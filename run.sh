#! /bin/bash

case $1 in
  "init-project")
    chmod +x pre-commit && chmod +x pre-push && cp -t .git/hooks/ pre-commit pre-push && cd typescript && npm i
  ;;
  "copy-docs")
    cd ./docs/copy-docs/ && ./copy
  ;;
  "commit-docs")
    git add -A && git commit -m 'Docs update'
  ;;
  *)
    echo "Unknown command $1"
  ;;
esac