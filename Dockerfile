FROM alpine:latest

# Make sure the time is correct qs we use JWT tokens (a wrong time could cause issues)
RUN apk add --update --no-cache tzdata \
 && cp /usr/share/zoneinfo/Europe/Brussels /etc/localtime \
 && echo "Europe/Brussels" > /etc/timezone \
 && apk del tzdata

# Add the JDK
RUN apk add --update --no-cache openjdk11-jre

RUN set -eux \
 && mkdir /opt/asc-forum

COPY ./build/libs/forum-0.0.1-SNAPSHOT.jar /opt/asc-forum/

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "/opt/asc-forum/forum-0.0.1-SNAPSHOT.jar"]
