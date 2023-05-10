import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import logoCadastro from './assets/cadastro.png';
import { useEffect, useState } from 'react';

function App() {
  const baseUrl = "https://localhost:44334/api/alunos/";

  const [data, setData] = useState([]);

  const[updateData, setUpdateData] = useState(true);

  //Definindo estado para a modal
  const [modalIncluir, setModalIncluir] = useState(false);

  //Criar o estado do aluno
  const [alunoSelecionado, setAlunoSelecionado] = useState(
    {
      id: '',
      nome: '',
      email: '',
      idade: ''
    });

    //guardar o estado do aluno
  const handleChange = e => {
    const { name, value } = e.target;

    //atualizando o estado
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value
    });
    console.log("Estado do aluno Salvo:", alunoSelecionado);
  }

  //Criar método abrir e fechar modal, alternar entre os estados
  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  const getAlunos = async () => {
    await axios.get(baseUrl+"obter/todos")
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log("Erro ao obter a lista de alunos:" + error);
      })
  }

  const postAluno = async () => {
    delete alunoSelecionado.id;
    alunoSelecionado.idade=parseInt(alunoSelecionado.idade);
    
    await axios.post(baseUrl+"criar",alunoSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
        setUpdateData(true);

      }).catch(error => {
        console.log("Erro inserir o aluno:" + error);
      })
  }


  useEffect(() => {
    if(updateData){
      getAlunos();
      setUpdateData(false);
    }
  }, [updateData])

  return (
    <div className="aluno-container">
      <br />
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt='Cadastro' />
        <button className="btn btn-success" onClick={abrirFecharModalIncluir}>Incluir Novo Aluno</button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className="btn btn-primary" type="submit">Editar</button>{" "}
                <button className="btn btn-danger" type="submit">Excluir</button>{" "}
              </td>
            </tr>

          ))}
        </tbody>
      </table>

      {/* CRIAÇÃO DA MODAL */}
      <Modal isOpen={modalIncluir}>
        <ModalHeader> Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome:</label>
            <br />
            <input type="text" className="form-control" name="nome" onChange={handleChange} />
            <br />
            <label>Email:</label>
            <br />
            <input type="text" className="form-control" name="email" onChange={handleChange} />
            <br />
            <label>Idade:</label>
            <br />
            <input type="text" className="form-control" name="idade" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => postAluno()}>Incluir</button>{" "}
          <button className="btn btn-danger" onClick={() => abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default App;
