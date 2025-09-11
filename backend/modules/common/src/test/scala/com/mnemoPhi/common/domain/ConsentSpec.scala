package com.mnemoPhi.common.domain

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import io.circe.parser.decode
import io.circe.syntax._
import java.time.Instant
import java.util.UUID

class ConsentSpec extends AnyFlatSpec with Matchers {

  "Consent" should "create a valid consent with granted status" in {
    val consentId = UUID.randomUUID()
    val userId = UUID.randomUUID()
    val clientId = UUID.randomUUID()
    val category = "marketing"
    val status = ConsentStatus.Granted
    val timestamp = Instant.now()
    
    val consent = Consent(
      id = consentId,
      userId = userId,
      clientId = clientId,
      category = category,
      status = status,
      timestamp = timestamp
    )
    
    consent.id shouldBe consentId
    consent.userId shouldBe userId
    consent.clientId shouldBe clientId
    consent.category shouldBe category
    consent.status shouldBe ConsentStatus.Granted
    consent.timestamp shouldBe timestamp
  }

  it should "create a valid consent with revoked status" in {
    val consentId = UUID.randomUUID()
    val userId = UUID.randomUUID()
    val clientId = UUID.randomUUID()
    val category = "analytics"
    val status = ConsentStatus.Revoked
    val timestamp = Instant.now()
    
    val consent = Consent(
      id = consentId,
      userId = userId,
      clientId = clientId,
      category = category,
      status = status,
      timestamp = timestamp
    )
    
    consent.status shouldBe ConsentStatus.Revoked
  }

  it should "serialize to JSON correctly" in {
    val consentId = UUID.randomUUID()
    val userId = UUID.randomUUID()
    val clientId = UUID.randomUUID()
    val category = "marketing"
    val status = ConsentStatus.Granted
    val timestamp = Instant.parse("2025-01-01T12:00:00Z")
    
    val consent = Consent(
      id = consentId,
      userId = userId,
      clientId = clientId,
      category = category,
      status = status,
      timestamp = timestamp
    )
    
    val json = consent.asJson
    json.hcursor.downField("id").as[String].getOrElse("") shouldBe consentId.toString
    json.hcursor.downField("userId").as[String].getOrElse("") shouldBe userId.toString
    json.hcursor.downField("clientId").as[String].getOrElse("") shouldBe clientId.toString
    json.hcursor.downField("category").as[String].getOrElse("") shouldBe category
    json.hcursor.downField("status").as[String].getOrElse("") shouldBe "granted"
  }

  it should "deserialize from JSON correctly" in {
    val consentId = UUID.randomUUID()
    val userId = UUID.randomUUID()
    val clientId = UUID.randomUUID()
    val category = "marketing"
    val timestamp = "2025-01-01T12:00:00Z"
    
    val jsonString = s"""
      {
        "id": "$consentId",
        "userId": "$userId",
        "clientId": "$clientId",
        "category": "$category",
        "status": "granted",
        "timestamp": "$timestamp"
      }
    """
    
    val result = decode[Consent](jsonString)
    result.isRight shouldBe true
    
    val consent = result.getOrElse(fail("Failed to decode consent"))
    consent.id shouldBe consentId
    consent.userId shouldBe userId
    consent.clientId shouldBe clientId
    consent.category shouldBe category
    consent.status shouldBe ConsentStatus.Granted
  }

  it should "handle all valid consent categories" in {
    val validCategories = List("marketing", "analytics", "personalization", "cookies")
    
    validCategories.foreach { category =>
      val consent = Consent(
        id = UUID.randomUUID(),
        userId = UUID.randomUUID(),
        clientId = UUID.randomUUID(),
        category = category,
        status = ConsentStatus.Granted,
        timestamp = Instant.now()
      )
      
      consent.category shouldBe category
    }
  }
}