using Microsoft.AspNetCore.Mvc;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.UI.Controllers
{
    [Route("api/marca")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var list = _brandService.GetAll();

            return Ok(list);
        }
    }
}