

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
resource "google_storage_bucket" "web-site" {
  name     = "mussia8-website"
  location = var.location
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
  versioning {
    enabled = true
  }
  //  logging {
  ////    log_bucket = google_storage_bucket.agent-logs-bucket.provisioner
  //    log_bucket = "gs://test-shit/ds"
  //    log_object_prefix = "front-end/"
  //  }
}

resource "google_storage_bucket" "be_logs_bucket" {
  name     = "${var.project}-${var.be-logs-bucket}"
  location = var.location
  //  storage_class = ""
  force_destroy = true

}
resource "google_storage_bucket" "agent-logs-bucket" {
  name          = "${var.project}-${var.agent-logs-bucket}"
  force_destroy = true
  location      = var.location
  retention_policy {
    retention_period = "6000"
  }
  //  lifecycle_rule {
  //    condition {
  //      age = 30
  //    }
  //    action {
  //      type = "Delete"
  //    }
  //  }
  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE"
    }
  }
}

resource "google_storage_bucket" "near-line" {
  name          = "mussia8-near-line"
  location      = var.location
  force_destroy = true
  storage_class = "NEARLINE"
}
resource "google_storage_bucket" "cold-line" {
  name          = "mussia8-cold-line"
  location      = var.location
  force_destroy = true
  storage_class = "COLDLINE"
}
// Storage end

// PubSub start
resource "google_pubsub_schema" "events_schema1" {
  name = "events-schema"
  type = "AVRO"
  definition = jsonencode({
    "type" : "record",
    "name" : "Avro",
    "fields" : [
      {
        name : "stringField",
        type : "string"
      },
      {
        name : "intField",
        type : "int"
      }
    ]
  })
}

resource "google_pubsub_topic" "be_logs" {
  name = "be-logs"
  message_storage_policy {
    allowed_persistence_regions = [
      var.location,
    ]
  }
  depends_on = [google_pubsub_schema.events_schema1]
  schema_settings {
    schema = google_pubsub_schema.events_schema1.id
    encoding = "JSON"
  }
}

resource "google_pubsub_topic" "dl-be-logs" {
  name = "dl-be-logs"
}

resource "google_pubsub_subscription" "be-logs-sub1" {
  name  = "pb-storage"
  topic = google_pubsub_topic.be_logs.name
  labels = {
    type = "be-logs"
  }

  # 20 minutes
  message_retention_duration = "1200s"
  retain_acked_messages      = true

  ack_deadline_seconds = 20

  expiration_policy {
    ttl = "300000.5s"
  }
  retry_policy {
    minimum_backoff = "10s"
  }

  enable_message_ordering    = false
  dead_letter_policy {
    dead_letter_topic = google_pubsub_topic.dl-be-logs.id
    max_delivery_attempts = 10
  }
}
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
  name = "tf-test-dataflow-job1"
  template_gcs_path = "gs://dataflow-templates/latest/Cloud_PubSub_to_Avro"
//  template_gcs_path = "./Cloud_PubSub_to_Avro"
//  temp_gcs_location = "gs://mussia8-be-logs-raw-data"
  temp_gcs_location = "gs://${var.project}-${var.be-logs-bucket}/temp"
//  temp_gcs_location = "${google_storage_bucket.be_logs_bucket.url}"
  enable_streaming_engine = true
  machine_type = "N1_standard-1"
  parameters = {
    inputTopic="projects/mussia8/topics/be-logs"
    outputDirectory="gs://mussia8/mussia8-be-logs-raw-data/be-logs-avro"
    avroTempDirectory="gs://mussia8/mussia8-be-logs-raw-data/temp"
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
