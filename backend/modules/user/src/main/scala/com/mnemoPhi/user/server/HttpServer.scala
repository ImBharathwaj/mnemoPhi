package com.mnemoPhi.user.server

import akka.actor.typed.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.directives.CORS
import com.typesafe.config.ConfigFactory
import com.typesafe.scalalogging.LazyLogging
import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class HttpServer(system: ActorSystem[_]) extends LazyLogging {
  implicit val actorSystem: ActorSystem[_] = system
  implicit val executionContext: ExecutionContext = system.executionContext

  private val config = ConfigFactory.load()
  private val host = config.getString("server.host")
  private val port = config.getInt("server.port")

  val routes: Route = {
    CORS() {
      pathPrefix("api" / "v1") {
        healthRoute ~
        rootRoute
      } ~
      path("health") {
        healthRoute
      } ~
      path("") {
        rootRoute
      }
    }
  }

  private val healthRoute: Route = {
    path("health") {
      get {
        complete(HttpEntity(ContentTypes.`application/json`, """{"status": "healthy", "service": "mnemoPhi-backend"}"""))
      } ~
      options {
        complete(StatusCodes.OK)
      }
    }
  }

  private val rootRoute: Route = {
    get {
      complete(HttpEntity(ContentTypes.`application/json`, """{"message": "Welcome to mnemoPhi API", "version": "1.0.0"}"""))
    } ~
    options {
      complete(StatusCodes.OK)
    }
  }

  def start(): Unit = {
    Http().newServerAt(host, port).bind(routes).onComplete {
      case Success(binding) =>
        logger.info(s"Server online at http://$host:$port/")
        logger.info(s"Health check available at http://$host:$port/health")
      case Failure(ex) =>
        logger.error("Failed to bind HTTP endpoint, terminating system", ex)
        system.terminate()
    }
  }

  def stop(): Unit = {
    logger.info("Stopping HTTP server...")
    system.terminate()
  }
}