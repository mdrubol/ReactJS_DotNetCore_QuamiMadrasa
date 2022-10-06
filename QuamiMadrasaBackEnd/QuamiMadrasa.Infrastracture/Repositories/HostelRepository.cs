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
    public class HostelRepository : IHostelRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Hostel> _genericRepository;
        public HostelRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Hostel> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Hostel> AddHostel(Hostel hostel)
        {
           await _quamiMadrasaContext.AddAsync(hostel);
             _quamiMadrasaContext.SaveChanges();
            return hostel;
        }

        public async Task<bool> DeleteHostel(int id)
        {
            var hostel = await _genericRepository.GetByIdAsync(id);

            if(hostel != null)
            {
                _genericRepository.Delete(hostel);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Hostel>> GetAllHostels()
        {
            var hostels = await _genericRepository.GetAllAsync();

            return hostels.ToList();
        }

        public async Task<Hostel> GetHostelById(int id)
        {
            var hostel = await _genericRepository.GetByIdAsync(id);

            return hostel;
        }

        public async Task<Hostel> UpdateHostel(Hostel hostel)
        {
            var stu = await _genericRepository.GetByIdAsync(hostel.Id);

            stu.Name = hostel.Name;
            stu.CreatedAt = DateTime.UtcNow;
            stu.UpdatedAt = DateTime.UtcNow;
            stu.Description = hostel.Description;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
