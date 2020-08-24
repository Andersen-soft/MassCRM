#!/bin/bash
#docker network create --driver bridge masscrm
#docker-compose -f db-compose.yaml down
docker-compose -f docker-compose.yaml down
sudo chown -R 1000:1000 ./logs/
#sudo chown -R 1000:1000 ./postgres-db/