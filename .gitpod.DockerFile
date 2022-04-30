FROM gitpod/workspace-full
FROM gitpod/workspace-mongodb

RUN mkdir -p /workspace/mongodb/rs0-0  /workspace/mongodb/rs0-1 /workspace/mongodb/rs0-2
RUN mongod --replSet rs0 --port 27017 --bind_ip localhost --dbpath /workspace/mongodb/rs0-0  --oplogSize 128
RUN mongod --replSet rs0 --port 27018 --bind_ip localhost --dbpath /workspace/mongodb/rs0-1  --oplogSize 128
RUN mongod --replSet rs0 --port 27019 --bind_ip localhost --dbpath /workspace/mongodb/rs0-2 --oplogSize 128
