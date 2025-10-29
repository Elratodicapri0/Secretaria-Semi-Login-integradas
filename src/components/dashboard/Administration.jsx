import api from "@/api/axios";
import { sections } from "@/data/adminitrationFeatures";
import React, { useState, useEffect } from "react";
import PageLinksTwo from "../common/PageLinksTwo";
import FooterNine from "../layout/footers/FooterNine";
import { Link } from "react-router-dom";
const tabs = [
  { id: 1, title: "Alunos" },
  { id: 2, title: "Bimestres" },
  { id: 3, title: "Emprestimo" },
  { id: 4, title: "Eventos" },
  { id: 5, title: "Notas" },
  { id: 6, title: "Professores" },
  { id: 7, title: "Responsaveis" },
  { id: 8, title: "Suspensões/Advertencia" },
  { id: 9, title: "Calendario" }
];

// ... (imports e código anterior)

// ... (imports e código anterior)

function AlunoAdminPanel() {
  const [alunos, setAlunos] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [form, setForm] = useState({
    name_aluno: "",
    phone_number_aluno: "",
    email_aluno: "",
    cpf_aluno: "",
    birthday_aluno: "",
    class_choice: "",
    month_choice: "",
    responsavel: null,
    faltas_aluno: "",
    ano_letivo: new Date().getFullYear(),
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunosRes = await api.get("/alunos/");
        const responsaveisRes = await api.get("/responsaveis/");
        setAlunos(alunosRes.data);
        setResponsaveis(responsaveisRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "responsavel" ? (value === "" ? null : Number(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/alunos/${editId}/`, form);
      } else {
        await api.post("/alunos/", form);
      }
      const res = await api.get("/alunos/");
      setAlunos(res.data);
      setEditId(null);
      setForm({
        name_aluno: "",
        phone_number_aluno: "",
        email_aluno: "",
        cpf_aluno: "",
        birthday_aluno: "",
        class_choice: "",
        month_choice: "",
        responsavel: null,
        faltas_aluno: "",
        ano_letivo: new Date().getFullYear(),
      });
      alert("Aluno salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o aluno:", error.response?.data);
      alert("Erro ao salvar o aluno. Verifique os dados e tente novamente.");
    }
  };

  const handleEdit = (aluno) => {
    const responsavelId = typeof aluno.responsavel === 'object' ? aluno.responsavel.id : aluno.responsavel;
    setForm({
      ...aluno,
      responsavel: responsavelId,
    });
    setEditId(aluno.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/alunos/${id}/`);
      const res = await api.get("/alunos/");
      setAlunos(res.data);
      if (editId === id) setEditId(null);
      alert("Aluno removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover o aluno:", error.response?.data);
      alert("Erro ao remover o aluno. Tente novamente.");
    }
  };

  return (
    <div>
      <h3 className="mb-20">Gerenciar Alunos</h3>
      <form onSubmit={handleSubmit} className="mb-30">
        <div className="row y-gap-10">
          <div className="col-6">
            <label>Nome do Aluno</label>
            <input name="name_aluno" value={form.name_aluno} onChange={handleChange} placeholder="Nome do Aluno" className="form-control" />
          </div>
          <div className="col-6">
            <label>Telefone</label>
            <input name="phone_number_aluno" value={form.phone_number_aluno} onChange={handleChange} placeholder="Telefone" className="form-control" />
          </div>
          <div className="col-6">
            <label>Email</label>
            <input name="email_aluno" value={form.email_aluno} onChange={handleChange} placeholder="Email" className="form-control" />
          </div>
          <div className="col-6">
            <label>CPF</label>
            <input name="cpf_aluno" value={form.cpf_aluno} onChange={handleChange} placeholder="CPF" className="form-control" />
          </div>
          <div className="col-6">
            <label>Data de Nascimento</label>
            <input name="birthday_aluno" value={form.birthday_aluno} onChange={handleChange} placeholder="Data de Nascimento" type="date" className="form-control" />
          </div>
          <div className="col-6">
            <label>Turma</label>
            <select name="class_choice" value={form.class_choice} onChange={handleChange} className="form-control">
              <option value="">Turma</option>
              <option value="1A">1 ANO A</option>
              <option value="1B">1 ANO B</option>
              <option value="1C">1 ANO C</option>
              <option value="2A">2 ANO A</option>
              <option value="2B">2 ANO B</option>
              <option value="2C">2 ANO C</option>
              <option value="3A">3 ANO A</option>
              <option value="3B">3 ANO B</option>
              <option value="3C">3 ANO C</option>
            </select>
          </div>
          <div className="col-6">
            <label>Mês da Matrícula</label>
            <select name="month_choice" value={form.month_choice} onChange={handleChange} className="form-control">
              <option value="">Mês da matrícula</option>
              <option value="01">Janeiro</option>
              <option value="02">Fevereiro</option>
              <option value="03">Março</option>
              <option value="04">Abril</option>
              <option value="05">Maio</option>
              <option value="06">Junho</option>
              <option value="07">Julho</option>
              <option value="08">Agosto</option>
              <option value="09">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>
          </div>
          <div className="col-6">
            <label>Faltas</label>
            <input name="faltas_aluno" value={form.faltas_aluno} onChange={handleChange} placeholder="Faltas" className="form-control" />
          </div>
          <div className="col-6">
            <label>Ano Letivo</label>
            <input name="ano_letivo" value={form.ano_letivo} onChange={handleChange} placeholder="Ano Letivo" type="number" className="form-control" />
          </div>
          <div className="col-6">
            <label>Responsável</label>
            <select name="responsavel" value={form.responsavel || ""} onChange={handleChange} className="form-control">
              <option value="">Selecione o responsável</option>
              {responsaveis.map(r => (
                <option key={r.id} value={r.id}>{r.nome_responsavel}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-20">
          {editId ? "Salvar Alterações" : "Adicionar Aluno"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary mt-20 ml-10" onClick={() => { setEditId(null); setForm({ name_aluno: "", phone_number_aluno: "", email_aluno: "", cpf_aluno: "", birthday_aluno: "", class_choice: "", month_choice: "", responsavel: null, faltas_aluno: "", ano_letivo: new Date().getFullYear() }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Nascimento</th>
            <th>Turma</th>
            <th>Mês</th>
            <th>Responsável</th>
            <th>Faltas</th>
            <th>Ano Letivo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.name_aluno}</td>
              <td>{aluno.phone_number_aluno}</td>
              <td>{aluno.email_aluno}</td>
              <td>{aluno.cpf_aluno}</td>
              <td>{aluno.birthday_aluno}</td>
              <td>{aluno.class_choice}</td>
              <td>{aluno.month_choice}</td>
              <td>{aluno.responsavel?.nome_responsavel || ""}</td>
              <td>{aluno.faltas_aluno}</td>
              <td>{aluno.ano_letivo}</td>
              <td>
                <button className="btn btn-sm btn-warning mr-5" onClick={() => handleEdit(aluno)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(aluno.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Painel para Responsáveis
// ... (imports e código anterior)

// ... (imports e código anterior)

function ResponsavelAdminPanel() {
  const [responsaveis, setResponsaveis] = useState([]);
  const [form, setForm] = useState({
    nome_responsavel: "",
    telefone_responsavel: "",
    email_responsavel: "",
    cpf_responsavel: "",
    data_nascimento_responsavel: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.get("/responsaveis/").then(res => setResponsaveis(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/responsaveis/${editId}/`, form);
      } else {
        await api.post("/responsaveis/", form);
      }
      const res = await api.get("/responsaveis/");
      setResponsaveis(res.data);
      setEditId(null);
      setForm({
        nome_responsavel: "",
        telefone_responsavel: "",
        email_responsavel: "",
        cpf_responsavel: "",
        data_nascimento_responsavel: "",
      });
      alert("Responsável salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o responsável:", error.response?.data);
      alert("Erro ao salvar o responsável. Verifique os dados e tente novamente.");
    }
  };

  const handleEdit = (responsavel) => {
    setForm({ ...responsavel });
    setEditId(responsavel.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/responsaveis/${id}/`);
      const res = await api.get("/responsaveis/");
      setResponsaveis(res.data);
      if (editId === id) setEditId(null);
      alert("Responsável removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover o responsável:", error.response?.data);
      alert("Erro ao remover o responsável. Tente novamente.");
    }
  };

  return (
    <div>
      <h3 className="mb-20">Gerenciar Responsáveis</h3>
      <form onSubmit={handleSubmit} className="mb-30">
        <div className="row y-gap-10">
          <div className="col-6">
            <label>Nome do Responsável</label>
            <input name="nome_responsavel" value={form.nome_responsavel} onChange={handleChange} placeholder="Nome do Responsável" className="form-control" />
          </div>
          <div className="col-6">
            <label>Telefone</label>
            <input name="telefone_responsavel" value={form.telefone_responsavel} onChange={handleChange} placeholder="Telefone" className="form-control" />
          </div>
          <div className="col-6">
            <label>Email</label>
            <input name="email_responsavel" value={form.email_responsavel} onChange={handleChange} placeholder="Email" className="form-control" />
          </div>
          <div className="col-6">
            <label>CPF</label>
            <input name="cpf_responsavel" value={form.cpf_responsavel} onChange={handleChange} placeholder="CPF" className="form-control" />
          </div>
          <div className="col-6">
            <label>Data de Nascimento</label>
            <input name="data_nascimento_responsavel" value={form.data_nascimento_responsavel} onChange={handleChange} placeholder="Data de Nascimento" type="date" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-20">
          {editId ? "Salvar Alterações" : "Adicionar Responsável"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary mt-20 ml-10" onClick={() => { setEditId(null); setForm({ nome_responsavel: "", telefone_responsavel: "", email_responsavel: "", cpf_responsavel: "", data_nascimento_responsavel: "" }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {responsaveis.map(responsavel => (
            <tr key={responsavel.id}>
              <td>{responsavel.nome_responsavel}</td>
              <td>{responsavel.telefone_responsavel}</td>
              <td>{responsavel.email_responsavel}</td>
              <td>{responsavel.cpf_responsavel}</td>
              <td>{responsavel.data_nascimento_responsavel}</td>
              <td>
                <button className="btn btn-sm btn-warning mr-5" onClick={() => handleEdit(responsavel)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(responsavel.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Painel para Professores
// Painel para Professores
function ProfessorAdminPanel() {
  const [professores, setProfessores] = useState([]);
  const [form, setForm] = useState({
    name_professor: "",
    phone_number_professor: "",
    email_professor: "",
    cpf_professor: "",
    birthday_professor: "",
    matricula_professor: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.get("/professores/").then(res => setProfessores(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { // Início do bloco try
      if (editId) {
        await api.put(`/professores/${editId}/`, form);
      } else {
        await api.post("/professores/", form);
      }
      const res = await api.get("/professores/");
      setProfessores(res.data);
      setEditId(null);
      setForm({
        name_professor: "",
        phone_number_professor: "",
        email_professor: "",
        cpf_professor: "",
        birthday_professor: "",
        matricula_professor: "",
      });
      // Adicionando um feedback de sucesso para padronizar
      alert("Professor salvo com sucesso!");
    } catch (error) { // Início do bloco catch
      console.error("Erro ao salvar o professor:", error.response?.data);
      alert("Erro ao salvar o professor. Verifique os dados e tente novamente.");
    }
  };

  const handleEdit = (professor) => {
    setForm({ ...professor });
    setEditId(professor.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/professores/${id}/`);
    const res = await api.get("/professores/");
    setProfessores(res.data);
    if (editId === id) setEditId(null);
  };

  return (
    <div>
      <h3 className="mb-20">Gerenciar Professores</h3>
      <form onSubmit={handleSubmit} className="mb-30">
        <div className="row y-gap-10">
          <div className="col-6">
            <label>Nome do Professor</label>
            <input name="name_professor" value={form.name_professor} onChange={handleChange} placeholder="Nome do Professor" className="form-control" />
          </div>
          <div className="col-6">
            <label>Telefone</label>
            <input name="phone_number_professor" value={form.phone_number_professor} onChange={handleChange} placeholder="Telefone" className="form-control" />
          </div>
          <div className="col-6">
            <label>Email</label>
            <input name="email_professor" value={form.email_professor} onChange={handleChange} placeholder="Email" className="form-control" />
          </div>
          <div className="col-6">
            <label>CPF</label>
            <input name="cpf_professor" value={form.cpf_professor} onChange={handleChange} placeholder="CPF" className="form-control" />
          </div>
          <div className="col-6">
            <label>Data de Nascimento</label>
            <input name="birthday_professor" value={form.birthday_professor} onChange={handleChange} placeholder="Data de Nascimento" type="date" className="form-control" />
          </div>
          <div className="col-6">
            <label>Matrícula</label>
            <input name="matricula_professor" value={form.matricula_professor} onChange={handleChange} placeholder="Matrícula" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-20">
          {editId ? "Salvar Alterações" : "Adicionar Professor"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary mt-20 ml-10" onClick={() => { setEditId(null); setForm({ name_professor: "", phone_number_professor: "", email_professor: "", cpf_professor: "", birthday_professor: "", matricula_professor: "" }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map(professor => (
            <tr key={professor.id}>
              <td>{professor.name_professor}</td>
              <td>{professor.phone_number_professor}</td>
              <td>{professor.email_professor}</td>
              <td>{professor.cpf_professor}</td>
              <td>{professor.birthday_professor}</td>
              <td>{professor.matricula_professor}</td>
              <td>
                <button className="btn btn-sm btn-warning mr-5" onClick={() => handleEdit(professor)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(professor.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ... (imports e código anterior)

function AdvertenciaAdminPanel() {
  const ADV_CHOICES = [
    // ... (opções de advertência)
  ];
  const [advertencias, setAdvertencias] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({
    aluno: null,
    data: "",
    motivo: "",
    observacao: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const advRes = await api.get("/advertencias/");
        const alunosRes = await api.get("/alunos/");
        setAdvertencias(advRes.data);
        setAlunos(alunosRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "aluno" ? (value === "" ? null : Number(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/advertencias/${editId}/`, form);
      } else {
        await api.post("/advertencias/", form);
      }
      const res = await api.get("/advertencias/");
      setAdvertencias(res.data);
      setEditId(null);
      setForm({ aluno: null, data: "", motivo: "", observacao: "" });
      alert("Advertência salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a advertência:", error.response?.data);
      alert("Erro ao salvar a advertência. Verifique os dados e tente novamente.");
    }
  };

  const handleEdit = (adv) => {
    const alunoId = typeof adv.aluno === 'object' ? adv.aluno.id : adv.aluno;
    setForm({ ...adv, aluno: alunoId });
    setEditId(adv.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/advertencias/${id}/`);
      const res = await api.get("/advertencias/");
      setAdvertencias(res.data);
      if (editId === id) setEditId(null);
      alert("Advertência removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover a advertência:", error.response?.data);
      alert("Erro ao remover a advertência. Tente novamente.");
    }
  };

  return (
    <div>
      <h3 className="mb-20">Gerenciar Advertências</h3>
      <form onSubmit={handleSubmit} className="mb-30">
        <div className="row y-gap-10">
          <div className="col-6">
            <label>Aluno</label>
            <select name="aluno" value={form.aluno || ""} onChange={handleChange} className="form-control">
              <option value="">Selecione o aluno</option>
              {alunos.map(aluno => (
                <option key={aluno.id} value={aluno.id}>{aluno.name_aluno}</option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label>Data da Advertência</label>
            <input name="data" value={form.data} onChange={handleChange} type="date" className="form-control" />
          </div>
          <div className="col-6">
            <label>Motivo</label>
            <select name="motivo" value={form.motivo} onChange={handleChange} className="form-control">
              <option value="">Selecione o motivo</option>
              {ADV_CHOICES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label>Observações</label>
            <textarea name="observacao" value={form.observacao} onChange={handleChange} placeholder="Observações" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-20">
          {editId ? "Salvar Alterações" : "Adicionar Advertência"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary mt-20 ml-10" onClick={() => { setEditId(null); setForm({ aluno: null, data: "", motivo: "", observacao: "" }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Data</th>
            <th>Motivo</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {advertencias.map(adv => (
            <tr key={adv.id}>
              <td>{alunos.find(a => a.id === adv.aluno)?.name_aluno || adv.aluno}</td>
              <td>{adv.data}</td>
              <td>{ADV_CHOICES.find(opt => opt.value === adv.motivo)?.label}</td>
              <td>{adv.observacao}</td>
              <td>
                <button className="btn btn-sm btn-warning mr-5" onClick={() => handleEdit(adv)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(adv.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ... (imports e código anterior)

function SuspensaoAdminPanel() {
  const SUSP_CHOICES = [
    // ... (opções de suspensão)
  ];
  const [suspensoes, setSuspensoes] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({
    aluno: null,
    data_inicio: "",
    data_fim: "",
    motivo: "",
    observacao: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suspRes = await api.get("/suspensoes/");
        const alunosRes = await api.get("/alunos/");
        setSuspensoes(suspRes.data);
        setAlunos(alunosRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "aluno" ? (value === "" ? null : Number(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/suspensoes/${editId}/`, form);
      } else {
        await api.post("/suspensoes/", form);
      }
      const res = await api.get("/suspensoes/");
      setSuspensoes(res.data);
      setEditId(null);
      setForm({ aluno: null, data_inicio: "", data_fim: "", motivo: "", observacao: "" });
      alert("Suspensão salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a suspensão:", error.response?.data);
      alert("Erro ao salvar a suspensão. Verifique os dados e tente novamente.");
    }
  };

  const handleEdit = (susp) => {
    const alunoId = typeof susp.aluno === 'object' ? susp.aluno.id : susp.aluno;
    setForm({ ...susp, aluno: alunoId });
    setEditId(susp.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/suspensoes/${id}/`);
      const res = await api.get("/suspensoes/");
      setSuspensoes(res.data);
      if (editId === id) setEditId(null);
      alert("Suspensão removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover a suspensão:", error.response?.data);
      alert("Erro ao remover a suspensão. Tente novamente.");
    }
  };

  return (
    <div>
      <h3 className="mb-20">Gerenciar Suspensões</h3>
      <form onSubmit={handleSubmit} className="mb-30">
        <div className="row y-gap-10">
          <div className="col-6">
            <label>Aluno</label>
            <select name="aluno" value={form.aluno || ""} onChange={handleChange} className="form-control">
              <option value="">Selecione o aluno</option>
              {alunos.map(aluno => (
                <option key={aluno.id} value={aluno.id}>{aluno.name_aluno}</option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label>Início da Suspensão</label>
            <input name="data_inicio" value={form.data_inicio} onChange={handleChange} type="date" className="form-control" />
          </div>
          <div className="col-6">
            <label>Fim da Suspensão</label>
            <input name="data_fim" value={form.data_fim} onChange={handleChange} type="date" className="form-control" />
          </div>
          <div className="col-6">
            <label>Motivo</label>
            <select name="motivo" value={form.motivo} onChange={handleChange} className="form-control">
              <option value="">Selecione o motivo</option>
              {SUSP_CHOICES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label>Observações</label>
            <textarea name="observacao" value={form.observacao} onChange={handleChange} placeholder="Observações" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-20">
          {editId ? "Salvar Alterações" : "Adicionar Suspensão"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary mt-20 ml-10" onClick={() => { setEditId(null); setForm({ aluno: null, data_inicio: "", data_fim: "", motivo: "", observacao: "" }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Motivo</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {suspensoes.map(susp => (
            <tr key={susp.id}>
              <td>{alunos.find(a => a.id === susp.aluno)?.name_aluno || susp.aluno}</td>
              <td>{susp.data_inicio}</td>
              <td>{susp.data_fim}</td>
              <td>{SUSP_CHOICES.find(opt => opt.value === susp.motivo)?.label}</td>
              <td>{susp.observacao}</td>
              <td>
                <button className="btn btn-sm btn-warning mr-5" onClick={() => handleEdit(susp)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(susp.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ... (imports e código anterior)

function NotaAdminPanel() {
  const DISCIPLINA_CHOICES = [
    // ... (opções de disciplina)
  ];
  const BIMESTRE_CHOICES = [
    // ... (opções de bimestre)
  ];
  const [notas, setNotas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({
    aluno: null,
    bimestre: null,
    valor: "",
    disciplina: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notasRes = await api.get("/notas/");
        const alunosRes = await api.get("/alunos/");
        setNotas(notasRes.data);
        setAlunos(alunosRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["aluno", "bimestre"].includes(name) ? (value === "" ? null : Number(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/notas/${editId}/`, form);
      } else {
        await api.post("/notas/", form);
      }
      const res = await api.get("/notas/");
      setNotas(res.data);
      setEditId(null);
      setForm({ aluno: null, bimestre: null, valor: "", disciplina: "" });
      alert("Nota salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a nota:", error.response?.data);
      alert("Erro ao salvar a nota. Verifique os dados e tente novamente.");
    }
  };

  const handleEdit = (nota) => {
    const alunoId = typeof nota.aluno === 'object' ? nota.aluno.id : nota.aluno;
    const bimestreId = typeof nota.bimestre === 'object' ? nota.bimestre.id : nota.bimestre;
    setForm({ ...nota, aluno: alunoId, bimestre: bimestreId });
    setEditId(nota.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notas/${id}/`);
      const res = await api.get("/notas/");
      setNotas(res.data);
      if (editId === id) setEditId(null);
      alert("Nota removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover a nota:", error.response?.data);
      alert("Erro ao remover a nota. Tente novamente.");
    }
  };

  return (
    <div>
      <h3 className="mb-20">Gerenciar Notas</h3>
      <form onSubmit={handleSubmit} className="mb-30">
        <div className="row y-gap-10">
          <div className="col-6">
            <label>Aluno</label>
            <select name="aluno" value={form.aluno || ""} onChange={handleChange} className="form-control">
              <option value="">Selecione o aluno</option>
              {alunos.map(aluno => (
                <option key={aluno.id} value={aluno.id}>{aluno.name_aluno}</option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label>Bimestre</label>
            <select name="bimestre" value={form.bimestre || ""} onChange={handleChange} className="form-control">
              <option value="">Selecione o bimestre</option>
              {BIMESTRE_CHOICES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label>Disciplina</label>
            <select name="disciplina" value={form.disciplina} onChange={handleChange} className="form-control">
              <option value="">Selecione a disciplina</option>
              {DISCIPLINA_CHOICES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label>Valor</label>
            <input name="valor" value={form.valor} onChange={handleChange} placeholder="Nota" type="number" step="0.01" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-20">
          {editId ? "Salvar Alterações" : "Adicionar Nota"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary mt-20 ml-10" onClick={() => { setEditId(null); setForm({ aluno: null, bimestre: null, valor: "", disciplina: "" }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Bimestre</th>
            <th>Disciplina</th>
            <th>Nota</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {notas.map(nota => (
            <tr key={nota.id}>
              <td>{alunos.find(a => a.id === nota.aluno)?.name_aluno || nota.aluno}</td>
              <td>{BIMESTRE_CHOICES.find(opt => opt.value === nota.bimestre)?.label}</td>
              <td>{DISCIPLINA_CHOICES.find(opt => opt.value === nota.disciplina)?.label}</td>
              <td>{nota.valor}</td>
              <td>
                <button className="btn btn-sm btn-warning mr-5" onClick={() => handleEdit(nota)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(nota.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Administration() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Administração do Site</h1>

            <PageLinksTwo />
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="tabs -active-purple-2 js-tabs pt-0">
                <div className="tabs__controls d-flex x-gap-30 flex-wrap items-center pt-20 px-20 border-bottom-light js-tabs-controls">
                  {tabs.map((elm, i) => (
                    <div
                      onClick={() => setActiveTab(elm.id)}
                      key={i}
                      className=""
                    >
                      <button
                        className={`tabs__button text-light-1 js-tabs-button ${
                          activeTab == elm.id ? "is-active" : ""
                        } `}
                        type="button"
                      >
                        {elm.title}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="tabs__content py-40 px-30 js-tabs-content">
                  <div
                    className={`tabs__pane -tab-item-1  ${
                      activeTab == 1 ? "is-active" : ""
                    } `}
                  >
                    {/* Painel administrativo do Aluno */}
                    <AlunoAdminPanel />
                  </div>
                  <div
                    className={`tabs__pane -tab-item-5  ${
                      activeTab == 5 ? "is-active" : ""
                    } `}
                  >
                    {/* Painel administrativo de Notas */}
                    <NotaAdminPanel />
                  </div>
                  <div
                    className={`tabs__pane -tab-item-6  ${
                      activeTab == 6 ? "is-active" : ""
                    } `}
                  >
                    {/* Painel administrativo de Professores */}
                    <ProfessorAdminPanel />
                  </div>
                  <div
                    className={`tabs__pane -tab-item-7  ${
                      activeTab == 7 ? "is-active" : ""
                    } `}
                  >
                    {/* Painel administrativo de Responsáveis */}
                    <ResponsavelAdminPanel />
                  </div>
                  <div
                    className={`tabs__pane -tab-item-8  ${
                      activeTab == 8 ? "is-active" : ""
                    } `}
                  >
                    {/* Painel administrativo de Advertências e Suspensões */}
                    <AdvertenciaAdminPanel />
                    <SuspensaoAdminPanel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
