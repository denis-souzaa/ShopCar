using System;
using System.Runtime.CompilerServices;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.Service.Services
{
    public class ProposalService : ServiceBase<Proposal>, IProposalService
    {
        private readonly IProposalRepository _proposalRepository;

        public ProposalService(IRepository<Proposal> repository, IProposalRepository proposalRepository) : base(repository)
        {
            _proposalRepository = proposalRepository;
        }

        public new Proposal Update(Proposal obj)
        {
            var proposal = _proposalRepository.Get(x => x.Id == obj.Id);

            if(proposal == null)
                throw  new Exception("Não foi possível atualizar, proposta não encontrada");

            proposal.VehicleId = obj.VehicleId;
            proposal.Amount = obj.Amount;
            proposal.Client = obj.Client;
            proposal.DateProposal = obj.DateProposal;

            return _proposalRepository.Update(proposal);
        }
    }
}