# INSTALLATION MANUAL

This manual will provide you with step-by-step instructions on how to get this application running on your own local machine along with the _Postgres_ database.

## Advanced Users

This web application runs as a _Next.js_ server and utilizes a Postgres database to store long-term data. If you know what you are doing, you may follow this quick start guide:

**QUICK START**:

- Clone this repository to your machine and install dependencies by executing `npm i` in repository root, next to `package.json`.

- Get an empty Postgres database running. Use _Docker_ or whatever you like. Change the `DATABASE_URL` environment variable accordingly within `.env`.

- Run the application with `npm run dev`.

## Not-So-Advanced Users

### Cloning The Repository

Get your hands on the source code by cloning this repository to your local machine by executing

```
git clone https://github.com/joonarafael/unsecure-software.git
```

If you do not have `git` as a command in your terminal, you may also download the codebase as a ZIP-folder from [this site](https://github.com/joonarafael/unsecure-software/releases "Unsecure Software Releases"). GitHub Desktop users may also retrieve the repository, and its contents, with the help of the desktop application.

### Opening Directory in Terminal

Open a new terminal instance at the newly downloaded repository or otherwise navigate into it.

Linux and MacOs users can navigate in their file system with `cd unsecure-software` natively within the terminal.

For Windows users, it's suggested to switch to a _Bash_ terminal. New _Visual Studio Code_ installations will have a Bash terminal ready-to-go out of the box. In a Bash terminal the `cd` command will work the same as for Linux and MacOS users.

If you're running on Windows and a Bash terminal instance is not an option for you, you will have to figure out another way to open a terminal instance. An option to open it in _PowerShell_ might appear for you by right-clicking the directory.

### Docker

To make life easier, let's just run the server and the database as isolated containers on your machine. We need only one thing locally installed, and that is [Docker](https://www.docker.com/ "Docker").

If you do not yet have Docker installed, follow the installation instructions regardless of the OS of your choice, found on [this site](https://www.docker.com/get-started/ "Docker - Get Started"). If you get stuck, or need more assistance with the installation procedure, please consult the extensive Docker Documentation behind [this link](https://docs.docker.com/desktop/ "Overview of Docker Desktop").

The Internet and YouTube are also full of short informative installation guides and videos to help you get going.

**NOTE!** All commands provided here later will run in your terminal regardless of the OS, if you've got the _Docker CLI client_ installed on your machine. The CLI client will install automatically when downloading and installing the _Docker Desktop_ bundle. However, only the CLI client is required to proceed.

### Create Docker Network

Initialize a Docker network to create a bridge for the two individual Docker containers to get them communicate with each other.

```
docker network create unsecurenetwork
```

### The Database

Get the Postgres database running as a Docker container by executing

```
docker run --name postgres-container -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d --network=unsecurenetwork postgres
```

When running the first time, it might take some time to first download the image (as it probably won't find it locally) and then start the container.

**Some possible errors you might encounter are:**

- _Address already in use_: There is already a process running on your machine that occupies port number 5432. Either kill the process or change the outgoing port number (latter of the two, after colon) for the new Docker container. Doing this, however, means that the environment variable for the `DATABASE_URL` (within the file called `.env` at project root) (**OR** the `docker run` command argument) has to be changed accordingly. Change the port number within the `DATABASE_URL` environment variable. It is set as `5432` as default.

- _Container name already in use_: There already exists a Docker container with the same exact name on your local machine. Either remove it (if it's redundant) or give a differing name for the new container. The name in question is the argument after `--name` flag the within the command provided above. It's `postgres-container` as default.

### Docker Tips

Check all running Docker containers with `docker ps -a` and all images with `docker images`.

Any container can be stopped with `docker stop [container]` and deleted with `docker rm [container]`.

Any image can be deleted wih `docker rmi [image:version]`.

Any Docker network can be deleted with `docker network rm [network]`.

### Create The Docker Image For The Server

Create the Docker image for the server out of the source code within this repository by executing

```
docker build -f Dockerfile.dev -t unsecureapp .
```

After a successful creation of the Docker image, launch it with

```
docker run --name application-container -it -p 3000:3000 -e DATABASE_URL="postgresql://postgres:mysecretpassword@postgres-container:5432/postgres?schema=SCHEMA" --network=unsecurenetwork unsecureapp
```

If you had to change the port number for your Postgres database instance, please adjust the default port number within the command argument above. Default is 5432.

Now open the web browser of your choice and navigate to [localhost:3000](http://localhost:3000 "Your localhost:3000").
