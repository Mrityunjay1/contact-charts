// src/components/ContactList.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/store";
import { deleteContact, setContactToEdit } from "../features/contactSlice";

const ContactList = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteContact(id));
  };

  const handleEdit = (contact: {
    id: number;
    name: string;
    email: string;
    status: "active" | "inactive";
  }) => {
    dispatch(setContactToEdit(contact));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">{contact.name}</h3>
            <p className="text-gray-700">{contact.email}</p>
            <p className="text-gray-700">Status: {contact.status}</p>
          </div>
          <div className="flex-shrink-0 flex mt-4 space-x-2">
            <button
              onClick={() => handleEdit(contact)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(contact.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
