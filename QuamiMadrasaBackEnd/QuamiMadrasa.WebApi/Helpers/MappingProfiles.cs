using AutoMapper;
using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.WebApi.DTOs;

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

            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<MyClass, MyClassDto>().ReverseMap();
            CreateMap<Section, SectionDto>().ReverseMap();
            CreateMap<Staff, StaffDto>().ReverseMap();
            CreateMap<EmployeeType, EmployeeTypeDto>().ReverseMap();

        }
    }
}
