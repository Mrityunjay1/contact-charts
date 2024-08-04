// src/redux/contactsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

interface ContactsState {
  contacts: Contact[];
  contactToEdit: Contact | null;
}

const loadContactsFromLocalStorage = (): Contact[] => {
  try {
    const serializedContacts = localStorage.getItem("contacts");
    if (serializedContacts === null) {
      return [];
    }
    return JSON.parse(serializedContacts);
  } catch (e) {
    console.warn("Failed to load contacts from local storage", e);
    return [];
  }
};

const saveContactsToLocalStorage = (contacts: Contact[]) => {
  try {
    const serializedContacts = JSON.stringify(contacts);
    localStorage.setItem("contacts", serializedContacts);
  } catch (e) {
    console.warn("Failed to save contacts to local storage", e);
  }
};

const initialState: ContactsState = {
  contacts: loadContactsFromLocalStorage(),
  contactToEdit: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      saveContactsToLocalStorage(state.contacts);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      saveContactsToLocalStorage(state.contacts);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
      saveContactsToLocalStorage(state.contacts);
    },
    setContactToEdit: (state, action: PayloadAction<Contact | null>) => {
      state.contactToEdit = action.payload;
    },
  },
});

export const { addContact, deleteContact, updateContact, setContactToEdit } =
  contactsSlice.actions;
export default contactsSlice.reducer;
