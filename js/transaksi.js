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

btnFilter.addEventListener('click', async () => {
  if (!filterBulan.value) {
    alert('Pilih bulan terlebih dahulu');
    return;
  }

  const { data } = await getTransaksiByBulan(filterBulan.value);
  renderTable(data);
});

btnReset.addEventListener('click', loadData);

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

function renderTable(data) {
  let pemasukan = 0;
  let pengeluaran = 0;
  tbody.innerHTML = '';

  data.forEach(item => {
    if (item.jenis === 'pemasukan') pemasukan += item.total;
    else pengeluaran += item.total;

    tbody.innerHTML += `
      <tr class="border-t">
        <td class="p-2">${item.tanggal}</td>
        <td class="p-2">${item.catatan ?? ''}</td>
        <td class="p-2 text-center">${item.jenis}</td>
        <td class="p-2">${item.kategori}</td>
        <td class="p-2 text-right">Rp ${item.nominal.toLocaleString()}</td>
        <td class="p-2 text-right">${item.qty}</td>
        <td class="p-2 text-right font-semibold">
          Rp ${item.total.toLocaleString()}
        </td>
        <td class="p-2 text-center">
          <button onclick="editTransaksi(${JSON.stringify(item)})"
            class="text-blue-600">Edit</button>
          |
          <button onclick="hapus('${item.id}')"
            class="text-red-600">Hapus</button>
        </td>
      </tr>
    `;
  });

  pemasukanEl.textContent = 'Rp ' + pemasukan.toLocaleString();
  pengeluaranEl.textContent = 'Rp ' + pengeluaran.toLocaleString();
  saldoEl.textContent = 'Rp ' + (pemasukan - pengeluaran).toLocaleString();
}

async function loadData() {
  const { data } = await getTransaksi();
  renderTable(data);
}


