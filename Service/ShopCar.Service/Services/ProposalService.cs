using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.Service.Services
{
    public class ProposalService : ServiceBase<Proposal>, IProposalService
    {
        public ProposalService(IRepository<Proposal> repository) : base(repository)
        {
        }
    }
}