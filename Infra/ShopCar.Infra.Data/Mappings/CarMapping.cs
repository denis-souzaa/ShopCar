using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopCar.Domain.Entities;

namespace ShopCar.Infra.Data.Mappings
{
    public class CarMapping : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> builder)
        {
            builder.ToTable("Car");

            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Year).IsRequired();
            builder.Property(x => x.BrandId).IsRequired();
            builder.Property(x => x.Price).IsRequired();

            builder.HasOne(x => x.Brand);
        }
    }
}
