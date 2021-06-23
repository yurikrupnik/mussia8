PROJECT_ID=mussia8
APP_REGION=europe-west

define get-secret
$(shell gcloud secrets versions access latest --secret=$(1) --project=$(PROJECT_ID))
endef

create-file:
	export GOOGLE_CLIENT_SECRET=$(gcloud secrets versions access latest --secret=GOOGLE_CLIENT_SECRET)
	echo $GOOGLE_CLIENT_SECRET > .env.dev
	echo $(GOOGLE_CLIENT_SECRET) > .env.dev
	echo "Ars=sd" > .env.dev
	echo "append this text" >> .env.dev
#	if [ -e $1 ]; then
#      echo "File $1 already exists!"
#    else
#      echo >> $1
#    fi

create-envs:
	export GOOGLE_CLIENT_SECRET=$(gcloud secrets versions access latest --secret=GOOGLE_CLIENT_SECRET)

# todo check which apis can be added this way
enable-compute-api:
	gcloud services enable compute.googleapis.com

enable-cloud-functions-api:
	gcloud services enable cloudfunctions.googleapis.com

enable-cloud-storage-api:
	gcloud services enable storage-api.googleapis.com

enable-cloud-build-api:
	gcloud services enable cloudbuild.googleapis.com

# todo check if works together scripts
enable-appengine-api:
	gcloud services enable appengine.googleapis.com \
	gcloud app create --region europe-west

enable-secretmanager-api:
	gcloud services enable secretmanager.googleapis.com

enable-gmail-api:
	gcloud services enable gmail.googleapis.com

run-local:
	docker-compose up

run-local-dev:
	#gcloud auth list
	#gcloud secrets versions access latest --secret=GOOGLE_CLIENT_SECRET
	#export GOOGLE_CLIENT_SECRET=$(gcloud secrets versions access latest --secret=GOOGLE_CLIENT_SECRET)
	#echo $(GOOGLE_CLIENT_SECRET)
	docker-compose -f docker-compose.dev.yaml up
build-all-images:
	#gcloud auth list
	#gcloud secrets versions access latest --secret=GOOGLE_CLIENT_SECRET
	#export GOOGLE_CLIENT_SECRET=$(gcloud secrets versions access latest --secret=GOOGLE_CLIENT_SECRET)
	#echo $(GOOGLE_CLIENT_SECRET)
	make create-file
	docker-compose build webserver1

create-tf-backed-bucket:
	gsutil mb -p $(PROJECT_ID) -l europe-west1 gs://$(PROJECT_ID)-terraform



push:
	docker tag $(LOCAL_TAG) $(REMOTE_TAG)
	docker push $(REMOTE_TAG)



deploy-languages:
	gcloud run deploy languages \
      --image gcr.io/$(PROJECT_ID)/languages \
      --platform managed \
      --region europe-west1 \
      --project $(PROJECT_ID)

deploy-cloud-run:
	echo pusssss

# Local tests
full-build:
	npm run lint && npm run test && npm run build
create-swagger-1:
	npx openapi-typescript "openapi2-run.yaml" --output schemas.ts
create-swagger-2:
	npx swagger-typescript-api -p openapi2-run.yaml
