import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="contact-card d-flex flex-column bg-primary bg-opacity-25 gap-3 align-items-center justify-content-center w-50 p-3 rounded-2 ">
      <div className="d-flex flex-row align-items-center gap-3">
        <img src="https://i.pravatar.cc/300?u=" alt="Avatar" className="avatar" />
        <div>
          <h3>{contact.full_name || contact.name}</h3>
          <p><FontAwesomeIcon icon={faHome} /> {contact.address}</p>
          <p><FontAwesomeIcon icon={faPhone} /> {contact.phone}</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> {contact.email}</p>
        </div>
      </div>
      <div className="d-flex flex-row gap-3">
        <button type="button" className="btn btn-primary" onClick={onEdit}>Edit Contact</button>
        <button type="button" className="btn btn-danger" onClick={onDelete}>Delete Contact</button>
      </div>
    </div>
  );
};