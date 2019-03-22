using Microsoft.EntityFrameworkCore.Migrations.Operations;
using ShopCar.Domain.Entities;

namespace ShopCar.Domain.Interfaces.Services
{
    public interface IVehicleService : IService<Vehicle>
    {
        void UpdateSale(int id);
    }
}