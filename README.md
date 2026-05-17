# Ataoglu Piano Trainer

iPad uyumlu, Web MIDI tabanlı piyano antrenörü.

Özellikler:
- Eğitim modu
- 50 parçalık repertuvar
- Canlı MIDI debug paneli
- Doğru / yanlış sayacı
- Puan sistemi
- Adaptive keyboard window
- localStorage ile son durum saklama

## Çalıştırma

```bash
cd /home/kankios/ataoglu-piano-trainer
python3 -m http.server 4173
```

Sonra tarayıcıda aç:

```text
http://localhost:4173
```

Notlar:
- Web MIDI secure context ister. `localhost` bu yüzden uygundur.
- iPad Safari Web MIDI desteği sınırlı olabilir; uygulama bu durumda diagnostic görünümde yine açılır.
- Repertuvar içeriği öğretici kısa motiflerden oluşur; tam konser düzenleri değildir.

## Proje yapısı

- `index.html` — tek sayfa arayüz
- `styles.css` — responsive görünüm
- `app.js` — MIDI, eğitim, skor ve UI akışı
- `data.js` — nota eşlemesi, eğitim adımları, 50 parça verisi

## Devam etmek için

- GitHub repo oluştur
- GitHub Pages ile yayınla
- Public URL'yi e-posta ile paylaş
