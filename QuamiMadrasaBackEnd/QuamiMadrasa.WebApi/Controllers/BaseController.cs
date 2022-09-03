using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuamiMadrasa.WebApi.DTOs;
using QuamiMadrasa.WebApi.Helpers;
using System.Security.Claims;
#nullable disable

namespace QuamiMadrasa.WebApi.Controllers
{

    [ApiController]
    public class BaseController : ControllerBase
    {
        public CurrentUser CurrentUser { get { return this.currentUser; } }
        private CurrentUser currentUser = null;
        public readonly IHttpContextAccessor _httpContextAccessor;

        public BaseController()
        {
            _httpContextAccessor = HttpContextHelper._httpContextAccessor;   
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null && identity.Claims != null && identity.Claims.Any())
            {
                currentUser = new CurrentUser();

                currentUser.UserId = Convert.ToInt32(identity.FindFirst("UserId").Value);
                currentUser.UserName = identity.FindFirst("UserName").Value;
                currentUser.Email = identity.FindFirst("Email").Value;
            }
            
        }
    }
}
