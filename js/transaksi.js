import { supabase } from './supabase.js';

export async function getTransaksi() {
  return await supabase
    .from('transaksi')
    .select('*')
    .order('tanggal', { ascending: false });
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
    .order('tanggal', { ascending: false });

  if (error) throw error;
  return { data };
}

export async function addTransaksi(data) {
  data.total = data.nominal * data.qty;
  return await supabase.from('transaksi').insert([data]);
}

export async function deleteTransaksi(id) {
  return await supabase.from('transaksi').delete().eq('id', id);
}
