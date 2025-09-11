package com.mnemoPhi.common.domain

import io.circe.generic.semiauto.{deriveDecoder, deriveEncoder}
import io.circe.{Decoder, Encoder}
import java.time.Instant
import java.util.UUID

case class User(
  id: UUID,
  email: String,
  metadata: Option[Map[String, String]] = None,
  createdAt: Instant
)

object User {
  implicit val userEncoder: Encoder[User] = deriveEncoder[User]
  implicit val userDecoder: Decoder[User] = deriveDecoder[User]
  
  def tupled = (User.apply _).tupled
  def unapply(user: User) = Some((user.id, user.email, user.metadata, user.createdAt))
}