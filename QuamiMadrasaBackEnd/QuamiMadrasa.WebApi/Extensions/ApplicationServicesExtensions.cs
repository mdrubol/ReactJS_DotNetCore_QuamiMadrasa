using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using QuamiMadrasa.Application.CustomServices;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.Errors;
using QuamiMadrasa.Infrastracture.Data;
using QuamiMadrasa.Infrastracture.Repositories;
 
using System.Linq;

#nullable disable
namespace QuamiMadrasa.Controllers.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<QuamiMadrasaDBContext, QuamiMadrasaDBContext>();
            //services.AddScoped<StoreContextSeed, StoreContextSeed>();
            //services.AddScoped<IProductRepository, ProductRepository>();
            //services.AddScoped<ICustomerBasket, BasketRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            //services.AddScoped<IOrderService, OrderService>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.Configure<ApiBehaviorOptions>(options =>
              options.InvalidModelStateResponseFactory = ActionContext =>
              {
                  var error = ActionContext.ModelState
                              .Where(e => e.Value.Errors.Count > 0)
                              .SelectMany(e => e.Value.Errors)
                              .Select(e => e.ErrorMessage).ToArray();
                  var errorresponce = new APIValidationErrorResponce
                  {
                      Errors = error
                  };
                  return new BadRequestObjectResult(error);
              }
            );
            return services;
        }
    }
}
