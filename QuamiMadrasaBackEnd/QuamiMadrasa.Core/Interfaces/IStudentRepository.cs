using Microsoft.AspNetCore.Identity;
using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IStudentRepository
    {
        Task<Student> GetStudentById(int id);
        Task<List<Student>> GetAllStudents();
        Task<Student> AddStudent(Student student);
        Task<bool> DeleteStudent(int id);
        Task<Student> UpdateStudent(Student student);
    }
}
