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
    public class MyClassRepository : IMyClassRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<MyClass> _genericRepository;
        public MyClassRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<MyClass> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<MyClass> AddClass(MyClass myClass)
        {
           await _quamiMadrasaContext.AddAsync(myClass);
             _quamiMadrasaContext.SaveChanges();
            return myClass;
        }

        public async Task<bool> DeleteClass(int id)
        {
            var myClass = await _genericRepository.GetByIdAsync(id);

            if(myClass != null)
            {
                _genericRepository.Delete(myClass);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<MyClass>> GetAllClasses()
        {
            var myClasses = await _genericRepository.GetAllAsync();

            return myClasses.ToList();
        }

        public async Task<MyClass> GetClassById(int id)
        {
            var myClass = await _genericRepository.GetByIdAsync(id);

            return myClass;
        }

        public async Task<MyClass> UpdateClass(MyClass myClass)
        {
            var stu = await _genericRepository.GetByIdAsync(myClass.Id);

            stu.ClassType = myClass.ClassType;
            stu.Name = myClass.Name;
            stu.ClassTypeId = myClass.ClassTypeId;
            stu.CreatedAt = DateTime.UtcNow;
            stu.UpdatedAt = DateTime.UtcNow;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
