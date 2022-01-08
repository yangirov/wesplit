import {
  ApplicationRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private ref: ApplicationRef
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (!localStorage.getItem('user-theme')) {
      localStorage.setItem('user-theme', 'auto-mode');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      const isDarkModeOn = e.matches;

      const isAutoMode = localStorage.getItem('user-theme') === 'auto-mode';
      if (isAutoMode) {
        const theme = isDarkModeOn ? 'dark-mode' : 'light-mode';
        this.update(theme);
      }

      this.ref.tick();
    });
  }

  initTheme() {
    const theme = this.getColorTheme();
    this.update(theme);
  }

  update(theme: string) {
    const isAutoMode = theme === 'auto-mode';
    if (isAutoMode) {
      const isDarkModeOn =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      theme = isDarkModeOn ? 'dark-mode' : 'light-mode';
    }

    document.body.className = 'mat-typography';
    this.renderer.addClass(document.body, theme);
  }

  setColorTheme(theme: string) {
    localStorage.setItem('user-theme', theme);
  }

  getColorTheme() {
    return localStorage.getItem('user-theme') ?? 'auto-mode';
  }
}
