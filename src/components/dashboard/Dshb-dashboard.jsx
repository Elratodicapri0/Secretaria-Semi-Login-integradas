import React from "react";
import FooterNine from "../layout/footers/FooterNine";
import PageLinksTwo from "../common/PageLinksTwo";
import PieChartComponent from "./PieCharts";
import { activeUsers, states, timeline } from "@/data/dashboard";
import Charts from "./Charts";
import CalendarTwo from "./calendar/CalenderTwo";

export default function DshbDashboard() {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>

            <PageLinksTwo />
          </div>
        </div>

        <div className="row y-gap-50">
          <div className="col-xl-9 col-lg-12">
            <div className="row y-gap-30">
              {states.slice(0, 3).map((elm, i) => (
                <div key={i} className="col-xl-4 col-md-6">
                  <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                    <div>
                      <div className="lh-1 fw-500">{elm.title}</div>
                      <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                        ${elm.value}
                      </div>
                      <div className="lh-1 mt-25">
                        <span className="text-purple-1">${elm.new}</span> New
                        Sales
                      </div>
                    </div>

                    <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
                  </div>
                </div>
              ))}
            </div>

            <div className="row y-gap-30 pt-30">
              <div className="col-md-6">
                <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                  <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                    <h2 className="text-17 lh-1 fw-500">Visualizações do Seu Perfil</h2>
                    <div className="">
                      <div className="text-14">This Week</div>
                    </div>
                  </div>
                  <div className="py-40 px-30">
                    <Charts />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                  <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                    <h2 className="text-17 lh-1 fw-500">Tráfego</h2>
                    <div className="">
                      <div className="">This Week</div>
                    </div>
                  </div>
                  <div className="py-40 px-30">
                    <PieChartComponent />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="col-xl-3 col-lg-12">
            <div className="row y-gap-30">
              <div className="col-12">
                <div className="d-flex items-center flex-column text-center py-40 px-40 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                  <img src="/assets/img/dashboard/demo/1.png" alt="image" />
                  <div className="text-17 fw-500 text-dark-1 mt-20">
                    Student Demo
                  </div>
                  <div className="text-14 lh-1 mt-5">
                    studentdemo1@example.com
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="pt-20 pb-30 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                  <h5 className="text-17 fw-500 mb-20">Latest Badges</h5>

                  <div className="">
                    <div className="d-flex">
                      <div className="shrink-0">
                        <img
                          src="/assets/img/dashboard/badges/1.png"
                          alt="badge"
                        />
                      </div>

                      <div className="ml-20">
                        <h6 className="text-17 fw-500">Level 5</h6>
                        <div className="text-14 mt-5">
                          Cum sociis natoque penatibus et magnis.
                        </div>
                      </div>
                    </div>

                    <div className="d-flex x-gap-30 item-center pt-20">
                      <img
                        src="/assets/img/dashboard/badges/2.png"
                        alt="badge"
                      />
                      <img
                        src="/assets/img/dashboard/badges/3.png"
                        alt="badge"
                      />
                      <img
                        src="/assets/img/dashboard/badges/4.png"
                        alt="badge"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="pt-20 pb-30 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                  <h5 className="text-17 fw-500">Online Users</h5>
                  <div className="text-14 mt-8">2 usuários online (últimos 12 minutos)</div>

                  <div className="mt-30">
                    <div className="row y-gap-10">
                      {activeUsers.map((elm, i) => (
                        <div key={i} className="col-12">
                          <div className="d-flex items-center">
                            <div className="shrink-0">
                              <img src={elm.image} alt="badge" />
                            </div>
                            <div className="ml-10">
                              <h6 className="text-14 lh-11 fw-500">
                                {elm.name}
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <CalendarTwo />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
