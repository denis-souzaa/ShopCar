using System.Collections.Generic;
using ShopCar.Domain.Entities;

namespace ShopCar.Domain.Interfaces.Repositories
{
    public interface IVehicleRepository : IRepository<Vehicle>
    {
        IList<Vehicle> GetAll(string term, string order, int skip, int take);
        int Count(string term);
        IList<Vehicle> GetAllNotSold(string term);
    }
}