![image](image.png)

# Abstract
`k8s-test-microservice` is a nodejs server
packed in a Docker container that shows the hostname and provides endpoints
to play around with Kubernetes features. The default port is 3000.
By default `k8s-test-microservice` provides two endpoints with HTTP code 200.
*
That can be changed by setting a path variable with the desired return code.

This service is already available at Docker Hub as `x86_64` and `arm64`.
* [rilleralle/k8s-test-microservice](https://hub.docker.com/r/rilleralle/k8s-test-microservice/)
* [rilleralle/k8s-test-microservice-arm64](https://hub.docker.com/r/rilleralle/k8s-test-microservice-arm64/)

## Start container with default endpoints
```bash
docker run -p 3000:3000 rilleralle/k8s-test-microservice
```

## Start container with individual endpoints
Define your own endpoints via environment variable `ENDPOINTS`

Pattern "endpoint1:defaultHttpCode1,endpoint2:defaultHttpCode2"
```bash
docker run -p 3000:3000 -e ENDPOINTS="foo:200,bar:250,baz:400" rilleralle/k8s-test-microservice
```

| Endpoint           | Description                                                                               |
|--------------------|-------------------------------------------------------------------------------------------|
| /                  | This page                                                                                 |
| /exit/status?      | Stops the server<br>Optional parameter status is exit code. Default is 0                     |
| /liveness:status?  | Current return HTTP code is '200'<br>Optional parameter status will set new HTTP status code |
| /readiness:status? | Current return HTTP code is '200'<br>Optional parameter status will set new HTTP status code |
|                    |                                                                                           |

# What can I do with it?
Kubernetes is a great tool for container orchestration and it is very popular.
However, I realized that a lot of people do not really understand how
powerful a microservice architecture can be in real live, even for tech people.
You can use this service for demonstration purposes.

## Show scaling
As you know, you can create multiple pods that can be accessed via one service.
Deploy `k8s-test-microservice` and access the service and you will see
that the response was send by different pods because you can see the hostname
of the answering pod.

## Show self healing
As you know, Kubernetes can check the status of a pod via accessing
the endpoint `/liveness`. If the HTTP response code is 200 everything
is fine. But if the response is 400 Kubernetes will restart the pod.
By default the HTTP code for endpoint `/liveness` is 200. You can change
the code by calling endpoint `/liveness/400` for example. From now on
the HTTP status will be 400.

Use the `kill` endpoint to kill the node server.
