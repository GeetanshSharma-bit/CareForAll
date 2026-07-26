FROM tomcat:11.0-jdk21

# Disable Tomcat shutdown port
RUN sed -i 's/port="8005"/port="-1"/' /usr/local/tomcat/conf/server.xml

# Clear default apps and deploy your webapp under the explicit 'CareForAll' context path
RUN rm -rf /usr/local/tomcat/webapps/*
COPY ./webapp/ /usr/local/tomcat/webapps/ROOT/

EXPOSE 8080