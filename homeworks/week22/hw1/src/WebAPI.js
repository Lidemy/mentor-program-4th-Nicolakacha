import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

export const getLimitedPosts = (page, limit) => {
  return fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`
  ).then((res) => res.json());
};

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const addPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};
