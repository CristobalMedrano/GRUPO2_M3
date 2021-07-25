pipeline {
    agent any 
    environment {
        BACKEND_FOLDER = ""
        DOCKERHUB_CREDENTIALS = credentials('rodolfato-dockerhub')
        DO_SERVER_IP = credentials('do-server-ip')
        DO_SERVER_USR = credentials('do-server-username')
        DOCKER_COMPOSE_M3 = credentials('DOCKER_COMPOSE_M3')
        BASH_SCRIPT_M3 = credentials('bash-script-m3')
        FIREBASE_FILE = credentials('firebase-full-file')
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
                    sh 'rm -f src/firebase.js'
                    sh 'cp $FIREBASE_FILE src/'
                }
                dir("${env.WORKSPACE}"){
                    echo 'Ejecutando Dockerfile'
                    sh 'docker build --build-arg REACT_APP_IP_HOST=$DO_SERVER_IP -f Dockerfile.prod -t rodolfato/microservicio3-nginx:$GIT_COMMIT -t rodolfato/microservicio3-nginx .'
                }
                dir("${env.WORKSPACE}"){
                    echo 'Login a Dockerhub'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
                dir("${env.WORKSPACE}"){
                    echo 'Push imagen a Dockerhub'
                    sh 'docker push rodolfato/microservicio3-nginx'
                    sh 'docker push rodolfato/microservicio3-nginx:$GIT_COMMIT'
                }
            }
        }
        stage("Deployment"){
            steps{
                sshagent(credentials: ['DO_DEPLOYMENT_SERVER']){
                    sh 'echo Corriendo aplicacion en DigitalOcean'
                    sh 'ssh -o StrictHostKeyChecking=no $DO_SERVER_USR@$DO_SERVER_IP rm -f /opt/deployments/docker-compose-m3.yml'
                    sh 'scp $DOCKER_COMPOSE_M3 $DO_SERVER_USR@$DO_SERVER_IP:/opt/deployments'
                    sh 'scp $BASH_SCRIPT_M3 $DO_SERVER_USR@$DO_SERVER_IP:/opt/deployments'
                    sh 'ssh -o StrictHostKeyChecking=no $DO_SERVER_USR@$DO_SERVER_IP bash /opt/deployments/m3_script.sh $GIT_COMMIT $DO_SERVER_IP'
                    sh 'ssh -o StrictHostKeyChecking=no $DO_SERVER_USR@$DO_SERVER_IP rm /opt/deployments/m3_script.sh -f'
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
            sh 'docker system prune -f'
        }
    }
}