namespace ShopCar.Domain.Entities
{
    public class Car : EntityBase
    {
        public string Name { get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public bool Sold { get; set; }
        public virtual Proposal Proposal { get; set; }
    }
}