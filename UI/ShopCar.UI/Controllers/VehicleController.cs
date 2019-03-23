using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Services;
using ShopCar.UI.ViewModels;

namespace ShopCar.UI.Controllers
{
    [Route("api/veiculos")]
    [ApiController]
    [Authorize]
    public class VehicleController : Controller
    {
        private readonly IVehicleService _vehicleService;
        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        public ActionResult Get([FromQuery] PaginationModel model)
        {
            model.PageNumber = model.PageNumber == 0 ? 1 : model.PageNumber;

            var list = _vehicleService.GetAll(x => x.Model, model.SearchTerm, "Year ASC", model.PageSize * (model.PageNumber - 1) , model.PageSize, x=>x.Brand);

            var totalItems = _vehicleService.Count(x => x.Model, model.SearchTerm);

            var totalPages = (double)totalItems / model.PageSize;

            var result = new
            {
                Items = list.Select(x => new
                {
                    x.Id,
                    Brand = x.Brand?.Name,
                    Name = x.Model,
                    x.Year,
                    x.Price,
                    x.Sold
                }),
                TotalPages = (int)Math.Ceiling(totalPages),
                TotalItems = totalItems
            };

            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var car = _vehicleService.Get(x => x.Id == id);

            return Ok(car);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Vehicle model)
        {
            _vehicleService.Insert(model);

            return Ok("Veiculo inserido com sucesso");
        }

        [HttpPut]
        public ActionResult Put([FromBody] Vehicle model)
        {
            _vehicleService.Update(model);

            return Ok("Veiculo atualizado com sucesso");
        }

        [HttpPatch("{id}")]
        public ActionResult Patch(int id)
        {
            _vehicleService.UpdateSale(id);

            return Ok("O status do veiculo foi atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _vehicleService.Delete(id);

            return Ok("Veiculo excluído com sucesso");
        }
    }
}
