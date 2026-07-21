# Care for All - Hospital Locator Jodhpur

A full-stack web application for locating hospitals in Jodhpur, featuring interactive routing via Leaflet.js.

## Prerequisites
1. **Java JDK 11+**
2. **Apache Tomcat 9+**
3. **MySQL Server**
4. **VS Code** with extensions: *Java Extension Pack*, *Tomcat for Java*.

## Step 1: Database Setup
1. Open MySQL Workbench or your terminal.
2. Execute the commands found in `sql/setup.sql`. 
3. This will create the `care_for_all` database and insert real Jodhpur hospitals.

## Step 2: VS Code & Tomcat Setup
1. Open the `care-for-all` folder in VS Code.
2. In VS Code, navigate to the **Tomcat Servers** tab (requires the Tomcat extension).
3. Click `+` and select your Tomcat installation directory.
4. Ensure `mysql-connector-java.jar` is placed inside your `WEB-INF/lib/` folder so the Java Servlets can talk to MySQL.

## Step 3: Configure Database Credentials
1. Open `src/com/careforall/servlets/HospitalServlet.java`.
2. Update the `DB_USER` and `DB_PASS` variables to match your local MySQL credentials.

## Step 4: Run the Application
1. Right-click your project folder in the VS Code explorer and select **Run on Tomcat Server** (or deploy the webapp folder to Tomcat's `webapps` directory manually).
2. Open your browser and go to `http://localhost:8080/care-for-all/index.html`.
3. Allow location tracking in your browser to test the Leaflet Routing OSRM functionality.