provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "ecommerce_bucket" {
  bucket = var.s3_bucket_name
  acl    = "private"

  versioning {
    enabled = true
  }
}

resource "aws_rds_instance" "ecommerce_db" {
  allocated_storage    = var.db_allocated_storage
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = var.db_instance_class
  name                 = var.db_name
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true
}

variable "aws_region" {
  default = "us-east-1"
}

variable "s3_bucket_name" {
  default = "ecommerce-platform-bucket"
}

variable "db_allocated_storage" {
  default = 20
}

variable "db_instance_class" {
  default = "db.t2.micro"
}

variable "db_name" {
  default = "ecommerce"
}

variable "db_username" {
  default = "admin"
}

variable "db_password" {
  default = "password"
}