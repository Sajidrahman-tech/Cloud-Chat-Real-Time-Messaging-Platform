#############################################################
# Provider
#############################################################
provider "aws" {
  region = "us-east-1"
}

#############################################################
# Cognito User Pool
#############################################################
resource "aws_cognito_user_pool" "this" {
  name = "cloudchat-user-pool"

  auto_verified_attributes = ["email"]

  schema {
    attribute_data_type = "String"
    name                = "email"
    required            = true
    mutable             = true
  }

  alias_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    require_symbols   = true
  }
}

resource "random_string" "suffix" {
  length  = 6
  upper   = false
  special = false
}

resource "aws_cognito_user_pool_domain" "this" {
  domain       = "cloudchat-app-${random_string.suffix.result}"
  user_pool_id = aws_cognito_user_pool.this.id
}

resource "aws_cognito_user_pool_client" "this" {
  name                                 = "cloudchat-client"
  user_pool_id                         = aws_cognito_user_pool.this.id
  generate_secret                      = false

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "phone", "profile"]

  callback_urls = [
    "http://localhost:3000/callback"
  ]

  logout_urls = [
    "http://localhost:3000/"
  ]

  supported_identity_providers = ["COGNITO"]
}

#############################################################
# DynamoDB Table for Messages
#############################################################
resource "aws_dynamodb_table" "messages" {
  name           = "MessagesTable"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "room_id"
  range_key      = "timestamp"

  attribute {
    name = "room_id"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }
}

#############################################################
# IAM Role for AppSync to Access DynamoDB
#############################################################
resource "aws_iam_role" "appsync_dynamodb_role" {
  name = "appsync-dynamodb-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "appsync.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "appsync_dynamodb_policy" {
  name = "appsync-dynamodb-policy"
  role = aws_iam_role.appsync_dynamodb_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      Effect = "Allow",
      Resource = aws_dynamodb_table.messages.arn
    }]
  })
}

#############################################################
# IAM Role for AppSync Logging
#############################################################
resource "aws_iam_role" "appsync_logging" {
  name = "appsync-logging-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "appsync.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "appsync_logging_policy" {
  name = "appsync-logging-policy"
  role = aws_iam_role.appsync_logging.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      Effect = "Allow",
      Resource = "*"
    }]
  })
}

#############################################################
# AppSync GraphQL API with Embedded Schema
#############################################################
resource "aws_appsync_graphql_api" "chat_api" {
  name                = "CloudChatAPI"
  authentication_type = "AMAZON_COGNITO_USER_POOLS"

  user_pool_config {
    user_pool_id    = aws_cognito_user_pool.this.id
    aws_region      = "us-east-1"
    default_action  = "ALLOW"
  }

  log_config {
    field_log_level          = "ALL"
    cloudwatch_logs_role_arn = aws_iam_role.appsync_logging.arn
  }

  schema = <<SCHEMA
type Message {
  room_id: ID!
  timestamp: AWSDateTime!
  sender: String!
  content: String!
}

type Query {
  getMessages(room_id: ID!): [Message]
}

type Mutation {
  sendMessage(room_id: ID!, sender: String!, content: String!): Message
}

type Subscription {
  onNewMessage(room_id: ID!): Message
    @aws_subscribe(mutations: ["sendMessage"])
}
SCHEMA
}

#############################################################
# DynamoDB Data Source for AppSync
#############################################################
resource "aws_appsync_datasource" "dynamodb_source" {
  api_id           = aws_appsync_graphql_api.chat_api.id
  name             = "MessagesTableDataSource"
  type             = "AMAZON_DYNAMODB"
  service_role_arn = aws_iam_role.appsync_dynamodb_role.arn

  dynamodb_config {
    table_name             = aws_dynamodb_table.messages.name
    use_caller_credentials = false
  }
}

#############################################################
# Resolvers
#############################################################

# Query Resolver: getMessages
resource "aws_appsync_resolver" "get_messages" {
  api_id      = aws_appsync_graphql_api.chat_api.id
  type        = "Query"
  field       = "getMessages"
  data_source = aws_appsync_datasource.dynamodb_source.name

  request_template = <<REQUEST
{
  "version": "2018-05-29",
  "operation": "Query",
  "query": {
    "expression": "room_id = :room_id",
    "expressionValues": {
      ":room_id": { "S": "$ctx.args.room_id" }
    }
  }
}
REQUEST

  response_template = <<RESPONSE
$util.toJson($ctx.result.items)
RESPONSE
}

# Mutation Resolver: sendMessage
resource "aws_appsync_resolver" "send_message" {
  api_id      = aws_appsync_graphql_api.chat_api.id
  type        = "Mutation"
  field       = "sendMessage"
  data_source = aws_appsync_datasource.dynamodb_source.name

  request_template = <<REQUEST
{
  "version": "2018-05-29",
  "operation": "PutItem",
  "key": {
    "room_id": { "S": "$ctx.args.room_id" },
    "timestamp": { "S": "$util.time.nowISO8601()" }
  },
  "attributeValues": {
    "sender": { "S": "$ctx.args.sender" },
    "content": { "S": "$ctx.args.content" }
  }
}
REQUEST

  response_template = <<RESPONSE
$util.toJson($ctx.result)
RESPONSE
}
