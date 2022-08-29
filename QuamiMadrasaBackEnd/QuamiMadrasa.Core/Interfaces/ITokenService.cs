using Microsoft.AspNetCore.Identity; 
using System;
using System.Collections.Generic;
using System.Text;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(IdentityUser appUser);
    }
}
