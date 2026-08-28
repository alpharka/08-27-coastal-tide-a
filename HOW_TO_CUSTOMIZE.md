# Panduan Kustomisasi Website Undangan

Dokumen ini menjelaskan cara mengganti identitas pasangan, detail acara, galeri, musik, data tanda kasih, dan gaya visual pada **Nara & Elio — Tide & Vow**. Website ini adalah frontend-only React yang menggunakan `localStorage` untuk RSVP dan guestbook pada perangkat pengunjung.

> **Penting:** Sebelum membagikan URL, ganti seluruh data contoh—terutama nama pasangan, tanggal, lokasi, nomor rekening, nomor e-wallet, dan link peta—di satu objek konfigurasi pusat.

## 1. Menjalankan Proyek

Pastikan Node.js dan pnpm tersedia, lalu jalankan perintah berikut dari direktori repository:

```bash
pnpm install
pnpm dev
```

Buka URL development yang ditampilkan terminal. Untuk pemeriksaan sebelum commit, gunakan:

```bash
pnpm check
pnpm build
```

`pnpm check` menjalankan pemeriksaan tipe TypeScript, sedangkan `pnpm build` membuat build production. Keduanya harus berhasil sebelum perubahan disimpan ke repository.

| Kebutuhan | Lokasi |
|---|---|
| Halaman undangan dan seluruh section | `client/src/pages/Home.tsx` |
| Data pasangan dan acara | Objek `invitationConfig` di bagian atas `Home.tsx` |
| Daftar foto galeri | Konstanta `gallery` di `Home.tsx` |
| Warna, font, layout, responsivitas, dan motion | `client/src/index.css` |
| Judul halaman, metadata, Google Fonts, favicon | `client/index.html` |
| Arah desain dan keputusan visual | `ideas.md` |

## 2. Mengganti Data Pasangan dan Acara

Buka `client/src/pages/Home.tsx`, kemudian edit objek `invitationConfig`. Pertahankan struktur property agar komponen yang sudah ada tetap bekerja.

```tsx
const invitationConfig = {
  couple: {
    names: "Nama Mempelai 1 & Nama Mempelai 2",
    first: "Nama Mempelai 1",
    second: "Nama Mempelai 2",
    parents: "Putri/Putra dari keluarga ...",
  },
  event: {
    date: "21 November 2026",
    shortDate: "21.11.26",
    start: "2026-11-21T15:00:00+07:00",
    end: "2026-11-21T21:00:00+07:00",
    akadTime: "15.00 WIB",
    receptionTime: "18.30–21.00 WIB",
    akadVenue: "Nama venue akad",
    receptionVenue: "Nama venue resepsi",
    address: "Alamat lengkap acara",
    mapsUrl: "https://maps.google.com/?q=Nama+Venue",
  },
};
```

`event.start` menjadi sumber countdown. Gunakan format ISO dengan offset timezone yang benar, misalnya `+07:00` untuk WIB. `event.end` digunakan untuk link Google Calendar. Tanggal yang tampil kepada tamu tetap berasal dari `event.date`, sehingga format bahasa Indonesia dapat dibuat sesuai kebutuhan.

Nama orang tua sudah tersedia dalam konfigurasi sebagai `couple.parents`. Jika ingin menampilkannya di halaman, tambahkan markup pada section cerita atau section khusus keluarga; jangan menulis data yang sama berulang kali di banyak komponen.

## 3. Nama Tamu dari URL

Nama tamu dibaca dari query parameter `to`:

```text
https://domain-undangan.com/?to=Keluarga%20Budi%20Santoso
```

Jika parameter tidak ada, halaman menampilkan **“Tamu undangan”**. Nilai tersebut dirapikan whitespace-nya, dibatasi panjangnya, dan dirender sebagai teks biasa sehingga tidak diperlakukan sebagai HTML.

Untuk menguji beberapa kondisi:

| Skenario | URL |
|---|---|
| Tanpa nama tamu | `https://domain-undangan.com/` |
| Nama dengan spasi | `https://domain-undangan.com/?to=Keluarga%20Budi%20Santoso` |
| Nama dengan karakter khusus | Encode nilai query menggunakan `encodeURIComponent` |

## 4. Mengganti Galeri dan Aset Visual

Daftar foto berada di konstanta `gallery` pada `Home.tsx`. Setiap item membutuhkan `src`, `alt`, `caption`, dan `className`.

