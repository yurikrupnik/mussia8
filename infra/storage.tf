//resource "google_storage_bucket" "web-site" {
//  name     = "mussia8-website"
//  location = var.location
//  website {
//    main_page_suffix = "index.html"
//    not_found_page   = "404.html"
//  }
//  versioning {
//    enabled = true
//  }
//  //  logging {
//  ////    log_bucket = google_storage_bucket.agent-logs-bucket.provisioner
//  //    log_bucket = "gs://test-shit/ds"
//  //    log_object_prefix = "front-end/"
//  //  }
//}
//
//resource "google_storage_bucket" "be_logs_bucket" {
//  name     = "${var.project}-${var.be_logs_bucket}"
//  location = var.location
//  //  storage_class = ""
//  force_destroy = true
//
//}
//resource "google_storage_bucket" "agent-logs-bucket" {
//  name          = "${var.project}-${var.agent_logs_bucket}"
//  force_destroy = true
//  location      = var.location
//  retention_policy {
//    retention_period = "6000"
//  }
//  lifecycle_rule {
//    condition {
//      age = 30
//    }
//    action {
//      type          = "SetStorageClass"
//      storage_class = "NEARLINE" // type = "Delete"
//    }
//  }
//}
//
//resource "google_storage_bucket" "near-line" {
//  name          = "${var.project}-near-line"
//  location      = var.location
//  force_destroy = true
//  storage_class = "NEARLINE"
//}
//resource "google_storage_bucket" "cold-line" {
//  name          = "${var.project}-cold-line"
//  location      = var.location
//  force_destroy = true
//  storage_class = "COLDLINE"
//}
