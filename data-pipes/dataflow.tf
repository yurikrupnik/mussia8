//
//

//
//resource "google_service_account" "storage" {
//  account_id   = "scv-my-app-storage"
//  display_name = "My app storage SA"
//}
//
////resource "google_project_iam_member" "storage" {
////  project = var.project
////  role = "roles/storage/admin"
////  member = "serviceAccount:${google_service_account.storage.email}"
////}
//
////resource "google_compute_network" "vpc_network" {
////  name = "terraform-network"
////}
//
//// GCP Data Fusion
////resource "google_data_fusion_instance" "basic_instance" {
////  provider = google-beta
////  name = "my-instance"
////  project = var.project
////  region = var.location
////  type = "BASIC"
////}
//
resource "google_dataflow_job" "pubsub_stream" {
  name              = "ps-to-text-be-logs"
  template_gcs_path = "gs://dataflow-templates/latest/Cloud_PubSub_to_GCS_Text"
  temp_gcs_location = "${google_storage_bucket.be_logs_bucket.url}/temp"
  parameters = {
    inputTopic           = google_pubsub_topic.be_logs.id
    outputDirectory      = "${google_storage_bucket.be_logs_bucket.url}/text"
    outputFilenamePrefix = "ps-to-text-be-logs"
  }
  //  transform_name_mapping = {
  //    name = "test_job"
  //    env = "test"
  //  }
  on_delete = "cancel"
}
////


resource "google_dataflow_job" "pubsub_stream2" {
  name              = "ps-to-avro-be-logs"
  template_gcs_path = "gs://dataflow-templates/latest/Cloud_PubSub_to_Avro"
  temp_gcs_location = "${google_storage_bucket.be_logs_bucket.url}/temp"
  parameters = {
    inputTopic        = google_pubsub_topic.be_logs.id
    outputDirectory   = "${google_storage_bucket.be_logs_bucket.url}/avro"
    avroTempDirectory = "${google_storage_bucket.be_logs_bucket.url}/temp"
  }
  //  transform_name_mapping = {
  //    name = "test_job"
  //    env = "test"
  //  }
  on_delete = "cancel"
}

//output "asdasd" {
//  value = google_bigquery_table.be_logs_table
//}

output "pubsub_topic" {
  value = google_pubsub_topic.be_logs.id
}

resource "google_dataflow_job" "bigquery-stream" {
  name              = "ps-to-bq-be-logs"
  template_gcs_path = "gs://dataflow-templates-europe-north1/latest/PubSub_to_BigQuery"
  temp_gcs_location = "${google_storage_bucket.be_logs_bucket.url}/temp"
  parameters = {
//    inputTopic = google_pubsub_topic.be_logs.name
    inputTopic="projects/mussia8/topics/be_logs"
//    outputTableSpec=google_bigquery_dataset.dataset.id
    outputTableSpec="mussia8:example_dataset.bar"
//    inputTopic        = google_pubsub_topic.be_logs.id
//    outputDirectory   = "${google_storage_bucket.be_logs_bucket.url}/avro"
//    avroTempDirectory = "${google_storage_bucket.be_logs_bucket.url}/temp"
  }
  //  transform_name_mapping = {
  //    name = "test_job"
  //    env = "test"
  //  }
  on_delete = "cancel"
}


//gcloud beta dataflow flex-template run
//--template-file-gcs-location gs://dataflow-templates-us-central1/latest/flex/Cloud_PubSub_to_MongoDB --region us-central1
//--parameters
//inputSubscription=projects/mussia8/subscriptions/be_logs.subscription-13990484350705138604
//mongoDBUri=mongodb+srv://yurikrupnik:T4eXKj1RBI4VnszC@cluster0.rdmew.mongodb.net/
//database=test
//collection=be-events
//deadletterTable=mussia8:example_dataset.errors
// 34.77.48.52:27017,104.155.115.194:27017,35.187.160.255:27017

//// Dataflow end
//resource "google_dataflow_job" "pubsub_stream" {
//  name = "tf-test-dataflow-job1"
//  template_gcs_path = "gs://my-bucket/templates/template_file"
//  temp_gcs_location = "gs://my-bucket/tmp_dir"
//  enable_streaming_engine = true
//  parameters = {
//    inputFilePattern = "${google_storage_bucket.bucket1.url}/*.json"
//    outputTopic    = google_pubsub_topic.topic.id
//  }
//  transform_name_mapping = {
//    name = "test_job"
//    env = "test"
//  }
//  on_delete = "cancel"
//}
//
//// functions start
//resource "null_resource" "build" {
//  triggers = {
//    always_run = "${timestamp()}"
//  }
//  provisioner "local-exec" {
//    command = <<-EOF
//      node -v
//      cd ..
//      npm i
//      npm run build -- --scope=pubsub-be-logs --scope=storage-func
//    EOF
//
//    //    environment = var.environment_variables
//  }
//}



