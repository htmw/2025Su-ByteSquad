FROM eclipse-temurin:20-jdk-jammy

WORKDIR /app

COPY target/SupplementAIStore-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]