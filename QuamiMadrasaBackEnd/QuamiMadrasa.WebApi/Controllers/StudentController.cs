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
        private readonly ISubjectRepository _subjectRepository;
        private readonly IGuardianRepository _guardianRepository;
        public StudentController(IStudentRepository studentRepository,
            ISectionRepository sectionRepository, ISubjectRepository subjectRepository,
            IGuardianRepository guardianRepository,
            IMyClassRepository myClassRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _myClassRepository = myClassRepository;
            _sectionRepository = sectionRepository;
            _subjectRepository = subjectRepository;
            _guardianRepository = guardianRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetStudents")]
        public async Task<ActionResult> GetStudents()
        {
           var students = await _studentRepository.GetAllStudents();

            return Ok(students);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetStudentsByClassId")]
        public async Task<ActionResult> GetStudentsByClassId(int classId)
        {
            var students = await _studentRepository.GetAllStudents();

            return Ok(students.Where(s=> s.MyClassId == classId).ToList());
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetStudentById")]
        public async Task<ActionResult> GetStudentById(int id)
        {
            var student = await _studentRepository.GetStudentById(id);

            return Ok(student);
        }

        [HttpPut]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateStudent")]
        public async Task<ActionResult> UpdateStudent(Student student)
        {
            var stud = await _studentRepository.UpdateStudent(student);

            return Ok(stud);
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteStudent")]
        public async Task<ActionResult> DeleteStudent(int id)
        {
            var deleted = await _studentRepository.DeleteStudent(id);

            return Ok(deleted);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateStudent")]
        public async Task<ActionResult> CreateStudent(StudentDto student)
        {
            try
            {
                var guardian = await _guardianRepository.AddGuardian(student.Guardian);

                if(guardian != null)
                {
                    student.MyParentId = guardian?.Id;
                }

                var stud = await _studentRepository.AddStudent(_mapper.Map<Student>(student));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetClasses")]
        public async Task<ActionResult> GetClasses()
        {
            var myClasses = await _myClassRepository.GetAllClasses();

            return Ok(myClasses);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateClass")]
        public async Task<ActionResult> CreateClass(MyClassDto  classDto)
        {
            try
            {
                var stud = await _myClassRepository.AddClass(_mapper.Map<MyClass>(classDto));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }

        [HttpPut]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateClass")]
        public async Task<ActionResult> UpdateClass(MyClass myClass)
        {
            var stud = await _myClassRepository.UpdateClass(myClass);

            return Ok(stud);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetSections")]
        public async Task<ActionResult> GetSections()
        {
            var sections = await _sectionRepository.GetAllSections();

            return Ok(sections);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateSection")]
        public async Task<ActionResult> CreateSection(Section section)
        {
            try
            {
                var stud = await _sectionRepository.AddSection(_mapper.Map<Section>(section));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }

        [HttpPut]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateSection")]
        public async Task<ActionResult> UpdateSection(Section section)
        {
            var stud = await _sectionRepository.UpdateSection(section);

            return Ok(stud);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetSubjects")]
        public async Task<ActionResult> GetSubjects()
        {
            var sections = await _subjectRepository.GetAllSubjects();

            return Ok(sections);
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateSubject")]
        public async Task<ActionResult> CreateSubject(Subject subject)
        {
            try
            {
                var stud = await _subjectRepository.AddSubject(_mapper.Map<Subject>(subject));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }

        [HttpPut]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateSubject")]
        public async Task<ActionResult> UpdateSubject(Subject subject)
        {
            var stud = await _subjectRepository.UpdateSubject(subject);

            return Ok(stud);
        }
    }
}
