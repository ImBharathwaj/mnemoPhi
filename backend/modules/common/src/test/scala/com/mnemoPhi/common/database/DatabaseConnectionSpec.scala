package com.mnemoPhi.common.database

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.BeforeAndAfterAll
import com.mnemoPhi.common.config.DatabaseConfig
import com.typesafe.config.ConfigFactory
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Await
import scala.concurrent.duration._

class DatabaseConnectionSpec extends AnyFlatSpec with Matchers with BeforeAndAfterAll {

  var db: Database = _
  var config: DatabaseConfig = _

  override def beforeAll(): Unit = {
    val appConfig = ConfigFactory.load()
    config = DatabaseConfig.fromConfig(appConfig)
    db = DatabaseConnection.createDatabase(config)
  }

  override def afterAll(): Unit = {
    if (db != null) {
      db.close()
    }
  }

  "DatabaseConnection" should "create a valid database connection" in {
    db should not be null
    db.isInstanceOf[Database] shouldBe true
  }

  it should "execute a simple query" in {
    val query = sql"SELECT 1".as[Int]
    val result = Await.result(db.run(query), 5.seconds)
    result shouldBe List(1)
  }

  it should "check database version" in {
    val query = sql"SELECT version()".as[String]
    val result = Await.result(db.run(query), 5.seconds)
    result.head should include("PostgreSQL")
  }

  it should "create tables successfully" in {
    val createTables = Tables.schema.create
    val result = Await.result(db.run(createTables), 10.seconds)
    result should not be null
  }

  it should "drop tables successfully" in {
    val dropTables = Tables.schema.drop
    val result = Await.result(db.run(dropTables), 10.seconds)
    result should not be null
  }
}