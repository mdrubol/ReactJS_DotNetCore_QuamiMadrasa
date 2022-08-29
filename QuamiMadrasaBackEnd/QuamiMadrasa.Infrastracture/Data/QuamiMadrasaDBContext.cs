using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
 
using System;
using System.Linq;
using System.Reflection;

namespace QuamiMadrasa.Infrastracture.Data
{
    public class QuamiMadrasaDBContext : IdentityDbContext<IdentityUser<int>, IdentityRole<int>, int>
    {
        public QuamiMadrasaDBContext(DbContextOptions<QuamiMadrasaDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }



    }
}
