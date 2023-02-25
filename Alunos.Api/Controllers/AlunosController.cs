using Alunos.Api.Models;
using Alunos.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Alunos.Api.Controllers
{
    [Route("api/alunos")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private readonly IAlunoServices _alunoServices;

        public AlunosController(IAlunoServices alunoServices)
        {
            _alunoServices = alunoServices;
        }

        [HttpGet]
        [Route("obter")]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunos()
        {
            var alunos = await _alunoServices.GetAlunos();
            return Ok(alunos);
        }


        [HttpGet]
        [Route("obter/nome")]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunosByName([FromQuery]string nome)
        {
            var alunos = await _alunoServices.GetAlunoByName(nome);
            return Ok(alunos);
        }

        [HttpGet]
        [ActionName("GetAluno")]
        [Route("obter/{id:int}", Name = "GetAluno")]
        public async Task<ActionResult<Aluno>> GetAluno(int id)
        {
            var alunos = await _alunoServices.GetAluno(id);
            return Ok(alunos);
        }

        [HttpPost]
        [Route("criar")]
        public async Task<ActionResult> Create([FromBody] Aluno aluno)
        {
            await _alunoServices.CreateAluno(aluno);
            return CreatedAtRoute(nameof(GetAluno), new {id = aluno.Id}, aluno);           
        }

        [HttpPut]
        [Route("edit/{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Aluno aluno)
        {

            if(id == aluno.Id)
            {
                await _alunoServices.UpadateAluno(aluno);
                return Ok($"Aluno com id={id} foi atualizado com sucesso.");
            }
            else
            {
                return BadRequest("Dados inconsistentes.");
            }
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            Aluno aluno = await _alunoServices.GetAluno(id);

            if(aluno is not null)
            {
               await _alunoServices.DeleteAluno(aluno);
                return Ok($"Aluno com id={id} foi excluído com sucesso.");
            }
            else
            {
                return NotFound($"Aluno com id={id} não ncontrado.");

            }
        }

    }
}
