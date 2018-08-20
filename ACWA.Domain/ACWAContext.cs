using ACWA.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ACWA.Domain
{
    public class ACWAContext : IdentityDbContext<Profile>
    {
        public ACWAContext(DbContextOptions<ACWAContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User table
            modelBuilder.Entity<User>().Property(x => x.FirstName).IsRequired().HasMaxLength(64);
            modelBuilder.Entity<User>().Property(x => x.LastName).IsRequired().HasMaxLength(64);
            modelBuilder.Entity<User>().Property(x => x.Login).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<User>().Property(x => x.PhoneNumber).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<User>().Ignore(x => x.FullName);
            modelBuilder.Entity<User>().Ignore(x => x.FullNameNormalized);
        }
    }
}