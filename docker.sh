docker run -d -p 27017:27017 -v mongo:/data/db --name mongodb mongo:latest
docker exec -it mongodb bash
