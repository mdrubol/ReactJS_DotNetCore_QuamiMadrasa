using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuamiMadrasa.Core.Interfaces;

namespace QuamiMadrasa.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountingController : BaseController
    {
        private readonly IHeadRepository _HeadRepository;
        private readonly IMapper _mapper;
        public AccountingController(IHeadRepository HeadRepository, IMapper mapper)
        {
            _HeadRepository = HeadRepository;
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
    }
}
