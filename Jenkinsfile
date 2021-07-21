pipeline {
    agent any 
    environment {
        BACKEND_FOLDER = ""
        DOCKERHUB_CREDENTIALS = credentials('rodolfato-dockerhub')
        FIREBASE_PROJECT_ID = credentials('firebase-project-id')
        FIREBASE_PRIVATE_KEY_ID = credentials('firebase-private-key-id')
        FIREBASE_CLIENT_EMAIL = credentials('firebase-client-email')
        FIREBASE_CLIENT_ID = credentials('firebase-client-id')
        FIREBASE_PRIVATE_KEY = credentials('firebase-private-key')
        FIREBASE_CLIENT_X509_CERT_URL = credentials('firebase-client-x509-cert-url')
        FIREBASE_STORAGEBUCKET = credentials('firebase-storageBucket')
    }
    stages {
        stage("Inicio del Pipeline") {
            steps {
                echo "Iniciando Pipeline: ${env.JOB_NAME}" 
            }
        }
        stage("Creacion de container de aplicacion y subida a dockerhub"){
            steps{
                dir("${env.WORKSPACE}"){
                    echo 'Ejecutando Dockerfile'
                    sh 'docker build -t rodolfato/microservicio3 .'
                }
                dir("${env.WORKSPACE}"){
                    echo 'Login a Dockerhub'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
                dir("${env.WORKSPACE}"){
                    echo 'Push imagen a Dockerhub'
                    sh 'docker push rodolfato/microservicio3'
                }
            }
        }
        stage("Fin del Pipeline") {
            steps {
                echo "Finalizando Pipeline: ${env.JOB_NAME}" 
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}