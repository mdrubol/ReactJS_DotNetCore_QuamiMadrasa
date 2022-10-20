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
    public class ReceiptController : BaseController
    {
        private readonly IReceiptRepository _ReceiptRepository;
        private readonly IMapper _mapper;
        public ReceiptController(IReceiptRepository ReceiptRepository, IMapper mapper)
        {
            _ReceiptRepository = ReceiptRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetReceipts")]
        public async Task<ActionResult> GetReceipts()
        {
           var students = await _ReceiptRepository.GetAllReceipts();

            return Ok(students);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetReceiptById")]
        public async Task<ActionResult> GetReceiptById(int id)
        {
            var student = await _ReceiptRepository.GetReceiptById(id);

            return Ok(student);
        }

        [HttpPut]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateReceipt")]
        public async Task<ActionResult> UpdateReceipt(Receipt  Receipt)
        {
            var stud = await _ReceiptRepository.UpdateReceipt(Receipt);

            return Ok(stud);
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteReceipt")]
        public async Task<ActionResult> DeleteReceipt(int id)
        {
            var deleted = await _ReceiptRepository.DeleteReceipt(id);

            return Ok(deleted);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateReceipt")]
        public async Task<ActionResult> CreateReceipt(Receipt student)
        {
            try
            {
                var stud = await _ReceiptRepository.AddReceipt(_mapper.Map<Receipt>(student));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }
    }
}
