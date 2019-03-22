using System;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.Service.Services
{
    public class VehicleService : ServiceBase<Vehicle>, IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleService(IRepository<Vehicle> repository, IVehicleRepository vehicleRepository) : base(repository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public new Vehicle Update(Vehicle obj)
        {
            var car = _vehicleRepository.Get(x => x.Id == obj.Id);

            if(car == null)
                throw  new Exception("Não foi possível atualizar, veiculo não encontrado.");

            car.BrandId = obj.BrandId;
            car.Model = obj.Model;
            car.Price = obj.Price;
            car.Sold = obj.Sold;
            car.Year = obj.Year;

            return _vehicleRepository.Update(car);
        }

        public void UpdateSale(int id)
        {
            var car = _vehicleRepository.Get(x => x.Id == id);

            if (car == null)
                throw new Exception("Não foi possível atualizar o status, veiculo não encontrado.");

            car.Sold = !car.Sold;

            _vehicleRepository.Update(car);
        }
    }
}