import { useContext } from 'react';

import authContext from '../contexts/AuthContext.js';
import apiContext from '../contexts/ApiContext.js';

export const useAuth = () => useContext(authContext);
export const useApi = () => useContext(apiContext);
