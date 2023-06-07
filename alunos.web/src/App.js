import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logoCadastro from "./assets/cadastro.png";
import { useEffect, useState } from "react";

function App() {
  const baseUrl = "https://localhost:44334/api/alunos/";

  const [data, setData] = useState([]);

  const [updateData, setUpdateData] = useState(true);

  //Definindo estado para a modal excluir
  const [modalExcluir, setModalExcluir] = useState(false);

  //Definindo estado para a modal incluir
  const [modalIncluir, setModalIncluir] = useState(false);

  //Definindo estado para a modal editar
  const [modalEditar, setModalEditar] = useState(false);

  //Criar o estado do aluno
  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: "",
    nome: "",
    email: "",
    idade: "",
  });

  //guardar o estado do aluno
  const handleChange = (e) => {
    const { name, value } = e.target;

    //atualizando o estado
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    });
    console.log("Estado do aluno Salvo:", alunoSelecionado);
  };

  //Criar método abrir e fechar modal
  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };

  //Criar método para editar
  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  //selecionar aluno, para editar ou excluir
  const selecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else {
      abrirFecharModalExcluir();
    }
  };

  //Criar método abrir e fechar modal
  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  };

  const getAlunos = async () => {
    await axios
      .get(baseUrl + "obter/todos")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Erro ao obter a lista de alunos:" + error);
      });
  };

  const postAluno = async () => {
    delete alunoSelecionado.id;
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);

    await axios
      .post(baseUrl + "criar", alunoSelecionado)
      .then((response) => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
        setUpdateData(true);
      })
      .catch((error) => {
        console.log("Erro ao inserir o aluno:" + error);
      });
  };

  const putAluno = async () => {
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    await axios
      .put(baseUrl + "atualizar/" + alunoSelecionado.id, alunoSelecionado)
      .then((response) => {
        var dadosAuxiliar = data;
        dadosAuxiliar.forEach((aluno) => {
          if (aluno.id === alunoSelecionado.id) {
            aluno.nome = alunoSelecionado.nome;
            aluno.email = alunoSelecionado.email;
            aluno.idade = alunoSelecionado.idade;
          }
        });
        abrirFecharModalEditar();
      })
      .catch((error) => {
        console.log("Erro ao editar o aluno: " + error);
      });
  };

  const pedidoDelete = async () => {
    await axios
      .delete(baseUrl + "excluir/" + alunoSelecionado.id)
      .then((response) => {
        setData(data.filter((aluno) => aluno.id !== response.data));
        abrirFecharModalExcluir();
        setUpdateData(true);
      })
      .catch((error) => {
        console.log("Erro ao excluir o aluno: " + error);
      });
  };

  useEffect(() => {
    if (updateData) {
      getAlunos();
      setUpdateData(false);
    }
  }, [updateData]);

  return (
    <div className="aluno-container">
      <br />
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <button className="btn btn-success" onClick={abrirFecharModalIncluir}>
          Incluir Novo Aluno
        </button>
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
          {data.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => selecionarAluno(aluno, "Editar")}
                >
                  Editar
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => selecionarAluno(aluno, "Excluir")}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CRIAÇÃO DA MODAL - INCLUIR*/}
      <Modal isOpen={modalIncluir}>
        <ModalHeader> Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
            <br />
            <label>Idade:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => postAluno()}>
            Salvar
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalIncluir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* CRIAÇÃO DA MODAL - EDITAR*/}
      <Modal isOpen={modalEditar}>
        <ModalHeader> Atualizar Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={alunoSelecionado && alunoSelecionado.id}
            />
            <br />
            <label>Nome:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.nome}
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.email}
            />
            <br />
            <label>Idade:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.idade}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => putAluno()}>
            Atualizar
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* CRIAÇÃO DA MODAL - DELETAR*/}
      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste(a) aluno(a) :{" "}
          {alunoSelecionado && alunoSelecionado.nome}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => pedidoDelete()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirFecharModalExcluir()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default App;