```tsx
const gallery = [
  {
    src: "/manus-storage/foto-01.jpg",
    alt: "Deskripsi foto yang dapat dipahami pengguna pembaca layar",
    caption: "Caption pendek",
    className: "gallery-tall",
  },
];
```

Gunakan `alt` yang menggambarkan isi foto, bukan nama file. Jangan menduplikasi foto di beberapa item. Class `gallery-tall`, `gallery-wide`, dan `gallery-medium` mengatur ritme masonry pada desktop; breakpoint mobile akan mengubahnya menjadi susunan dua kolom.

Untuk aset baru, simpan file sumber di luar folder proyek, lalu unggah melalui alur penyimpanan asset webdev. Gunakan URL storage yang dikembalikan secara langsung pada `src`. Jangan menaruh foto, video, atau audio berukuran besar di `client/public` atau `client/src/assets` karena dapat memperlambat deployment.

Emblem Tide & Vow saat ini digunakan pada cover, header, section cerita, RSVP, footer, dan favicon. Jika mengganti emblem, pertahankan bentuk simbol grafis tanpa teks agar tetap terbaca pada ukuran kecil dan tidak bergantung pada font.

## 5. Mengganti Musik Latar

Property `invitationConfig.musicUrl` adalah sumber audio yang dipakai oleh elemen `<audio>` di halaman:

```tsx
musicUrl: "/manus-storage/musik-pernikahan.wav",
```

Playback dimulai setelah tombol **Buka undangan** ditekan karena browser biasanya membatasi autoplay sebelum ada interaksi pengguna. Volume awal berada di sekitar 24% dan audio berjalan loop. Jika browser menolak playback, tombol musik tetap tampil dengan feedback bahwa musik belum dapat diputar.

Gunakan musik yang memang Anda miliki atau memiliki izin pemakaian. Pastikan file sudah diunggah ke storage dan URL-nya valid sebelum mengganti property tersebut.

## 6. Mengatur Detail Lokasi dan Google Calendar

`mapsUrl` digunakan oleh tombol **Lihat lokasi** pada detail tiap acara. Ganti URL tersebut dengan link Google Maps venue yang sebenarnya.

Tombol **Simpan ke Google Calendar** tidak memerlukan pengeditan manual setiap kali nama atau tanggal diganti. Fungsi `createCalendarUrl()` membaca `couple.names`, `theme.line`, `event.start`, `event.end`, `event.address`, dan timezone `Asia/Jakarta`, lalu membuat URL event secara otomatis. Jika acara berlangsung di timezone lain, ubah nilai `ctz` dan offset ISO secara bersamaan.

## 7. Mengganti Data Amplop Digital

Edit property `payment` di `invitationConfig`:

```tsx
payment: {
  isSampleData: false,
  provider: "DANA",
  ewallet: "Nomor e-wallet sebenarnya",
  ewalletLink: "https://link-pembayaran-sebenarnya",
  bank: "Bank BCA",
  account: "Nomor rekening sebenarnya",
  recipient: "Nama pemilik rekening",
},
```

QR code dibuat dari `ewalletLink`. Jika link pembayaran berubah, QR akan mengikuti payload baru ketika halaman dirender. Tombol salin menggunakan Clipboard API dan menyediakan fallback untuk browser yang tidak mendukung API tersebut.

Ubah `isSampleData` menjadi `false` hanya setelah semua data pembayaran sudah benar. Selama property bernilai `true`, halaman sengaja menampilkan catatan **Contoh data** agar data placeholder tidak keliru dibagikan kepada tamu.

## 8. RSVP dan Guestbook

Form RSVP memvalidasi nama serta pesan, lalu menambahkan entry baru ke guestbook tanpa reload halaman. Data disimpan di browser pengunjung dengan key:

```text
`tide-vow-guestbook`
```

Artinya, RSVP pada versi sekarang **belum tersimpan ke server dan tidak dapat dilihat lintas perangkat**. Guestbook awal sengaja kosong dan tidak memiliki testimonial, rating, review, atau pesan buatan.

Untuk menghapus data uji dari browser saat pengembangan, jalankan di DevTools Console:

```js
localStorage.removeItem("tide-vow-guestbook");
location.reload();
```

Jika RSVP perlu dikumpulkan oleh keluarga atau wedding organizer dari banyak perangkat, website perlu di-upgrade ke backend/database. Pada tahap itu, validasi server, rate limiting, sanitasi, kontrol akses, serta kebijakan privasi perlu ditambahkan sebelum data tamu digunakan secara nyata.

