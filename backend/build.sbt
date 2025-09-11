ThisBuild / version := "0.1.0-SNAPSHOT"
ThisBuild / scalaVersion := "3.3.1"
ThisBuild / organization := "com.mnemoPhi"

lazy val root = (project in file("."))
  .aggregate(common, user, consent, client, admin)
  .settings(
    name := "mnemoPhi-backend",
    publish / skip := true
  )

lazy val common = (project in file("modules/common"))
  .settings(
    name := "mnemoPhi-common",
    libraryDependencies ++= Seq(
      // JSON serialization
      "io.circe" %% "circe-core" % "0.14.6",
      "io.circe" %% "circe-generic" % "0.14.6",
      "io.circe" %% "circe-parser" % "0.14.6",
      
      // Configuration
      "com.typesafe" % "config" % "1.4.3",
      
      // Logging
      "ch.qos.logback" % "logback-classic" % "1.4.14",
      "com.typesafe.scala-logging" %% "scala-logging" % "3.9.5",
      
      // UUID generation
      "com.github.blemale" %% "scaffeine" % "5.2.1",
      
      // Validation
      "eu.timepit" %% "refined" % "0.11.0",
      "eu.timepit" %% "refined-cats" % "0.11.0",
      
      // Testing
      "org.scalatest" %% "scalatest" % "3.2.17" % Test,
      "org.scalatestplus" %% "scalacheck-1-17" % "3.2.17.0" % Test,
      "org.scalamock" %% "scalamock" % "5.2.0" % Test
    )
  )

lazy val user = (project in file("modules/user"))
  .dependsOn(common)
  .settings(
    name := "mnemoPhi-user",
    libraryDependencies ++= Seq(
      // Database
      "com.typesafe.slick" %% "slick" % "3.5.0",
      "com.typesafe.slick" %% "slick-hikaricp" % "3.5.0",
      "org.postgresql" % "postgresql" % "42.7.1",
      
      // HTTP Server
      "com.typesafe.akka" %% "akka-http" % "10.5.3",
      "com.typesafe.akka" %% "akka-http-spray-json" % "10.5.3",
      "com.typesafe.akka" %% "akka-stream" % "2.8.5",
      "com.typesafe.akka" %% "akka-actor-typed" % "2.8.5",
      
      // Testing
      "org.scalatest" %% "scalatest" % "3.2.17" % Test,
      "com.dimafeng" %% "testcontainers-scala-scalatest" % "0.41.0" % Test,
      "com.dimafeng" %% "testcontainers-scala-postgresql" % "0.41.0" % Test,
      "org.testcontainers" % "postgresql" % "1.19.3" % Test
    )
  )

lazy val consent = (project in file("modules/consent"))
  .dependsOn(common, user)
  .settings(
    name := "mnemoPhi-consent",
    libraryDependencies ++= Seq(
      // Testing
      "org.scalatest" %% "scalatest" % "3.2.17" % Test,
      "com.dimafeng" %% "testcontainers-scala-scalatest" % "0.41.0" % Test
    )
  )

lazy val client = (project in file("modules/client"))
  .dependsOn(common, user)
  .settings(
    name := "mnemoPhi-client",
    libraryDependencies ++= Seq(
      // Testing
      "org.scalatest" %% "scalatest" % "3.2.17" % Test,
      "com.dimafeng" %% "testcontainers-scala-scalatest" % "0.41.0" % Test
    )
  )

lazy val admin = (project in file("modules/admin"))
  .dependsOn(common, user, consent, client)
  .settings(
    name := "mnemoPhi-admin",
    libraryDependencies ++= Seq(
      // Testing
      "org.scalatest" %% "scalatest" % "3.2.17" % Test,
      "com.dimafeng" %% "testcontainers-scala-scalatest" % "0.41.0" % Test
    )
  )

// Global settings
ThisBuild / scalacOptions ++= Seq(
  "-deprecation",
  "-feature",
  "-unchecked",
  "-Xfatal-warnings",
  "-Ykind-projector"
)

// Test settings
ThisBuild / Test / fork := true
ThisBuild / Test / parallelExecution := false

// Docker settings
enablePlugins(DockerPlugin)
Docker / packageName := "mnemophi-backend"
Docker / version := "latest"