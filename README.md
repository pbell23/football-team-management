# Football Team Management API Deployment

## Requirements

- Docker
- Kubernetes cluster
- kubectl configured to interact with your Kubernetes cluster

## Building the Image

Build the Docker image using:

```bash
docker build -t yourusername/football-manager-api .
```

## Deploying to Kubernetes

To deploy the Football Team Management API to a Kubernetes cluster, run the following commands:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

This will deploy the application and expose it through a LoadBalancer or ClusterIP service.

## Accessing the Application

After deploying, get the IP address of the service with:

```bash
kubectl get svc football-manager-api
```
