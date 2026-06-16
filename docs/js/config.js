// Resolve asset/data paths for GitHub Pages (repo root or /docs/ subpath)
const AppConfig = {
  basePath: (() => {
    const path = window.location.pathname;
    if (path.includes('/docs')) {
      return path.slice(0, path.indexOf('/docs') + 5);
    }
    const parts = path.split('/').filter(Boolean);
    if (parts.length > 1 && parts[parts.length - 1].includes('.')) {
      parts.pop();
    }
    return parts.length ? '/' + parts.join('/') : '';
  })(),

  url(relative) {
    const base = this.basePath.endsWith('/') ? this.basePath : this.basePath + '/';
    return base + relative.replace(/^\//, '');
  },
};
