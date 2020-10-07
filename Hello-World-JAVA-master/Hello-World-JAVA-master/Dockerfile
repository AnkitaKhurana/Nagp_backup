FROM openjdk:8-jdk-alpine
MAINTAINER ankita.khurana@nagarro.com


FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
COPY pom.xml /tmp/
COPY src /tmp/src/
WORKDIR /tmp/
RUN mvn install 

FROM tomcat:alpine
COPY target/*.war /usr/local/tomcat/webapps/ankitakhurana.war
EXPOSE 8080
CMD ["catalina.sh","run"]

