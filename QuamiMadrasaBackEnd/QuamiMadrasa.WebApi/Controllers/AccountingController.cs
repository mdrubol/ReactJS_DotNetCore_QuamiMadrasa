using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.Infrastracture.Repositories;

namespace QuamiMadrasa.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountingController : BaseController
    {
        private readonly IHeadRepository _HeadRepository;
        private readonly IReceiptRepository _receiptRepository;
        private readonly IMapper _mapper;
        public AccountingController(IHeadRepository HeadRepository, IReceiptRepository receiptRepository, IMapper mapper)
        {
            _HeadRepository = HeadRepository;
            _receiptRepository = receiptRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetHeads")]
        public async Task<ActionResult> GetHeads()
        {
            var Heads = await _HeadRepository.GetAllHeads();

            return Ok(Heads);
        }


        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetReceipts")]
        public async Task<ActionResult> GetReceipts()
        {
            var students = await _receiptRepository.GetAllReceipts();

            return Ok(students);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetReceiptById")]
        public async Task<ActionResult> GetReceiptById(int id)
        {
            var student = await _receiptRepository.GetReceiptById(id);

            return Ok(student);
        }

        [HttpPut]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateReceipt")]
        public async Task<ActionResult> UpdateReceipt(Receipt Receipt)
        {
            var stud = await _receiptRepository.UpdateReceipt(Receipt);

            return Ok(stud);
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteReceipt")]
        public async Task<ActionResult> DeleteReceipt(int id)
        {
            var deleted = await _receiptRepository.DeleteReceipt(id);

            return Ok(deleted);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateReceipt")]
        public async Task<ActionResult> CreateReceipt(Receipt student)
        {
            try
            {
                var stud = await _receiptRepository.AddReceipt(_mapper.Map<Receipt>(student));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }
    }
}
