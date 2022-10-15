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
    public class StudentController : BaseController
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;
        private readonly IMyClassRepository _myClassRepository;
        private readonly ISectionRepository _sectionRepository;
        public StudentController(IStudentRepository studentRepository, ISectionRepository sectionRepository, IMyClassRepository myClassRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _myClassRepository = myClassRepository;
            _sectionRepository = sectionRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetStudents")]
        public async Task<ActionResult> GetStudents()
        {
           var students = await _studentRepository.GetAllStudents();

            return Ok(_mapper.Map<StudentDto>(students));
        }

        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetStudentById")]
        public async Task<ActionResult> GetStudentById(int id)
        {
            var student = await _studentRepository.GetStudentById(id);

            return Ok(student);
        }

        [HttpPut]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateStudent")]
        public async Task<ActionResult> UpdateStudent(Student student)
        {
            var stud = await _studentRepository.UpdateStudent(student);

            return Ok(stud);
        }

        [HttpDelete]
        //[Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteStudent")]
        public async Task<ActionResult> DeleteStudent(int id)
        {
            var deleted = await _studentRepository.DeleteStudent(id);

            return Ok(deleted);
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateStudent")]
        public async Task<ActionResult> CreateStudent(StudentDto student)
        {
            try
            {
                var stud = await _studentRepository.AddStudent(_mapper.Map<Student>(student));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetClasses")]
        public async Task<ActionResult> GetClasses()
        {
            var myClasses = await _myClassRepository.GetAllClasses();

            return Ok(myClasses);
        }

        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetSections")]
        public async Task<ActionResult> GetSections()
        {
            var sections = await _sectionRepository.GetAllSections();

            return Ok(sections);
        }
    }
}
