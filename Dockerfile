FROM eclipse-temurin:20-jdk-jammy

WORKDIR /app

COPY target/SupplementAIStore-0.0.1-SNAPSHOT.jar app.jar
# Script to wait for the database to be ready
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]