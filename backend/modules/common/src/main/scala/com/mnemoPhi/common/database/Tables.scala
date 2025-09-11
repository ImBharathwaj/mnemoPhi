package com.mnemoPhi.common.database

import com.mnemoPhi.common.domain.{User, Client, Consent, ConsentCategory, ConsentStatus}
import java.time.Instant
import java.util.UUID
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag

object Tables {

  class Users(tag: Tag) extends Table[User](tag, "users") {
    def id = column[UUID]("id", O.PrimaryKey)
    def email = column[String]("email", O.Unique)
    def metadata = column[Option[Map[String, String]]]("metadata")
    def createdAt = column[Instant]("created_at")

    def * = (id, email, metadata, createdAt).mapTo[User]
  }

  class Clients(tag: Tag) extends Table[Client](tag, "clients") {
    def id = column[UUID]("id", O.PrimaryKey)
    def name = column[String]("name")
    def email = column[String]("email")
    def apiKey = column[String]("api_key", O.Unique)
    def createdAt = column[Instant]("created_at")

    def * = (id, name, email, apiKey, createdAt).mapTo[Client]
  }

  class ConsentCategories(tag: Tag) extends Table[ConsentCategory](tag, "consent_categories") {
    def id = column[UUID]("id", O.PrimaryKey)
    def category = column[String]("category", O.Unique)
    def createdAt = column[Instant]("created_at")

    def * = (id, category, createdAt).mapTo[ConsentCategory]
  }

  class Consents(tag: Tag) extends Table[Consent](tag, "consents") {
    def id = column[UUID]("id", O.PrimaryKey)
    def userId = column[UUID]("user_id")
    def clientId = column[UUID]("client_id")
    def category = column[String]("category")
    def status = column[ConsentStatus]("status")
    def timestamp = column[Instant]("timestamp")

    def * = (id, userId, clientId, category, status, timestamp).mapTo[Consent]

    def user = foreignKey("consents_user_fk", userId, users)(_.id, onDelete = ForeignKeyAction.Cascade)
    def client = foreignKey("consents_client_fk", clientId, clients)(_.id, onDelete = ForeignKeyAction.Cascade)
  }

  // Table references
  val users = TableQuery[Users]
  val clients = TableQuery[Clients]
  val consentCategories = TableQuery[ConsentCategories]
  val consents = TableQuery[Consents]

  // Schema definition
  val schema = users.schema ++ clients.schema ++ consentCategories.schema ++ consents.schema
}