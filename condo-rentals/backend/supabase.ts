import supabase from './supabaseConfig';

const fetchProperties = async () => {
  const { data, error } = await supabase.from('properties').select('*');
  if (error) console.error(error);
  return data;
};

const addProperty = async (property: any) => {
  const { data, error } = await supabase.from('properties').insert([property]);
  if (error) console.error(error);
  return data;
};