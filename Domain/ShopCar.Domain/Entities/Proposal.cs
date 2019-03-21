using System;

namespace ShopCar.Domain.Entities
{
    public class Proposal : EntityBase
    {
        public DateTime DateProposal { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
        public Decimal Amount { get; set; }
        public string Client { get; set; }
    }
}