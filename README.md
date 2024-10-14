</br>
<hr style="height: 5px;background: #007500;margin: 20px 0;box-shadow: 0px 3px 5px 0px rgb(204 204 204);">

<div align="center">
 
</div>
  
<div align="center"><img src="./public/images/1cover.png"></div>

## Project Structure

NOT IMPLEMENTED

## WhatsApp-Api-NodeJs

With this one you can create multiservice chats, service bots or any other system that uses whatsapp. With this code you don't need to know javascript for nodejs , just start the server and make the language requests that you feel most comfortable with.

## Infrastructure

### 1. Docker installation

- First, let's install Docker. Docker is a platform that allows us to quickly create, test and deploy applications in isolated environments called containers.

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ${USER}
```

### 2. Installing the database

> PostgreSql [required]

- Now, we have configured our PostgreSQL database using Docker Compose.
- Access your postgre manager and create a database.

[compose from postgres](./postgres/docker-compose.yaml)

### 3. Nvm installation

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

> After finishing, restart the terminal to load the new information.

#### 3.1 Nodejs installation

- Installing Node.js using NVM, a version manager that allows us to switch between different versions of Node.js easily.

```sh
nvm install 20
```

### 4. pm2 installation

```sh
npm i -g pm2
```

### 5. Application startup

Cloning the Repository

```
git clone https://github.com/code-chat-br/whatsapp-api.git
```

Go to the project directory and install all dependencies.

> Give preference to **npm** as it has greater compatibility.

```sh
cd whatsapp-service

npm install
# or
npm install --force
```

### 6. Environment variables

See additional settings that can be applied through the **env** file by clicking **[here](./.env.dev)**.

> **⚠️Attention⚠️:** copy the **.env.dev** file to **.env**.

```sh
cp .env.example .env
```

### 7. Prism ORM

- We're going to use Prisma ORM to manage our database. Prisma simplifies database access and ensures operations are secure and easy to maintain.
- **Commands and Explanations:**
  - **In development environment: npx prisma migrate dev**
    - We use `migrate dev` in development to automatically create and apply migrations, making working with the database easier.
  - **In production environment: npx prisma migrate deploy**
    - In production, we use `migrate deploy` to apply migrations in a controlled and secure way.
  - **Data visualization:** `npx prisma studio`
    - Prisma Studio is a visual tool that helps us manage and visualize bank data in an intuitive way.

Define the environment variable for the database deployment.

- Performing the database [deployment](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#migrate-deploy).

```sh
bash deploy_db.sh
```

Finally, run the command below to start the application:

```sh
npm run start:dev

npm run start:prod

# pm2
pm2 start 'npm run start:prod' --name ZazuChat_API_v1.3.0
```

---

## Worker

To use the worker with the API it is necessary to define the following environment variables in the API:

- `PROVIDER_ENABLED=true`: This variable enables the use of the provider (worker) in the API.
- `PROVIDER_HOST=127.0.0.1`: Defines the host where the worker is listening for requests.
- `PROVIDER_PORT=5656`: Defines the port where the worker is listening for requests.
- `PROVIDER_PREFIX=codechat`: Set prefix for instance grouping on worker

---

## WebSocket

websocket compatibility added.
[Read here.](./src/websocket/Readme.md)

## Swagger - OpenAPI 3.0.0

- Route: `http://localhost:8084/docs`
- YAML file: [swagger.yaml](./src/docs/swagger.yaml)

## Authentication

You can define two authentication **types** for the routes in the **[env file](./env.dev)**.
Authentications must be inserted in the request header.

1. **jwt:** A JWT is a standard for authentication and information exchange defined with a signature.

> Authentications are generated at instance creation time.

**Note:** There is also the possibility to define a global api key, which can access and control all instances.

### App in Docker

- [docker-compose](./docker-compose.yml)
- [DockerHub-codechat/api:develop](https://hub.docker.com/r/codechat/api/tags)

After building the application, in the same directory as the files above, run the following command:

```sh
docker-compose up
```

## Send Messages

|                                                                             |                        |
| --------------------------------------------------------------------------- | ---------------------- |
| Send Text                                                                   | ✔                      |
| Send Buttons                                                                | ✔ only \[ios,android\] |
| Send Media: audio - video - image - document - gif <br></br>base64: `false` | ✔                      |
| Send Media File                                                             | ✔                      |
| Send Audio type WhatsApp                                                    | ✔                      |
| Send Audio type WhatsApp - File                                             | ✔                      |
| Send Location                                                               | ✔                      |
| Send List                                                                   | ✔ only \[ios,android\] |
| Send Link Preview                                                           | ❌                     |
| Send Contact                                                                | ✔                      |
| Send Reaction - emoji                                                       | ✔                      |
