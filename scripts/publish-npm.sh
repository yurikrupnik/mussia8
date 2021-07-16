#! /bin/bash

set -eo pipefail


echo $TYPE
echo stam

if [[ "$BRANCH_NAME" = "dev" ]];
then
  npx lerna publish $TYPE --yes --no-push --conventional-commits
else
  npx lerna publish prepatch --pre-dist-tag=${GITHUB_REF##*/} --yes --conventional-commits --preid $BRANCH_NAME
fi

npx lerna exec -- npm install --package-lock-only --ignore-scripts --no-audit
git add -u
git diff --quiet && git diff --staged --quiet || git commit -am "package-lock.json update"
git push origin --follow-tags

