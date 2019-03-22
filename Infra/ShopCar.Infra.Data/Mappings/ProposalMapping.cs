using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopCar.Domain.Entities;

namespace ShopCar.Infra.Data.Mappings
{
    public class ProposalMapping : IEntityTypeConfiguration<Proposal>
    {
        public void Configure(EntityTypeBuilder<Proposal> builder)
        {
            builder.ToTable("Proposal");

            builder.Property(x => x.Amount).IsRequired();
            builder.Property(x => x.Client).HasMaxLength(150).IsRequired();
            builder.Property(x => x.DateProposal).IsRequired();
            builder.Property(x => x.VehicleId).IsRequired();

            builder.HasOne(x => x.Vehicle);
        }
    }
}
