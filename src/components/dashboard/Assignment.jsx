import React from "react";
import FooterNine from "../layout/footers/FooterNine";
import { Link } from "react-router-dom";
import PageLinksTwo from "../common/PageLinksTwo";

export default function Assignment() {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Tarefa</h1>

            <PageLinksTwo />
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-xl-10">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Cabeçalho da Página</h2>
              </div>

              <div className="py-30 px-30">
                <div>
                  <h4 className="text-18 lh-1 fw-500">
                    Tarefa 1 (Texto ou Áudio)
                  </h4>
                  <div className="col-xl-6">
                    <p className="mt-15">
                      Seja breve! Digite ou Grave sua resposta! Grave com os
                      botões de áudio ou vídeo acima! A partir das suas leituras,
                      defina Alfabetização Digital em no máximo 15 palavras. Você
                      consegue dominar a arte de ser sucinto?
                    </p>
                  </div>
                </div>

                <div className="mt-60">
                  <h4 className="text-18 lh-1 fw-500">Resumo de Avaliação</h4>
                </div>

                <div className="mt-30">
                  <div className="rounded-8 px-25 py-25 bg-light-4">
                    <div className="row">
                      <div className="col-3">
                        <div className="text-dark-1">Oculto para os estudantes</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto"
                      >
                        Não
                      </div>
                    </div>
                  </div>

                  <div className="rounded-8 px-25 py-25 ">
                    <div className="row">
                      <div className="col-3">
                        <div className="text-dark-1">Participantes</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto"
                      >
                        10
                      </div>
                    </div>
                  </div>

                  <div className="rounded-8 px-25 py-25 bg-light-4">
                    <div className="row">
                      <div className="col-3">
                        <div className="text-dark-1">Enviado</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto"
                      >
                        2
                      </div>
                    </div>
                  </div>

                  <div className="rounded-8 px-25 py-25 ">
                    <div className="row">
                      <div className="col-3">
                        <div className="text-dark-1">Precisa de avaliação</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto "
                      >
                        1
                      </div>
                    </div>
                  </div>

                  <div className="rounded-8 px-25 py-25 bg-light-4">
                    <div className="row">
                      <div className="col-3">
                        <div className="text-dark-1">Data de entrega</div>
                      </div>
                      <div className="col-auto">
                        Quinta-feira, 26 de Dezembro de 2019, 1:00 AM
                      </div>
                    </div>
                  </div>

                  <div className="rounded-8 px-25 py-25 ">
                    <div className="row">
                      <div className="col-3">
                        <div className="text-dark-1">Tempo restante</div>
                      </div>
                      <div className="col-auto">Tarefa está para vencer</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex x-gap-30 flex-wrap y-gap-10 justify-center items-center mt-30">
                  <div>
                    <a href="#" className="button -icon -light-3 h-50">
                      Ver todas as submissões
                      <i className="icon-arrow-top-right text-13 ml-10"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#" className="button -icon -light-3 h-50">
                      Avaliar
                      <i className="icon-arrow-top-right text-13 ml-10"></i>
                    </a>
                  </div>
                </div>

                <div className="d-flex flex-wrap y-gap-10 justify-between items-center mt-40">
                  <a
                    href="#"
                    className="button -icon -purple-3 h-50 text-purple-1"
                  >
                    Netiqueta no Fórum
                    <i className="icon-arrow-top-right text-13 ml-10"></i>
                  </a>

                  <div
                    onClick={() => {
                      document
                        .getElementById("ddonebutton")
                        .classList.toggle("-is-dd-active");
                      document
                        .getElementById("ddonecontent")
                        .classList.toggle("-is-el-visible");
                    }}
                    id="ddonebutton"
                    className="dropdown js-dropdown js-category-active"
                  >
                    <div
                      className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 "
                      data-el-toggle=".js-category-toggle"
                      data-el-toggle-active=".js-category-active"
                    >
                      <span className="js-dropdown-title">Ir para...</span>
                      <i className="icon text-9 ml-40 icon-chevron-down"></i>
                    </div>

                    <div
                      id="ddonecontent"
                      className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                    >
                      <div className="text-14 y-gap-15 js-dropdown-list">
                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Animação
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Design
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Ilustração
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Negócios
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="button -icon -purple-3 h-50 text-purple-1"
                  >
                    Compartilhar Exemplos de Digital
                    <i className="icon-arrow-top-right text-13 ml-10"></i>
                  </a>
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
