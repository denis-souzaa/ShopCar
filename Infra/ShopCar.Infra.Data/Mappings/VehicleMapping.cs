using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopCar.Domain.Entities;

namespace ShopCar.Infra.Data.Mappings
{
    public class VehicleMapping : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.ToTable("Vehicle");

            builder.Property(x => x.Model).IsRequired();
            builder.Property(x => x.Year).IsRequired();
            builder.Property(x => x.BrandId).IsRequired();
            builder.Property(x => x.Price).IsRequired();

            builder.HasOne(x => x.Brand);
        }
    }
}
