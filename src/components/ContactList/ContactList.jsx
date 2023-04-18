import PropTypes from 'prop-types';
import { List, ListItem, Text, Button } from './ContactList.styled';

export function ContactList({ contacts, deleteContact }) {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          <Text>
            {name}: {number}
          </Text>
          <Button type="button" onClick={() => deleteContact(id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  deleteContact: PropTypes.func.isRequired,
};
