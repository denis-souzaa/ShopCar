using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopCar.Domain.Entities;

namespace ShopCar.Infra.Data.Mappings
{
    public class BrandMapping : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            builder.ToTable("Brand");

            builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
        }
    }
}
