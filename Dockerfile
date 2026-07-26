# Use the official Tomcat 11 image with Java 17
FROM tomcat:11.0-jdk17

# Copy your webapp folder contents into Tomcat's default ROOT folder
COPY ./webapp/ /usr/local/tomcat/webapps/ROOT/

# Expose the standard web port
EXPOSE 8080