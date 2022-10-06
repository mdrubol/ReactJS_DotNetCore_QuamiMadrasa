using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using QuamiMadrasa.Core.Entities;
using System;
using System.Linq;
using System.Reflection;

#nullable disable
namespace QuamiMadrasa.Infrastracture.Data
{
    public class QuamiMadrasaDBContext : IdentityDbContext<IdentityUser<int>, IdentityRole<int>, int>
    {
        public QuamiMadrasaDBContext(DbContextOptions<QuamiMadrasaDBContext> options) : base(options)
        {

        }

        public DbSet<BloodGroup> BloodGroups { get; set; }
        public DbSet<ClassType> ClassType { get; set; }
        public DbSet<EmployeeType> EmployeeTypes { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<ExamRecord> ExamRecords { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Hostel> Hostels { get; set; }
        public DbSet<Mark> Marks { get; set; }
        public DbSet<MyClass> Classes { get; set; }
        public DbSet<Nationality> Nationalities { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentDetail> PaymentDetails { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<Subject>()
                .HasOne(t => t.Teacher)
                .WithOne();

            modelBuilder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int> { Id = 1, Name = "Admin", NormalizedName = "Administrator", ConcurrencyStamp = Guid.NewGuid().ToString() },
                new IdentityRole<int> { Id = 2, Name = "Teacher", NormalizedName = "Teacher", ConcurrencyStamp = Guid.NewGuid().ToString() },
                new IdentityRole<int> { Id = 3, Name = "Accountant", NormalizedName = "Accountant", ConcurrencyStamp = Guid.NewGuid().ToString() }
                );
            modelBuilder.Entity<IdentityUser<int>>().HasData(
                new IdentityUser<int> { Id = 1, UserName = "Admin", ConcurrencyStamp=Guid.NewGuid().ToString(), Email="admin@madrasha.com", EmailConfirmed=true, NormalizedEmail= "admin@madrasha.com", NormalizedUserName="Admin" ,
                    PasswordHash= "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9" 
                    //admin123
                },
                new IdentityUser<int> { Id = 2, UserName = "teacher01", ConcurrencyStamp = Guid.NewGuid().ToString(), Email = "teacher01@madrasha.com", EmailConfirmed = true, NormalizedEmail = "teacher01@madrasha.com",
                    PasswordHash = "cde383eee8ee7a4400adf7a15f716f179a2eb97646b37e089eb8d6d04e663416" 
                    //teacher123
                },
                new IdentityUser<int> { Id = 3, UserName = "accountant01", ConcurrencyStamp = Guid.NewGuid().ToString(), Email = "accountant01@madrasha.com", EmailConfirmed = true, NormalizedEmail = "accountant01@madrasha.com",
                    PasswordHash = "4d393ec34c3c6a875b95e66df5e6d6fc09efc33d66f12e3e98afca347d6b7638"
                } //accountant123
            );

            modelBuilder.Entity<IdentityUserRole<int>>().HasData(
            new IdentityUserRole<int> { RoleId = 1, UserId = 1 },
            new IdentityUserRole<int> { RoleId = 2, UserId = 1 },
            new IdentityUserRole<int> { RoleId = 3, UserId = 1 },
            new IdentityUserRole<int> { RoleId = 2, UserId = 2 },
            new IdentityUserRole<int> { RoleId = 3, UserId = 3 }
            );

            modelBuilder.Entity<ClassType>().HasData(
              new ClassType { Id = 1, Name = "Physical Class"},
              new ClassType { Id = 2, Name = "Online Class" }
              );

        }



    }
}
