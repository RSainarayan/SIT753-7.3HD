pipeline {
  agent any

  environment {
    REGISTRY = "ghcr.io/youruser"
    IMAGE = "node-ci-demo"
    TAG = "${env.BUILD_NUMBER}"
    SONARQUBE_SERVER = "SonarQube" // Jenkins global config name
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t $IMAGE:$TAG .'
      }
    }

    stage('Test') {
      steps {
        sh 'npm ci'
        sh 'npm test -- --coverage'
        junit allowEmptyResults: true, testResults: 'junit.xml'
        publishHTML(target: [
          allowMissing: true,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'coverage/lcov-report',
          reportFiles: 'index.html',
          reportName: 'Coverage'
        ])
      }
    }

    stage('Code Quality') {
      steps {
        withSonarQubeEnv("${env.SONARQUBE_SERVER}") {
          sh 'echo "sonar scan placeholder (configure sonar-scanner or maven gradle as needed)"'
        }
      }
    }

    stage('Security') {
      steps {
        sh 'echo "Run Trivy or Snyk here"'
        sh 'echo "trivy image $IMAGE:$TAG || true"'
        sh 'echo "snyk test || true"'
      }
    }

    stage('Push Image') {
      when {
        expression { return env.CHANGE_ID == null } // skip on PRs
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'ghcr-creds', usernameVariable: 'USER', passwordVariable: 'TOKEN')]) {
          sh 'echo $TOKEN | docker login ghcr.io -u $USER --password-stdin'
          sh 'docker tag $IMAGE:$TAG $REGISTRY/$IMAGE:$TAG'
          sh 'docker push $REGISTRY/$IMAGE:$TAG'
          sh 'docker tag $REGISTRY/$IMAGE:$TAG $REGISTRY/$IMAGE:latest'
          sh 'docker push $REGISTRY/$IMAGE:latest'
        }
      }
    }

    stage('Deploy (Staging)') {
      steps {
        sh 'TAG=$TAG docker compose -f docker-compose.staging.yml up -d'
      }
    }

    stage('Release (Prod placeholder)') {
      steps {
        sh 'echo "Promote image to prod via IaC/ArgoCD/CodeDeploy here"'
      }
    }

    stage('Monitoring') {
      steps {
        sh 'sleep 2 && curl -fsS http://localhost:8080/health || (docker logs $(docker ps -q --filter name=api) && exit 1)'
      }
    }
  }

  post {
    always {
      sh 'docker images | head -n 10 || true'
    }
  }
}
