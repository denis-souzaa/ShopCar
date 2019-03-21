using System;

namespace ShopCar.Domain.Entities
{
    public class Car : EntityBase
    {
         public string Brand { get; set; }
         public int Year { get; set; }
         public Decimal Price { get; set; }
         public bool Sold { get; set; }
    }
}