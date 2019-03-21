using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.Service.Services
{
    public class CarService : ServiceBase<Car>, ICarService
    {
        public CarService(IRepository<Car> repository) : base(repository)
        {
        }
    }
}