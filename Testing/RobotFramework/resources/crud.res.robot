*** Settings ***
Documentation       casos de prueba transversales

Library    SeleniumLibrary
Library    Zoomba.APILibrary

*** Variables ***
${API_URL}    http://localhost:3000/api
&{HEADERS}     Content-Type=application/json      charset=UTF-8    Authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IklzYWNjb3IyIiwibml0IjoiMTIzNDU2Nzg5MCIsImlhdCI6MTcyOTgxMjkxNH0.K-VQr-gt94iPm2EB-695JG0BVm-B1kjwvsUeQk1N90I

*** Keywords ***
Login
    [Arguments]  ${username}  ${password}
    Wait Until Element Is Visible	xpath=//*[@id="username"]
    Input Text   xpath=//*[@id="username"]   ${username}
    sleep  1s
    Wait Until Element Is Visible	xpath=//*[@id="password"]
    Input Text   xpath=//*[@id="password"]  ${password}
    sleep  1s
    Click Button   xpath=//*[@id="btnLogin"]
    sleep  1s
    Page Should Contain    Welcome!

API get calling
    ${resp}=    Call Get Request    ${HEADERS}    ${API_URL}    /person
    Should Be Equal As Integers    ${resp}[status_code]    200
    
Search user
    [Arguments]  ${nit}    ${assertionArg}=User
    Wait Until Element Is Visible	xpath=//*[@id="btnOp1"]
    Click Button   xpath=//*[@id="btnOp1"]
    Wait Until Element Is Visible	xpath=//*[@id="nit"]
    Input Text      xpath=//*[@id="nit"]     ${nit}
    sleep  1s
    Click Button   xpath=//*[@id="btnSearch"]
    IF    ${assertionArg} == User
        Page Should Contain    ${assertionArg}
    ELSE
        Wait Until Element Is Visible    ${assertionArg}
        Element Should Be Visible    ${assertionArg}
    END 