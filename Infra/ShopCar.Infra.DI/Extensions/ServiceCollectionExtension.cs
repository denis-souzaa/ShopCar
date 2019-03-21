using Microsoft.Extensions.DependencyInjection;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Domain.Interfaces.Services;
using ShopCar.Infra.Data.Context;
using ShopCar.Infra.Data.Repository;
using ShopCar.Service.Services;

namespace ShopCar.Infra.DI.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddServiceLayer(this IServiceCollection services){
            services.AddScoped(typeof(IRepository<>), typeof(RepositoryBase<>));
            services.AddScoped(typeof(IService<>), typeof(ServiceBase<>));

            services.AddScoped<ICarRepository, CarRepository>();
            services.AddScoped<ICarService, CarService>();

            services.AddScoped<IProposalRepository, ProposalRepository>();
            services.AddScoped<IProposalService, ProposalService>();

            return services;
        }

         public static IServiceCollection AddServiceInfra(this IServiceCollection services)
        {
            services.AddScoped<ShopCarContext>();

            return services;
        }
    }
}