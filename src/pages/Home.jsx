import React, { useContext } from "react";
import { Context } from "../store.jsx";
import { ContactCard } from "../components/ContactCard";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
console.log(store);

  return (
    <div className="d-flex flex-column gap-3 align-items-center justify-content-center"> 
      <button type="button" class="btn btn-success" onClick={() => navigate("/add")}>Add new contact</button>
      {Array.isArray(store.contacts) &&
        store.contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={() => navigate(`/edit/${contact.id}`)}
            onDelete={() => actions.deleteContact(contact.id)}
          />
        ))}
    </div>
  );
};
