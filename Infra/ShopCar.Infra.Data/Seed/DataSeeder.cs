using System.Collections.Generic;
using System.Linq;
using ShopCar.Domain.Entities;
using ShopCar.Infra.Data.Context;

namespace ShopCar.Infra.Data.Seed
{
    public class DataSeeder
    {
        private readonly ShopCarContext _dbContext;
        public DataSeeder(ShopCarContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            var listBrands = new List<Brand>
            {
                new Brand { Name = "Fiat" },
                new Brand { Name = "Chevrolet" },
                new Brand { Name = "Wolkswagem" },
                new Brand { Name = "Kia" },
                new Brand { Name = "Renault"},
                new Brand { Name = "Toyota"}
            };

            if (_dbContext.Set<Brand>().Any()) return;

            _dbContext.AddRange(listBrands);
            _dbContext.SaveChanges();

        }
    }
}
