// src/components/ContactForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../features/store";
import {
  addContact,
  setContactToEdit,
  updateContact,
} from "../features/contactSlice";
import ContactList from "../components/ContactList";

const ContactForm = () => {
  const dispatch = useDispatch();

  const contactToEdit = useSelector(
    (state: RootState) => state.contacts.contactToEdit
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setEmail(contactToEdit.email);
      setStatus(contactToEdit.status);
    }
  }, [contactToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (contactToEdit) {
      dispatch(updateContact({ id: contactToEdit.id, name, email, status }));
      dispatch(setContactToEdit(null));
    } else {
      const newContact = { id: Date.now(), name, email, status };
      dispatch(addContact(newContact));
    }

    setName("");
    setEmail("");
    setStatus("active");
  };

  const handleCancelEdit = () => {
    dispatch(setContactToEdit(null));
    setName("");
    setEmail("");
    setStatus("active");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {contactToEdit ? "Update Contact" : "Add Contact"}
          </button>
          {contactToEdit && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <ContactList />
    </>
  );
};

export default ContactForm;
