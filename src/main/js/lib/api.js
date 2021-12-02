import jwtDecode from 'jwt-decode';
import { clean, query } from './utils';


/* istanbul ignore next */
const root = '/api';

/* istanbul ignore next */
let currentAccessToken = null;

/* istanbul ignore next */
let currentAccessTokenDecoded = null;

/**
 * A voucher of the user authorization. Tokens are short lived and should be
 * renewed before their expiration.
 *
 * @typedef {Object} Token
 *
 * @property {string} iss Issuer: The authority whom issued the token.
 * @property {number} nbf Not Before: The time, in seconds since epoch, at
 *                        which this token becomes valid.
 * @property {number} exp Expiration: The time, in seconds since epoch, at
 *                        which this token becomes invalid.
 * @property {string} sub Subject: The subject for whom the token was issued.
 */


/* istanbul ignore next */
const encode = encodeURIComponent;


function query(target, search = {}) {
  const params = Object.keys(search)
    .map((key) =>
      search[key] instanceof Array
        ? `${key}=${search[key].map(encode).join(':')}`
        : `${key}=${encode(search[key])}`
    )
    .filter(identity);

  return empty(params) ? target : `${target}?${params.join('&')}`;
}

Object.assign(query, { encode });

/**
 * Fetch asynchronously the given api resource with the provided config.
 *
 * @namespace api
 *
 * @param { string } endpoint The api endpoint requested.
 * @param { object } config The request configuration.
 * @param { body }   [config.body=null] The request payload, the request
 *                   defaults to a `GET` method when this argument is null, to
 *                   `POST` otherwise.
 * @param { ...any } [config.providedConfig=null] [Fetch parameters]
 *                   {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API}
 *                   to override automatic parameters.
 */
 function api(endpoint, { body, ...providedConfig } = {}) {
  const headers = { 'content-type': 'application/json' };

  if (currentAccessToken)
    headers['Authorization'] = `Bearer ${currentAccessToken}`;

  const method = providedConfig.method || (body ? 'POST' : 'GET');
  const config = {
    method,
    ...providedConfig,
    headers: {
      ...headers,
      ...providedConfig.headers,
    },
  };

  let target = `${root}${endpoint}`;
  if (body)
    if (method === 'GET')
      target = query(target, clean(body));
    else
      config.body = JSON.stringify(clean(body));

  return window
    .fetch(target, config)
    .then((response) =>
      Promise.all([
        new Promise((resolve, _) => resolve(response.status)),
        (response.headers.get('Content-Type') || '').includes('application/json')
          ? response.json()
          : response.text(),
      ])
    )
    .then(([status, data]) => {
      if (status < 200 || status >= 300)
        throw new Error({ ...data, code: status }); // FIXME
      return data;
    });
}


function auth(endpoint, config = {}) {
  return api(`/auth${endpoint}`, config);
}


Object.assign(auth, {

  /**
   * Clears all authentication state. This implies that API-wise, the user is
   * disconnected and his session is terminated. If authentication data is
   * preserved somewhere else, said data should be removed at the same time.
   */
  clear() {
    currentAccessToken = null;
    currentAccessTokenDecoded = null;
  },

  /**
   * Attempts to login the user with the provided username and password.
   *
   * @param {string} username   The username
   * @param {string} password   The user password
   *
   * @returns {Promise<Token>} The authentication voucher
   */
  async login(username, password) {
    return auth('/login', { body: { username, password } })
      .then(({ token }) => {
        currentAccessToken = token;
        currentAccessTokenDecoded = jwtDecode(token); 
        return currentAccessTokenDecoded;
      });
  },

  /**
   * Disconnects the user.
   */
  async logout() {
    auth.clear();
  },

  async register(username, password) {
    return auth('/register', {
      body: { username, password }
    });
  },

  /**
   * Whether the user is currently connected.
   *
   * @returns {boolean} true if a user is connected, false otherwise.
   */
  connected() {
    if ([currentAccessToken, currentAccessTokenDecoded].includes(null))
      return false;
    return currentAccessTokenDecoded.exp > Date.now();
  }

});

function account(endpoint = '', config = {}) {
  return api(`/accounts${endpoint}`, config);
}

Object.assign(account, {

  async all() {
    // TODO
  },

  async self() {
    // TODO
  },

  async one(id) {
    // TODO
  },

  async posts(id) {
    // TODO
  }

});


function post(endpoint='', config={}) {
  return api(`/posts${endpoint}`, config);
}

Object.assign(posts, {

  async all() {
    // TODO
  },

  async one(id) {
    // TODO
  },

});

Object.assign(api, { auth, account, post });
