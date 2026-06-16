const Journey = {
  render() {
    const track = document.getElementById('journey-track');
    if (!track || !Learn.catalog?.subjects?.length) return;
    const p = Store.getPlayer(App.playerId);
    const totalChapters = Learn.catalog.subjects.reduce((s, sub) => s + (sub.chapterCount || 0), 0);
    const doneChapters = Object.values(p.chapters || {}).filter((v) => v > 0).length;
    const progress = totalChapters ? doneChapters / totalChapters : 0;
    let foundCurrent = false;

    const nodes = JOURNEY_NODES.map((node) => {
      let status = 'locked';
      if (node.id === 'start') status = 'done';
      else if (node.id === 'treasure') {
        status = progress >= 0.95 ? 'done' : progress > 0.5 ? 'current' : 'locked';
      } else {
        const sub = Learn.catalog.subjects.find((s) => s.id === node.id);
        const done = sub ? Store.countChapterStars(App.playerId, node.id) : 0;
        const total = sub?.chapterCount || 1;
        if (done >= total) status = 'done';
        else if (!foundCurrent) { status = 'current'; foundCurrent = true; }
      }
      return `<div class="journey-node ${status}">
        <span class="journey-emoji">${node.emoji}</span>
        <span class="journey-label">${node.name}</span>
      </div>`;
    }).join('');

    const avatarPos = Math.min(progress * 100, 92);
    track.innerHTML = `
      <div class="journey-path">
        <div class="journey-rocket" style="left:${avatarPos}%">🚀</div>
        ${nodes}
      </div>
      <p class="hint journey-hint">${doneChapters} of ${totalChapters} chapters — fly to the Treasure Crown!</p>
    `;
  },
};
