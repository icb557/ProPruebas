*** Settings ***
Documentation       caso de prueba para buscar usuarios
Suite Setup       Connect To Database    psycopg2    ${DBName}    ${DBUser}    ${DBPass}    ${DBHost}    ${DBPort}
Suite Teardown    Disconnect From Database

Library    SeleniumLibrary
Library    OperatingSystem
Library    DatabaseLibrary
Library    Zoomba.APILibrary
Library    String
Library    DateTime

#Variables   ../variables/user.py
Resource    ../resources/user.res.robot
*** Variables ***
${DBHost}         localhost
${DBName}         ProPruebas
${DBPass}         1234
${DBPort}         5432
${DBUser}         ProPruebas
${USER_PASSWORD}    P@ssw0rd
${PAGE_URL}    http://localhost:4200/
${API_URL}    http://localhost:3000/api
&{HEADERS}     Content-Type=application/json      charset=UTF-8    Authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IklzYWNjb3IyIiwibml0IjoiMTIzNDU2Nzg5MCIsImlhdCI6MTcyOTgxMjkxNH0.K-VQr-gt94iPm2EB-695JG0BVm-B1kjwvsUeQk1N90I

*** Test Cases ***
Crear usuarios
    ${resp}=    Call Get Request    ${HEADERS}    ${API_URL}    /person
    Should Be Equal As Integers    ${resp}[status_code]    200
    ${admin} =    Query    SELECT * FROM public."People" where nit = '4444444444';    \    True
    ${people} =    Query    SELECT * FROM public."TestUsers";    \    True
    FOR    ${person}    IN    @{people}
        Open Browser    ${PAGE_URL}    chrome
        sleep  2s	   
        Login    ${admin[0]}[userName]     ${USER_PASSWORD}
        Wait Until Element Is Visible	xpath=//*[@id="btnOp2"]
        Click Button   xpath=//*[@id="btnOp2"]
        Wait Until Element Is Visible	xpath=//*[@id="nit"]
        Input Text      xpath=//*[@id="nit"]     ${person}[nit]
        sleep  1s
        Input Text      xpath=//*[@id="fistName"]     ${person}[firstName]
        sleep  1s
        Input Text      xpath=//*[@id="middleName"]     ${person}[middleName]
        sleep  1s
        Input Text      xpath=//*[@id="lastName1"]    ${person}[lastName1]
        sleep  1s
        Input Text      xpath=//*[@id="lastName2"]    ${person}[lastName2]
        sleep  1s
        ${date_string} =    Convert Date    ${person}[birthdate]    result_format=%m-%d-%Y
        @{date_parts}=    Split String    ${date_string}    -
        ${joined_date}=    Evaluate    ''.join(${date_parts})   
        Input Text      xpath=//*[@id="birthday"]     ${joined_date}
        sleep  1s
        Input Text      xpath=//*[@id="phoneNumber"]   ${person}[phoneNumber]
        sleep  1s
        Input Text      xpath=//*[@id="email"]   ${person}[email]
        sleep  1s
        Click Button   xpath=//*[@id="btnCreate"]	
        sleep  3s
        Close Browser        
    END

Buscar un usuario por NIT
    ${resp}=    Call Get Request    ${HEADERS}    ${API_URL}    /person
    #Log    ${resp}[status_code]
    Should Be Equal As Integers    ${resp}[status_code]    200
    ${people} =    Query    SELECT * FROM public."People";    \    True
    #Log   ${people[0]}[userName]
    FOR    ${person}    IN    @{people}
        Open Browser    ${PAGE_URL}    chrome
        sleep  2s	   
        Login    ${person}[userName]     ${USER_PASSWORD}
        Wait Until Element Is Visible	xpath=//*[@id="btnOp1"]
        Click Button   xpath=//*[@id="btnOp1"]
        Wait Until Element Is Visible	xpath=//*[@id="nit"]
        Input Text      xpath=//*[@id="nit"]     ${person}[nit]
        sleep  1s
        Click Button   xpath=//*[@id="btnSearch"]	
        sleep  3s
        Close Browser
    END