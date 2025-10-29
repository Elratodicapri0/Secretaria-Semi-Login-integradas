// Nome do arquivo: Calender.jsx
import React, { useState } from "react";

import FooterNine from "@/components/layout/footers/FooterNine";
import EventKeys from "./EventKeys";
import MonthlyCalender from "./MonthlyViewCalender";
import PageLinksTwo from "@/components/common/PageLinksTwo";
import EventCalendar from "./EventCalendar"; 

export default function Calender() {
  const [isMonthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [isCourseDropdownOpen, setCourseDropdownOpen] = useState(false);

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Calendário</h1>
            <PageLinksTwo />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-9 col-lg-9 md:mb-20">
            <div className="col-12">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 lh-1 fw-500">Calendário de Eventos</h2>
                </div>

                <div className="py-40 md:py-20 sm:py-10 px-30 md:px-20 sm:px-10">
                  <div className="row y-gap-15 justify-between">
                    <div className="col-auto">
                      <div className="d-flex">
                        <div className={`dropdown js-dropdown ${isMonthDropdownOpen ? "-is-dd-active" : ""}`}>
                          <div
                            className="dropdown__button d-flex items-center text-14 h-50 rounded-8 px-15 py-10"
                            onClick={() => setMonthDropdownOpen(!isMonthDropdownOpen)}
                          >
                            <span className="js-dropdown-title">Mês</span>
                            <i className="icon text-9 ml-40 icon-chevron-down"></i>
                          </div>
                          <div className={`toggle-element -dropdown ${isMonthDropdownOpen ? "-is-el-visible" : ""}`}>
        
                          </div>
                        </div>

                        <div className={`dropdown js-dropdown ml-20 ${isCourseDropdownOpen ? "-is-dd-active" : ""}`}>
                           <div
                            className="dropdown__button d-flex items-center text-14 h-50 rounded-8 px-15 py-10"
                            onClick={() => setCourseDropdownOpen(!isCourseDropdownOpen)}
                           >
                             <span className="js-dropdown-title">Todos Cursos</span>
                             <i className="icon text-9 ml-40 icon-chevron-down"></i>
                           </div>
                           <div className={`toggle-element -dropdown ${isCourseDropdownOpen ? "-is-el-visible" : ""}`}>
                            
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-auto">
                      <button className="button -md -narrow -purple-1 text-white">
                        <i className="icon-calendar-2 mr-10"></i>
                        Novo Evento
                      </button>
                    </div>
                  </div>

                  
                  <div className="overflow-scroll scroll-bar-1 mt-30">
                    <EventCalendar />
                  </div>

                  <div className="row x-gap-20 y-gap-10 justify-center pt-30">
                    <div className="col-auto">
                      <a href="#" className="button -icon -purple-3 text-light-1">
                        Exportar Calendário
                        <i className="icon-arrow-top-right text-13 ml-10"></i>
                      </a>
                    </div>
                    <div className="col-auto">
                      <a href="#" className="button -icon -purple-3 text-light-1">
                        Gerenciar Assinaturas
                        <i className="icon-arrow-top-right text-13 ml-10"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3">
            
            <div className="row y-gap-30">
              <EventKeys />
              <div className="col-12">
                <div className="pt-20 pb-30 px-10 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                  <h5 className="text-17 fw-500 mb-30">Visualização mensal</h5>
                  <MonthlyCalender />
                  <br />
                  <MonthlyCalender style={{ marginTop: "20px" }} />
                  <br />
                  <MonthlyCalender style={{ marginTop: "20px" }} />
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