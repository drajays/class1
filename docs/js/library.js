// Reading Library — links to the generated chapter/subject PDFs (docs/pdf/*), listed in data/library.json
const Library = {
  data: null,
  async open() {
    const el = document.getElementById('library-body');
    if (!this.data) {
      try { this.data = await (await fetch(AppConfig.url('data/library.json'))).json(); }
      catch (e) { el.innerHTML = '<p class="library-empty">Library is offline right now.</p>'; return; }
    }
    el.innerHTML = Object.values(this.data).map((b) => `
      <section class="library-book">
        <h3>${b.icon} ${b.title} — Class 1</h3>
        <a class="library-full" target="_blank" rel="noopener" href="${AppConfig.url(b.full)}">📕 Open the whole ${b.title} book</a>
        <div class="library-chapters">${b.chapters.map((c, i) =>
          `<a class="library-ch" target="_blank" rel="noopener" href="${AppConfig.url(c.file)}">
             <span>${c.icon}</span><span>${c.title}</span></a>`).join('')}</div>
      </section>`).join('');
  },
};
