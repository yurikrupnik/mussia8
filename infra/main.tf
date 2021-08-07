

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.78.0"
    }
  }
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

// Storage start

// Storage end

// PubSub start

// PubSub end

// Dataflow start
//resource "google_dataflow_job" "wordcount" {
//  name              = "wordcount"
//  template_gcs_path = "gs://dataflow-templates/latest/Word_Count"
//  temp_gcs_location = "gs://${var.project}-${var.be-logs-bucket}/temp"
//  parameters = {
//    inputFile = "gs://dataflow-samples/shakespeare/kinglear.txt"
//    output = "gs://${var.location}/wordcount/output"
////    output = google_storage_bucket.be_logs_bucket.id
//  }
//}

// gs://mussia8/mussia8-be-logs-raw-data/be-logs-avro
// gcloud dataflow jobs run ps-to-avro-be-logs --gcs-location gs://dataflow-templates-us-central1/latest/Cloud_PubSub_to_Avro --region us-central1 --staging-location gs://mussia8/mussia8-be-logs-raw-data/temp --parameters inputTopic=projects/mussia8/topics/be-logs,outputDirectory=gs://mussia8/mussia8-be-logs-raw-data/be-logs-avro,avroTempDirectory=gs://mussia8/mussia8-be-logs-raw-data/temp
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

resource "google_dataflow_job" "pubsub_stream2" {
  name              = "ps-to-avro-be-logs"
  template_gcs_path = "gs://dataflow-templates/latest/Cloud_PubSub_to_Avro"
  //  template_gcs_path = "./Cloud_PubSub_to_Avro"
  //  temp_gcs_location = "gs://mussia8-be-logs-raw-data"
//    temp_gcs_location = "gs://${var.project}-${var.be_logs_bucket}/temp"
  temp_gcs_location = "${google_storage_bucket.be_logs_bucket.url}/temp"
  //  temp_gcs_location = "${google_storage_bucket.be_logs_bucket.url}"
  //  enable_streaming_engine = true
  //  machine_type = "N1_standard-1" // fails
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
