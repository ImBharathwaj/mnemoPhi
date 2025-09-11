package com.mnemoPhi.common.domain

import io.circe.generic.semiauto.{deriveDecoder, deriveEncoder}
import io.circe.{Decoder, Encoder}
import java.time.Instant
import java.util.UUID

case class Client(
  id: UUID,
  name: String,
  email: String,
  apiKey: String,
  createdAt: Instant
)

object Client {
  implicit val clientEncoder: Encoder[Client] = deriveEncoder[Client]
  implicit val clientDecoder: Decoder[Client] = deriveDecoder[Client]
}