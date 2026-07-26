# Use the official Tomcat 11 image with Java 17
FROM tomcat:11.0-jdk17

# Disable Tomcat shutdown port (8005) so Render only targets port 8080
RUN sed -i 's/port="8005"/port="-1"/' /usr/local/tomcat/conf/server.xml

# Copy your webapp folder contents into Tomcat's default ROOT folder
COPY ./webapp/ /usr/local/tomcat/webapps/ROOT/

# Expose the standard web port
EXPOSE 8080