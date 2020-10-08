#!/bin/bash
docker-compose -f docker-compose.yaml down
sudo chown -R 1000:1000 ./logs/
#sudo chown -R 1000:1000 ./postgres-db/