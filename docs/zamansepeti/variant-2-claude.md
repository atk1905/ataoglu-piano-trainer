# ZamanSepeti Varyant 2 — Claude Tarzı Mimari ve Sistem Tasarımı

## Kısa ürün özeti
Zamansepeti.org, kullanıcıların tamamlamaya vakti olmayan işleri ilan ettiği ve uzmanların teklif vererek eşleştiği bir hizmet marketplace'idir. MVP'nin ana farkı, teklif ve ilanların 7 günlük yaşam döngüsüyle canlı, hızlı ve temiz bir pazar hissi üretmesidir.

## MVP özellikleri
- Auth
- Profil
- İlan oluşturma
- Teklif verme
- 7 günlük TTL
- Mesajlaşma
- Bildirim
- Yorum / puan
- Admin onay
- Basit arama ve filtre

## Özgün ayrışma noktaları
- Zaman etiketi + aciliyet rozeti
- Tekliflerin otomatik sonlanması
- Hız metrikleri
- Kategori bazlı güven puanı
- Uzmanlık yerine "zaman kazandırma" konumlaması

## Veri modeli yaklaşımı
users
categories
listings
offers
conversations
messages
reviews
badges
notification_events

## Monetizasyon
- Boosted listing
- Pro membership
- Enterprise / sponsor kategori

## Riskler ve öncelik sırası
1. Güven ve kalite
2. Arama ve ilan akışı
3. Teklif akışı
4. Moderasyon
5. Gelir modeli

## Lovable prompt iskeleti
"React + Supabase ile modern bir marketplace kur. Zaman kavramını merkezde tut. İlanlar 7 gün sonra otomatik pasif olsun. Teklif, mesaj, yorum, favori ve yönetim ekranları ekle. Mobil öncelikli, hızlı, sade ve güven veren tasarla."
