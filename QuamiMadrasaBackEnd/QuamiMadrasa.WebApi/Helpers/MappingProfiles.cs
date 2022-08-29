using AutoMapper;
using QuamiMadrasa.Core.Entities;
 

namespace QuamiMadrasa.Helpers
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            //CreateMap<Products, ProductDto>().
            //   ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            //  .ForMember(p => p.ProductType, pt => pt.MapFrom(p => p.ProductType.Name))
            //  .ForMember(p=>p.PictureUrl,pt=>pt.MapFrom<ProductUrlResolvers>());
            //CreateMap<Core.Entities.Identity.Address, AddressDto>();
            //CreateMap<CustomerBasket, CustomerbasketDto>();
            //CreateMap<BasketItem, BasketItemDto>();
            //CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
        }
    }
}
