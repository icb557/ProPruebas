*** Settings ***
Documentation       Inicio de sesión ingresando usuario y contraseña

Library    SeleniumLibrary

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

Search user
    [Arguments]  ${nit}
    Wait Until Element Is Visible	xpath=//*[@id="btnOp1"]
    Click Button   xpath=//*[@id="btnOp1"]
    Wait Until Element Is Visible	xpath=//*[@id="nit"]
    Input Text      xpath=//*[@id="nit"]     ${nit}
    sleep  1s
    Click Button   xpath=//*[@id="btnSearch"]
    Page Should Contain    User