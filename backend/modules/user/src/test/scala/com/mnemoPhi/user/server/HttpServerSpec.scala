package com.mnemoPhi.user.server

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.BeforeAndAfterAll
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.testkit.ScalatestRouteTest
import scala.concurrent.Await
import scala.concurrent.duration._

class HttpServerSpec extends AnyFlatSpec with Matchers with ScalatestRouteTest with BeforeAndAfterAll {

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

  it should "handle health check endpoint" in {
    val request = HttpRequest(uri = "/health")
    request ~> server.routes ~> check {
      status shouldBe StatusCodes.OK
      responseAs[String] should include("healthy")
    }
  }

  it should "handle root endpoint" in {
    val request = HttpRequest(uri = "/")
    request ~> server.routes ~> check {
      status shouldBe StatusCodes.OK
      responseAs[String] should include("mnemoPhi")
    }
  }

  it should "handle 404 for unknown endpoints" in {
    val request = HttpRequest(uri = "/unknown")
    request ~> server.routes ~> check {
      status shouldBe StatusCodes.NotFound
    }
  }

  it should "include CORS headers" in {
    val request = HttpRequest(uri = "/health")
    request ~> server.routes ~> check {
      status shouldBe StatusCodes.OK
      header("Access-Control-Allow-Origin") shouldBe defined
      header("Access-Control-Allow-Methods") shouldBe defined
      header("Access-Control-Allow-Headers") shouldBe defined
    }
  }

  it should "handle OPTIONS requests for CORS preflight" in {
    val request = HttpRequest(
      method = HttpMethods.OPTIONS,
      uri = "/health",
      headers = List(
        HttpHeader.parse("Access-Control-Request-Method", "GET").right.get,
        HttpHeader.parse("Access-Control-Request-Headers", "Content-Type").right.get
      )
    )
    request ~> server.routes ~> check {
      status shouldBe StatusCodes.OK
      header("Access-Control-Allow-Origin") shouldBe defined
      header("Access-Control-Allow-Methods") shouldBe defined
      header("Access-Control-Allow-Headers") shouldBe defined
    }
  }
}