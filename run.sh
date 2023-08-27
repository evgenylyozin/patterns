#! /bin/bash

case $1 in
  "init-project")
    chmod +x pre-commit && cp pre-commit .git/hooks/ && cd typescript && npm i
  ;;
  "copy-docs")
    cd ./docs/copy-docs/ && ./copy
  ;;
  "commit-docs")
    git add -A && git commit -m 'Docs update' && git push
  ;;
  *)
    echo "Unknown command $1"
  ;;
esac