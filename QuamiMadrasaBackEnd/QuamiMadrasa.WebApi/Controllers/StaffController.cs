using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.WebApi.DTOs;

namespace QuamiMadrasa.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : BaseController
    {
        private readonly IStaffRepository _staffRepository;
        private readonly IMapper _mapper;
        public StaffController(IStaffRepository staffRepository,IMapper mapper)
        {
            _staffRepository = staffRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("Getstaffs")]
        public async Task<ActionResult> Getstaffs()
        {
           var staffs = await _staffRepository.GetAllStaffs();

            return Ok(staffs);
        }

        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetstaffById")]
        public async Task<ActionResult> GetStaffById(int id)
        {
            var staff = await _staffRepository.GetStaffById(id);

            return Ok(staff);
        }

        [HttpPut]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateStaff")]
        public async Task<ActionResult> UpdateStaff(Staff staff)
        {
            var stud = await _staffRepository.UpdateStaff(staff);

            return Ok(stud);
        }

        [HttpDelete]
        //[Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteStaff")]
        public async Task<ActionResult> DeleteStaff(int id)
        {
            var deleted = await _staffRepository.DeleteStaff(id);

            return Ok(deleted);
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateStaff")]
        public async Task<ActionResult> CreateStaff(StaffDto staff)
        {
            try
            {
                var stud = await _staffRepository.AddStaff(_mapper.Map<Staff>(staff));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetAllTeachers")]
        public async Task<ActionResult> GetAllTeachers()
        {
            var teachers = await _staffRepository.GetAllTeachers();

            return Ok(_mapper.Map<List<StaffDto>>(teachers));
        }

        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetEmployeeTypes")]
        public async Task<ActionResult> GetEmployeeTypes()
        {
            var employeeTypes = await _staffRepository.GetEmployeeTypes();

            return Ok(_mapper.Map<List<EmployeeTypeDto>>(employeeTypes));
        }
    }
}
