/* eslint-disable react-hooks/rules-of-hooks */
import { Conversation } from '@/types/chat';

import Cookies from 'js-cookie';

export const updateConversation = (
  updatedConversation: Conversation,
  allConversations: Conversation[],
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  saveConversation(updatedConversation);
  saveConversations(updatedConversations);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const saveConversation = (conversation: Conversation) => {
  fetch(`https://luxifyverse.com/strapi/api/users/${Cookies.get('id')}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
    method: 'PUT',
    body: JSON.stringify({
      selectedConversation: JSON.stringify(conversation),
    }),
  }).then((res) => res.json());
  // .then((data) => console.log(data, 'i am the data from saveConversation'));
  // localStorage.setItem('selectedConversation', JSON.stringify(conversation));
};

export const saveConversations = (conversations: Conversation[]) => {
  fetch(`https://luxifyverse.com/strapi/api/users/${Cookies.get('id')}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
    method: 'PUT',
    body: JSON.stringify({
      conversationHistory: JSON.stringify(conversations),
    }),
  }).then((res) => res.json());
  // .then((data) => console.log(data, 'i am the data from saveConversation'));

  // localStorage.setItem('conversationHistory', JSON.stringify(conversations));
};
