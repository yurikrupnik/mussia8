#! /bin/bash

set -e

gc_image=gcr.io/mussia8/$npm_package_name

docker build -t $gc_image . \
  --force-rm \
  --build-arg modulePath=$npm_package_config_modulePath

echo 'Finished building'
#docker tag $name \
#  $gc_images
#
docker push $gc_image

gcloud run deploy $npm_package_name \
  --image $gc_image \
  --platform managed \
  --allow-unauthenticated \
  --region europe-central2 \
  --port $npm_package_config_port
