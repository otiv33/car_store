:: For migrations
dotnet ef migrations add Migration1
dotnet ef database update
:: For running in PROD
dotnet run --environment "Production"