# Database Configuration (Supabase + React Native + TypeScript)

## Objective
This README provides clear instructions on how to set up and configure the Supabase database for the project. It helps developers quickly initialize and connect to the database while ensuring best practices are followed.

---

## Requirements
Before setting up the database, ensure you have the following installed:

- **Node.js** (Latest LTS version) ➝ [Download Node.js](https://nodejs.org/)
- **Yarn** (`npm install -g yarn`)
- **Expo CLI** (`npm install -g expo-cli`)
- **Supabase CLI** (`npm install -g supabase`)
- **PostgreSQL** (if running Supabase locally) ➝ [Download PostgreSQL](https://www.postgresql.org/download/)
- **.env File** to store database credentials securely

---

## Setup Instructions
### **1. Create a Supabase Project**
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Sign in and create a new project
3. Copy the **Project URL** and **API Key** from the Supabase settings

### **2. Install Required Dependencies**
Run the following command inside your React Native project:
```sh
yarn add @supabase/supabase-js react-native-url-polyfill
```

### **3. Configure Environment Variables**
Create a `.env` file in your project root and add:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```
To load these environment variables in React Native, install dotenv:
```sh
yarn add react-native-dotenv
```
Then, update `babel.config.js`:
```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['module:react-native-dotenv']],
};
```

---

## Connections & Configuration
### **1. Connect to Supabase in React Native (TypeScript)**
Create a `supabase.ts` file inside the `src/lib` folder:

```ts
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
```

### **2. Fetch Data from Supabase**
Example of fetching data from a `properties` table:
```ts
import supabase from '../lib/supabase';

const fetchProperties = async () => {
  const { data, error } = await supabase.from('properties').select('*');
  if (error) console.error(error);
  return data;
};
```

### **3. Insert Data into Supabase**
```ts
const addProperty = async (property: any) => {
  const { data, error } = await supabase.from('properties').insert([property]);
  if (error) console.error(error);
  return data;
};
```

---

## Database Migrations
### **1. Install Supabase CLI**
```sh
yarn global add supabase
```

### **2. Initialize Local Supabase**
```sh
supabase start
```

### **3. Create a New Migration**
```sh
supabase migration new create_properties_table
```
Edit the generated migration SQL file to define the `properties` table.

### **4. Apply Migrations to Database**
```sh
supabase db push
```

### **5. Seed Data (Optional)**
```sh
supabase db seed seed_file.sql
```

---

## Common Issues & Troubleshooting
| Issue | Solution |
|--------|----------|
| **Failed Connection** | Ensure `.env` file has correct credentials and restart the server |
| **Unauthorized Requests** | Check API Key permissions in Supabase Dashboard |
| **CORS Errors** | Enable CORS settings in the Supabase Project Dashboard |
| **Supabase CLI Not Found** | Run `yarn global add supabase` and restart the terminal |

---