import React, { useState } from "react";

export default function EditProfile({ activeTab }) {
  const [previewImage, setPreviewImage] = useState(
    "/assets/img/dashboard/edit/1.png",
  );
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""} `}
    >
      <div className="row y-gap-20 x-gap-20 items-center">
        <label
          className="col-auto"
          htmlFor="imageUpload"
          style={
            previewImage
              ? {}
              : { backgroundColor: "#f2f3f4", width: 100, height: 100 }
          }
        >
          {previewImage && (
            <img
              className="size-100"
              src={previewImage}
              alt={previewImage ? "image" : ""}
            />
          )}
        </label>

        <div className="col-auto">
          <div className="text-16 fw-500 text-dark-1">Seu avatar</div>
          <div className="text-14 lh-1 mt-10">
            PNG ou JPG com no máximo 800px de largura e altura.
          </div>

          <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
            <div>
              <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor="imageUpload1"
                  className="icon-cloud text-16"
                ></label>
                <input
                  required
                  id="imageUpload1"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  document.getElementById("imageUpload1").value = "";
                  setPreviewImage("");
                }}
                className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
              >
                <div className="icon-bin text-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Primeiro Nome
            </label>

            <input required type="text" placeholder="Primeiro Nome" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Sobrenome
            </label>

            <input required type="text" placeholder="Sobrenome" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Telefone
            </label>

            <input required type="text" placeholder="Telefone" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Data de Nascimento
            </label>

            <input required type="text" placeholder="Data de Nascimento" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Endereço Linha 1
            </label>

            <input required type="text" placeholder="Endereço Linha 1" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Endereço Linha 2
            </label>

            <input required type="text" placeholder="Endereço Linha 2" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Estado
            </label>

            <input required type="text" placeholder="Estado" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              País
            </label>

            <input required type="text" placeholder="País" />
          </div>

          <div className="col-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Informações Pessoais
            </label>

            <textarea required placeholder="Texto..." rows="7"></textarea>
          </div>

          <div className="col-12">
            <button className="button -md -purple-1 text-white">
              Atualizar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
