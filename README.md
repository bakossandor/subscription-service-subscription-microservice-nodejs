# Subscription Service - Subscribers Microservice
## Description
Users Owner Microservice:
- can register subscribers to the relevant newsletters
- can unsubscribe the subscribers frome the relevant newsletters

## Routes
|METHOD|ROUTE                       |REQUEST BODY                               |DESCRIPTION              |
|------|----------------------------|-------------------------------------------|-------------------------|
|POST  |/subscribe/:uri             |{ first_name, last_name, email}            |Register a new subscriber|
|DELETE|/unsubscribe/:uri           |{ email }                                  |Delete a subscriber      |

## ENV variables
|NAME      |description              |
|----------|-------------------------|
|PGHOST    |postgre sql host         |
|PGUSER    |postgre sql username     |
|PGDATABASE|postgre sql database name|
|PGPASSWORD|postgre sql password     |
|PGPORT    |postgre sql port         |