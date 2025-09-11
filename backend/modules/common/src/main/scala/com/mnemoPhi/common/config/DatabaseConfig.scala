package com.mnemoPhi.common.config

import com.typesafe.config.Config

case class HikariCPConfig(
  maximumPoolSize: Int,
  minimumIdle: Int,
  connectionTimeout: Long,
  idleTimeout: Long,
  maxLifetime: Long
)

case class DatabaseConfig(
  url: String,
  driver: String,
  username: String,
  password: String,
  hikaricp: HikariCPConfig
)

object DatabaseConfig {
  def fromConfig(config: Config): DatabaseConfig = {
    val dbConfig = config.getConfig("database")
    val hikaricpConfig = dbConfig.getConfig("hikaricp")
    
    DatabaseConfig(
      url = dbConfig.getString("url"),
      driver = dbConfig.getString("driver"),
      username = dbConfig.getString("username"),
      password = dbConfig.getString("password"),
      hikaricp = HikariCPConfig(
        maximumPoolSize = hikaricpConfig.getInt("maximum-pool-size"),
        minimumIdle = hikaricpConfig.getInt("minimum-idle"),
        connectionTimeout = hikaricpConfig.getLong("connection-timeout"),
        idleTimeout = hikaricpConfig.getLong("idle-timeout"),
        maxLifetime = hikaricpConfig.getLong("max-lifetime")
      )
    )
  }
}