import { supabase } from './supabase.js';

export async function getTransaksi() {
  return await supabase
    .from('transaksi')
    .select('*')
    .order('tanggal', { ascending: false });
}

export async function getTransaksiByBulan(bulan) {
  const start = `${bulan}-01`;
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  return await supabase
    .from('transaksi')
    .select('*')
    .gte('tanggal', start)
    .lt('tanggal', end.toISOString().slice(0, 10))
    .order('tanggal', { ascending: false });
}

export async function addTransaksi(data) {
  return await supabase.from('transaksi').insert([data]);
}

export async function updateTransaksi(id, data) {
  return await supabase
    .from('transaksi')
    .update(data)
    .eq('id', id);
}

export async function deleteTransaksi(id) {
  return await supabase
    .from('transaksi')
    .delete()
    .eq('id', id);
}
