FROM tomcat:11.0-jdk21

# Disable Tomcat shutdown port
RUN sed -i 's/port="8005"/port="-1"/' /usr/local/tomcat/conf/server.xml

# Copy your web files and libraries
COPY ./webapp/ /usr/local/tomcat/webapps/ROOT/

# Copy your raw Java source code into the container
COPY ./src/ /usr/local/tomcat/src/

# Create the classes folder and compile the Java code directly on the server
RUN mkdir -p /usr/local/tomcat/webapps/ROOT/WEB-INF/classes && \
    javac -cp "/usr/local/tomcat/webapps/ROOT/WEB-INF/lib/*:/usr/local/tomcat/lib/servlet-api.jar" \
    -d /usr/local/tomcat/webapps/ROOT/WEB-INF/classes \
    /usr/local/tomcat/src/com/careforall/servlets/*.java

EXPOSE 8080