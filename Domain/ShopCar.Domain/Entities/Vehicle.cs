using System.Collections;
using System.Collections.Generic;

namespace ShopCar.Domain.Entities
{
    public class Vehicle : EntityBase
    {
        public string Model { get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public bool Sold { get; set; }
        public virtual ICollection<Proposal> Proposal { get; set; }
    }
}