import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { Container, Title, SubTitle } from './App.styled';

const initalContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contactBook')) ?? initalContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contactBook', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = values => {
    const sameName = contacts.find(
      el => el.name.toLowerCase() === values.name.toLowerCase()
    );

    if (sameName) return alert(sameName.name + ' is already in contacts.');

    const newContact = {
      ...values,
      id: nanoid(),
    };

    setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contacts => contacts.id !== id));
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact}></ContactForm>

      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <>
          <Filter value={filter} onChange={e => setFilter(e.target.value)} />
          <ContactList
            contacts={visibleContacts()}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        'You have no contacts'
      )}
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const nextContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;

//     if (nextContacts !== prevContacts) {
//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }
//   }

//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   };

//   addContact = values => {
//     const sameName = this.state.contacts.find(
//       el => el.name.toLowerCase() === values.name.toLowerCase()
//     );

//     if (sameName) return alert(sameName.name + ' is already in contacts.');

//     const newContact = {
//       ...values,
//       id: nanoid(),
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [newContact, ...contacts],
//     }));
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contacts => contacts.id !== id),
//     }));
//   };

//   onChange = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter, contacts } = this.state;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <Container>
//         <Title>Phonebook</Title>
//         <ContactForm onSubmit={this.addContact}></ContactForm>

//         <SubTitle>Contacts</SubTitle>
//         {contacts.length > 0 ? (
//           <>
//             <Filter value={filter} onChange={this.onChange} />
//             <ContactList
//               contacts={visibleContacts}
//               deleteContact={this.deleteContact}
//             />
//           </>
//         ) : (
//           'You have no contacts'
//         )}
//       </Container>
//     );
//   }
// }
