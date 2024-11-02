*** Settings ***
Documentation       casos de prueba para el inicio de sesión
Suite Setup       Connect To Database    psycopg2    ${DBName}    ${DBUser}    ${DBPass}    ${DBHost}    ${DBPort}
Suite Teardown    Disconnect From Database

Library    SeleniumLibrary
Library    DatabaseLibrary

*** Variables ***
${DBHost}         localhost
${DBName}         ProPruebas
${DBPass}         1234
${DBPort}         5432
${DBUser}         ProPruebas
${USER_PASSWORD}    P@ssw0rd
${PAGE_URL}    http://localhost:4200/

*** Keywords ***
Login
    [Arguments]    ${username}     ${password}    ${happy}    ${assertionArg}=Welcome!
    Open Browser    ${PAGE_URL}    chrome
    sleep  2s
    Wait Until Element Is Visible    xpath=//*[@id="username"]
    Input Text    xpath=//*[@id="username"]    ${username}
    sleep  1s
    Wait Until Element Is Visible    xpath=//*[@id="password"]
    Input Text    xpath=//*[@id="password"]    ${password}
    sleep  1s
    Click Button    xpath=//*[@id="btnLogin"]
    sleep  1s
    IF    ${happy} == ${True}
        Page Should Contain    ${assertionArg}
    ELSE
        Wait Until Element Is Visible    ${assertionArg}
        Element Should Be Visible    ${assertionArg}
    END 
    Close Browser

*** Test Cases ***
Login exitoso
    ${people} =    Query    SELECT * FROM public."TestUsers" where "testCase" = 'login' and happy = true;    \    True
    Login    ${people[0]}[userName]    ${people[0]}[password]   ${True}
    
Usuario incorrecto
    ${people} =    Query    SELECT * FROM public."TestUsers" where "testCase" = 'login' and happy = false;    \    True
    ${assertionArg}=    Set Variable    //*[@id="usernameError"]
    Login    ${people[0]}[userName]    ${people[0]}[password]   ${False}    ${assertionArg}

Contraseña incorrecta
    ${people} =    Query    SELECT * FROM public."TestUsers" where "testCase" = 'login' and happy = false;    \    True
    ${assertionArg}=    Set Variable    //*[@id="passwordError"]
    Login    ${people[1]}[userName]    ${people[1]}[password]   ${False}    ${assertionArg}    

Campos vacios
    ${people} =    Query    SELECT * FROM public."TestUsers" where "testCase" = 'login' and happy = false;    \    True
    ${assertionArg}=    Set Variable    //*[@id="usernameError"]
    Login    ${people[2]}[userName]    ${people[2]}[password]   ${False}    //*[@id="usernameError"]

usuario no registrado
    ${people} =    Query    SELECT * FROM public."TestUsers" where "testCase" = 'login' and happy = false;    \    True
    ${assertionArg}=    Set Variable    //*[@id="loginError"]
    Login    ${people[3]}[userName]    ${people[3]}[password]   ${False}    //*[@id="loginError"]