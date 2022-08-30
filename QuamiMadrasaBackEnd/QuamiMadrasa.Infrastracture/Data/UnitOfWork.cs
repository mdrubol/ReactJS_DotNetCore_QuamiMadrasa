using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.Infrastracture.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Infrastracture.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly QuamiMadrasaDBContext _storeContext;
        private Hashtable _repositories;

        public UnitOfWork(QuamiMadrasaDBContext storeContext)
        {
            _storeContext = storeContext;
        }
        public async Task<int> Complete()
        {
            return await _storeContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _storeContext.Dispose();
        }

        public IGenericRepository<TEntity> repository<TEntity>() where TEntity : BaseEntity
        {
            if(_repositories == null ) _repositories= new Hashtable();
            var Type = typeof(TEntity).Name;
            if(!_repositories.ContainsKey(Type))
            {
                var repositiryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(
                    repositiryType.MakeGenericType(typeof(TEntity)),_storeContext);
                _repositories.Add(Type, repositoryInstance);
            }
            return (IGenericRepository<TEntity>)_repositories[Type];
        }
    }
}
