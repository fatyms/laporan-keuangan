import { supabase } from './supabase.js';

const filterBulan = document.getElementById('filterBulan');
const btnFilter = document.getElementById('btnFilter');
const btnReset = document.getElementById('btnReset');

export async function getTransaksi(kategori = '') {
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

export async function getTransaksiByBulan(bulan) {
  const start = `${bulan}-01`;
  const end = new Date(bulan + '-01');
  end.setMonth(end.getMonth() + 1);

  const { data, error } = await supabase
    .from('transaksi')
    .select('*')
    .gte('tanggal', start)
    .lt('tanggal', end.toISOString().slice(0, 10))
    .eq('deleted_at', null)
    .order('tanggal', { ascending: false });

  if (error) throw error;
  return { data };
}
