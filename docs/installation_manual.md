# INSTALLATION MANUAL

This manual will provide you with step-by-step instructions on how to get this application running on your own local machine along with the _Postgres_ database.

## Advanced Users

This web application runs as a _Next.js_ server and utilizes a Postgres database to store long-term data. If you know what you are doing, you may follow this quick start guide:

**QUICK START**:

- Clone this repository to your machine and install dependencies by executing `npm i` in repository root, next to `package.json`.

- Get an empty Postgres database running. Use _Docker_ or whatever you like. Change the `DATABASE_URL` environment variable accordingly within `.env`.

- Run the application with `npm run dev`.

## Not-So-Advanced Users

### Docker

To make life easier, let's just run the server and the database as isolated containers on your machine. We need only one thing for your machine installed, and that is [Docker](https://www.docker.com/ "Docker").

If you do not yet have Docker installed, follow the installation instructions regardless of the OS of your choice, found on [this site](https://www.docker.com/get-started/ "Docker - Get Started"). If you get stuck, or need more assistance with the installation procedure, please consult the extensive Docker Documentation behind [this link](https://docs.docker.com/desktop/ "Overview of Docker Desktop").

### Create Docker Network

Initialize a Docker network to create a bridge for the two individual Docker containers to get them communicate with each other.

```
docker network create unsecurenetwork
```

### Start The Database

Fetch the database and image and start it by executing

```
docker run --name postgres-container -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d --network=unsecurenetwork postgres
```

It might take some while to first download the image and then start the container. Some possible errors you might encounter are:

- _Address already in use_: There is already a process running on your machine that occupies port number 5432. Either kill the process or change the outgoing port number (latter of the two, after colon) for the new Docker container. Doing this, however, means that the environment variable for the `DATABASE_URL` (within the file called `.env` at project root ) has to be changed accordingly. Change the port number within the `DATABASE_URL` environment variable. It is set as `5432` as default.

- _Container name already in use_: There already exists a Docker container with the same exact name on your local machine. Either remove it (if it's redundant) or give a differing name for the new container. The name in question is the argument after `--name` flag the within the command provided above. It's `some-postgres` as default.

**Check all running Docker containers with**

```
docker ps -a
```

and all images with

```
docker images
```

**Any container can be stopped with**

```
docker stop [container]
```

**and deleted with**

```
docker rm [container]
```

**Any image can be deleted with**

```
docker rmi [image:version]
```

**Any Docker network can be deleted with**

```
docker network rm [network]
```

### Create The Docker Image

Create a Docker image out of this repository by executing

```
docker build -f Dockerfile.dev -t unsecureapp .
```

After a successful creation of the Docker image, launch it with

```
docker run --name application-container -it -p 3000:3000 -e DATABASE_URL="postgresql://postgres:mysecretpassword@postgres-container:5432/postgres?schema=SCHEMA" --network=unsecurenetwork unsecureapp
```

Now open the web browser of your choice and navigate to [localhost:3000](http://localhost:3000 "Your localhost:3000").
