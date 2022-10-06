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
    public class SectionRepository : ISectionRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Section> _genericRepository;
        public SectionRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Section> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Section> AddSection(Section section)
        {
           await _quamiMadrasaContext.AddAsync(section);
             _quamiMadrasaContext.SaveChanges();
            return section;
        }

        public async Task<bool> DeleteSection(int id)
        {
            var section = await _genericRepository.GetByIdAsync(id);

            if(section != null)
            {
                _genericRepository.Delete(section);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Section>> GetAllSections()
        {
            var sections = await _genericRepository.GetAllAsync();

            return sections.ToList();
        }

        public async Task<Section> GetSectionById(int id)
        {
            var section = await _genericRepository.GetByIdAsync(id);

            return section;
        }

        public async Task<Section> UpdateSection(Section section)
        {
            var stu = await _genericRepository.GetByIdAsync(section.Id);

            stu.Name = section.Name;
            stu.CreatedAt = DateTime.UtcNow;
            stu.UpdatedAt = DateTime.UtcNow;
            stu.MyClassId = section.MyClassId;
            stu.TeacherId = section.TeacherId;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
