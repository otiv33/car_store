# Car store
## car_store_web - Angular frontend
Kaj moramo imeti nameščeno:
* Node 18.16<br/>

Zagon za Angleško verzijo :<br/>
```sh
ng serve --configuration development --host=127.0.0.1 --open
```
Zagon za Slovensko verzijo :<br/>
```sh
ng serve --configuration si --host=127.0.0.1 --open
```

## car_store_api - .NET Backend
Kaj moramo imeti nameščeno:
* .NET 6<br/>

Poženemo ukaz v mapi `car_store_api/car_store_api`:<br/>
```sh
dotnet run
```

## Docker
Kaj moramo imeti nameščeno :
* Docker<br/>

Zagon spletne aplikacije in API (ukaz poženemo v korenski mapi):<br/>
```sh
docker compose up
```
Na naslovu http://localhost:81 bi morali dobiti API.<br/>
Na naslovu http://localhost:4200 bi morali dobiti spletno aplikacijo
