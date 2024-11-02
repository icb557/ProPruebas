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
Resource    ../resources/crud.res.robot
*** Variables ***
${DBHost}         localhost
${DBName}         ProPruebas
${DBPass}         1234
${DBPort}         5432
${DBUser}         ProPruebas
${USER_PASSWORD}    P@ssw0rd
${PAGE_URL}    http://localhost:4200/

*** Test Cases ***
Crear usuarios
    API get calling
    ${admin} =    Query    SELECT * FROM public."People" where nit = '4444444444';    \    True
    ${people} =    Query    SELECT * FROM public."TestUsers" where "testCase" = 'create' and happy = true;    \    True
    Open Browser    ${PAGE_URL}    chrome
    sleep  2s	   
    Login    ${admin[0]}[userName]     ${USER_PASSWORD}
    FOR    ${person}    IN    @{people}
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
        #chromium
        ${date_string} =    Convert Date    ${person}[birthdate]    result_format=%m-%d-%Y
        @{date_parts}=    Split String    ${date_string}    -
        ${joined_date}=    Evaluate    ''.join(${date_parts})   
        Input Text      xpath=//*[@id="birthday"]     ${joined_date}
        #chromium

        #firefox
        # ${date_string} =    Convert Date    ${person}[birthdate]    result_format=%Y-%m-%d
        # Input Text    xpath=//*[@id="birthday"]    ${date_string}
        #firefox
        sleep  1s
        Input Text      xpath=//*[@id="phoneNumber"]   ${person}[phoneNumber]
        sleep  1s
        Input Text      xpath=//*[@id="email"]   ${person}[email]
        sleep  1s
        Click Button   xpath=//*[@id="btnCreate"]	
        Wait Until Element Is Visible	xpath=//*[@id="createSuccess"]
        Element Should Be Visible   xpath=//*[@id="createSuccess"]
        sleep  3s
    END
    Close Browser  

Buscar usuarios
    API get calling
    ${admin} =    Query    SELECT * FROM public."People" where nit = '4444444444';    \    True
    ${people} =    Query    SELECT * FROM public."People";    \    True
    #Log   ${people[0]}[userName]
    Open Browser    ${PAGE_URL}    chrome
    sleep  2s	   
    Login    ${admin[0]}[userName]     ${USER_PASSWORD}
    FOR    ${person}    IN    @{people}
        Search user    ${person}[nit]
        Sleep    2s
        Click Button   xpath=//*[@id="btnExit"]
        Sleep    2s
    END
    Close Browser

Actualizar usuarios
    API get calling
    ${admin} =    Query    SELECT * FROM public."People" where nit = '4444444444';    \    True
    ${people} =    Query    SELECT * FROM public."TestUsers" where "testCase" = 'update' and happy = true;    \    True
    Open Browser    ${PAGE_URL}    chrome
    sleep  2s	   
    Login    ${admin[0]}[userName]     ${USER_PASSWORD}
    FOR    ${person}    IN    @{people}
        Search user    ${person}[nit]
        Sleep    1s
        Click Button   xpath=//*[@id="btnEdit"]
        Sleep    1s
        Wait Until Element Is Visible	xpath=//*[@id="nit"]
        Input Text      xpath=//*[@id="fistName"]     ${person}[firstName]
        sleep  1s
        Input Text      xpath=//*[@id="middleName"]     ${person}[middleName]
        sleep  1s
        Input Text      xpath=//*[@id="lastName1"]    ${person}[lastName1]
        sleep  1s
        Input Text      xpath=//*[@id="lastName2"]    ${person}[lastName2]
        sleep  1s
        #chromium
        ${date_string} =    Convert Date    ${person}[birthdate]    result_format=%m-%d-%Y
        @{date_parts}=    Split String    ${date_string}    -
        ${joined_date}=    Evaluate    ''.join(${date_parts})   
        Input Text      xpath=//*[@id="birthday"]     ${joined_date}
        #chromium

        #firefox
        # ${date_string} =    Convert Date    ${person}[birthdate]    result_format=%Y-%m-%d
        # Input Text    xpath=//*[@id="birthday"]    ${date_string}
        #firefox
        sleep  1s
        Input Text      xpath=//*[@id="phoneNumber"]   ${person}[phoneNumber]
        sleep  1s
        Input Text      xpath=//*[@id="email"]   ${person}[email]
        sleep  1s
        Click Button   xpath=//*[@id="btnEdit"]
        Wait Until Element Is Visible	xpath=//*[@id="updateSuccess"]
        Element Should Be Visible   xpath=//*[@id="updateSuccess"]
        Sleep  3s
        Click Button   xpath=//*[@id="btnExit"]
        Sleep    2s
    END
    Close Browser

Eliminar usuarios
    API get calling
    ${admin} =    Query    SELECT * FROM public."People" where nit = '4444444444';    \    True
    ${people} =    Query    SELECT * FROM public."TestUsers" where "testCase" = 'delete' and happy = true;    \    True
    Open Browser    ${PAGE_URL}    chrome
    sleep  2s	   
    Login    ${admin[0]}[userName]     ${USER_PASSWORD}
    FOR    ${person}    IN    @{people}
        Search user    ${person}[nit]
        Sleep    2s
        Click Button   xpath=//*[@id="btnDelete"]
        Wait Until Element Is Visible	xpath=//*[@id="deleteSuccess"]
        Element Should Be Visible   xpath=//*[@id="deleteSuccess"]
        Sleep    1s
    END
    Close Browser
    