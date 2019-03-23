using Microsoft.AspNetCore.Mvc;
using ShopCar.Domain.Interfaces.Services;
using ShopCar.UI.ViewModels;

namespace ShopCar.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody]LoginViewModel model)
        {
            var loginIsValid = _authenticationService.ValidLogin(model.UserName, model.Password);

            if (!loginIsValid)
                return Unauthorized("Usuário ou senha inválido");

            return Ok(_authenticationService.GetToken(model.UserName));
        }
    }
}