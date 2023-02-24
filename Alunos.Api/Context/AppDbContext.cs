using Alunos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Alunos.Api.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Aluno> Alunos { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> op) : base(op)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>().HasData(
                    new Aluno
                    {
                        Id = 1,
                        Nome = "Maria da Penha",
                        Email = "mariapenha@yahoo.com",
                        Idade = 23
                    },
                    new Aluno
                    {
                        Id = 2,
                        Nome = "Manuel da Penha",
                        Email = "manu@yahoo.com",
                        Idade = 25
                    }
               );
        }
    }
}
