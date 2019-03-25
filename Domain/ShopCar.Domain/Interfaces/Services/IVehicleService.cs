using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using ShopCar.Domain.Entities;

namespace ShopCar.Domain.Interfaces.Services
{
    public interface IVehicleService : IService<Vehicle>
    {
        IList<Vehicle> GetAll(string term, string order, int skip, int take);
        int Count(string term);
        void UpdateSale(int id);

        IList<Vehicle> GetAllNotSold(string term);

    }
}