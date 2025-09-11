package com.mnemoPhi.common.domain

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import io.circe.parser.decode
import io.circe.syntax._
import java.time.Instant
import java.util.UUID

class ClientSpec extends AnyFlatSpec with Matchers {

  "Client" should "create a valid client with required fields" in {
    val clientId = UUID.randomUUID()
    val name = "Acme Corp"
    val email = "contact@acme.com"
    val apiKey = "api_1234567890abcdef"
    val createdAt = Instant.now()
    
    val client = Client(
      id = clientId,
      name = name,
      email = email,
      apiKey = apiKey,
      createdAt = createdAt
    )
    
    client.id shouldBe clientId
    client.name shouldBe name
    client.email shouldBe email
    client.apiKey shouldBe apiKey
    client.createdAt shouldBe createdAt
  }

  it should "serialize to JSON correctly" in {
    val clientId = UUID.randomUUID()
    val name = "Acme Corp"
    val email = "contact@acme.com"
    val apiKey = "api_1234567890abcdef"
    val createdAt = Instant.parse("2025-01-01T12:00:00Z")
    
    val client = Client(
      id = clientId,
      name = name,
      email = email,
      apiKey = apiKey,
      createdAt = createdAt
    )
    
    val json = client.asJson
    json.hcursor.downField("id").as[String].getOrElse("") shouldBe clientId.toString
    json.hcursor.downField("name").as[String].getOrElse("") shouldBe name
    json.hcursor.downField("email").as[String].getOrElse("") shouldBe email
    json.hcursor.downField("apiKey").as[String].getOrElse("") shouldBe apiKey
  }

  it should "deserialize from JSON correctly" in {
    val clientId = UUID.randomUUID()
    val name = "Acme Corp"
    val email = "contact@acme.com"
    val apiKey = "api_1234567890abcdef"
    val createdAt = "2025-01-01T12:00:00Z"
    
    val jsonString = s"""
      {
        "id": "$clientId",
        "name": "$name",
        "email": "$email",
        "apiKey": "$apiKey",
        "createdAt": "$createdAt"
      }
    """
    
    val result = decode[Client](jsonString)
    result.isRight shouldBe true
    
    val client = result.getOrElse(fail("Failed to decode client"))
    client.id shouldBe clientId
    client.name shouldBe name
    client.email shouldBe email
    client.apiKey shouldBe apiKey
  }

  it should "validate API key format" in {
    val clientId = UUID.randomUUID()
    val name = "Test Corp"
    val email = "test@example.com"
    val createdAt = Instant.now()
    
    // API key should start with "api_"
    val validApiKey = "api_1234567890abcdef"
    val client = Client(
      id = clientId,
      name = name,
      email = email,
      apiKey = validApiKey,
      createdAt = createdAt
    )
    
    client.apiKey should startWith("api_")
    client.apiKey should have length 20 // api_ + 16 chars
  }
}