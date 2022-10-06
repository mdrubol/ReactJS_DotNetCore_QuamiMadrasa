using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.Infrastracture.Repositories;
using QuamiMadrasa.WebApi.DTOs;

namespace QuamiMadrasa.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class MyClassController : BaseController
    {
        private readonly IMyClassRepository _myClassRepository;
        private readonly IMapper _mapper;
        public MyClassController(IMyClassRepository myClassRepository, IMapper mapper)
        {
            _myClassRepository = myClassRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetMyClasses")]
        public async Task<ActionResult> GetMyClasses()
        {
           var students = await _myClassRepository.GetAllClasses();

            return Ok(students);
        }

        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetMyClassById")]
        public async Task<ActionResult> GetMyClassById(int id)
        {
            var student = await _myClassRepository.GetClassById(id);

            return Ok(student);
        }

        [HttpPut]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateMyClass")]
        public async Task<ActionResult> UpdateMyClass(MyClass  myClass)
        {
            var stud = await _myClassRepository.UpdateClass(myClass);

            return Ok(stud);
        }

        [HttpDelete]
        //[Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteMyClass")]
        public async Task<ActionResult> DeleteMyClass(int id)
        {
            var deleted = await _myClassRepository.DeleteClass(id);

            return Ok(deleted);
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateMyClass")]
        public async Task<ActionResult> CreateMyClass(MyClassDto myClass)
        {
            try
            {
                var stud = await _myClassRepository.AddClass(_mapper.Map<MyClass>(myClass));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }
    }
}
