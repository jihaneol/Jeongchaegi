FROM openjdk:11-jre
EXPOSE 8081
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app.jar"]
