import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, Text, Button } from './ContactList.styled';

import { deleteContact } from 'redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filterValue = useSelector(state => state.filter);

  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  return (
    <List>
      {visibleContacts().map(({ id, name, number }) => (
        <ListItem key={id}>
          <Text>
            {name}: {number}
          </Text>
          <Button type="button" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};
