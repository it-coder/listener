import axios from 'axios';
import axiosTauriApiAdapter from '../adapter';

import { Client, getClient } from '@tauri-apps/api/http';

const client = axios.create({ adapter: axiosTauriApiAdapter });

export default client;