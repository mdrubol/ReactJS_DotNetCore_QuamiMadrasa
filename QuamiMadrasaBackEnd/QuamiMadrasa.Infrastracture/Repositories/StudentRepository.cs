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
    public class StudentRepository : IStudentRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Student> _genericRepository;
        public StudentRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Student> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Student> AddStudent(Student student)
        {
           await _quamiMadrasaContext.AddAsync(student);
             _quamiMadrasaContext.SaveChanges();
            return student;
        }

        public async Task<bool> DeleteStudent(int id)
        {
            var student = await _genericRepository.GetByIdAsync(id);

            if(student != null)
            {
                _genericRepository.Delete(student);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Student>> GetAllStudents()
        {
            var students = await _quamiMadrasaContext.Students.Include(s => s.MyClass)
                .Include(s => s.Hostel).ToListAsync();

            return students;
        }

        public async Task<Student> GetStudentById(int id)
        {
            var student = await _genericRepository.GetByIdAsync(id);

            return student;
        }

        public async Task<Student> UpdateStudent(Student student)
        {
            var stu = await _genericRepository.GetByIdAsync(student.Id);

            stu.Session = student.Session;
            stu.HostelRoomNo = student.HostelRoomNo;
            stu.AdmNo = student.AdmNo;
            stu.Age = student.Age;
            stu.CreatedAt = student.CreatedAt;
            stu.HostelId = student.HostelId;
            stu.MyClassId = student.MyClassId;
            stu.MyParentId = student.MyParentId;
            stu.YearAdmitted = student.YearAdmitted;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
