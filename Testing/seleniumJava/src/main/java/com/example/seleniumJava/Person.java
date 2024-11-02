package com.example.seleniumJava;


import java.sql.*;

public class Person {
    private String nit, firstName, middleName, lastName1, lastName2, phoneNumber, email;
    private Date birthdate;

    public Person(String nit, String firstName, String middleName, String lastName1, String lastName2, Date birthdate, String phoneNumber, String email) {
        this.nit = nit;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthdate = birthdate;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getLastName1() {
        return lastName1;
    }

    public void setLastName1(String lastName1) {
        this.lastName1 = lastName1;
    }

    public String getLastName2() {
        return lastName2;
    }

    public void setLastName2(String lastName2) {
        this.lastName2 = lastName2;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
