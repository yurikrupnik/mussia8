resource "google_service_account" "bqowner" {
  account_id = "bqowner"
}

resource "google_service_account" "bqviewer" {
  account_id = "bqviewer"
}
