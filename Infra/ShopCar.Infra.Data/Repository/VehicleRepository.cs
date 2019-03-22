using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Infra.Data.Context;

namespace ShopCar.Infra.Data.Repository
{
    public class VehicleRepository : RepositoryBase<Vehicle>, IVehicleRepository
    {
        public VehicleRepository(ShopCarContext dbContext) : base(dbContext)
        {
        }
    }
}