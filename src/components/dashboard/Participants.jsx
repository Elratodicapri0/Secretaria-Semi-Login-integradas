import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
import PageLinksTwo from "../common/PageLinksTwo";
import { letters } from "@/data/dictionary";

export default function Participants() {
  const [currentLetter, setCurrentLetter] = useState("A");
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------------------------------------------
  // ARQUIVO MODIFICADO AQUI (Isso corrige o Erro 401 Unauthorized)
  // -----------------------------------------------------------------
  useEffect(() => {
    async function fetchAllParticipants() {
      setLoading(true);

      // 1. Buscar o token de autenticação
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error("Token não encontrado. Faça o login.");
        setLoading(false);
        return;
      }

      // 2. Definir os headers de autenticação
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // 3. Usar URLs relativas para o proxy do Vite
      const urls = [
        "/api/professores/",
        "/api/alunos/",
        "/api/responsaveis/",
      ];

      try {
        // 4. Adicionar os { headers } a cada chamada fetch
        const responses = await Promise.all(
          urls.map(url => fetch(url, { headers })) // <-- Token enviado aqui
        );

        // Verificar se todas as requisições foram bem sucedidas
        for (const res of responses) {
            if (!res.ok) {
                if (res.status === 401) {
                  console.error("Erro 401: Token inválido ou expirado. Tente fazer login novamente.");
                }
                // Se o status for 403 (Forbidden), é uma falha de permissão (ex: Professor tentando ver)
                // Isso é esperado, mas podemos tratar para não quebrar a página
                if (res.status === 403) {
                  console.warn(`Permissão negada (403) para: ${res.url}`);
                  // Retornamos um objeto com 'results' vazio para não quebrar o Promise.all
                  return { results: [] }; 
                }
                throw new Error(`HTTP error! status: ${res.status} for URL: ${res.url}`);
            }
            // Se o status for OK (200), lemos o JSON
            return res.json();
        }

        // 5. Ajuste no Promise.all para lidar com os JSONs
        const jsonData = await Promise.all(responses);

        // 6. Acessar a chave 'results' da paginação
        const professores = (jsonData[0] && jsonData[0].results) || [];
        const alunos = (jsonData[1] && jsonData[1].results) || [];
        const responsaveis = (jsonData[2] && jsonData[2].results) || [];


        //Normalizar e Juntar os dados em uma única lista
        const combinedList = [];

        // Adiciona professores
        professores.forEach(prof => {
          combinedList.push({
            id: `prof-${prof.id}`,
            nome: prof.nome || prof.name_professor, 
            email: prof.email || prof.email_professor,
            foto: prof.foto,
            tipo: "Professor",
          });
        });

        // Adiciona alunos
        alunos.forEach(aluno => {
          combinedList.push({
            id: `aluno-${aluno.id}`,
            nome: aluno.name_aluno, 
            email: aluno.email_aluno, 
            foto: aluno.foto,
            tipo: "Aluno",
          });
        });

        // Adiciona responsáveis
        responsaveis.forEach(resp => {
          combinedList.push({
            id: `resp-${resp.id}`,
            nome: resp.nome,
            email: resp.email,
            foto: resp.foto,
            tipo: "Responsável",
          });
        });
        
        //Ordena a lista final por nome
        combinedList.sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));

        setParticipants(combinedList);

      } catch (error) {
        console.error("Erro ao buscar participantes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllParticipants();
  }, []); // O array vazio garante que a busca ocorre apenas uma vez.
  // -----------------------------------------------------------------
  // FIM DA MODIFICAÇÃO
  // -----------------------------------------------------------------

  return (
    <div className="dashboard__main">
        <div className="dashboard__content bg-light-4">
          <div className="row pb-50 mb-10">
            <div className="col-auto">
              <h1 className="text-30 lh-12 fw-700">Participants</h1>
              <PageLinksTwo />
            </div>
          </div>
  
          <div className="row y-gap-30">
            <div className="col-12">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 lh-1 fw-500">Lista de Participantes</h2>
                </div>
  
                <div className="py-30 px-30">
                  <div className="text-18 fw-500 text-dark-1 lh-12 mt-10">
                    Filtrar por inicial do nome
                  </div>
                  <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-20">
                    <div>
                      <div
                        className={`py-8 px-10 d-flex justify-center items-center cursor-pointer rounded-4 ${
                          currentLetter === "All"
                            ? "bg-dark-1 -dark-bg-dark-2 text-white"
                            : "border-light"
                        }`}
                        onClick={() => setCurrentLetter("All")}
                      >
                        All
                      </div>
                    </div>
                    {letters.map((elm, i) => (
                      <div
                        key={i}
                        className={`size-35 d-flex justify-center items-center border-light rounded-4 cursor-pointer ${
                          currentLetter === elm
                            ? "bg-dark-1 -dark-bg-dark-2 text-white"
                            : ""
                        }`}
                        onClick={() => setCurrentLetter(elm)}
                      >
                        {elm}
                      </div>
                    ))}
                  </div>
  
                  <div className="mt-40">
                    <div className="px-30 py-20 bg-light-7 -dark-bg-dark-2 rounded-8">
                      <div className="row x-gap-10">
                        <div className="col-lg-5">
                          <div className="text-purple-1">Nome / Email</div>
                        </div>
                        <div className="col-lg-2">
                          <div className="text-purple-1">Tipo</div>
                        </div>
                        <div className="col-lg-2">
                          <div className="text-purple-1">Grupos</div>
                        </div>
                        <div className="col-lg-3">
                          <div className="text-purple-1">Último acesso</div>
                        </div>
                      </div>
                    </div>
  
                    {loading ? (
                      <div className="px-30 py-20">Carregando participantes...</div>
                    ) : participants.length === 0 ? (
                      <div className="px-30 py-20">
                        Nenhum participante encontrado. (Verifique as permissões de acesso).
                      </div>
                    ) : (
                      participants
                        .filter((elm) =>
                          currentLetter === "All"
                            ? true
                            : elm.nome?.startsWith(currentLetter)
                        )
                        .map((elm) => ( //Usar elm.id como key 
                          <div key={elm.id} className="px-30 border-bottom-light">
                            <div className="row x-gap-10 items-center py-15">
                              <div className="col-lg-5">
                                <div className="d-flex items-center">
                                  <img
                                    src={elm.foto || "/img/default-user.png"}
                                    alt="foto"
                                    className="size-40 fit-cover rounded-full"
                                  />
                                  <div className="ml-10">
                                    <div className="text-dark-1 lh-12 fw-500">
                                      {elm.nome}
                                    </div>
                                    <div className="text-14 lh-12 mt-5">
                                      {elm.email || "sem e-mail"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2">{elm.tipo}</div>
                              <div className="col-lg-2">—</div>
                              <div className="col-lg-3">—</div>
                            </div>
                          </div>
                        ))
                    )}
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
