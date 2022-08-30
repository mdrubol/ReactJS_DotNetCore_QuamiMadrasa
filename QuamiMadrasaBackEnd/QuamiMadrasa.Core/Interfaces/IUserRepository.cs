using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<IdentityUser<int>?> GetUserById(int id);
        Task<List<IdentityRole<int>>> GetRolesAsync();
        Task<IdentityRole<int>> AddRoleAsync(IdentityRole<int> role);
        Task<IdentityUser<int>?> AuthenticateUser(string userName, string password);
        Task<List<IdentityRole<int>>> GetRolesByUserIdAsync(int userId);
    }
}
