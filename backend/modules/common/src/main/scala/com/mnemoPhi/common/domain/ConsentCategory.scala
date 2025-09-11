package com.mnemoPhi.common.domain

import io.circe.generic.semiauto.{deriveDecoder, deriveEncoder}
import io.circe.{Decoder, Encoder}
import java.time.Instant
import java.util.UUID

case class ConsentCategory(
  id: UUID,
  category: String,
  createdAt: Instant
)

object ConsentCategory {
  implicit val consentCategoryEncoder: Encoder[ConsentCategory] = deriveEncoder[ConsentCategory]
  implicit val consentCategoryDecoder: Decoder[ConsentCategory] = deriveDecoder[ConsentCategory]
}