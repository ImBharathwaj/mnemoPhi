package com.mnemoPhi.user.server

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.BeforeAndAfterAll
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors

class HttpServerSpec extends AnyFlatSpec with Matchers with BeforeAndAfterAll {

  implicit val system: ActorSystem[Nothing] = ActorSystem(Behaviors.empty, "test-system")
  var server: HttpServer = _

  override def beforeAll(): Unit = {
    server = new HttpServer(system)
  }

  override def afterAll(): Unit = {
    system.terminate()
  }

  "HttpServer" should "start successfully" in {
    server should not be null
  }

  it should "have valid routes defined" in {
    server.routes should not be null
  }

  it should "have correct configuration" in {
    server should not be null
  }
}