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
        DO_SERVER_IP = credentials('do-server-ip')
        DO_SERVER_USR = credentials('do-server-username')
        DOCKER_COMPOSE_M3 = credentials('DOCKER_COMPOSE_M3')
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
                    sh 'docker build -f Dockerfile.prod -t rodolfato/microservicio3-nginx .'
                }
                dir("${env.WORKSPACE}"){
                    echo 'Login a Dockerhub'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
                dir("${env.WORKSPACE}"){
                    echo 'Push imagen a Dockerhub'
                    sh 'docker push rodolfato/microservicio3-nginx'
                }
            }
        }
        stage("Deployment"){
            steps{
                sshagent(credentials: ['DO_DEPLOYMENT_SERVER']){
                    sh 'echo Corriendo aplicacion en DigitalOcean'
                    sh 'ssh -o StrictHostKeyChecking=no $DO_SERVER_USR@$DO_SERVER_IP rm -f /opt/deployments/docker-compose-m3.yml'
                    sh 'scp $DOCKER_COMPOSE_M3 $DO_SERVER_USR@$DO_SERVER_IP:/opt/deployments'
                    sh 'ssh -o StrictHostKeyChecking=no $DO_SERVER_USR@$DO_SERVER_IP docker-compose -f /opt/deployments/docker-compose-m3.yml up -d'
                    sh 'ssh -o StrictHostKeyChecking=no $DO_SERVER_USR@$DO_SERVER_IP rm -f /opt/deployments/docker-compose-m3.yml'
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