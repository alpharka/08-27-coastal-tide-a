# Arah Desain Undangan Digital

## Eksplorasi Awal

### Theme Name: Tide & Vow
Very Brief Intro: Editorial coastal modern yang memadukan ketenangan laut, pasir hangat, dan tipografi majalah untuk membuat undangan terasa intim namun refined.
Probability: 0.07

### Theme Name: Moonlit Garden
Very Brief Intro: Romantic dark botanical dengan latar ink, detail bunga malam, dan aksen tembaga yang terasa sinematik serta dewasa.
Probability: 0.03

### Theme Name: Sunlit Paper
Very Brief Intro: Japanese-inspired paper minimalism dengan putih tulang, tinta charcoal, dan aksen vermilion yang terasa hening, tactile, dan sangat personal.
Probability: 0.08

## Pendekatan Terpilih: Tide & Vow

### Design Movement
Coastal editorial modern: perpaduan art direction majalah perjalanan pesisir dengan minimalisme material yang terasa tactile, bukan nautical literal.

### Core Principles
1. **Editorial asymmetry:** struktur halaman memakai offset, kolom samping, dan garis ukur agar terasa dikurasi, bukan template kartu seragam.
2. **Quiet materiality:** tekstur grain, garis kontur air, dan bidang pasir memberi kedalaman tanpa dekorasi berlebihan.
3. **Warm intimacy:** copy, spacing, dan interaksi terasa seperti surat pribadi yang dirancang dengan teliti.
4. **Calm motion:** gerakan lambat dan ringan, hanya pada momen penting seperti membuka cover, reveal section, dan lightbox.

### Color Philosophy
Deep ocean navy menjadi jangkar emosional: stabil, dewasa, dan memberi kontras kuat. Warm sand menjadi ruang napas yang organik dan menghindari kesan sterile. Coral ember hanya digunakan sebagai aksen tindakan dan penanda momen, seperti matahari rendah di horizon.

### Layout Paradigm
Halaman memakai alur editorial vertikal dengan rail nomor section di sisi desktop, blok teks yang bergeser dari axis tengah, dan masonry gallery yang mengikuti ritme portrait-landscape. Pada mobile, rail berubah menjadi sticky bottom navigation agar akses tetap ringkas tanpa hamburger.

### Signature Elements
- Garis kontur pasang-surut tipis yang muncul sebagai divider dan detail dekoratif.
- Emblem abstrak dua gelombang yang menyatu, dipakai di cover, header, footer, dan favicon.
- Label metadata kecil bergaya jurnal: tanggal, koordinat emosional, dan nomor section.

### Interaction Philosophy
Interaksi harus terasa seperti membuka surat: satu aksi utama, feedback jelas, dan tidak ada gerakan yang mengagetkan. Tombol menggunakan aksen coral sebagai sinyal hangat; copy feedback tetap manusiawi dan spesifik.

### Animation
Cover slide-up 720ms dengan ease-in-out yang lembut. Header dan nav muncul berurutan setelah cover selesai. Section reveal memakai opacity dan translateY kecil melalui IntersectionObserver. Gallery hover hanya scale ringan; lightbox fade cepat. Semua motion non-esensial dinonaktifkan untuk `prefers-reduced-motion`.

### Typography System
Display memakai **Cormorant Garamond** untuk nama pasangan dan judul emosional; body memakai **Manrope** untuk keterbacaan modern; metadata memakai Manrope uppercase dengan tracking lebar. Nama pasangan menggunakan ukuran besar dengan line-height rapat, sedangkan body maksimal 62ch agar terasa seperti editorial.

### Brand Essence
Undangan digital yang terasa seperti surat cinta berformat editorial untuk pasangan yang menghargai detail, suasana, dan pengalaman tamu. Personality: **tenang, intim, refined**.

### Brand Voice
Headline terdengar puitis namun tidak abstrak; CTA terdengar hangat dan langsung; microcopy menjelaskan tindakan tanpa bahasa produk yang kaku.

Contoh: “Dua arah pulang, satu rumah yang kami pilih.”
Contoh CTA: “Masuk ke cerita kami” dan “Titipkan doa untuk kami”.

### Wordmark & Logo
Logo berupa simbol dua kurva gelombang yang saling mengunci membentuk bentuk ∿∞ abstrak, tanpa teks, dengan ujung kurva menyerupai horizon dan simpul janji.

### Signature Brand Color
**Coral Ember — `#D76A4A`**, warna aksen yang terasa seperti cahaya senja di permukaan laut; dipakai hemat untuk CTA, indikator aktif, dan detail penting.

## Implementasi Teknis yang Disepakati

Data pasangan disimpan dalam satu objek konfigurasi dengan placeholder yang jelas dan mudah dicari. Website tetap frontend-only, sehingga RSVP dan guestbook disimpan di `localStorage` dan diberi keterangan transparan. Konten awal tidak akan memuat review, testimonial, rating, atau pesan tamu buatan.
