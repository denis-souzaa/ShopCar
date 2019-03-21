using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Services;
using ShopCar.UI.ViewModels;

namespace ShopCar.UI.Controllers
{
    [Route("api/propostas")]
    public class ProposalController : Controller
    {
        private readonly IProposalService _proposalService;
        public ProposalController(IProposalService proposalService)
        {
            _proposalService = proposalService;
        }

        [HttpGet]
        public ActionResult Get([FromQuery] PaginationModel model)
        {
            var list = _proposalService.GetAll(x => x.Client, model.SearchTerm, "DateProposal ASC", model.PageSize * (model.PageNumber - 1), model.PageSize, x => x.Car, x=>x.Car.Brand);

            var totalItems = _proposalService.Count(x => x.Client, model.SearchTerm);

            var totalPages = (double)totalItems / model.PageSize;

            var result = new
            {
                Items = list.Select(x => new
                {
                    x.Id,
                    x.Car?.Name,
                    Brand = x.Car?.Brand?.Name,
                    x.Client,
                    x.Amount,
                    x.DateProposal
                }),
                TotalPages = (int)Math.Ceiling(totalPages),
                TotalItems = totalItems
            };

            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var car = _proposalService.Get(x => x.Id == id);

            return Ok(car);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Proposal model)
        {
            _proposalService.Insert(model);

            return Ok("Proposta inserida com sucesso");
        }

        [HttpPut]
        public ActionResult Put([FromBody] Proposal model)
        {
            _proposalService.Update(model);

            return Ok("Proposta atualizada com sucesso");
        }

       
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _proposalService.Delete(id);

            return Ok("Proposta excluída com sucesso");
        }
    }
}
