using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Infra.Data.Context;

namespace ShopCar.Infra.Data.Repository
{
    public class BrandRepository : RepositoryBase<Brand>, IBrandRepository
    {
        public BrandRepository(ShopCarContext dbContext) : base(dbContext)
        {
        }
    }
}