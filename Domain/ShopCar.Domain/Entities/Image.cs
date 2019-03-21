namespace ShopCar.Domain.Entities
{
    public class Image : EntityBase
    {
        public string Path { get; set; }
        public string Owner { get; set; }
        public string ContentType { get; set; }
        public string Description { get; set; }
    }
}