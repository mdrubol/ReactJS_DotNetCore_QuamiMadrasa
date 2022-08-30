using Microsoft.EntityFrameworkCore;
using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.Core.Interfaces;
 using QuamiMadrasa.Infrastracture.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Infrastracture.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly QuamiMadrasaDBContext _storeContext;

        public GenericRepository(QuamiMadrasaDBContext storeContext)
        {
            _storeContext = storeContext;
        }
        public void DeleteAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            try
            {
                return await _storeContext.Set<T>().ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<T> GetByIdAsync(int id)
        {
            try
            {
                return await _storeContext.Set<T>().FindAsync(id);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }
       

        public void Add(T entity)
        {
            _storeContext.Add<T>(entity);
        }

        public void Update(T entity)
        {
            _storeContext.Attach<T>(entity);
            _storeContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _storeContext.Set<T>().Remove(entity);
        }

       
    }
}
