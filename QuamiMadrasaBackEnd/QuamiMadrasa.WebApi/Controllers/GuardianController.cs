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
    public class GuardianController : BaseController
    {
        private readonly IGuardianRepository _GuardianRepository;
        private readonly IMapper _mapper;
        public GuardianController(IGuardianRepository GuardianRepository, IMapper mapper)
        {
            _GuardianRepository = GuardianRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetGuardians")]
        public async Task<ActionResult> GetGuardians()
        {
           var students = await _GuardianRepository.GetAllGuardians();

            return Ok(students);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetGuardianById")]
        public async Task<ActionResult> GetGuardianById(int id)
        {
            var student = await _GuardianRepository.GetGuardianById(id);

            return Ok(student);
        }

        [HttpPut]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateGuardian")]
        public async Task<ActionResult> UpdateGuardian(Guardian  Guardian)
        {
            var stud = await _GuardianRepository.UpdateGuardian(Guardian);

            return Ok(stud);
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteGuardian")]
        public async Task<ActionResult> DeleteGuardian(int id)
        {
            var deleted = await _GuardianRepository.DeleteGuardian(id);

            return Ok(deleted);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateGuardian")]
        public async Task<ActionResult> CreateGuardian(Guardian student)
        {
            try
            {
                var stud = await _GuardianRepository.AddGuardian(_mapper.Map<Guardian>(student));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }
    }
}
