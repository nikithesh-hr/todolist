service mongod start
nvm use 12
source dev.sh
nodemon --inspect=127.0.0.1:9223 -e js server
