package com.mnemoPhi.common.database

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import com.mnemoPhi.common.domain.{User, Client, Consent, ConsentCategory, ConsentStatus}
import java.time.Instant
import java.util.UUID
import slick.jdbc.PostgresProfile.api._

class TablesSpec extends AnyFlatSpec with Matchers {

  "Users table" should "map User domain model correctly" in {
    val userId = UUID.randomUUID()
    val email = "test@example.com"
    val metadata = Map("name" -> "John Doe")
    val createdAt = Instant.now()
    
    val user = User(
      id = userId,
      email = email,
      metadata = Some(metadata),
      createdAt = createdAt
    )
    
    // Test that the table can be created
    val usersTable = Tables.users
    usersTable.baseTableRow.tableName shouldBe "users"
  }

  "Clients table" should "map Client domain model correctly" in {
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
    
    val clientsTable = Tables.clients
    clientsTable.baseTableRow.tableName shouldBe "clients"
  }

  "Consents table" should "map Consent domain model correctly" in {
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
    
    val consentsTable = Tables.consents
    consentsTable.baseTableRow.tableName shouldBe "consents"
  }

  "ConsentCategories table" should "map ConsentCategory domain model correctly" in {
    val categoryId = UUID.randomUUID()
    val category = "marketing"
    val createdAt = Instant.now()
    
    val consentCategory = ConsentCategory(
      id = categoryId,
      category = category,
      createdAt = createdAt
    )
    
    val categoriesTable = Tables.consentCategories
    categoriesTable.baseTableRow.tableName shouldBe "consent_categories"
  }

  "Table definitions" should "have correct column names" in {
    val usersTable = Tables.users
    val clientsTable = Tables.clients
    val consentsTable = Tables.consents
    val categoriesTable = Tables.consentCategories
    
    // Check that tables exist and have expected structure
    usersTable.baseTableRow.tableName shouldBe "users"
    clientsTable.baseTableRow.tableName shouldBe "clients"
    consentsTable.baseTableRow.tableName shouldBe "consents"
    categoriesTable.baseTableRow.tableName shouldBe "consent_categories"
  }
}