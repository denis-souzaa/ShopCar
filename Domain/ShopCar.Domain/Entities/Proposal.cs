using System;

namespace ShopCar.Domain.Entities
{
    public class Proposal : EntityBase
    {
        public DateTime DateProposal { get; set; }
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        public decimal Amount { get; set; }
        public string Client { get; set; }
    }
}