using Microsoft.EntityFrameworkCore.Migrations.Operations;
using ShopCar.Domain.Entities;

namespace ShopCar.Domain.Interfaces.Services
{
    public interface ICarService : IService<Car>
    {
        void UpdateSale(int id);
    }
}