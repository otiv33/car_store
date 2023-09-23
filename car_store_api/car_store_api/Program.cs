using car_store_api;
using car_store_api.Auth;
using car_store_api.Models;
using car_store_api.Storage;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// DI
builder.Services.AddDbContext<CarStoreDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetSection("ConnectionString").Value)
);
builder.Services.AddTransient<IStorage<Car>, CarStorage>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Global exception middleware
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication(); // Add authentication middleware

app.MapControllers();

app.Run();
