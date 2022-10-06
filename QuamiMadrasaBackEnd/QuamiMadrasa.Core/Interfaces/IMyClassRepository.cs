using Microsoft.AspNetCore.Identity;
using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IMyClassRepository
    {
        Task<MyClass> GetClassById(int id);
        Task<List<MyClass>> GetAllClasses();
        Task<MyClass> AddClass(MyClass _class);
        Task<bool> DeleteClass(int id);
        Task<MyClass> UpdateClass(MyClass _class);
    }
}
