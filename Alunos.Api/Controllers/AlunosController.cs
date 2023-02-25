using Alunos.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Alunos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private readonly IAlunoServices _alunoServices;

        public AlunosController(IAlunoServices alunoServices)
        {
            _alunoServices = alunoServices;
        }


    }
}
