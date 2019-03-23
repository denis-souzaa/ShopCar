using System;

namespace ShopCar.Domain.Entities
{
    public class Authentication
    {
        public string Token { get; set; }
        public DateTime DateExpirationToken { get; set; }
        public string UserName { get; set; }
    }
}
