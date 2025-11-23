# Multi-stage Dockerfile for building the Maven Spring Boot backend
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /workspace

# Copy maven wrapper and pom if present to cache dependencies; fall back to normal mvn
COPY pom.xml ./
COPY mvnw .  
COPY .mvn .mvn

RUN mvn -B -DskipTests dependency:go-offline || true

# Copy source and build
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /workspace/target/*.jar app.jar

# Ensure a data directory exists for SQLite file. Fly will mount a persistent volume at /data.
RUN mkdir -p /data

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
