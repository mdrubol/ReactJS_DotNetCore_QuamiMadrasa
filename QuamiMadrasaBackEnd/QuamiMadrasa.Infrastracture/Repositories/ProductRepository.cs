using Microsoft.EntityFrameworkCore;
using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.Infrastracture.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Infrastracture.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public QuamiMadrasaDBContext _StoreContext;
        public ProductRepository(QuamiMadrasaDBContext storeContext)
        {
            _StoreContext = storeContext;
        }
        public async Task<IReadOnlyList<Products>> GetListOfproduct()
        { 
            return  _StoreContext.Products
                .Include(p=>p.ProductType)
                .Include(b=>b.ProductBrand)
                .ToList();
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandAsync()
        {
            return _StoreContext.ProductBrands.ToList();
        }

        public async Task<Products> GetProductByIdAsync(int Id)
        {
            var obj = await _StoreContext.Products
                .Include(p => p.ProductType)
                .Include(b => b.ProductBrand)
                 .FirstOrDefaultAsync(x=>x.Id==Id);
            return obj;
        }

        public async Task<IReadOnlyList<ProductType>> GetProductsTypeAsync()
        {
            return _StoreContext.ProductTypes.ToList();
        }
    }
}
