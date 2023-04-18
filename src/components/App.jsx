// import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { Container, Title, SubTitle } from './App.styled';

export const App = () => {
  // const [contacts, setContacts] = useState(
  //   () =>
  //     JSON.parse(window.localStorage.getItem('contactBook')) ?? initalContacts
  // );

  const contacts = useSelector(state => state.contacts);

  // useEffect(() => {
  //   window.localStorage.setItem('contactBook', JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm />

      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <>
          <Filter />
          <ContactList />
        </>
      ) : (
        'You have no contacts'
      )}
    </Container>
  );
};
