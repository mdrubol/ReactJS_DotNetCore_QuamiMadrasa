using Microsoft.AspNetCore.Identity;
using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IStaffRepository
    {
        Task<Staff> GetStaffById(int id);
        Task<List<Staff>> GetAllStaffs();
        Task<Staff> AddStaff(Staff student);
        Task<bool> DeleteStaff(int id);
        Task<Staff> UpdateStaff(Staff student);
        Task<List<Staff>> GetAllTeachers();
        Task<List<EmployeeType>> GetEmployeeTypes();
    }
}
