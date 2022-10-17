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
    public class HeadRepository : IHeadRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Head> _genericRepository;
        public HeadRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Head> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Head> AddHead(Head Head)
        {
           await _quamiMadrasaContext.AddAsync(Head);
             _quamiMadrasaContext.SaveChanges();
            return Head;
        }

        public async Task<bool> DeleteHead(int id)
        {
            var Head = await _genericRepository.GetByIdAsync(id);

            if(Head != null)
            {
                _genericRepository.Delete(Head);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Head>> GetAllHeads()
        {
            var Heads = await _genericRepository.GetAllAsync();

            return Heads.ToList();
        }

        public async Task<Head> GetHeadById(int id)
        {
            var Head = await _genericRepository.GetByIdAsync(id);

            return Head;
        }

        public async Task<Head> UpdateHead(Head Head)
        {
            var stu = await _genericRepository.GetByIdAsync(Head.Id);

            stu.Name = Head.Name;
            stu.CreatedAt = DateTime.UtcNow;
            stu.UpdatedAt = DateTime.UtcNow;
            stu.Type = Head.Type;
            stu.IsDebit = Head.IsDebit;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
