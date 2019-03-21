using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Infra.Data.Context;

namespace ShopCar.Infra.Data.Repository
{
    public class CarRepository : RepositoryBase<Car>, ICarRepository
    {
        public CarRepository(ShopCarContext dbContext) : base(dbContext)
        {
        }
    }
}