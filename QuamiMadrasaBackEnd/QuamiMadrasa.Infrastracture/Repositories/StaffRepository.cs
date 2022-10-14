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
    public class StaffRepository : IStaffRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Staff> _genericRepository;
        public StaffRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Staff> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Staff> AddStaff(Staff Staff)
        {
           await _quamiMadrasaContext.AddAsync(Staff);
             _quamiMadrasaContext.SaveChanges();
            return Staff;
        }

        public async Task<bool> DeleteStaff(int id)
        {
            var Staff = await _genericRepository.GetByIdAsync(id);

            if(Staff != null)
            {
                _genericRepository.Delete(Staff);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Staff>> GetAllStaffs()
        {
            var Staffs = await _quamiMadrasaContext.Staffs.Include(s => s.EmployeeType)
                .ToListAsync();

            return Staffs;
        }

        public async Task<List<Staff>> GetAllTeachers()
        {
            var teachers = await _quamiMadrasaContext.Staffs.Where(c=> c.EmployeeTypeId == 1).Include(s => s.EmployeeType)
                .ToListAsync();

            return teachers;
        }

        public async Task<List<EmployeeType>> GetEmployeeTypes()
        {
            var empTypes = await _quamiMadrasaContext.EmployeeTypes.ToListAsync();

            return empTypes;
        }

        public async Task<Staff> GetStaffById(int id)
        {
            var Staff = await _genericRepository.GetByIdAsync(id);

            return Staff;
        }

        public async Task<Staff> UpdateStaff(Staff Staff)
        {
            var stu = await _genericRepository.GetByIdAsync(Staff.Id);

            stu.FullName = Staff.FullName;
            stu.EmpDate = Staff.EmpDate;
            stu.Code = Staff.Code;
            stu.EmployeeTypeId = Staff.EmployeeTypeId;
            stu.UserId = Staff.UserId;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }

        public Task<Staff> UpdateStaff(Student student)
        {
            throw new NotImplementedException();
        }
    }
}
