using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CryptoHelper;
using Microsoft.IdentityModel.Tokens;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.Service.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly string _jwtSecret;
        private readonly int _jwtLifeSpan;

        public AuthenticationService(string jwtSecret, int jwtLifeSpan)
        {
            _jwtSecret = jwtSecret;
            _jwtLifeSpan = jwtLifeSpan;
        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyHashPassword(string password, string passwordHash)
        {
            return Crypto.VerifyHashedPassword(passwordHash, password);
        }

        public Authentication GetToken(string userName)
        {
            var createdDate = DateTime.Now;
            var expirationTime = createdDate + TimeSpan.FromSeconds(_jwtLifeSpan);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name,userName)
                }),
                NotBefore = createdDate,
                Expires = expirationTime,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret)),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            return new Authentication { Token = token, DateExpirationToken = new DateTime(2019,4,30), UserName = "Administrador"};
        }

        public bool ValidLogin(string username, string password)
        {
            var passwordHash = HashPassword("123456");

            var passwordIsValid = VerifyHashPassword(password, passwordHash);

            return username == "admin" && passwordIsValid;
        }
    }
}
