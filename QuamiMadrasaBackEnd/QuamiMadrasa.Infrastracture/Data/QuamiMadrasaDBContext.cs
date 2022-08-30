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

        DbSet<BloodGroup> BloodGroups { get; set; }
        DbSet<ClassType> ClassType { get; set; }    
        DbSet<EmployeeType> EmployeeTypes { get; set; }
        DbSet<Exam> Exams { get; set; }
        DbSet<ExamRecord> ExamRecords { get; set; }
        DbSet<Grade> Grades { get; set; }
        DbSet<Hostel> Hostels { get; set; }
        DbSet<Mark> Marks { get; set; }
        DbSet<MyClass> Classes { get; set; }
        DbSet<Nationality> Nationalities { get; set; }  
        DbSet<Payment> Payments { get; set; }
        DbSet<PaymentDetail> PaymentDetails { get; set; }
        DbSet<Promotion> Promotions { get; set; }
        DbSet<Receipt> Receipts { get; set; }
        DbSet<Section> Sections { get; set; }
        DbSet<Setting> Settings { get; set; }
        DbSet<Staff> Staffs { get; set; }   
        DbSet<Student> Students { get; set; }
        DbSet<Subject> Subjects { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<Subject>()
                .HasOne(t => t.Teacher)
                .WithOne();


        }



    }
}
