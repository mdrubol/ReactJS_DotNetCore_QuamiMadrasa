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
    public class SectionController : BaseController
    {
        private readonly ISectionRepository _sectionRepository;
        private readonly IMapper _mapper;
        public SectionController(ISectionRepository sectionRepository, IMapper mapper)
        {
            _sectionRepository = sectionRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetSections")]
        public async Task<ActionResult> GetSections()
        {
           var students = await _sectionRepository.GetAllSections();

            return Ok(students);
        }

        [HttpGet]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetSectionById")]
        public async Task<ActionResult> GetSectionById(int id)
        {
            var student = await _sectionRepository.GetSectionById(id);

            return Ok(student);
        }

        [HttpPut]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateSection")]
        public async Task<ActionResult> UpdateSection(Section  section)
        {
            var stud = await _sectionRepository.UpdateSection(section);

            return Ok(stud);
        }

        [HttpDelete]
        //[Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteSection")]
        public async Task<ActionResult> DeleteSection(int id)
        {
            var deleted = await _sectionRepository.DeleteSection(id);

            return Ok(deleted);
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateSection")]
        public async Task<ActionResult> CreateSection(SectionDto student)
        {
            try
            {
                var stud = await _sectionRepository.AddSection(_mapper.Map<Section>(student));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }
    }
}
