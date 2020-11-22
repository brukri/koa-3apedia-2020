# koa-3apedia-2020

Introduction to node.js micro services with koa.js 

## Use REST API
### Get a customer
`curl --request GET \
   --url http://localhost:8080/customer/0001`
   
### Get all customers
`curl --request GET \
   --url http://localhost:8080/customer`
   
### Add a customer  
`curl --request PUT \
   --url http://localhost:8080/customer \
   --header 'Content-Type: application/json' \
   --data '{
   "id": "0003",
   "firstName": "Hans",
   "lastName": "Meier",
   "address": {
     "street": "Aargauerstrasse",
     "streetNo": "250",
     "zip": 8048,
     "city": "Zurich",
     "country": "Switzerland"
   }
 }'`
 
 ### Change address of a customer
 `curl --request PATCH \
    --url http://localhost:8080/customer/0001/address \
    --header 'Content-Type: application/json' \
    --data '{
  	"street": "Bulevar Mihajla Pupina",
  	"streetNo": "6",
  	"zip": "11000",
  	"city": "Belgrade",
  	"country": "Serbia"
  }'`
  
  
