using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Infra.Data.Context;

namespace ShopCar.Infra.Data.Repository
{
    public class VehicleRepository : RepositoryBase<Vehicle>, IVehicleRepository
    {
        private readonly ShopCarContext _dbContext;
        public VehicleRepository(ShopCarContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IList<Vehicle> GetAll(string term, string order, int skip, int take)
        {
            term = term?.ToLower() ?? "";
            return _dbContext.Set<Vehicle>().Include(x => x.Brand).Where(x => x.Brand.Name.Contains(term) ||
                                                                              x.Model.Contains(term))
                                                                            .OrderBy(order)
                                                                            .Skip(skip)
                                                                            .Take(take)
                                                                            .ToList();
        }

        public int Count(string term)
        {
            term = term?.ToLower() ?? "";
            return _dbContext.Set<Vehicle>().Include(x => x.Brand)
                .Count(x => x.Brand.Name.Contains(term) || x.Model.Contains(term));
        }

        public IList<Vehicle> GetAllNotSold(string term)
        {
            term = term?.ToLower() ?? "";
            return _dbContext.Set<Vehicle>().Include(x=>x.Brand).Where(x => !x.Sold && x.Model.Contains(term)).ToList();
        }
    }
}