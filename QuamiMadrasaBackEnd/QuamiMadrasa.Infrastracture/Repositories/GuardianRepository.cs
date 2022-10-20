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
    public class GuardianRepository : IGuardianRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Guardian> _genericRepository;
        public GuardianRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Guardian> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Guardian> AddGuardian(Guardian Guardian)
        {
           await _quamiMadrasaContext.AddAsync(Guardian);
             _quamiMadrasaContext.SaveChanges();
            return Guardian;
        }

        public async Task<bool> DeleteGuardian(int id)
        {
            var Guardian = await _genericRepository.GetByIdAsync(id);

            if(Guardian != null)
            {
                _genericRepository.Delete(Guardian);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Guardian>> GetAllGuardians()
        {
            var Guardians = await _genericRepository.GetAllAsync();

            return Guardians.ToList();
        }

        public async Task<Guardian> GetGuardianById(int id)
        {
            var Guardian = await _genericRepository.GetByIdAsync(id);

            return Guardian;
        }

        public async Task<Guardian> UpdateGuardian(Guardian Guardian)
        {
            var stu = await _genericRepository.GetByIdAsync(Guardian.Id);

            stu.FullName = Guardian.FullName;
            stu.UpdatedAt = DateTime.UtcNow;
            stu.MobileNo = Guardian.MobileNo;
            stu.Address = Guardian.Address;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
