using QuamiMadrasa.Core.Entities;
 
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id); 
        void DeleteAsync(T entity);
        void UpdateAsync(T entity);

        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);

    }
}
