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
    public class SubjectRepository : ISubjectRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Subject> _genericRepository;
        public SubjectRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Subject> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Subject> AddSubject(Subject Subject)
        {
           await _quamiMadrasaContext.AddAsync(Subject);
             _quamiMadrasaContext.SaveChanges();
            return Subject;
        }

        public async Task<bool> DeleteSubject(int id)
        {
            var Subject = await _genericRepository.GetByIdAsync(id);

            if(Subject != null)
            {
                _genericRepository.Delete(Subject);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Subject>> GetAllSubjects()
        {
            var Subjects = await _genericRepository.GetAllAsync();

            return Subjects.ToList();
        }

        public async Task<Subject> GetSubjectById(int id)
        {
            var Subject = await _genericRepository.GetByIdAsync(id);

            return Subject;
        }

        public async Task<Subject> UpdateSubject(Subject Subject)
        {
            var stu = await _genericRepository.GetByIdAsync(Subject.Id);

            stu.Name = Subject.Name;
            stu.CreatedAt = DateTime.UtcNow;
            stu.UpdatedAt = DateTime.UtcNow;
            stu.MyClassId = Subject.MyClassId;
            stu.TeacherId = Subject.TeacherId;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
