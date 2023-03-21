# How to run project
To run this project just need to run following docker compose command in project root folder.

```
docker-compose up -d --build
```


# Structure of project

The system designed as little microservice and the best practice is to implement it via serverless framework and lambda function, but, here I implemented it via different docker. 
Each docker has `/health`, `/` (give info about service), `/metrics` and  etc route for monitoring and observation purpose as we haven't cloud watch. 
You can find structure of the project in the following:
```
- addressIndexer: A service to index each address which is inside transaction, this service will trigger by transaction, token and webApp
- block-indexer: A service to fetch latest minted block on the network or fetch pervious archived block to index blocks. This service will trigger transaction service.
- init-mongo: To create default user for mongo DB
- lib-indexer: shared library between services
- tokenIndexer: to index all transaction related to a token, it will triggered by transaction service and will trigger address service. 
- transactionIndexer: to index all transaction happened in a block, it will trigger token and address service. 
- webApp: this service has API interface to fetch address information
- Entity management.jpg: entity relationship diagram to show the relationship between models
- system design.jpg: Architect of whole system
```

# TO-DO
[x] listen for new block minted on network
[] index a block which minted perviously or just mint in the network
[] extract transactions from block and trigger event for it
[] digest transactions and trigger token and address services
[] aggregate addresses and show all input, output or calling function
[] aggregate all token transaction to show calling and transaction history
[] connect webApp to read from address and token service
