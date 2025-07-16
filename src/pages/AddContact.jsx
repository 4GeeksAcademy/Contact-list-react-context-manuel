import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store.jsx";
import { useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (id) {
      const contact = store.contacts.find(c => c.id === parseInt(id));
      if (contact) setFormData(contact);
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    id ? await actions.updateContact(id, formData) : await actions.addContact(formData);
    navigate("/");
  };

  return (
    <div className="contact-card" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-3">
        <input
          name="full_name"
          placeholder="Nombre completo"
          value={formData.full_name}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          type="email"
          required
        />
        <input
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className="form-control"
          required
        />
        <button type="submit" className="btn btn-primary">
          {id ? "Actualizar" : "Agregar"} Contacto
        </button>
      </form>
    </div>
  );
};