## 9. Mengubah Tema Visual

Tema utama berada di `client/src/index.css`. Identitas Tide & Vow menggunakan:

| Token visual | Nilai | Peran |
|---|---|---|
| Ocean navy | `#123040` | Latar gelap, teks utama, anchor visual |
| Warm sand | `#F3EDE3` | Ruang napas dan latar utama |
| Coral Ember | `#D76A4A` | CTA utama, penekanan emosional, indikator aktif |
| Cormorant Garamond | Google Fonts | Nama dan headline display |
| Manrope | Google Fonts | Body copy, label, form, navigasi |

Jika mengganti palet, ubah token CSS dan periksa kembali kontras terhadap foto hero, background section, tombol, form, serta navigasi fixed. Coral Ember sengaja digunakan selektif; jangan menjadikannya warna dekorasi umum karena fungsi utamanya adalah menandai tindakan dan momen emosional.

Jika mengganti font, perbarui dua bagian: import Google Fonts di `client/index.html` dan seluruh deklarasi `font-family` yang relevan di `client/src/index.css`. Hindari mengganti display font dengan font body agar hierarki editorial tetap terjaga.

## 10. Checklist Pengujian Sebelum Dibagikan

Lakukan pemeriksaan berikut setelah setiap perubahan besar:

1. Buka halaman tanpa query `to` dan pastikan fallback nama tamu tampil.
2. Buka URL dengan `?to=Nama%20Tamu` dan pastikan nama tampil sebagai teks biasa.
3. Tekan **Buka undangan**, lalu pastikan cover slide-up dan konten dapat discroll.
4. Pastikan musik mulai setelah interaksi atau tombol kontrol memberi feedback ketika playback ditolak browser.
5. Pastikan angka countdown berubah setiap detik dan berhenti pada nilai minimum nol setelah acara dimulai.
6. Pastikan tombol Google Maps membuka lokasi yang benar pada tab baru.
7. Pastikan Google Calendar memuat judul, tanggal, timezone, deskripsi, dan lokasi yang sesuai.
8. Buka foto galeri menggunakan mouse dan keyboard; uji tombol tutup, foto sebelumnya, foto berikutnya, `Escape`, `ArrowLeft`, dan `ArrowRight`.
9. Kirim RSVP kosong untuk memeriksa validasi, lalu kirim RSVP valid untuk memastikan guestbook bertambah.
10. Uji tombol salin nomor e-wallet dan rekening, termasuk feedback **Tersalin**.
11. Uji lebar sekitar 320–390 px, tablet, dan desktop lebar tanpa overflow horizontal.
12. Aktifkan `prefers-reduced-motion` di browser dan pastikan konten tetap langsung terlihat.
13. Jalankan `pnpm check` dan `pnpm build`.

## 11. Alur Commit dan Sinkronisasi Repository

Setelah dokumentasi atau kode selesai diperiksa, lihat perubahan lokal:

```bash
git status
git diff -- HOW_TO_CUSTOMIZE.md
```

Repository proyek terhubung ke sinkronisasi GitHub. Untuk menyimpan versi proyek melalui workflow proyek, buat checkpoint setelah semua perubahan siap. Checkpoint akan menjadi versi yang dapat ditinjau dan dipublikasikan sesuai pengaturan project.

Jika Anda bekerja langsung dengan GitHub CLI pada repository yang terlihat di akun Anda, Anda dapat memeriksa status remote dengan:

```bash
gh repo view
```

Jangan melakukan force-push atau menghapus branch remote tanpa konfirmasi. Jika muncul konflik konten, pertahankan perubahan pengguna yang sudah ada dan gabungkan dokumentasi secara manual.

## 12. Batasan Versi Saat Ini

Versi ini menggunakan konfigurasi statis dan storage browser. Ia cocok untuk undangan personal yang membutuhkan pengalaman visual premium, tetapi belum menyediakan dashboard RSVP, sinkronisasi guestbook lintas perangkat, autentikasi admin, atau database. Penambahan fitur tersebut sebaiknya dilakukan sebagai pengembangan terpisah agar data tamu, privasi, dan alur operasional dapat dirancang dengan benar.

## References

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage "MDN Web Docs — Window: localStorage property"

[2]: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API "MDN Web Docs — Clipboard API"

[3]: https://support.google.com/calendar/answer/72143 "Google Calendar Help — Create an event from a URL"
