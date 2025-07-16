import React, { useState, useEffect } from "react";

export const Context = React.createContext();
const apiURL = "https://playground.4geeks.com/contact/"; 
const agendaSlug = "manuelp700";

export const ContextProvider = ({ children }) => {

  const [contacts, setContacts] = useState([]);

  const createAgendaIfNotExists = async () => {
  
    const res = await fetch(`${apiURL}agendas/${agendaSlug}`);
    const data = await res.json();
    if (data?.detail === "Not Found") {
      const createAgendaRes = await fetch(`${apiURL}agendas/${agendaSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const agendaData = await createAgendaRes.json();

      
      const createContactRes = await fetch(`${apiURL}agendas/${agendaSlug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Manuel A",
          email: "manuel@example.com",
          phone: "123456789",
          address: "Madrid"
        })
      });
      const contactData = await createContactRes.json();

      setTimeout(getContacts, 2000);
    } else if (Array.isArray(data) && data.length === 0) {
      const createContactRes = await fetch(`${apiURL}agendas/${agendaSlug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Manuel A",
          email: "manuel@example.com",
          phone: "123456789",
          address: "Madrid"
        })
      });
      const contactData = await createContactRes.json();

      setTimeout(getContacts, 2000);
    } else {
      getContacts();
    }
  };

  const getContacts = async () => {
    try {
      const res = await fetch(`${apiURL}agendas/${agendaSlug}`);
      const data = await res.json();
      if (Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      } else {
        setContacts([]);
      }
    } catch (error) {
      setContacts([]);
    }
  };

  const addContact = async (contact) => {

    const apiContact = {
      name: contact.full_name || contact.name || "",
      phone: contact.phone || "",
      email: contact.email || "",
      address: contact.address || ""
    };

    await fetch(`${apiURL}agendas/${agendaSlug}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiContact)
    });
    getContacts();
  };

  const updateContact = async (id, contact) => {
    const apiContact = {
      name: contact.full_name || contact.name || "",
      phone: contact.phone || "",
      email: contact.email || "",
      address: contact.address || ""
    };

    await fetch(`${apiURL}agendas/${agendaSlug}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiContact)
    });
    getContacts();
  };

  const deleteContact = async (id) => {
    await fetch(`${apiURL}agendas/${agendaSlug}/contacts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    getContacts();
  };

  useEffect(() => {
    createAgendaIfNotExists().then(getContacts);
  }, []);

  return (
    <Context.Provider value={{ store: { contacts }, actions: { addContact, getContacts, updateContact, deleteContact } }}>
      {children}
    </Context.Provider>
  );
};
