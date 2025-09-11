package com.mnemoPhi.common.domain

import io.circe.generic.semiauto.{deriveDecoder, deriveEncoder}
import io.circe.{Decoder, Encoder}
import java.time.Instant
import java.util.UUID

sealed trait ConsentStatus
object ConsentStatus {
  case object Granted extends ConsentStatus
  case object Revoked extends ConsentStatus

  implicit val consentStatusEncoder: Encoder[ConsentStatus] = Encoder.encodeString.contramap {
    case Granted => "granted"
    case Revoked => "revoked"
  }

  implicit val consentStatusDecoder: Decoder[ConsentStatus] = Decoder.decodeString.emap {
    case "granted" => Right(Granted)
    case "revoked" => Right(Revoked)
    case other => Left(s"Invalid consent status: $other")
  }
}

case class Consent(
  id: UUID,
  userId: UUID,
  clientId: UUID,
  category: String,
  status: ConsentStatus,
  timestamp: Instant
)

object Consent {
  implicit val consentEncoder: Encoder[Consent] = deriveEncoder[Consent]
  implicit val consentDecoder: Decoder[Consent] = deriveDecoder[Consent]
  
  def tupled = (Consent.apply _).tupled
  def unapply(consent: Consent) = Some((consent.id, consent.userId, consent.clientId, consent.category, consent.status, consent.timestamp))
}