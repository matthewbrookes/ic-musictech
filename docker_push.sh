docker login -u ${DOCKER_HUB_LOGIN} -p ${DOCKER_HUB_PASSWORD}
docker build -t icmusictech/website .
docker push icmusictech/website

cd server
docker build -t icmusictech/server .
docker push icmusictech/server
