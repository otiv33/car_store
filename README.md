# Car store
## car_store_web - Angular frontend
Kaj moramo imeti nameščeno:
* Node 18.16<br/>

Za zagon frontend rešitve poženemo ukaze v mapi ```/car_store_web```<br/>
Zagon za Angleško verzijo :<br/>
```sh
ng serve --configuration development --host=127.0.0.1 --open
```
Zagon za Angleško verzijo v produkcijskem načinu :<br/>
```sh
ng serve --configuration production --host=127.0.0.1 --open
```
Zagon za Slovensko verzijo :<br/>
```sh
ng serve --configuration si --host=127.0.0.1 --open
```
Zagon za Slovensko verzijo v produkcijskem načinu :<br/>
```sh
ng serve --configuration productionSI --host=127.0.0.1 --open
```

Za tesiranje poženemo ukaz : <br/>
```sh
ng test
```

URL do backend rešitve lahko nastavite tukaj:<br/>
```car_store_web/src/environments/environment.ts``` ali <br/>```car_store_web/src/environments/environment.prod.ts```

## car_store_api - .NET Backend
Kaj moramo imeti nameščeno:
* .NET 6<br/>

Za zagon backend rešitve poženemo ukaz v mapi `car_store_api/car_store_api`:<br/>
```sh
dotnet run
```
Za zagon backend rešitve v produkcijskem načinu izvedemo ukaz:<br/>
```sh
dotnet run environment=Production 
```

Za tesiranje se prestavimo na projekt `car_store_api/car_store_api_test`.<br/>
Teste poženemo z ukazom : <br/>
```sh
dotnet test
```

## Docker
Kaj moramo imeti nameščeno :
* Docker<br/>

Za kreiranje kontejnerjev poženemo ukaz v korenski mapi<br/>
Zagon spletne aplikacije in API :<br/>
```sh
docker compose up
```
Na naslovu http://localhost:81 bi morali dobiti API.<br/>
Na naslovu http://localhost:4200 bi morali dobiti spletno aplikacijo
