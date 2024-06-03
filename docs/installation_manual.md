# INSTALLATION MANUAL

This manual will provide you with step-by-step instructions on how to get this application running on your own local machine along with the _Postgres_ database for long-term storage.

### Cloning The Repository

Get your hands on the source code by cloning this repository to your local machine by executing

```
git clone https://github.com/joonarafael/unsecure-software.git
```

If you do not have `git` as a command in your terminal, you may also download the codebase as a ZIP-folder from [this site](https://github.com/joonarafael/unsecure-software/releases "Unsecure Software Releases"). GitHub Desktop users may also retrieve the repository with the help of their desktop application.

### Docker

To make life easier, let's just run the server and the database as isolated containers on your machine. We need only one thing locally installed, and that is [Docker](https://www.docker.com/ "Docker").

If you do not yet have Docker installed, follow the installation instructions regardless of the OS of your choice, found on [this site](https://www.docker.com/get-started/ "Docker - Get Started"). If you get stuck, or need more assistance with the installation procedure, please consult the extensive Docker Documentation behind [this link](https://docs.docker.com/desktop/ "Overview of Docker Desktop").

Linux users can install Docker using the _snap_ package manager by executing `sudo snap install docker` in the terminal.

The Internet and YouTube are also full of short informative installation guides and videos to help you get going.

**NOTE!** All commands provided here later will run in your terminal regardless of the OS, if you've got the _Docker CLI client_ installed on your machine. The CLI client will install automatically when downloading and installing the _Docker Desktop_ bundle. However, only the CLI client is required to proceed.

### Opening Directory in Terminal

Open a new terminal instance in the newly downloaded repository **or** otherwise navigate into it.

Bash terminal users (like Linux and MacOS) users can navigate with `cd unsecure-software` natively within the terminal.

### Launch The Database and Application With Docker Compose

To launch both the _Postgres_ database and the application, execute the following command in the terminal:

```
docker compose up --build -d
```

The setup and launch might take a moment, be patient, the `npm i` command might take literally many minutes to complete.

If you encounter a problem with the command above, and you are prompted with an error message like "**Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock**", you should read [this thread post](https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket "DigitalOcean - How to fix docker: Got permission denied while trying to connect to the Docker daemon socket").

Connect to the application by opening your web browser and navigating to [localhost:3000](http://localhost:3000 "Your localhost:3000"), or whatever the correct port is for your `application-container` Docker container (check designated port numbers with `docker ps`).

The port number is listed below the `PORTS` column. The default port number is `3000`, but it will be automatically assigned to a free port on your machine if port `3000` is already in use. For example, one time on my machine the port assignment looked like this: `0.0.0.0:32769->3000/tcp, :::32769->3000/tcp`. I reached the application then from [localhost:32769](http://localhost:32769 "Your localhost:32769").

Sorry for not optimizing the Docker configuration properly (e.g. with a `.dockerignore` file), the image size is quite large. The image size could be reduced by excluding unnecessary files and directories from the image build process.

### Shutting The Application Down

To shut down the application and the database, execute the following command in the terminal:

```
docker compose down
```

### Some Useful Docker Tips

- Check all your Docker containers with `docker ps -a` and all images with `docker images`.

- List all Docker networks with `docker network ls`.

- Any container can be **first** stopped with `docker stop {container}` and **then** deleted with `docker rm {container}`.

- Any image can be deleted wih `docker rmi {image:version}`.

- Any Docker network can be deleted with `docker network rm {network}`.

### Rebuilding The Application

Make sure to completely rebuild the image after making changes to the source code for the fixed application. **Stop the running container**, **delete the old image** and execute again the same Docker command in the terminal:

```
docker compose up --build -d
```

If you can't see the changes, you're still running the old image. Stop the container, delete the image, and additionally delete Docker cache with `docker builder prune` to ensure a fresh build. Build the image again with command above.
