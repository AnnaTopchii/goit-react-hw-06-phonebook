import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Formik, Field } from 'formik';
import { Form, FormField, ErrorMessage, Button } from './ContactForm.styled';
import * as Yup from 'yup';

import { addContact } from 'redux/contactsSlice';

const initialValues = {
  name: '',
  number: '',
};

const nameRegex =
  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/gm;

const numberRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/gm;

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      nameRegex,
      'Name may contain only letters, apostrophe, dash and spaces'
    )
    .required(),
  number: Yup.string()
    .min(6, 'Too Short!')
    .max(15, 'Too Long!')
    .matches(
      numberRegex,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const handleSubmit = e => {
    const sameName = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    console.log(sameName);
    if (sameName) return alert(name + ' is already in contacts.');

    dispatch(addContact({ name, number }));

    setName('');
    setNumber('');
  };

  const onChange = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;

      case 'number':
        setNumber(e.currentTarget.value);
        break;

      default:
        return;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validationSchema={Schema}
    >
      <Form>
        <FormField>
          Name
          <Field type="text" name="name" onChange={onChange} value={name} />
          <ErrorMessage name="name" component="div" />
        </FormField>
        <FormField>
          Phone
          <Field type="tel" name="number" onChange={onChange} value={number} />
        </FormField>
        <ErrorMessage name="number" component="div" />
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
