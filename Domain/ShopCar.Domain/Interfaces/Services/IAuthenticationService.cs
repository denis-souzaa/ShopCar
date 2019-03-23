using System.ComponentModel.DataAnnotations;
using ShopCar.Domain.Entities;

namespace ShopCar.Domain.Interfaces.Services
{
    public interface IAuthenticationService
    {
        string HashPassword(string password);
        bool VerifyHashPassword(string password, string passwordHash);
        Authentication GetToken(string email);
        bool ValidLogin(string username, string password);
    }
}
