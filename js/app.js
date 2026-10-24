// KineticLoad - Lógica Principal, Navegación y Gestores de Funciones

(function () {
  'use strict';

  // ==========================================
  // 1. GESTOR DE ALMACENAMIENTO (LocalStorage)
  // ==========================================
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
    },

    getLatestLog() {
      const history = this.getHistory();
      return history.length > 0 ? history[history.length - 1] : null;
    }
  };

  window.KineticStorage = Storage;

  // ==========================================
  // 2. ENRUTADOR Y NAVEGACIÓN (Desktop & Mobile)
  // ==========================================
  const Router = {
    currentView: 'dashboard',

    init() {
      document.querySelectorAll('[data-view]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const target = el.getAttribute('data-view');
          if (target) {
            this.navigate(target);
          }
        });
      });

      window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && ['dashboard', 'register', 'routines', 'session'].includes(hash)) {
          this.navigate(hash, false);
        }
      });

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

      document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
      });
      targetView.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Actualizar links de escritorio
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

      // Actualizar links de celular
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

      window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: viewId } }));
    }
  };

  window.KineticRouter = Router;

  // ==========================================
  // 3. FUNCIÓN 1: REGISTRAR MOLESTIA & RPE
  // ==========================================
  const RegisterModule = {
    selectedSport: 'running',
    selectedZone: 'Espinilla (Tibia derecha)',

    init() {
      this.initSportSelector();
      this.initZoneSelector();
      this.initPainSlider();
      this.initRpeSlider();
      this.initSaveButton();
    },

    initSportSelector() {
      const sportBtns = document.querySelectorAll('.sport-btn');
      sportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          sportBtns.forEach(b => {
            b.classList.remove('active', 'bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
            b.classList.add('text-on-surface-variant', 'font-medium');
          });
          btn.classList.add('active', 'bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
          btn.classList.remove('text-on-surface-variant', 'font-medium');
          this.selectedSport = btn.getAttribute('data-sport') || 'running';
        });
      });
    },

    initZoneSelector() {
      const chips = document.querySelectorAll('.zone-chip');
      const pins = document.querySelectorAll('.body-zone-pin');
      const svgZones = document.querySelectorAll('.body-zone-svg');

      const setZone = (zoneName) => {
        this.selectedZone = zoneName;

        chips.forEach(chip => {
          const z = chip.getAttribute('data-zone');
          if (z === zoneName) {
            chip.classList.add('active', 'bg-tertiary/20', 'text-tertiary', 'font-semibold', 'border-tertiary/40');
            chip.classList.remove('bg-surface-container-high', 'text-on-surface-variant', 'border-surface-variant/40');
          } else {
            chip.classList.remove('active', 'bg-tertiary/20', 'text-tertiary', 'font-semibold', 'border-tertiary/40');
            chip.classList.add('bg-surface-container-high', 'text-on-surface-variant', 'border-surface-variant/40');
          }
        });

        pins.forEach(pin => {
          const pz = pin.getAttribute('data-zone');
          if (pz === zoneName) {
            pin.classList.add('scale-110');
            const ripple = pin.querySelector('.animate-ping');
            if (ripple) ripple.classList.remove('hidden');
          } else {
            pin.classList.remove('scale-110');
            const ripple = pin.querySelector('.animate-ping');
            if (ripple) ripple.classList.add('hidden');
          }
        });
      };

      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const zone = chip.getAttribute('data-zone');
          if (zone) setZone(zone);
        });
      });

      pins.forEach(pin => {
        pin.addEventListener('click', () => {
          const zone = pin.getAttribute('data-zone');
          if (zone) setZone(zone);
        });
      });

      svgZones.forEach(zoneSvg => {
        zoneSvg.addEventListener('click', () => {
          const zone = zoneSvg.getAttribute('data-zone');
          if (zone) setZone(zone);
        });
      });
    },

    initPainSlider() {
      const slider = document.getElementById('pain-range');
      const display = document.getElementById('pain-display-val');
      const feedbackBox = document.getElementById('pain-feedback-box');
      const feedbackText = document.getElementById('pain-feedback-text');
      if (!slider || !display) return;

      const updateFeedback = (val) => {
        display.textContent = val;
        const num = parseInt(val, 10);

        if (num <= 4) {
          display.className = 'text-2xl font-extrabold text-primary';
          slider.style.accentColor = '#4edea3';
          if (feedbackBox) {
            feedbackBox.className = 'p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium flex items-center gap-2';
            feedbackText.textContent = 'Dolor tolerable en zona verde (≤ 4). Permite mantener entrenamiento con adaptaciones sin impacto.';
          }
        } else if (num <= 6) {
          display.className = 'text-2xl font-extrabold text-tertiary';
          slider.style.accentColor = '#ffb95f';
          if (feedbackBox) {
            feedbackBox.className = 'p-3 rounded-xl bg-tertiary/10 border border-tertiary/20 text-tertiary text-xs font-medium flex items-center gap-2';
            feedbackText.textContent = 'Alerta: Dolor moderado (5-6). Recomendado sustituir carrera por rodillo/ciclismo suave y automasaje.';
          }
        } else {
          display.className = 'text-2xl font-extrabold text-error';
          slider.style.accentColor = '#ffb4ab';
          if (feedbackBox) {
            feedbackBox.className = 'p-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-medium flex items-center gap-2';
            feedbackText.textContent = 'Atención: Dolor severo (> 6). Detén inmediatamente el impacto mecánico y consulta a tu fisioterapeuta.';
          }
        }
      };

      slider.addEventListener('input', (e) => updateFeedback(e.target.value));
      updateFeedback(slider.value);
    },

    initRpeSlider() {
      const slider = document.getElementById('rpe-range');
      const display = document.getElementById('rpe-display-val');
      const feedbackText = document.getElementById('rpe-feedback-text');
      if (!slider || !display) return;

      const rpeDescriptions = {
        1: '"Paseo muy suave, casi sin elevación de pulsaciones."',
        2: '"Esfuerzo muy ligero, conversación fluida y continua."',
        3: '"Ritmo aeróbico cómodo, respiración fácil."',
        4: '"Ritmo de rodaje constante, esfuerzo controlado."',
        5: '"Ritmo vivo, sudoración leve, respiración profunda."',
        6: '"Podía mantener frases cortas, ritmo de control de umbral aeróbico."',
        7: '"Esfuerzo vigoroso, respiración acelerada, requiere concentración."',
        8: '"Esfuerzo duro de series, conversación monosilábica."',
        9: '"Muy duro, cerca del límite, difícil sostener más de unos minutos."',
        10: '"Esfuerzo agónico máximo, esprint final al 100%."'
      };

      const updateRpe = (val) => {
        display.textContent = val;
        const num = parseInt(val, 10);
        if (feedbackText && rpeDescriptions[num]) {
          feedbackText.textContent = rpeDescriptions[num];
        }
      };

      slider.addEventListener('input', (e) => updateRpe(e.target.value));
      updateRpe(slider.value);
    },

    initSaveButton() {
      const saveBtn = document.getElementById('save-log-btn');
      if (!saveBtn) return;

      saveBtn.addEventListener('click', () => {
        const painVal = parseFloat(document.getElementById('pain-range').value) || 3;
        const rpeVal = parseFloat(document.getElementById('rpe-range').value) || 6;
        const notes = document.getElementById('register-notes')?.value || '';

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const newEntry = {
          day: `Hoy (${timeStr})`,
          load: this.selectedSport === 'ciclismo' ? 18 : 8.5,
          pain: painVal,
          rpe: rpeVal,
          sport: this.selectedSport,
          zone: this.selectedZone,
          notes: notes,
          activity: `${this.selectedSport.toUpperCase()} • ${this.selectedZone}`
        };

        Storage.addLog(newEntry);
        this.updateDashboardMetrics(newEntry);

        window.showToast(`¡Registro guardado! Dolor: ${painVal}/10 • RPE: ${rpeVal}/10`, 'success');

        setTimeout(() => {
          Router.navigate('dashboard');
        }, 600);
      });
    },

    updateDashboardMetrics(latest) {
      const rpeElem = document.getElementById('metric-rpe-val');
      const painElem = document.getElementById('metric-pain-val');
      const painStatusElem = document.getElementById('metric-pain-status');

      if (rpeElem) rpeElem.textContent = latest.rpe.toFixed(1);
      if (painElem) painElem.textContent = latest.pain.toFixed(1);

      if (painStatusElem) {
        if (latest.pain <= 4) {
          painStatusElem.textContent = 'En Zona Segura (≤ 4)';
          painStatusElem.parentElement.className = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs mt-1 font-medium';
        } else if (latest.pain <= 6) {
          painStatusElem.textContent = 'Sobrecarga Moderada (5-6)';
          painStatusElem.parentElement.className = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-xs mt-1 font-medium';
        } else {
          painStatusElem.textContent = 'Alerta Inflamatoria (> 6)';
          painStatusElem.parentElement.className = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error/10 text-error text-xs mt-1 font-medium';
        }
      }
    }
  };

  window.KineticRegister = RegisterModule;

  // ==========================================
  // 4. FUNCIÓN 2: BIBLIOTECA & FILTROS (Buscar)
  // ==========================================
  const RoutinesModule = {
    currentFilter: 'all',
    searchQuery: '',

    init() {
      this.initSearch();
      this.initFilters();
      this.render();
    },

    initSearch() {
      const searchInput = document.getElementById('routine-search-input');
      const clearBtn = document.getElementById('clear-search-btn');
      if (!searchInput) return;

      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        if (clearBtn) {
          if (this.searchQuery.length > 0) {
            clearBtn.classList.remove('hidden');
          } else {
            clearBtn.classList.add('hidden');
          }
        }
        this.render();
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          this.searchQuery = '';
          clearBtn.classList.add('hidden');
          this.render();
        });
      }
    },

    initFilters() {
      const filterChips = document.querySelectorAll('.routine-filter-chip');
      filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
          filterChips.forEach(c => {
            c.classList.remove('active', 'bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
            c.classList.add('bg-surface-container-high', 'text-on-surface-variant', 'border-surface-variant/40', 'font-medium');
          });
          chip.classList.add('active', 'bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
          chip.classList.remove('bg-surface-container-high', 'text-on-surface-variant', 'border-surface-variant/40', 'font-medium');

          this.currentFilter = chip.getAttribute('data-filter') || 'all';
          this.render();
        });
      });
    },

    render() {
      const grid = document.getElementById('routines-grid');
      if (!grid) return;

      const routines = window.KineticData.routines || [];
      const filtered = routines.filter(r => {
        const matchesFilter = this.currentFilter === 'all' || r.discipline === this.currentFilter;
        const matchesSearch = !this.searchQuery || 
          r.title.toLowerCase().includes(this.searchQuery) ||
          r.description.toLowerCase().includes(this.searchQuery) ||
          r.category.toLowerCase().includes(this.searchQuery) ||
          r.disciplineLabel.toLowerCase().includes(this.searchQuery) ||
          r.equipment.toLowerCase().includes(this.searchQuery);

        return matchesFilter && matchesSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full p-8 rounded-2xl bg-surface-container border border-surface-variant/40 text-center flex flex-col items-center justify-center gap-2">
            <span class="material-symbols-outlined text-4xl text-on-surface-variant">search_off</span>
            <h4 class="font-headline-sm text-base text-on-surface font-bold">No encontramos rutinas que coincidan</h4>
            <p class="font-body-sm text-xs text-on-surface-variant">Prueba con palabras como "gemelos", "sóleo", "isometría" o cambia el filtro de deporte.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(r => `
        <div class="routine-card bg-surface-container p-4 rounded-2xl border border-surface-variant/40 flex flex-col justify-between group hover:border-primary/50 transition-all cursor-pointer shadow-sm" data-routine-id="${r.id}">
          <div class="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-surface-container-lowest">
            <img src="${r.image}" alt="${r.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            <div class="absolute top-2.5 right-2.5 bg-surface-container-lowest/85 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-md">
              <span class="material-symbols-outlined text-xs">timer</span> ${r.duration}
            </div>
            <div class="absolute bottom-2.5 left-2.5 ${r.impact.includes('Cero') ? 'bg-primary text-on-primary' : 'bg-secondary text-on-secondary'} text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
              ${r.impact}
            </div>
          </div>
          
          <div class="flex flex-col flex-1 justify-between">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] uppercase tracking-wider text-secondary font-bold">${r.disciplineLabel}</span>
                <span class="text-on-surface-variant text-[10px]">•</span>
                <span class="text-[10px] uppercase tracking-wider text-on-surface-variant">${r.category}</span>
              </div>
              <h4 class="font-headline-sm text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                ${r.title}
              </h4>
              <p class="font-body-sm text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">
                ${r.description}
              </p>
            </div>

            <div class="mt-4 pt-3 border-t border-surface-variant/30 flex items-center justify-between">
              <span class="text-xs text-on-surface-variant flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-primary">fitness_center</span> ${r.equipment}
              </span>
              <button type="button" class="px-3.5 py-1.5 rounded-xl bg-surface-container-highest group-hover:bg-primary group-hover:text-on-primary text-xs font-bold text-on-surface flex items-center gap-1.5 transition-all">
                <span>Comenzar</span>
                <span class="material-symbols-outlined text-sm">play_arrow</span>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      // Click en cada tarjeta de rutina -> inicia la sesión guiada
      grid.querySelectorAll('.routine-card').forEach(card => {
        card.addEventListener('click', () => {
          Router.navigate('session');
          window.showToast('Iniciando sesión guiada para esta rutina', 'success');
        });
      });
    }
  };

  window.KineticRoutines = RoutinesModule;

  // ==========================================
  // 5. AVISO MÉDICO & NOTIFICACIONES
  // ==========================================
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

  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    Router.init();
    RegisterModule.init();
    RoutinesModule.init();
    initMedicalDisclaimer();
  });
})();
