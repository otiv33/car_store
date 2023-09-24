using car_store_api;
using car_store_api.Models;
using car_store_api.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Microsoft.VisualStudio.TestPlatform.ObjectModel;

namespace car_store_api_test
{
    public class CarControllerTests
    {
        public CarControllerTests() {
            
        }

        [Fact]
        public void CarStorage_GetById()
        {
            // Initialize cars
            var carDb = new Car { Id = 1, Name = "Car1", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };
            var carList = new List<Car> { carDb };

            var dbcOptions = new DbContextOptionsBuilder<CarStoreDbContext>()
                                .UseInMemoryDatabase(databaseName: "CarStorage_GetById").Options;
            using (var context = new CarStoreDbContext(dbcOptions))
            {
                context.Cars.AddRange(carList);
                context.SaveChanges();
                CarStorage storage = new CarStorage(context);
                CarController controller = new CarController(storage);

                // Call function

                IActionResult res = controller.GetById(1);

                // Request is Ok
                var okObjectResult = res as OkObjectResult;
                Assert.NotNull(okObjectResult);

                // Not null
                var car = okObjectResult.Value as Car;
                Assert.NotNull(car);

                // Check car props
                Assert.Equal(carDb.GetHashCode(), car.GetHashCode());
            }
        }

        [Fact]
        public void CarStorage_GetAll()
        {
            var car1 = new Car { Id = 1, Name = "Car1", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };
            var car2 = new Car { Id = 2, Name = "Car2", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };
            var car3 = new Car { Id = 3, Name = "Car3", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };
            var car4 = new Car { Id = 4, Name = "Car4", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };
            var car5 = new Car { Id = 5, Name = "Car5", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };
            List<Car> carList = new List<Car> { car1, car2, car3, car4, car5 };

            var dbcOptions = new DbContextOptionsBuilder<CarStoreDbContext>()
                                .UseInMemoryDatabase(databaseName: "CarStorage_GetAll").Options;
            using (var context = new CarStoreDbContext(dbcOptions))
            {
                context.Cars.AddRange(carList);
                context.SaveChanges();
                CarStorage storage = new CarStorage(context);
                var httpContext = HttpContextHelper.CreateHttpContext();
                CarController controller = new CarController(storage)
                {
                    ControllerContext = new ControllerContext{ HttpContext = httpContext }
                };
                controller.HttpContext.Request.Query = new QueryCollection(new Dictionary<string, StringValues>
                {
                    { "pageSize", "3" },
                    { "pageNumber", "2" },
                });
                // Call function
                IActionResult res = controller.GetAll();

                // Request is Ok
                var okObjectResult = res as OkObjectResult;
                Assert.NotNull(okObjectResult);

                // Not null
                var reqCarList = okObjectResult.Value as List<Car>;
                Assert.NotNull(carList);

                // Check
                Assert.Equal(2, reqCarList.Count);
                Assert.Equal(reqCarList[0].GetHashCode(), car4.GetHashCode());
                Assert.Equal(reqCarList[1].GetHashCode(), car5.GetHashCode());
            }
        }

        [Fact]
        public void CarStorage_Insert()
        {
            var car1 = new Car { Id = 1, Name = "Car1", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };

            var dbcOptions = new DbContextOptionsBuilder<CarStoreDbContext>()
                                .UseInMemoryDatabase(databaseName: "CarStorage_Insert").Options;
            using (var context = new CarStoreDbContext(dbcOptions))
            {
                CarStorage storage = new CarStorage(context);
                CarController controller = new CarController(storage);

                // Call function
                IActionResult res = controller.Insert(car1);

                // Request is Ok
                var okObjectResult = res as OkObjectResult;
                Assert.NotNull(okObjectResult);

                // Not null
                var car = okObjectResult.Value as Car;
                Assert.NotNull(car);

                // Check
                Assert.Equal(car.GetHashCode(), car1.GetHashCode());
            }
        }

        [Fact]
        public void CarStorage_Update()
        {
            var car1 = new Car { Id = 1, Name = "Car1", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };
            List<Car> carList = new List<Car> { car1 };

            var dbcOptions = new DbContextOptionsBuilder<CarStoreDbContext>()
                                .UseInMemoryDatabase(databaseName: "CarStorage_Update").Options;
            using (var context = new CarStoreDbContext(dbcOptions))
            {
                context.Cars.AddRange(carList);
                context.SaveChanges();
                CarStorage storage = new CarStorage(context);
                CarController controller = new CarController(storage);

                // Call function
                car1.Name = "Car1-Updated";
                IActionResult res = controller.Update(car1);

                // Request is Ok
                var okObjectResult = res as OkObjectResult;
                Assert.NotNull(okObjectResult);

                // Not null
                var car = okObjectResult.Value as Car;
                Assert.NotNull(car);

                // Check
                Assert.Equal(car.Name, car1.Name);
                Assert.Equal(car.GetHashCode(), car1.GetHashCode());
            }
        }

        [Fact]
        public void CarStorage_Delete()
        {
            var car1 = new Car { Id = 1, Name = "Car1", Color = "Black", Price = 100, SaleDate = new DateTime(), Year = 2000 };
            List<Car> carList = new List<Car> { car1 };

            var dbcOptions = new DbContextOptionsBuilder<CarStoreDbContext>()
                                .UseInMemoryDatabase(databaseName: "CarStorage_Delete").Options;
            using (var context = new CarStoreDbContext(dbcOptions))
            {
                context.Cars.AddRange(carList);
                context.SaveChanges();
                CarStorage storage = new CarStorage(context);
                CarController controller = new CarController(storage);

                Assert.Single(context.Cars.ToList());

                // Call function
                IActionResult res = controller.DeleteById(1);

                // Request is Ok
                var okObjectResult = res as OkObjectResult;
                Assert.NotNull(okObjectResult);

                // Not null
                var car = okObjectResult.Value as Car;
                Assert.NotNull(car);

                // Check
                Assert.Equal(car.GetHashCode(), car1.GetHashCode());
                Assert.Empty(context.Cars.ToList());
            }
        }
    }
}