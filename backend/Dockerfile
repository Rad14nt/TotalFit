# Use the official Eclipse Temurin image as a parent image
FROM eclipse-temurin:21-jdk-alpine as builder

# Set the working directory in the container
WORKDIR /opt/app

# Copy the Maven wrapper and the pom.xml file to the container
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Build the application
RUN ./mvnw package -DskipTests

# Extract the built application
RUN java -Djarmode=layertools -jar target/*.jar extract --destination target/extracted

# Use a smaller base image for the final stage
FROM eclipse-temurin:21-jre-alpine

# Set the working directory in the container
WORKDIR /opt/app

# Create a new user and group for running the application
RUN addgroup --system javauser && adduser -S -s /usr/sbin/nologin -G javauser javauser

# Set the ARG for the extracted application
ARG EXTRACTED=/opt/app/target/extracted

# Copy the extracted application to the container
COPY --from=builder ${EXTRACTED}/dependencies/ ./
COPY --from=builder ${EXTRACTED}/spring-boot-loader/ ./
COPY --from=builder ${EXTRACTED}/snapshot-dependencies/ ./
COPY --from=builder ${EXTRACTED}/application/ ./

# Set the health check for the application
HEALTHCHECK --start-period=30s CMD curl -f http://localhost:8080/actuator/health || exit 1

# Change the ownership of the application files to the new user
RUN chown -R javauser:javauser .

# Switch to the new user
USER javauser

# Define the entry point for the container
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
