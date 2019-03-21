using System;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.Service.Services
{
    public class CarService : ServiceBase<Car>, ICarService
    {
        private readonly ICarRepository _carRepository;

        public CarService(IRepository<Car> repository, ICarRepository carRepository) : base(repository)
        {
            _carRepository = carRepository;
        }

        public new Car Update(Car obj)
        {
            var car = _carRepository.Get(x => x.Id == obj.Id);

            if(car == null)
                throw  new Exception("Não foi possível atualizar, veiculo não encontrado.");

            car.BrandId = obj.BrandId;
            car.Name = obj.Name;
            car.Price = obj.Price;
            car.Sold = obj.Sold;
            car.Year = obj.Year;

            return _carRepository.Update(car);
        }

        public void UpdateSale(int id)
        {
            var car = _carRepository.Get(x => x.Id == id);

            if (car == null)
                throw new Exception("Não foi possível atualizar o status, veiculo não encontrado.");

            car.Sold = !car.Sold;

            _carRepository.Update(car);
        }
    }
}