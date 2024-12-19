pipeline {
  agent any
  stages {
    stage('pre-build') {
      steps {
        git(url: 'https://github.com/icb557/ProPruebas.git', branch: 'main', credentialsId: 'jenkins-github')
        withSonarQubeEnv(installationName: 'sq1', credentialsId: 'jenkins-sonar')
      }
    }

    stage('build') {
      steps {
        bat(script: 'npm install', label: 'i', returnStatus: true)
      }
    }

    stage('tests') {
      agent any
      environment {
        SONARQUBE_SERVER = 'sq1'
        SONAR_SCANNER = 'sc1'
        NPM_REGISTRY = 'https://registry.npmjs.org/'
      }
      steps {
        bat(script: 'withSonarQubeEnv(SONARQUBE_SERVER) {                         def scannerHome = tool SONAR_SCANNER;                         bat """                         "${scannerHome}\\\\bin\\\\sonar-scanner.bat" ^                         -Dsonar.projectKey=ProPruebas ^                         -Dsonar.projectName=ProPruebas ^                         -Dsonar.sources=./BackEnd/src ^                         -Dsonar.exclusions=node_modules/** ^                         -Dsonar.language=javascript                         """                     }', returnStatus: true)
      }
    }

  }
}