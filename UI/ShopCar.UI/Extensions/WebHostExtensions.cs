using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ShopCar.Infra.Data.Context;
using ShopCar.Infra.Data.Seed;

namespace ShopCar.UI.Extensions
{
    public static class WebHostExtensions
    {
        public static IWebHost SeedData(this IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetService<ShopCarContext>();

                // now we have the DbContext. Run migrations
                context.Database.Migrate();

                // now that the database is up to date. Let's seed
                new DataSeeder(context).Seed();
            }

            return host;
        }
    }
}
