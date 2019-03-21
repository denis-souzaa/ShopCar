using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopCar.Domain.Entities;

namespace ShopCar.Infra.Data.Mappings
{
    public class ImageMapping : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.ToTable("Image");
            builder.Property(x => x.ContentType).IsRequired();
            builder.Property(x => x.Description).IsRequired();
            builder.Property(x => x.Owner).IsRequired();
            builder.Property(x => x.Path).IsRequired();
        }
    }
}
