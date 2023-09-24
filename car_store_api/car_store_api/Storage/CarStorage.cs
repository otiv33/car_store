using car_store_api.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;

namespace car_store_api.Storage
{
    public class CarStorage : IStorage<Car>
    {
        private CarStoreDbContext _context;
        public CarStorage(CarStoreDbContext context)
        {
            _context = context;
        }

        public Car? GetById(int id)
        {
            return _context.Cars.FirstOrDefault(x => x.Id == id);
        }

        public List<Car> GetAll(int pageSize, int pageNumber)
        {
            List<Car> list = _context.Cars.ToList();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
        }

        public Car Insert(Car car)
        {
            car.Id = null;
            _context.Cars.Add(car);
            _context.SaveChanges();
            return car;
        }

        public Car? Update(Car car)
        {
            if (Exists(car.Id))
            {
                _context.Cars.Update(car);
                _context.SaveChanges();
                return car;
            }
            else
                throw new Exception("Car with this id does not exist");
        }
        public Car? DeleteById(int id)
        {
            Car? car = _context.Cars.FirstOrDefault(x => x.Id == id);
            if (Exists(id))
            {
                _context.Cars.Remove(car);
                _context.SaveChanges();
                return car;
            }
            else
                throw new Exception("Car with this id does not exist");
        }

        private bool Exists(int? id)
        {
            if(id == null)
                return false;
            Car? car = _context.Cars.FirstOrDefault(x => x.Id == id);
            _context.ChangeTracker.Clear();
            return car != null;
        }
    }
}
