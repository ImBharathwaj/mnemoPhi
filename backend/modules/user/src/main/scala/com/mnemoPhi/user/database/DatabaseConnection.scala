package com.mnemoPhi.user.database

import com.mnemoPhi.common.config.DatabaseConfig
import slick.jdbc.JdbcBackend.Database
import slick.jdbc.PostgresProfile.api._
import com.zaxxer.hikari.{HikariConfig, HikariDataSource}

object DatabaseConnection {

  def createDatabase(config: DatabaseConfig): Database = {
    val hikariConfig = new HikariConfig()
    hikariConfig.setJdbcUrl(config.url)
    hikariConfig.setDriverClassName(config.driver)
    hikariConfig.setUsername(config.username)
    hikariConfig.setPassword(config.password)
    
    // HikariCP settings
    hikariConfig.setMaximumPoolSize(config.hikaricp.maximumPoolSize)
    hikariConfig.setMinimumIdle(config.hikaricp.minimumIdle)
    hikariConfig.setConnectionTimeout(config.hikaricp.connectionTimeout)
    hikariConfig.setIdleTimeout(config.hikaricp.idleTimeout)
    hikariConfig.setMaxLifetime(config.hikaricp.maxLifetime)
    
    // Connection pool name
    hikariConfig.setPoolName("mnemophi-pool")
    
    // Additional settings
    hikariConfig.addDataSourceProperty("cachePrepStmts", "true")
    hikariConfig.addDataSourceProperty("prepStmtCacheSize", "250")
    hikariConfig.addDataSourceProperty("prepStmtCacheSqlLimit", "2048")
    hikariConfig.addDataSourceProperty("useServerPrepStmts", "true")
    hikariConfig.addDataSourceProperty("useLocalSessionState", "true")
    hikariConfig.addDataSourceProperty("rewriteBatchedStatements", "true")
    hikariConfig.addDataSourceProperty("cacheResultSetMetadata", "true")
    hikariConfig.addDataSourceProperty("cacheServerConfiguration", "true")
    hikariConfig.addDataSourceProperty("elideSetAutoCommits", "true")
    hikariConfig.addDataSourceProperty("maintainTimeStats", "false")
    
    val dataSource = new HikariDataSource(hikariConfig)
    Database.forDataSource(dataSource, None)
  }

  def createTestDatabase(): Database = {
    val testConfig = DatabaseConfig(
      url = "jdbc:postgresql://localhost:5432/mnemophi_test",
      driver = "org.postgresql.Driver",
      username = "mnemophi",
      password = "mnemophi_password",
      hikaricp = com.mnemoPhi.common.config.HikariCPConfig(
        maximumPoolSize = 5,
        minimumIdle = 1,
        connectionTimeout = 10000,
        idleTimeout = 300000,
        maxLifetime = 900000
      )
    )
    createDatabase(testConfig)
  }
}