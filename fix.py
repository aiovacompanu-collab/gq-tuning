from pathlib import Path
p=Path('/mnt/data/gq_work/gq_exact/index.html')
s=p.read_text()
s=s.replace('<a href="#contacts" data-page="contacts" class="hero-hotspot hero-hotspot-arrow-left" aria-label="Предыдущая страница"></a>\n      <a href="#works" data-page="works" class="hero-hotspot hero-hotspot-arrow-right" aria-label="Следующая страница"></a>', '<a href="#contacts" data-page="contacts" class="hero-hotspot hero-hotspot-arrow-left" aria-label="Предыдущая страница"></a>\n      <a href="#works" data-page="works" class="hero-hotspot hero-hotspot-arrow-right" aria-label="Следующая страница"></a>')
p.write_text(s)
