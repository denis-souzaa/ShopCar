using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Services;
using ShopCar.UI.ViewModels;

namespace ShopCar.UI.Controllers
{
    [Route("api/veiculos")]
    public class CarController : Controller
    {
        private readonly ICarService _carService;
        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public ActionResult Get([FromQuery] PaginationModel model)
        {
            var list = _carService.GetAll(x => x.Name, model.SearchTerm, "Name ASC", model.PageSize * (model.PageNumber - 1) , model.PageSize, x=>x.Brand);

            var totalItems = _carService.Count(x => x.Name, model.SearchTerm);

            var totalPages = (double)totalItems / model.PageSize;

            var result = new
            {
                Items = list.Select(x => new
                {
                    x.Id,
                    Brand = x.Brand?.Name,
                    x.Name,
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
            var car = _carService.Get(x => x.Id == id);

            return Ok(car);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Car model)
        {
            _carService.Insert(model);

            return Ok("Veiculo inserido com sucesso");
        }

        [HttpPut]
        public ActionResult Put([FromBody] Car model)
        {
            _carService.Update(model);

            return Ok("Veiculo atualizado com sucesso");
        }

        [HttpPatch("{id}")]
        public ActionResult Patch(int id)
        {
            _carService.UpdateSale(id);

            return Ok("O status do veiculo foi atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _carService.Delete(id);

            return Ok("Veiculo excluído com sucesso");
        }
    }
}