//resource "null_resource" "lambda_dependencies" {
//  provisioner "local-exec" {
//    command = <<-EOF
//          node -v
//          cd ..
//          npx lerna exec --parallel --scope=service1 --scope=storage-func -- npm i
//          npm run build -- --scope=pubsub-be-logs --scope=storage-func
//        EOF
//  }
//
//  triggers = {
//    //    index = sha256(file("${path.module}/index.js"))
//    package = sha256(file("pubsub-be-logs/package.json"))
//    lock    = sha256(file("pubsub-be-logs/package-lock.json"))
//    node    = sha256(join("", fileset(path.module, "pubsub-be-logs/**/*.ts")))
//  }
//}
//
//data "null_data_source" "wait_for_lambda_exporter" {
//  inputs = {
//    lambda_dependency_id = "${null_resource.lambda_dependencies.id}"
//    source_dir           = "${path.module}/storage-func/dist"
//  }
//}
//
//data "archive_file" "lambda" {
//  output_path = "${path.module}/storage-func/function.zip"
//  source_dir  = "${data.null_data_source.wait_for_lambda_exporter.outputs["source_dir"]}"
//  type        = "zip"
//}
//
//data "archive_file" "source_zip" {
//  depends_on  = [null_resource.lambda_dependencies]
//  type        = "zip"
//  source_dir  = "storage-func/dist"
//  output_path = "storage-func/dist/source.zip"
//}
//
//resource "google_storage_bucket" "bucket" {
//  //  depends_on  = [null_resource.build]
//  name = "${var.project}-terraform"
//}
////
//resource "google_storage_bucket_object" "archive" {
//  name   = "source.zip"
//  bucket = google_storage_bucket.bucket.name
//  source = data.archive_file.lambda.output_path
//}
////
////resource "google_storage_bucket_object" "archive1" {
////  name   = "index.zip"
////  bucket = google_storage_bucket.bucket.name
////  source = "./storage-func/index.zip"
////}
//resource "google_cloudfunctions_function" "func3" {
//  name        = "func3"
//  description = "My http function"
//  runtime     = "nodejs14"
//
//  depends_on  = [google_storage_bucket_object.archive, google_storage_bucket.bucket]
//
//  available_memory_mb = 128
//  source_archive_bucket = data.archive_file.lambda.output_base64sha256
////  source_archive_bucket = google_storage_bucket.bucket.name
////  source_archive_object = google_storage_bucket_object.archive.name
//  source_archive_object = data.archive_file.lambda.output_path
//  trigger_http = true
//
//  timeout     = 60
//  entry_point = "http"
//  labels = {
//    my-label = "my-label-value"
//  }
//
//  environment_variables = {
//    MY_ENV_VAR = "my-env-var-value"
//  }
//}
//resource "google_cloudfunctions_function" "func2" {
//  name        = "func2"
//  description = "My http function"
//  runtime     = "nodejs14"
//
//  depends_on = [google_storage_bucket_object.archive, google_storage_bucket.bucket]
//
//  available_memory_mb   = 128
//  source_archive_bucket = google_storage_bucket.bucket.name
//  source_archive_object = google_storage_bucket_object.archive.name
//  trigger_http          = true
//
//  timeout     = 60
//  entry_point = "http"
//  labels = {
//    my-label = "my-label-value"
//  }
//
//  environment_variables = {
//    MY_ENV_VAR = "my-env-var-value"
//  }
//}

//resource "google_cloudfunctions_function" "storage-func" {
//  name        = "storage-func"
//  description = "My storage function"
//  runtime     = "nodejs14"
//
//  available_memory_mb   = 128
//  source_archive_bucket = google_storage_bucket.bucket.name
//  source_archive_object = google_storage_bucket_object.archive.name
////  trigger_http          = true
//  event_trigger {
//    event_type = "google.storage.object.finalize"
//    resource = google_storage_bucket.be_logs_bucket.name
////    failure_policy {
////      retry = true
////    }
//  }
//  timeout               = 60
//  entry_point           = "storageFunc"
//  labels = {
//    my-label = "my-label-value1"
//  }
//
//  environment_variables = {
//    MY_ENV_VAR = "my-env-var-value"
//  }
//}
//resource "google_cloudfunctions_function" "topic-func" {
//  name        = "topic-func"
//  description = "My topic function"
//  runtime     = "nodejs14"
//
//  available_memory_mb   = 128
//  source_archive_bucket = google_storage_bucket.bucket.name
//  source_archive_object = google_storage_bucket_object.archive.name
//  event_trigger {
//    event_type = "google.pubsub.topic.publish"
//    resource = google_pubsub_topic.be_logs.id
//  }
//  timeout               = 60
//  entry_point           = "storagePubSub"
//  labels = {
//    my-label = "my-label-d"
//  }
//
//  environment_variables = {
//    MY_ENV_VAR = "my-env-var-ffd"
//  }
//}
