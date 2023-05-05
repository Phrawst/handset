# handset

# initial docker

1. Create container for mongodb

~~~
docker run --rm --name mongodb -p 27017:27017 \
        -e MONGO_INITDB_ROOT_USERNAME=mongo \
        -e MONGO_INITDB_ROOT_PASSWORD=passwd \
        -v mongo_volume:/data/db -d mongo
~~~
2. Access container with command
~~~
docker exec -it mongodb bash
~~~
3. Access mongodb with mongosh
~~~
mongosh
~~~
4. Authen root user
&nbsp;4.1 Swith to admin database
~~~
use admin
~~~
&nbsp;4.2 then use the following command to authen the root user
~~~
db.auth("mongo","passwd")
~~~
5. Create new database
~~~
use warehouse
~~~
6. Add user to warehouse database
~~~
db.createUser({user : "test",pwd: "1234",roles: [ { role: "readWrite", db:"warehouse"}]})
~~~
7. Create new collection named "handsets"
~~~
db.createCollection("handsets")
~~~
8. add mock-up data to handsets collection
~~~
db.handsets.insertOne({
  "id": "456",
  "brand": "Samson",
  "model": "Galaxy S21",
  "price": 10000,
  "discount": "50%"
  "discounted_price": "5000",
  "color": "Phantom Black",
  "storage": "256 GB",
  "spec": {
    "display": "Dynamic AMOLED 2X",
    "screen_width": "1080",
    "screen_height": "2400"
  }
}) 

~~~

#initial node js
1. Install node modules
~~~
npm i
~~~
2. Build project
~~~
npm run build
~~~
3. run services with 
~~~
npm run start
~~~
