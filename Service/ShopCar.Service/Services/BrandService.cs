using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.Service.Services
{
    public class BrandService : ServiceBase<Brand>, IBrandService
    {
        public BrandService(IRepository<Brand> repository) : base(repository)
        {
           
        }
    }
}