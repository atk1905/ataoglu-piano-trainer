# ZamanSepeti Final Sentez

Bu dosya, dört varyantın ortak noktasını birleştiren nihai özet ve Lovable prompt iskeletidir.

## Birleşik strateji
- Hedef: zamanı olmayan kullanıcılar ile işi yapabilecek uzmanları eşleştirmek
- Konumlama: Armut benzeri ama "zaman kazandırma" merkezli
- Canlılık kuralı: ilan ve tekliflerin 7 gün sonra pasif olması
- Öncelik: güven, hız, basit kullanım, mobil uyum

## MVP kararları
1. Auth
2. İlan oluşturma
3. Teklif verme
4. Mesajlaşma
5. Favoriler
6. Puan / yorum
7. Admin moderasyon
8. Kategori / filtre
9. 7 günlük TTL
10. Öne çıkarma / boost

## Supabase çekirdek şema
- users
- profiles
- categories
- listings
- offers
- conversations
- messages
- reviews
- favorites
- notifications
- boosts

## Monetizasyon önceliği
1. Boost
2. Pro abonelik
3. Kurumsal paket

## Nihai Lovable promptu
"Zamansepeti.org için Türkçe, mobil öncelikli, modern ve güven veren bir marketplace oluştur. Tema: zamanı olmayan kullanıcıların iş talebi açtığı, uzmanların teklif verdiği ve ilan / tekliflerin 7 gün sonra otomatik kapanarak akışı canlı tuttuğu bir pazar yeri. MVP'de auth, ilan oluşturma, teklif verme, mesajlaşma, favoriler, puanlama, admin moderasyonu, kategori filtresi, boost paketleri ve net UI akışları olsun. Supabase kullan; uygun tablo ilişkileri ve temel RLS kur. Armut benzeri ama daha özgün, daha hızlı ve zaman odaklı bir deneyim üret."
