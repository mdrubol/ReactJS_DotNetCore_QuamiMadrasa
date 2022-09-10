using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuamiMadrasa.Application.ICustomServices;
using QuamiMadrasa.WebApi.DTOs;
using QuamiMadrasa.WebApi.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

#nullable disable

namespace QuamiMadrasa.WebApi.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        public AccountController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Authenticate")]
        public async Task<IActionResult> Authenticate(UserLogin userLogin)
        {
            var candidate = await _userService.AuthenticateUser(userLogin.UserName,userLogin.Password);

            if (candidate != null)
            {
                var loginUser = await _userService.GetUserById(candidate.Id);
                var userRoles = await _userService.GetRolesByUserIdAsync(loginUser.Id);

                var claims = new List<Claim>();
                claims.Add(new Claim("UserName", loginUser.UserName));
                claims.Add(new Claim("Email", loginUser.Email));
                claims.Add(new Claim("UserId", loginUser.Id.ToString()));

                // Add roles as multiple claims
                foreach (var role in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role.Name));
                }

                var jwtSettings = _configuration.GetSection("JWTSettings")
                                         .Get<JWTSettings>();

                var token = JwtHelper.GetJwtToken(
                                loginUser.UserName,
                                jwtSettings.Secret,
                                jwtSettings.Issuer,
                                jwtSettings.Audience,
                                TimeSpan.FromMinutes(jwtSettings.TokenTimeoutMinutes),
                                claims.ToArray());

                var response = new TokenResponse()
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    ExpiresOnUtc = token.ValidTo,
                    User = new CurrentUser {
                        UserId = loginUser.Id,
                        Email = loginUser.Email, 
                        UserName=loginUser.UserName,
                        Roles= userRoles.Select(r=> r.Name).ToList()
                    }
                };

                return Ok(response);
            }
            else
            {
                return Unauthorized("Invalid Login Credentials!");
            }
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("TestAuthorization")]
        public async Task<IActionResult> TestAuthorization()
        {
            string msg = "Take rest everything is well.";

            return Ok( await Task.FromResult(msg));
        }
    }
}
