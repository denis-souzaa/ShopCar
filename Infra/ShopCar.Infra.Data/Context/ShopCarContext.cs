using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShopCar.Domain.Entities;
using ShopCar.Infra.Data.Mappings;

namespace ShopCar.Infra.Data.Context
{
    public class ShopCarContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
            var config = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json")
                 .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Car>(new CarMapping().Configure);
            modelBuilder.Entity<Proposal>(new ProposalMapping().Configure);
            modelBuilder.Entity<Brand>(new BrandMapping().Configure);
            modelBuilder.Entity<Image>(new ImageMapping().Configure);
        }
    }
}