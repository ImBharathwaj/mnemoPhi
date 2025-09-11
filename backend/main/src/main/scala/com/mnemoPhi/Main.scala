package com.mnemoPhi

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import com.mnemoPhi.user.server.HttpServer
import com.typesafe.scalalogging.LazyLogging

object Main extends App with LazyLogging {
  
  logger.info("Starting mnemoPhi Backend...")
  
  val system = ActorSystem(Behaviors.empty, "mnemoPhi-backend")
  val server = new HttpServer(system)
  
  // Start the HTTP server
  server.start()
  
  // Handle shutdown gracefully
  sys.addShutdownHook {
    logger.info("Shutting down mnemoPhi Backend...")
    server.stop()
  }
}