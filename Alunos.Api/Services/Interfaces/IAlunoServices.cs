using Alunos.Api.Models;

namespace Alunos.Api.Services.Interfaces
{
    public interface IAlunoServices
    {
        Task<IEnumerable<Aluno>> GetAlunos();
        Task<Aluno> GetAluno(int id);
        Task<IEnumerable<Aluno>> GetAlunoByName(string nome);
        Task CreateAluno(Aluno aluno);
        Task UpadateAluno(Aluno aluno);
        Task DeleteAluno(Aluno aluno);
    }
}
