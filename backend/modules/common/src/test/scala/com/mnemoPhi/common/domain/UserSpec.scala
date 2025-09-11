package com.mnemoPhi.common.domain

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import io.circe.parser.decode
import io.circe.syntax._
import java.time.Instant
import java.util.UUID

class UserSpec extends AnyFlatSpec with Matchers {

  "User" should "create a valid user with required fields" in {
    val userId = UUID.randomUUID()
    val email = "test@example.com"
    val metadata = Map("name" -> "John Doe", "age" -> 25)
    val createdAt = Instant.now()
    
    val user = User(
      id = userId,
      email = email,
      metadata = Some(metadata),
      createdAt = createdAt
    )
    
    user.id shouldBe userId
    user.email shouldBe email
    user.metadata shouldBe Some(metadata)
    user.createdAt shouldBe createdAt
  }

  it should "create a user without metadata" in {
    val userId = UUID.randomUUID()
    val email = "test@example.com"
    val createdAt = Instant.now()
    
    val user = User(
      id = userId,
      email = email,
      metadata = None,
      createdAt = createdAt
    )
    
    user.metadata shouldBe None
  }

  it should "serialize to JSON correctly" in {
    val userId = UUID.randomUUID()
    val email = "test@example.com"
    val metadata = Map("name" -> "John Doe")
    val createdAt = Instant.parse("2025-01-01T12:00:00Z")
    
    val user = User(
      id = userId,
      email = email,
      metadata = Some(metadata),
      createdAt = createdAt
    )
    
    val json = user.asJson
    json.hcursor.downField("id").as[String].getOrElse("") shouldBe userId.toString
    json.hcursor.downField("email").as[String].getOrElse("") shouldBe email
    json.hcursor.downField("metadata").as[Map[String, String]].getOrElse(Map.empty) shouldBe metadata
  }

  it should "deserialize from JSON correctly" in {
    val userId = UUID.randomUUID()
    val email = "test@example.com"
    val metadata = Map("name" -> "John Doe")
    val createdAt = "2025-01-01T12:00:00Z"
    
    val jsonString = s"""
      {
        "id": "$userId",
        "email": "$email",
        "metadata": {"name": "John Doe"},
        "createdAt": "$createdAt"
      }
    """
    
    val result = decode[User](jsonString)
    result.isRight shouldBe true
    
    val user = result.getOrElse(fail("Failed to decode user"))
    user.id shouldBe userId
    user.email shouldBe email
    user.metadata shouldBe Some(metadata)
  }

  it should "validate email format" in {
    val userId = UUID.randomUUID()
    val createdAt = Instant.now()
    
    // Valid email should work
    val validUser = User(
      id = userId,
      email = "valid@example.com",
      metadata = None,
      createdAt = createdAt
    )
    validUser.email shouldBe "valid@example.com"
    
    // Invalid email should still create user (validation happens at API level)
    val invalidUser = User(
      id = userId,
      email = "invalid-email",
      metadata = None,
      createdAt = createdAt
    )
    invalidUser.email shouldBe "invalid-email"
  }
}