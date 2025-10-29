import React, { useState, useEffect } from "react";
import FooterNine from "../../layout/footers/FooterNine";

export default function Listing() {
  // --- 1. ESTADO (State) ---
  // Estado para o formulário de criação
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    data: "",
    tipo: "",
  });
  const [formMessage, setFormMessage] = useState("");

  // Estado para a lista de eventos
  const [eventos, setEventos] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState(null);

  // --- 2. LÓGICA DE DADOS (Hooks e Funções) ---

  // Função para BUSCAR todos os eventos (GET)
  const fetchEventos = async () => {
    setLoadingList(true);
    setListError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setListError("Autenticação necessária.");
      setLoadingList(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/eventos-calendario/", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Falha ao buscar eventos.");
      
      const data = await response.json();
      data.sort((a, b) => new Date(b.data) - new Date(a.data)); // Ordena por data
      setEventos(data);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoadingList(false);
    }
  };

  // useEffect para buscar os eventos assim que o componente é carregado
  useEffect(() => {
    fetchEventos();
  }, []);

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Função para ENVIAR um novo evento (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
    const token = localStorage.getItem("accessToken");
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/eventos-calendario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormMessage("Evento criado com sucesso!");
        setFormData({ titulo: "", descricao: "", data: "", tipo: "" }); // Limpa o formulário
        fetchEventos(); // <<< A MÁGICA ACONTECE AQUI: ATUALIZA A LISTA!
      } else {
        const errorData = await response.json();
        setFormMessage(`Falha ao criar evento: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      setFormMessage("Erro de conexão ao tentar criar o evento.");
    }
  };

  // Função para DELETAR um evento (DELETE)
  const handleDelete = async (eventoId) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) return;
    
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/eventos-calendario/${eventoId}/`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        alert("Evento excluído com sucesso!");
        fetchEventos(); // <<< ATUALIZA A LISTA APÓS EXCLUIR!
      } else {
        throw new Error("Falha ao excluir o evento.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Opções para o dropdown de tipo de evento
  const eventTypes = [
    { value: "prova", label: "Prova" },
    { value: "trabalho", label: "Entrega de Trabalho" },
    { value: "feriado", label: "Feriado" },
    { value: "evento", label: "Evento" },
  ];

  // --- 3. RENDERIZAÇÃO (JSX) ---
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        {/* Seção 1: Formulário de Criação */}
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Gerenciar Eventos do Calendário</h1>
          </div>
        </div>
        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Adicionar Novo Evento</h2>
              </div>
              <div className="py-30 px-30">
                <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
                  {/* ... Campos do formulário (Título, Descrição, Data, Tipo) ... */}
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Título*</label>
                    <input required type="text" name="titulo" placeholder="Ex: Prova de Matemática" value={formData.titulo} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Descrição</label>
                    <textarea name="descricao" placeholder="Detalhes sobre o evento..." rows="5" value={formData.descricao} onChange={handleChange}></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Data*</label>
                    <input required type="date" name="data" value={formData.data} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Tipo*</label>
                    <select required name="tipo" className="text-16 lh-1 form-select" value={formData.tipo} onChange={handleChange}>
                      <option value="" disabled>Selecione um tipo</option>
                      {eventTypes.map((type) => (<option key={type.value} value={type.value}>{type.label}</option>))}
                    </select>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="button -md -purple-1 text-white">Salvar Evento</button>
                  </div>
                </form>
                {formMessage && <div className="mt-20">{formMessage}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Seção 2: Lista de Eventos Cadastrados */}
        <div className="row pt-60">
            <div className="col-12">
                <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                    <div className="d-flex items-center py-20 px-30 border-bottom-light">
                        <h2 className="text-17 lh-1 fw-500">Eventos Cadastrados</h2>
                    </div>
                    <div className="py-30 px-30">
                        {loadingList && <p>Carregando eventos...</p>}
                        {listError && <p className="text-red-1">Erro: {listError}</p>}
                        {!loadingList && !listError && (
                            eventos.length === 0 ? (
                                <p>Nenhum evento encontrado.</p>
                            ) : (
                                <table className="table w-1/1">
                                    <thead className="text-left">
                                        <tr>
                                            <th>Título</th>
                                            <th>Data</th>
                                            <th>Tipo</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventos.map((evento) => (
                                            <tr key={evento.id}>
                                                <td>{evento.titulo}</td>
                                                <td>{new Date(evento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                <td>{evento.tipo}</td>
                                                <td>
                                                    <button onClick={() => handleDelete(evento.id)} className="button -sm -danger text-white">Excluir</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
      <FooterNine />
    </div>
  );
}