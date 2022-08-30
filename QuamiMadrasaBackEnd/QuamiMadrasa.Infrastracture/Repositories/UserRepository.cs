using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.Infrastracture.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Infrastracture.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        public UserRepository(QuamiMadrasaDBContext quamiMadrasaContext)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
        }
        public async Task<IdentityRole<int>> AddRoleAsync(IdentityRole<int> role)
        {
           await _quamiMadrasaContext.AddAsync<IdentityRole<int>>(role);
           await _quamiMadrasaContext.SaveChangesAsync();
            return role;
        }

        public async Task<IdentityUser<int>?> AuthenticateUser(string userName, string password)
        {
            string passwordHash = this.ComputeSha256Hash(password);
            var loginUser = await _quamiMadrasaContext.Users.Where(u=> u.PasswordHash == passwordHash && u.UserName == userName).FirstOrDefaultAsync();

            return loginUser;
        }

        public async Task<List<IdentityRole<int>>> GetRolesAsync()
        {
            return await _quamiMadrasaContext.Roles.ToListAsync();  
        }

        public async Task<List<IdentityRole<int>>> GetRolesByUserIdAsync(int userId)
        {
            var roleIds = await _quamiMadrasaContext.UserRoles.Where(ur => ur.UserId == userId).Select(ur=> ur.RoleId).ToListAsync();
            return await _quamiMadrasaContext.Roles.Where(r => roleIds.Contains(r.Id)).ToListAsync();
        }

        public async Task<IdentityUser<int>?> GetUserById(int id)
        {
            return await _quamiMadrasaContext.Users.FirstOrDefaultAsync(u=> u.Id == id);
        }

        private string ComputeSha256Hash(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
