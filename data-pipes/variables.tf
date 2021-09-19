variable "project" {
  default = "mussia8"
}
variable "location" {
  default = "europe-west1"
}

variable "zone" {
  default = "europe-west1-c"
}

variable "be_logs_bucket" {
  default = "be-logs-raw-data"
}

variable "agent_logs_bucket" {
  default = "agent-logs-raw-data"
}

variable "bucketName" {
  default = "be-events-raw-data"
}



// examples
variable "prefix" {
  default = ["Mr", "Mrs", "Sir"]
  type    = list(string)
}

variable "file-content" {
  type = map(string)
  default = {
    "statement1" : "we love pets!"
    "statement2" : "we love animals!"
  }
}
variable "pet-count" {
  type = map(number)
  default = {
    "statement1" : "1"
    "statement2" : "4"
  }
}


variable "bella" {
  type = object({
    name        = string
    color       = string
    age         = number
    food        = list(string)
    favoritePet = bool
  })

  default = {
    name        = "bella"
    color       = "red"
    age         = 28
    food        = ["fish", "meat", "fruits", "cakes"]
    favoritePet = true
  }
}


resource "google_storage_bucket" "temp_folder" {
  name     = "${var.project}-temp-bucket"
  location = var.location
  //  storage_class = ""
  force_destroy = true
}

resource "google_storage_bucket" "functions" {
  name     = "${var.project}-functions"
  location = var.location
  //  storage_class = ""
  force_destroy = true
}

resource "google_storage_bucket" "be_logs_bucket" {
  name     = "${var.project}-${var.be_logs_bucket}"
  location = var.location
  //  storage_class = ""
  force_destroy = true
}

// Storage with retention
resource "google_storage_bucket" "agent-logs-bucket" {
  name          = "${var.project}-${var.agent_logs_bucket}"
  force_destroy = true
  location      = var.location
  retention_policy {
    retention_period = "6000"
  }
  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE" // type = "Delete"
    }
  }
}



resource "google_pubsub_topic" "be_logs" {
  name = "be_logs"
  message_storage_policy {
    allowed_persistence_regions = [
      var.location,
    ]
  }
  depends_on = [google_pubsub_schema.events_schema1]
  schema_settings {
    schema   = google_pubsub_schema.events_schema1.id
    encoding = "JSON"
  }
}

resource "google_pubsub_topic" "dl-be-logs" {
  name = "dl-be-logs"
}

resource "google_pubsub_subscription" "be-logs-sub1" {
  name  = "stam-test-subscription"
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
  depends_on              = [google_pubsub_topic.dl-be-logs]
  enable_message_ordering = false
  dead_letter_policy {
    dead_letter_topic     = google_pubsub_topic.dl-be-logs.id
    max_delivery_attempts = 10
  }
}
data "google_iam_policy" "workflows_admin" {
  binding {
    role = "roles/cloudfunctions.invoker"
    //    role = "roles/iam.serviceAccountUser"

    members = [
      "user:krupnik.yuri@gmail.com",
    ]
  }
}

resource "google_service_account" "test_account" {
  account_id   = "sa-workflows"
  display_name = "Workflows Service Account"
}

resource "google_service_account_iam_binding" "admin-account-iam" {
  service_account_id = "${google_service_account.test_account.name}"
  role               = "roles/cloudfunctions.serviceAgent"

  members = [
    "serviceAccount:${google_service_account.test_account.email}"
  ]
}


resource "google_pubsub_topic" "be_logs" {
  name = "be_logs"
  message_storage_policy {
    allowed_persistence_regions = [
      var.location,
    ]
  }
  depends_on = [google_pubsub_schema.events_schema1]
  schema_settings {
    schema   = google_pubsub_schema.events_schema1.id
    encoding = "JSON"
  }
}

resource "google_pubsub_topic" "dl-be-logs" {
  name = "dl-be-logs"
}

resource "google_pubsub_subscription" "be-logs-sub1" {
  name  = "stam-test-subscription"
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
  depends_on              = [google_pubsub_topic.dl-be-logs]
  enable_message_ordering = false
  dead_letter_policy {
    dead_letter_topic     = google_pubsub_topic.dl-be-logs.id
    max_delivery_attempts = 10
  }
}

