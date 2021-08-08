

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.78.0"
    }
    null = {
      source  = "hashicorp/null"
      version = ">=2.1.2"
    }
  }
  //  random = {
  //    source  = "hashicorp/random"
  //    version = ">=2.2.1"
  //  }
  //  backend "gcs" {
  //    credentials = "terraform-sa-key.json"
  //    bucket = "mussia8-terraform"
  //  }
}

provider "google" {
  //  credentials = file("<NAME>.json")

  project = var.project
  region  = var.location
  zone    = var.zone
}

resource "google_service_account" "storage" {
  account_id   = "scv-my-app-storage"
  display_name = "My app storage SA"
}

//resource "google_project_iam_member" "storage" {
//  project = var.project
//  role = "roles/storage/admin"
//  member = "serviceAccount:${google_service_account.storage.email}"
//}

//resource "google_compute_network" "vpc_network" {
//  name = "terraform-network"
//}

// GCP Data Fusion
//resource "google_data_fusion_instance" "basic_instance" {
//  provider = google-beta
//  name = "my-instance"
//  project = var.project
//  region = var.location
//  type = "BASIC"
//}

//resource "google_dataflow_job" "pubsub_stream" {
//  name              = "ps-to-text-be-logs"
//  template_gcs_path = "gs://dataflow-templates/latest/Cloud_PubSub_to_GCS_Text"
//  temp_gcs_location = "${google_storage_bucket.be_logs_bucket.url}/temp"
//  parameters = {
//    inputTopic           = google_pubsub_topic.be_logs.id
//    outputDirectory      = "${google_storage_bucket.be_logs_bucket.url}/text"
//    outputFilenamePrefix = "ps-to-text-be-logs"
//  }
//  //  transform_name_mapping = {
//  //    name = "test_job"
//  //    env = "test"
//  //  }
//  on_delete = "cancel"
//}
//
//resource "google_dataflow_job" "pubsub_stream2" {
//  name              = "ps-to-avro-be-logs"
//  template_gcs_path = "gs://dataflow-templates/latest/Cloud_PubSub_to_Avro"
//  //  template_gcs_path = "./Cloud_PubSub_to_Avro"
//  //  temp_gcs_location = "gs://mussia8-be-logs-raw-data"
////    temp_gcs_location = "gs://${var.project}-${var.be_logs_bucket}/temp"
//  temp_gcs_location = "${google_storage_bucket.be_logs_bucket.url}/temp"
//  //  enable_streaming_engine = true
//  //  machine_type = "N1_standard-1" // fails
//  parameters = {
//    inputTopic        = google_pubsub_topic.be_logs.id
//    outputDirectory   = "${google_storage_bucket.be_logs_bucket.url}/avro"
//    avroTempDirectory = "${google_storage_bucket.be_logs_bucket.url}/temp"
//  }
//  //  transform_name_mapping = {
//  //    name = "test_job"
//  //    env = "test"
//  //  }
//  on_delete = "cancel"
//}
// Dataflow end
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

// functions start
resource "null_resource" "build" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = <<-EOF
      node -v \
      cd .. \
      npm i \
      npm run build -- --scope=pubsub-be-logs --scope=storage-func
    EOF

    //    environment = var.environment_variables
  }
}

data "archive_file" "source_zip" {
  depends_on  = [null_resource.build]
  type        = "zip"
  source_dir  = "storage-func/dist"
  output_path = "storage-func/dist/source.zip"
}

resource "google_storage_bucket" "bucket" {
  name = "${var.project}-test-bucket"
}

resource "google_storage_bucket_object" "archive" {
  name   = "source.zip"
  bucket = google_storage_bucket.bucket.name
  source = "./pubsub-be-logs/index.zip"
}

resource "google_storage_bucket_object" "archive1" {
  name   = "index.zip"
  bucket = google_storage_bucket.bucket.name
  source = "./storage-func/index.zip"
}

//resource "google_cloudfunctions_function" "func2" {
//  name        = "func2"
//  description = "My http function"
//  runtime     = "nodejs14"
//
//  depends_on  = [google_storage_bucket_object.archive, google_storage_bucket.bucket]
//
//  available_memory_mb = 128
//  source_archive_bucket = google_storage_bucket.bucket.name
//  source_archive_object = google_storage_bucket_object.archive1.name
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
// functions end
