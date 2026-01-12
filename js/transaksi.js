import { supabase } from './supabase.js';

export async function getTransaksi(kategori = null) {
  let query = supabase
    .from('transaksi')
    .select('*')
    .order('tanggal', { ascending: false });

  if (kategori) query = query.eq('kategori', kategori);

  return await query;
}

export async function addTransaksi(data) {
  return await supabase.from('transaksi').insert([data]);
}

export async function deleteTransaksi(id) {
  return await supabase.from('transaksi').delete().eq('id', id);
}