resource "google_dataflow_job" "pubsub_stream" {
  name              = "ps-to-text-be-logs"
  template_gcs_path = "gs://dataflow-templates/latest/Cloud_PubSub_to_GCS_Text"
  temp_gcs_location = "${google_storage_bucket.temp_folder.url}/temp"
  parameters = {
    inputTopic           = google_pubsub_topic.be_logs.id
    outputDirectory      = "${google_storage_bucket.be_logs_bucket.url}/text"
    outputFilenamePrefix = "ps-to-text-be-logs"
  }
  on_delete = "cancel"
}


resource "google_dataflow_job" "pubsub_stream2" {
  name              = "ps-to-avro-be-logs"
  template_gcs_path = "gs://dataflow-templates/latest/Cloud_PubSub_to_Avro"
  temp_gcs_location = "${google_storage_bucket.temp_folder.url}/temp"
  parameters = {
    inputTopic        = google_pubsub_topic.be_logs.id
    outputDirectory   = "${google_storage_bucket.be_logs_bucket.url}/avro"
    avroTempDirectory = "${google_storage_bucket.be_logs_bucket.url}/temp"
  }
  on_delete = "cancel"
}

resource "google_dataflow_job" "bigquery-stream" {
  name              = "ps-to-bq-be-logs"
  template_gcs_path = "gs://dataflow-templates-europe-north1/latest/PubSub_to_BigQuery"
  temp_gcs_location = "${google_storage_bucket.temp_folder.url}/temp"
  parameters = {
    inputTopic="projects/mussia8/topics/be_logs"
    outputTableSpec="mussia8:example_dataset.bar"
  }
  on_delete = "cancel"
}
resource "google_bigquery_dataset" "dataset" {
  dataset_id                  = "example_dataset"
  friendly_name               = "test logs"
  description                 = "This is a test description"
  location                    = "EU"
  default_table_expiration_ms = 3600000

  labels = {
    env = "default"
  }

  // Todo handle it fails with creating table
  //  access {
  //    role          = "OWNER"
  //    user_by_email = google_service_account.bqowner.email
  //  }
  //
  //  access {
  //    role   = "READER"
  //    domain = "hashicorp.com"
  //  }
}

resource "google_bigquery_table" "default2" {
  dataset_id          = google_bigquery_dataset.dataset.dataset_id
  table_id            = "agents_logs"
  deletion_protection = false
  labels = {
    env = "agents"
  }
}

resource "google_bigquery_table" "be_logs" {
  dataset_id          = google_bigquery_dataset.dataset.dataset_id
  table_id            = "be_logs"
  deletion_protection = false
  time_partitioning {
    type = "DAY"
  }

  labels = {
    env = "be"
  }
}

resource "google_bigquery_table" "agent_logs" {
  dataset_id          = google_bigquery_dataset.dataset.dataset_id
  table_id            = "agent_logs"
  deletion_protection = false

  labels = {
    env = "be"
  }
}

resource "google_bigquery_table" "be_logs_table" {
  dataset_id          = google_bigquery_dataset.dataset.dataset_id
  table_id            = "bar"
  deletion_protection = false
  time_partitioning {
    type = "MONTH"
  }
  labels = {
    env = "default"
  }
  //  schema = google_pubsub_schema.events_schema1.definition.fields
  //  schema = file("events-schema.json")
  schema = <<EOF
[
  {
      "name" : "stringField",
       "type": "STRING",
       "mode": "NULLABLE",
      "description": "Testing string field"
  },
  {
      "name" : "intField",
      "type": "INTEGER",
      "mode": "NULLABLE",
      "description": "Testing int field"
  },
  {
      "name" : "tenantId",
      "type": "STRING",
       "mode": "NULLABLE",
      "description": "Tenant Id"
  }
]
EOF

}


//resource "google_bigquery_table" "sheet" {
//  dataset_id = google_bigquery_dataset.dataset.dataset_id
//  table_id   = "sheet"
//
//  external_data_configuration {
//    autodetect    = true
//    source_format = "GOOGLE_SHEETS"
//
//    google_sheets_options {
//      skip_leading_rows = 1
//    }
//
//    source_uris = [
//      "https://docs.google.com/document/d/0B8Dp6BUygaT_LUtrWlM1ZWNtMms/edit?resourcekey=0-F9DrhBC_zolbpdbio9Lu4Q",
//    ]
//  }
//}
