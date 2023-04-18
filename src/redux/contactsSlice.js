import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initalContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initalContacts,

  reducers: {
    addContact(state, action) {
      const newContact = {
        ...action.payload,
        // name: action.payload.name,
        // number: action.payload.number,
        id: nanoid(),
      };
      console.log(newContact);
      state.contacts.push(newContact);
    },

    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contacts => contacts.id !== action.payload.id
      );
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
