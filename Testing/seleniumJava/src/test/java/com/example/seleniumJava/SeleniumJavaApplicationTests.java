package com.example.seleniumJava;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.springframework.boot.test.context.SpringBootTest;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class SeleniumJavaApplicationTests {

    private WebDriver driver;
    private ExtentReports extentReports;
    private Connection connection;

    @BeforeEach
    void setUp() throws SQLException {
        driver = new ChromeDriver();
        extentReports = new ExtentReports();

        String dbUrl = "jdbc:postgresql://localhost:5432/ProPruebas";
        String dbUser = "ProPruebas";
        String dbPassword = "1234";
        connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
    }

    @Test
    void loginTest() throws InterruptedException {
        driver.get("http://localhost:4200/");

        ExtentSparkReporter extentSparkReporter = new ExtentSparkReporter("Reports/spark_report.html");

        extentReports.attachReporter(extentSparkReporter);

        ExtentTest loginLog = extentReports.createTest("Test Login ProPeubas");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("username")));

        usernameField.sendKeys("Admipro1");
        Thread.sleep(1000);

        WebElement passwordField = driver.findElement(By.id("password"));
        passwordField.sendKeys("P@ssw0rd");
        Thread.sleep(1000);

        WebElement loginButton = driver.findElement(By.id("btnLogin"));
        loginButton.click();
        Thread.sleep(3000);

        if(driver.getPageSource().contains("Welcome!")) {
            System.out.println("login successful");
            loginLog.log(Status.PASS, "login successful");
        } else {
            System.out.println("login failed");
            loginLog.log(Status.FAIL, "Login failed");
        }
        driver.close();
        extentReports.flush();
    }


    @Test
    void createUser() throws SQLException, InterruptedException {
        driver.get("http://localhost:4200/");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        Statement stmt = connection.createStatement();
        ResultSet adminResult = stmt.executeQuery("SELECT * FROM public.\"People\" WHERE nit = '4444444444'");
        adminResult.next();
        String adminUsername = adminResult.getString("userName");


        driver.findElement(By.id("username")).sendKeys(adminUsername);
        driver.findElement(By.id("password")).sendKeys("P@ssw0rd");
        driver.findElement(By.id("btnLogin")).click();
        Thread.sleep(2000);

        ResultSet peopleResult = stmt.executeQuery("SELECT * FROM public.\"TestUsers\" WHERE \"testCase\" = 'create' AND happy = true");
        List<Person> people = new ArrayList<>();

        while (peopleResult.next()) {
            people.add(new Person(
                    peopleResult.getString("nit"),
                    peopleResult.getString("firstName"),
                    peopleResult.getString("middleName"),
                    peopleResult.getString("lastName1"),
                    peopleResult.getString("lastName2"),
                    peopleResult.getDate("birthdate"),
                    peopleResult.getString("phoneNumber"),
                    peopleResult.getString("email")
            ));
        }

        for (Person person : people) {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='btnOp2']"))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='nit']"))).sendKeys(person.getNit());
            Thread.sleep(1000);
            driver.findElement(By.xpath("//*[@id='fistName']")).sendKeys(person.getFirstName());
            Thread.sleep(1000);
            driver.findElement(By.xpath("//*[@id='middleName']")).sendKeys(person.getMiddleName());
            Thread.sleep(1000);
            driver.findElement(By.xpath("//*[@id='lastName1']")).sendKeys(person.getLastName1());
            Thread.sleep(1000);
            driver.findElement(By.xpath("//*[@id='lastName2']")).sendKeys(person.getLastName2());
            Thread.sleep(1000);

            String birthdate = new SimpleDateFormat("MMddyyyy").format(person.getBirthdate());
            driver.findElement(By.xpath("//*[@id='birthday']")).sendKeys(birthdate);
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='phoneNumber']")).sendKeys(person.getPhoneNumber());
            Thread.sleep(1000);
            driver.findElement(By.xpath("//*[@id='email']")).sendKeys(person.getEmail());
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='btnCreate']")).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='createSuccess']")));
            Thread.sleep(3000);
        }

        driver.quit();
    }

    @Test
    void searchUsers() throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://localhost:3000/api/person"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IklzYWNjb3IyIiwibml0IjoiMTIzNDU2Nzg5MCIsImlhdCI6MTcyOTgxMjkxNH0.K-VQr-gt94iPm2EB-695JG0BVm-B1kjwvsUeQk1N90I")
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("La solicitud a la API falló con código de estado: " + response.statusCode());
        }

        Statement stmt = connection.createStatement();
        ResultSet adminResult = stmt.executeQuery("SELECT * FROM public.\"People\" WHERE nit = '4444444444'");
        adminResult.next();
        String adminUsername = adminResult.getString("userName");

        ResultSet peopleResult = stmt.executeQuery("SELECT * FROM public.\"People\"");
        List<String> peopleNits = new ArrayList<>();
        while (peopleResult.next()) {
            peopleNits.add(peopleResult.getString("nit"));
        }

        driver.get("http://localhost:4200/");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        login(adminUsername, "P@ssw0rd", wait);
        Thread.sleep(2000);

        for (String nit : peopleNits) {
            searchUser(nit, wait);
            Thread.sleep(2000);

            WebElement btnExit = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='btnExit']")));
            btnExit.click();
            Thread.sleep(2000);
        }

        driver.quit();
    }

    @Test
    void updateUser() throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://localhost:3000/api/person"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IklzYWNjb3IyIiwibml0IjoiMTIzNDU2Nzg5MCIsImlhdCI6MTcyOTgxMjkxNH0.K-VQr-gt94iPm2EB-695JG0BVm-B1kjwvsUeQk1N90I")
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("La solicitud a la API falló con código de estado: " + response.statusCode());
        }

        Statement stmt = connection.createStatement();
        ResultSet adminResult = stmt.executeQuery("SELECT * FROM public.\"People\" WHERE nit = '4444444444'");
        adminResult.next();
        String adminUsername = adminResult.getString("userName");

        ResultSet peopleResult = stmt.executeQuery("SELECT * FROM public.\"TestUsers\" WHERE \"testCase\" = 'update' AND happy = true");
        List<Person> people = new ArrayList<>();
        while (peopleResult.next()) {
            people.add(new Person(
                    peopleResult.getString("nit"),
                    peopleResult.getString("firstName"),
                    peopleResult.getString("middleName"),
                    peopleResult.getString("lastName1"),
                    peopleResult.getString("lastName2"),
                    peopleResult.getDate("birthdate"),
                    peopleResult.getString("phoneNumber"),
                    peopleResult.getString("email")
            ));
        }

        driver.get("http://localhost:4200/");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        login(adminUsername, "P@ssw0rd", wait);
        Thread.sleep(2000);

        for (Person person : people) {
            searchUser(person.getNit(), wait);
            Thread.sleep(1000);

            WebElement btnEdit = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='btnEdit']")));
            btnEdit.click();
            Thread.sleep(1000);

            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='nit']")));
            driver.findElement(By.xpath("//*[@id='fistName']")).clear();
            driver.findElement(By.xpath("//*[@id='fistName']")).sendKeys(person.getFirstName());
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='middleName']")).clear();
            driver.findElement(By.xpath("//*[@id='middleName']")).sendKeys(person.getMiddleName());
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='lastName1']")).clear();
            driver.findElement(By.xpath("//*[@id='lastName1']")).sendKeys(person.getLastName1());
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='lastName2']")).clear();
            driver.findElement(By.xpath("//*[@id='lastName2']")).sendKeys(person.getLastName2());
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='birthday']")).clear();
            String birthdate = new SimpleDateFormat("MMddyyyy").format(person.getBirthdate());
            driver.findElement(By.xpath("//*[@id='birthday']")).sendKeys(birthdate);
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='phoneNumber']")).clear();
            driver.findElement(By.xpath("//*[@id='phoneNumber']")).sendKeys(person.getPhoneNumber());
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='email']")).clear();
            driver.findElement(By.xpath("//*[@id='email']")).sendKeys(person.getEmail());
            Thread.sleep(1000);

            driver.findElement(By.xpath("//*[@id='btnEdit']")).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='updateSuccess']")));
            Thread.sleep(3000);

            WebElement btnExit = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='btnExit']")));
            btnExit.click();
            Thread.sleep(2000);
        }

        driver.quit();
    }

    @Test
    void deleteUser() throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://localhost:3000/api/person"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IklzYWNjb3IyIiwibml0IjoiMTIzNDU2Nzg5MCIsImlhdCI6MTcyOTgxMjkxNH0.K-VQr-gt94iPm2EB-695JG0BVm-B1kjwvsUeQk1N90I")
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("La solicitud a la API falló con código de estado: " + response.statusCode());
        }

        Statement stmt = connection.createStatement();
        ResultSet adminResult = stmt.executeQuery("SELECT * FROM public.\"People\" WHERE nit = '4444444444'");
        adminResult.next();
        String adminUsername = adminResult.getString("userName");

        ResultSet peopleResult = stmt.executeQuery("SELECT * FROM public.\"TestUsers\" WHERE \"testCase\" = 'delete' AND happy = true");
        List<String> peopleNits = new ArrayList<>();
        while (peopleResult.next()) {
            peopleNits.add(peopleResult.getString("nit"));
        }

        driver.get("http://localhost:4200/");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        login(adminUsername, "P@ssw0rd", wait);
        Thread.sleep(2000);

        for (String nit : peopleNits) {
            searchUser(nit, wait);
            Thread.sleep(2000);

            WebElement btnDelete = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='btnDelete']")));
            btnDelete.click();

            WebElement deleteSuccess = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='deleteSuccess']")));
            assertTrue(deleteSuccess.isDisplayed());
            Thread.sleep(1000);
        }

        driver.quit();
    }

    private void login(String username, String password, WebDriverWait wait) throws InterruptedException {
        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='username']")));
        usernameField.sendKeys(username);
        Thread.sleep(1000);

        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='password']")));
        passwordField.sendKeys(password);
        Thread.sleep(1000);

        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='btnLogin']")));
        loginButton.click();
        Thread.sleep(1000);

        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "Welcome!"));
    }

    private void searchUser(String nit, WebDriverWait wait) throws InterruptedException {
        WebElement btnOp1 = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='btnOp1']")));
        btnOp1.click();
        Thread.sleep(1000);

        WebElement nitField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='nit']")));
        nitField.sendKeys(nit);
        Thread.sleep(1000);

        WebElement searchButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='btnSearch']")));
        searchButton.click();

        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "User"));
    }
}

