using Alunos.Api.Context;
using Alunos.Api.Models;
using Alunos.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Alunos.Api.Services
{
    public class AlunosServices : IAlunoServices
    {
        private readonly AppDbContext _context;
        public AlunosServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateAluno(Aluno aluno)
        {
            try
            {
                await _context.Alunos.AddAsync(aluno);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task DeleteAluno(Aluno aluno)
        {
            try
            {
                _context.Alunos.Remove(aluno);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Aluno> GetAluno(int id)
        {
            try
            {
                return await _context.Alunos.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Aluno>> GetAlunoByName(string nome)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(nome))
                {
                    return await _context.Alunos.Where(n => n.Nome.Contains(nome)).ToListAsync();
                }
                else
                {
                    return await GetAlunos();
                }
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            try
            {
                return await _context.Alunos.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task UpadateAluno(Aluno aluno)
        {
            try
            {
                _context.Entry(aluno).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
