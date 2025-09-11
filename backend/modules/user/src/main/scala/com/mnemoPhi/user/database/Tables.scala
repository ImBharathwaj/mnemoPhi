package com.mnemoPhi.user.database

import com.mnemoPhi.common.domain.{User, Client, Consent, ConsentCategory, ConsentStatus}
import java.time.Instant
import java.util.UUID
import slick.jdbc.PostgresProfile.api._
import slick.lifted.Tag
import io.circe.Json
import io.circe.parser.parse

object Tables {

  // Custom type mappings for PostgreSQL
  implicit val jsonType: BaseColumnType[Map[String, String]] = MappedColumnType.base[Map[String, String], String](
    map => io.circe.Json.fromFields(map.map { case (k, v) => k -> io.circe.Json.fromString(v) }).noSpaces,
    jsonStr => parse(jsonStr).getOrElse(io.circe.Json.obj()).asObject.getOrElse(io.circe.JsonObject.empty).toMap.view.mapValues(_.asString.getOrElse("")).toMap
  )

  implicit val consentStatusType: BaseColumnType[ConsentStatus] = MappedColumnType.base[ConsentStatus, String](
    {
      case ConsentStatus.Granted => "granted"
      case ConsentStatus.Revoked => "revoked"
    },
    {
      case "granted" => ConsentStatus.Granted
      case "revoked" => ConsentStatus.Revoked
    }
  )

  class Users(tag: Tag) extends Table[User](tag, "users") {
    def id = column[UUID]("id", O.PrimaryKey)
    def email = column[String]("email", O.Unique)
    def metadata = column[Option[Map[String, String]]]("metadata")
    def createdAt = column[Instant]("created_at")

    def * = (id, email, metadata, createdAt) <> (User.tupled, User.unapply)
  }

  class Clients(tag: Tag) extends Table[Client](tag, "clients") {
    def id = column[UUID]("id", O.PrimaryKey)
    def name = column[String]("name")
    def email = column[String]("email")
    def apiKey = column[String]("api_key", O.Unique)
    def createdAt = column[Instant]("created_at")

    def * = (id, name, email, apiKey, createdAt) <> (Client.tupled, Client.unapply)
  }

  class ConsentCategories(tag: Tag) extends Table[ConsentCategory](tag, "consent_categories") {
    def id = column[UUID]("id", O.PrimaryKey)
    def category = column[String]("category", O.Unique)
    def createdAt = column[Instant]("created_at")

    def * = (id, category, createdAt) <> (ConsentCategory.tupled, ConsentCategory.unapply)
  }

  class Consents(tag: Tag) extends Table[Consent](tag, "consents") {
    def id = column[UUID]("id", O.PrimaryKey)
    def userId = column[UUID]("user_id")
    def clientId = column[UUID]("client_id")
    def category = column[String]("category")
    def status = column[ConsentStatus]("status")
    def timestamp = column[Instant]("timestamp")

    def * = (id, userId, clientId, category, status, timestamp) <> (Consent.tupled, Consent.unapply)

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