Passo 1:
~/reverse-proxy-node/node$ docker run --rm -it -v $(pwd)/:/usr/src/app -p 3000:3000 node:15 bash
Unable to find image 'node:15' locally
15: Pulling from library/node
bfde2ec33fbc: Already exists 
787f5e2f1047: Already exists 
7b6173a10eb8: Already exists 
dc05be471d51: Already exists 
55fab5cadd3c: Already exists 
bd821d20ef8c: Already exists 
6041b69671c6: Already exists 
989c5d2d2313: Already exists 
4b57d41e8391: Already exists 
Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Status: Downloaded newer image for node:15
root@1791aedd1925:/# 

Passo 2:
root@1791aedd1925:/usr/src/app# npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (app) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /usr/src/app/package.json:

{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) 
npm notice 
npm notice New major version of npm available! 7.7.6 -> 8.5.4
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.5.4
npm notice Run npm install -g npm@8.5.4 to update!
npm notice 
root@1791aedd1925:/usr/src/app# 

Passo 3:
root@1791aedd1925:/usr/src/app# npm install express --save

added 50 packages, and audited 51 packages in 4s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
npm notice 
npm notice New major version of npm available! 7.7.6 -> 8.5.4
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.5.4
npm notice Run npm install -g npm@8.5.4 to update!
npm notice 
root@1791aedd1925:/usr/src/app# 

Passo 4:
Dockerfile:

FROM node:15

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD ["node","index.js"]

Passo 5:
~/reverse-proxy-node/node$ docker build -t torvicvasil/hello-express .
~/reverse-proxy-node/nginx$ docker run -p 3000:3000 torvicvasil/hello-express:latest
~/reverse-proxy-node/node$ docker push torvicvasil/hello-express

Passo 6:
~/reverse-proxy-node/nginx$ docker build -t torvicvasil/nginx:prod .

Passo 7:
~/reverse-proxy-node/nginx$ docker network create node-network

Passo 8:

Criar DB com docker-compose.yml

version: '3'

services:
    db:
        image: mysql:5.7
        command: --innodb-use-native-aio=0
        container_name: db
        restart: always
        tty: true
        volumes: 
        - ./mysql:/var/lib/mysql
        environment: 
        - MYSQL_DATABASE=nodedb
        - MYSQL_ROOT_PASSWORD=root
        networks: 
        - node-network
networks: 
  node-network:
    driver: bridge

~/reverse-proxy-node$ docker-compose up -d --build
~/reverse-proxy-node$ docker exec -it db bash

root@0ee305877de0:/# mysql -uroot -p
Enter password: root
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.37 MySQL Community Server (GPL)

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| nodedb             |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql> create table people(id int not null auto_increment, name varchar(255), primary key(id));
Query OK, 0 rows affected (0.05 sec)

mysql> desc people;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| name  | varchar(255) | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
2 rows in set (0.00 sec)




Refs.:

https://ashwin9798.medium.com/nginx-with-docker-and-node-js-a-beginners-guide-434fe1216b6b
https://stackoverflow.com/questions/18134411/cannot-find-module-mysql-node-js