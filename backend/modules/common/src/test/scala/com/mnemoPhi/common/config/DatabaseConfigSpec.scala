package com.mnemoPhi.common.config

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import com.typesafe.config.ConfigFactory

class DatabaseConfigSpec extends AnyFlatSpec with Matchers {

  "DatabaseConfig" should "load configuration from application.conf" in {
    val config = ConfigFactory.load()
    val dbConfig = DatabaseConfig.fromConfig(config)
    
    dbConfig.url shouldBe "jdbc:postgresql://localhost:5432/mnemophi"
    dbConfig.driver shouldBe "org.postgresql.Driver"
    dbConfig.username shouldBe "mnemophi"
    dbConfig.password shouldBe "mnemophi_password"
  }

  it should "load HikariCP configuration" in {
    val config = ConfigFactory.load()
    val dbConfig = DatabaseConfig.fromConfig(config)
    
    dbConfig.hikaricp.maximumPoolSize shouldBe 20
    dbConfig.hikaricp.minimumIdle shouldBe 5
    dbConfig.hikaricp.connectionTimeout shouldBe 30000
    dbConfig.hikaricp.idleTimeout shouldBe 600000
    dbConfig.hikaricp.maxLifetime shouldBe 1800000
  }

  it should "create a valid JDBC URL" in {
    val config = ConfigFactory.load()
    val dbConfig = DatabaseConfig.fromConfig(config)
    
    dbConfig.url should startWith("jdbc:postgresql://")
    dbConfig.url should include("localhost:5432")
    dbConfig.url should include("mnemophi")
  }

  it should "have valid connection pool settings" in {
    val config = ConfigFactory.load()
    val dbConfig = DatabaseConfig.fromConfig(config)
    
    dbConfig.hikaricp.maximumPoolSize should be > 0
    dbConfig.hikaricp.minimumIdle should be >= 0
    dbConfig.hikaricp.connectionTimeout should be > 0
    dbConfig.hikaricp.idleTimeout should be > 0
    dbConfig.hikaricp.maxLifetime should be > 0
  }
}