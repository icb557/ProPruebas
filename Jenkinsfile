pipeline {
  agent any
  stages {
    stage('pre-build') {
      steps {
        git(url: 'https://github.com/icb557/ProPruebas.git', branch: 'main', credentialsId: 'jenkins-github')
        withSonarQubeEnv(installationName: 'sq1', credentialsId: 'jenkins-sonar')
      }
    }

  }
}