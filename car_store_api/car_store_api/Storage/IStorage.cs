using car_store_api.Models;

namespace car_store_api.Storage
{
    public interface IStorage<T>
    {
        public T? GetById(int id);
        public List<T> GetAll(int pageSize, int pageNumber);
        public T Insert(T car);
        public T? Update(T car);
        public T? DeleteById(int id);
    }
}
