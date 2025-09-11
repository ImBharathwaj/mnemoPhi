package com.mnemoPhi.common.domain

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import io.circe.parser.decode
import io.circe.syntax._
import java.time.Instant
import java.util.UUID

class ConsentCategorySpec extends AnyFlatSpec with Matchers {

  "ConsentCategory" should "create a valid consent category" in {
    val categoryId = UUID.randomUUID()
    val category = "marketing"
    val createdAt = Instant.now()
    
    val consentCategory = ConsentCategory(
      id = categoryId,
      category = category,
      createdAt = createdAt
    )
    
    consentCategory.id shouldBe categoryId
    consentCategory.category shouldBe category
    consentCategory.createdAt shouldBe createdAt
  }

  it should "serialize to JSON correctly" in {
    val categoryId = UUID.randomUUID()
    val category = "analytics"
    val createdAt = Instant.parse("2025-01-01T12:00:00Z")
    
    val consentCategory = ConsentCategory(
      id = categoryId,
      category = category,
      createdAt = createdAt
    )
    
    val json = consentCategory.asJson
    json.hcursor.downField("id").as[String].getOrElse("") shouldBe categoryId.toString
    json.hcursor.downField("category").as[String].getOrElse("") shouldBe category
  }

  it should "deserialize from JSON correctly" in {
    val categoryId = UUID.randomUUID()
    val category = "personalization"
    val createdAt = "2025-01-01T12:00:00Z"
    
    val jsonString = s"""
      {
        "id": "$categoryId",
        "category": "$category",
        "createdAt": "$createdAt"
      }
    """
    
    val result = decode[ConsentCategory](jsonString)
    result.isRight shouldBe true
    
    val consentCategory = result.getOrElse(fail("Failed to decode consent category"))
    consentCategory.id shouldBe categoryId
    consentCategory.category shouldBe category
  }

  it should "handle default consent categories" in {
    val defaultCategories = List("marketing", "analytics", "personalization", "cookies")
    
    defaultCategories.foreach { category =>
      val consentCategory = ConsentCategory(
        id = UUID.randomUUID(),
        category = category,
        createdAt = Instant.now()
      )
      
      consentCategory.category shouldBe category
    }
  }
}