// KineticLoad - Lógica Principal de la Aplicación y Navegación

(function () {
  'use strict';

  // Gestor de Almacenamiento Local (LocalStorage)
  const Storage = {
    KEY_HISTORY: 'kineticload_history',
    KEY_SESSION: 'kineticload_session_progress',

    getHistory() {
      try {
        const stored = localStorage.getItem(this.KEY_HISTORY);
        return stored ? JSON.parse(stored) : window.KineticData.history;
      } catch (e) {
        return window.KineticData.history;
      }
    },

    saveHistory(history) {
      try {
        localStorage.setItem(this.KEY_HISTORY, JSON.stringify(history));
      } catch (e) {
        console.warn('LocalStorage no disponible:', e);
      }
    },

    addLog(entry) {
      const history = this.getHistory();
      history.push(entry);
      this.saveHistory(history);
      return history;
    }
  };

  window.KineticStorage = Storage;

  // Sistema de Enrutamiento y Navegación (Escritorio + Móvil)
  const Router = {
    currentView: 'dashboard',

    init() {
      // Eventos en enlaces con data-view
      document.querySelectorAll('[data-view]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const target = el.getAttribute('data-view');
          if (target) {
            this.navigate(target);
          }
        });
      });

      // Escuchar cambios de hash en URL
      window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && ['dashboard', 'register', 'routines', 'session'].includes(hash)) {
          this.navigate(hash, false);
        }
      });

      // Navegación inicial según hash o por defecto a dashboard
      const initialHash = window.location.hash.replace('#', '');
      if (initialHash && ['dashboard', 'register', 'routines', 'session'].includes(initialHash)) {
        this.navigate(initialHash, false);
      } else {
        this.navigate('dashboard', false);
      }
    },

    navigate(viewId, updateHash = true) {
      const targetView = document.getElementById(`view-${viewId}`);
      if (!targetView) return;

      this.currentView = viewId;

      // Ocultar todas las vistas y mostrar la seleccionada
      document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
      });
      targetView.classList.add('active');

      // Scroll al inicio suave
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Actualizar estado en barra de escritorio
      document.querySelectorAll('.desktop-nav-link').forEach(link => {
        const viewAttr = link.getAttribute('data-view');
        if (viewAttr === viewId) {
          link.classList.add('bg-surface-container-high', 'text-primary', 'font-headline-sm');
          link.classList.remove('text-on-surface-variant');
        } else {
          link.classList.remove('bg-surface-container-high', 'text-primary', 'font-headline-sm');
          link.classList.add('text-on-surface-variant');
        }
      });

      // Actualizar estado en barra inferior móvil
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        const viewAttr = link.getAttribute('data-view');
        const icon = link.querySelector('.mobile-nav-icon');
        const label = link.querySelector('.mobile-nav-label');
        if (viewAttr === viewId) {
          link.classList.add('text-primary');
          link.classList.remove('text-on-surface-variant');
          if (icon) icon.classList.add('scale-110');
          if (label) label.classList.add('font-bold');
        } else {
          link.classList.remove('text-primary');
          link.classList.add('text-on-surface-variant');
          if (icon) icon.classList.remove('scale-110');
          if (label) label.classList.remove('font-bold');
        }
      });

      if (updateHash) {
        window.location.hash = viewId;
      }

      // Disparar evento para que cada vista actualice sus componentes
      window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: viewId } }));
    }
  };

  window.KineticRouter = Router;

  // Banner de Prototipo y Descargo Médico
  function initMedicalDisclaimer() {
    const banner = document.getElementById('prototype-medical-banner');
    const dismissBtn = document.getElementById('dismiss-banner-btn');
    if (!banner) return;

    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        banner.style.transition = 'all 0.3s ease';
        banner.style.opacity = '0';
        banner.style.maxHeight = '0';
        banner.style.padding = '0';
        banner.style.overflow = 'hidden';
      });
    }
  }

  // Notificaciones Toast
  window.showToast = function (message, type = 'success') {
    const toast = document.getElementById('app-toast');
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.getElementById('toast-icon');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    if (toastIcon) {
      toastIcon.textContent = type === 'error' ? 'error' : (type === 'warning' ? 'warning' : 'check_circle');
      toastIcon.className = `material-symbols-outlined ${type === 'error' ? 'text-error' : (type === 'warning' ? 'text-tertiary' : 'text-primary')}`;
    }

    toast.classList.remove('hidden', 'translate-y-12', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-12', 'opacity-0');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3200);
  };

  // Inicialización al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    Router.init();
    initMedicalDisclaimer();
  });
})();
