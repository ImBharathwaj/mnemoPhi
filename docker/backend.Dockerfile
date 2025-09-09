# Backend Dockerfile for MnemoPhi Scala Application
FROM openjdk:17-jdk-slim

# Install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install SBT
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list && \
    echo "deb https://repo.scala-sbt.org/scalasbt/debian /" | tee /etc/apt/sources.list.d/sbt_old.list && \
    curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add && \
    apt-get update && \
    apt-get install -y sbt && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy build files first for better caching
COPY backend/build.sbt backend/project/ ./backend/
COPY backend/project/ ./backend/project/

# Copy source code
COPY backend/ ./backend/

# Set SBT options for better performance
ENV SBT_OPTS="-Xmx2G -XX:+UseG1GC"

# Build the application
WORKDIR /app/backend
RUN sbt clean compile

# Expose port
EXPOSE 8080

# Default command
CMD ["sbt", "run"]