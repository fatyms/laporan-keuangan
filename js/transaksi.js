import { supabase } from './supabase.js';

/* ======================
   GET DATA
====================== */
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

/* ======================
   ADD
====================== */
export async function addTransaksi(data) {
  data.total = data.nominal * data.qty;
  return await supabase.from('transaksi').insert([data]);
}

/* ======================
   UPDATE
====================== */
export async function updateTransaksi(id, data) {
  data.total = data.nominal * data.qty;
  return await supabase.from('transaksi').update(data).eq('id', id);
}

/* ======================
   DELETE
====================== */
export async function deleteTransaksi(id) {
  return await supabase.from('transaksi').delete().eq('id', id);
}
