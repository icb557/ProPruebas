pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'sq1'
        SONAR_SCANNER = 'sc1'
        NPM_REGISTRY = 'https://registry.npmjs.org/'
    }

    stages {
        stage('Checkout Código') {
            steps {
                git branch: 'main', url: 'https://github.com/icb557/ProPruebas.git'
            }
        }

        stage('Instalación de Dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv(SONARQUBE_SERVER) {
                        def scannerHome = tool SONAR_SCANNER;
                        bat """
                        "${scannerHome}\\bin\\sonar-scanner.bat" ^
                        -Dsonar.projectKey=ProPruebas ^
                        -Dsonar.projectName=ProPruebas ^
                        -Dsonar.sources=./BackEnd/src ^
                        -Dsonar.exclusions=node_modules/** ^
                        -Dsonar.language=javascript
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            mail to: 'cortesbuitragoisac@gmail.com',
                subject: """Resultado del Pipeline: ${currentBuild.fullDisplayName}""", 
                body: """El pipeline ${env.JOB_NAME} con número de build ${env.BUILD_NUMBER} ha terminado con el estado: ${currentBuild.currentResult}. Consulta más detalles en: ${env.BUILD_URL}"""
            cleanWs()
        }
    }
}
