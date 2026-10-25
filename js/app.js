// KineticLoad - Lógica Principal, Navegación y Gestores de Funciones

(function () {
  'use strict';

  // ==========================================
  // 1. GESTOR DE ALMACENAMIENTO (LocalStorage)
  // ==========================================
  const Storage = {
    KEY_HISTORY: 'kineticload_history',
    KEY_SESSION: 'kineticload_session_progress',
    KEY_ATHLETE: 'kineticload_athlete',

    getAthlete() {
      try {
        const stored = localStorage.getItem(this.KEY_ATHLETE);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        return null;
      }
    },

    saveAthlete(athlete) {
      try {
        localStorage.setItem(this.KEY_ATHLETE, JSON.stringify(athlete));
      } catch (e) {
        console.warn('LocalStorage no disponible:', e);
      }
    },

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

  // =========================================================================
  // 3. MÓDULO DE PERFIL & REGISTRO DE ATLETA (Personalización Dinámica)
  // =========================================================================
  const ProfileModule = {
    currentAthlete: null,
    selectedPainZone: "Espinilla (Tibia derecha)",

    init() {
      this.currentAthlete = Storage.getAthlete() || { ...window.KineticData.defaultAthlete };
      this.selectedPainZone = this.currentAthlete.painZone || "Espinilla (Tibia derecha)";

      this.initModalEvents();
      this.applyAthleteData(this.currentAthlete);

      // Si es un usuario nuevo, abrir modal automáticamente
      if (!Storage.getAthlete()) {
        setTimeout(() => {
          this.openModal();
        }, 700);
      }
    },

    initModalEvents() {
      const modal = document.getElementById('athlete-profile-modal');
      const triggerBtn = document.getElementById('btn-profile-trigger');
      const closeBtn = document.getElementById('close-profile-modal-btn');
      const form = document.getElementById('athlete-profile-form');
      const painRange = document.getElementById('profile-pain-range');
      const painDisplay = document.getElementById('profile-pain-val-display');

      if (triggerBtn) {
        triggerBtn.addEventListener('click', () => this.openModal());
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeModal());
      }

      // Slider de dolor en el modal
      if (painRange && painDisplay) {
        painRange.addEventListener('input', (e) => {
          painDisplay.textContent = `${e.target.value} / 10`;
        });
      }

      // Botones de selección de zona de molestia en el modal
      const painBtns = document.querySelectorAll('.profile-pain-btn');
      painBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          painBtns.forEach(b => {
            b.classList.remove('active', 'bg-tertiary/20', 'border-2', 'border-tertiary', 'text-tertiary', 'font-semibold', 'shadow-sm');
            b.classList.add('bg-surface-container-low', 'border-surface-variant/50', 'text-on-surface-variant', 'font-medium');
          });
          btn.classList.add('active', 'bg-tertiary/20', 'border-2', 'border-tertiary', 'text-tertiary', 'font-semibold', 'shadow-sm');
          btn.classList.remove('bg-surface-container-low', 'border-surface-variant/50', 'text-on-surface-variant', 'font-medium');

          this.selectedPainZone = btn.getAttribute('data-pain-zone') || "Espinilla (Tibia derecha)";
        });
      });

      // Submit del formulario
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveFromForm();
        });
      }
    },

    openModal() {
      const modal = document.getElementById('athlete-profile-modal');
      if (!modal) return;

      const nameInput = document.getElementById('input-athlete-name');
      const ageInput = document.getElementById('input-athlete-age');
      const sportSelect = document.getElementById('input-athlete-sport');
      const painRange = document.getElementById('profile-pain-range');
      const painDisplay = document.getElementById('profile-pain-val-display');

      if (nameInput) nameInput.value = this.currentAthlete.name === "Nuevo Atleta" ? "" : this.currentAthlete.name;
      if (ageInput) ageInput.value = this.currentAthlete.age || "";
      if (sportSelect) sportSelect.value = this.currentAthlete.sport || "running";
      if (painRange) painRange.value = this.currentAthlete.initialPain || 3;
      if (painDisplay) painDisplay.textContent = `${painRange ? painRange.value : 3} / 10`;

      const painBtns = document.querySelectorAll('.profile-pain-btn');
      painBtns.forEach(btn => {
        const zone = btn.getAttribute('data-pain-zone');
        if (zone === this.selectedPainZone) {
          btn.classList.add('active', 'bg-tertiary/20', 'border-2', 'border-tertiary', 'text-tertiary', 'font-semibold', 'shadow-sm');
          btn.classList.remove('bg-surface-container-low', 'border-surface-variant/50', 'text-on-surface-variant', 'font-medium');
        } else {
          btn.classList.remove('active', 'bg-tertiary/20', 'border-2', 'border-tertiary', 'text-tertiary', 'font-semibold', 'shadow-sm');
          btn.classList.add('bg-surface-container-low', 'border-surface-variant/50', 'text-on-surface-variant', 'font-medium');
        }
      });

      modal.classList.remove('hidden');
    },

    closeModal() {
      const modal = document.getElementById('athlete-profile-modal');
      if (modal) modal.classList.add('hidden');
    },

    generateBaselineHistory(sport, initialPain, painZone) {
      const sportActivities = {
        running: ["Rodaje suave", "Progresivo", "Regenerativo", "Fartlek", "Bicicleta Z2", "Carrera continua"],
        ciclismo: ["Rodillo suave", "Fondo aeróbico", "Cadencia alta", "Pedaleo regenerativo", "Subida controlada"],
        crossfit: ["WOD movilidad", "Metcon adaptado", "Fuerza isométrica", "Intervalos remo", "Trabajo escapular"],
        fuerza: ["Isometría", "Técnica tren inferior", "Hipertrofia controlada", "Descarga articular"],
        futbol: ["Trote césped", "Activación articular", "Movilidad dinámica", "Pase y control suave"]
      };
      const list = sportActivities[sport] || sportActivities.running;
      const history = [];
      const basePain = Number(initialPain) || 3.5;

      for (let i = 1; i <= 14; i++) {
        const isPeak = (i === 4);
        const dayPain = isPeak ? Math.min(9.8, basePain + 2.2) : (i === 14 ? basePain : (i > 10 ? Math.max(1.5, basePain - 0.7) : Math.max(1.5, basePain + (Math.sin(i * 1.5) * 0.8))));
        const dayLoad = (sport === 'ciclismo' ? 14 + (i % 5) * 3 : (sport === 'running' ? 7 + (i % 4) * 2.5 : 8 + (i % 3) * 2));
        const act = list[(i - 1) % list.length];
        const dayRpe = Math.min(9.5, Math.max(2.5, dayPain + 2.0));

        history.push({
          day: i === 14 ? "Hoy" : `Día ${i}`,
          load: Number(dayLoad.toFixed(1)),
          pain: Number(dayPain.toFixed(1)),
          rpe: Number(dayRpe.toFixed(1)),
          sport: sport,
          zone: painZone,
          activity: `${act} (${dayLoad}${sport === 'ciclismo' || sport === 'running' ? 'km' : 'min'})`
        });
      }
      return history;
    },

    saveFromForm() {
      const name = document.getElementById('input-athlete-name')?.value.trim() || "Atleta";
      const age = parseInt(document.getElementById('input-athlete-age')?.value, 10) || 25;
      const sport = document.getElementById('input-athlete-sport')?.value || "running";
      const painVal = parseFloat(document.getElementById('profile-pain-range')?.value) || 3;

      const sportLabels = {
        running: "Running",
        ciclismo: "Ciclismo",
        crossfit: "Crossfit",
        fuerza: "Fuerza",
        futbol: "Fútbol / Deporte"
      };

      const updatedAthlete = {
        name: name,
        age: age,
        sport: sport,
        sportLabel: sportLabels[sport] || "Atleta",
        painZone: this.selectedPainZone,
        initialPain: painVal,
        status: "Desinflamación Activa",
        safeThreshold: 4
      };

      this.currentAthlete = updatedAthlete;
      Storage.saveAthlete(updatedAthlete);

      // Generar historia adaptada al dolor inicial del nuevo paciente
      const personalizedHistory = this.generateBaselineHistory(sport, painVal, this.selectedPainZone);
      Storage.saveHistory(personalizedHistory);

      this.applyAthleteData(updatedAthlete);
      this.closeModal();

      // Recalcular métricas y gráfico con los nuevos datos del paciente
      DashboardModule.renderMetrics();
      DashboardModule.renderLineChart();

      window.showToast(`¡Bienvenido ${name}! Métricas y ejercicios ajustados a tu nivel de dolor (${painVal}/10).`, 'success');
      Router.navigate('dashboard');
    },

    applyAthleteData(athlete) {
      if (!athlete) return;

      // 1. Header
      const headerName = document.getElementById('header-athlete-name');
      const headerMeta = document.getElementById('header-athlete-meta');
      if (headerName) headerName.textContent = athlete.name;
      if (headerMeta) headerMeta.textContent = `${athlete.age} años • ${athlete.sportLabel || 'Atleta'}`;

      // 2. Dashboard Greetings
      const dashGreeting = document.getElementById('dash-greeting-name');
      const dashZone = document.getElementById('dash-greeting-zone');
      const dashStatus = document.getElementById('dash-status-zone');
      const registerGreeting = document.getElementById('register-greeting-name');

      if (dashGreeting) dashGreeting.textContent = athlete.name;
      if (dashZone) dashZone.textContent = athlete.painZone;
      if (dashStatus) {
        dashStatus.innerHTML = `
          <span class="material-symbols-outlined text-primary text-base">verified</span>
          ${athlete.painZone.split('(')[0].trim()}
        `;
      }
      if (registerGreeting) registerGreeting.textContent = athlete.name;

      // 3. Recomendación Bioadaptativa según zona de dolor
      const protocol = window.KineticData.painProtocols[athlete.painZone] || window.KineticData.painProtocols["Espinilla (Tibia derecha)"];
      const presTitle = document.getElementById('dash-prescription-title');
      const presDesc = document.getElementById('dash-prescription-desc');

      if (presTitle && protocol) presTitle.textContent = protocol.bannerText;
      if (presDesc && protocol) presDesc.textContent = protocol.bannerDetails;

      // 4. Actualizar módulo de registro
      if (window.KineticRegister) {
        window.KineticRegister.selectedZone = athlete.painZone;
        window.KineticRegister.selectedSport = athlete.sport || 'running';
      }

      // 5. Actualizar sesión guiada con los ejercicios específicos de su molestia
      if (window.KineticSession) {
        window.KineticSession.loadExercisesForProtocol(athlete.painZone);
      }
    }
  };

  window.KineticProfile = ProfileModule;

  // =========================================================================
  // 4. FUNCIÓN 5: DASHBOARD Y MÉTRICAS DINÁMICAS POR PACIENTE
  // =========================================================================
  const DashboardModule = {
    init() {
      this.renderMetrics();
      this.renderLineChart();

      window.addEventListener('viewChanged', (e) => {
        if (e.detail && e.detail.view === 'dashboard') {
          this.renderMetrics();
          this.renderLineChart();
        }
      });
    },

    renderMetrics() {
      const athlete = Storage.getAthlete() || window.KineticData.defaultAthlete;
      const history = Storage.getHistory();
      const latest = history.length > 0 ? history[history.length - 1] : { rpe: 6.0, pain: athlete.initialPain || 3.0 };

      const painVal = Number(latest.pain) || 3.0;
      const rpeVal = Number(latest.rpe) || 6.0;

      // --- TARJETA 1: RPE Y PORCENTAJE ---
      const rpeElem = document.getElementById('metric-rpe-val');
      const rpeBar = document.getElementById('metric-rpe-bar');
      const rpeStatus = document.getElementById('metric-rpe-status');

      if (rpeElem) rpeElem.textContent = rpeVal.toFixed(1);
      const rpePercent = Math.min(100, Math.max(10, Math.round((rpeVal / 10) * 100)));
      if (rpeBar) rpeBar.style.width = `${rpePercent}%`;

      if (rpeStatus) {
        if (rpeVal <= 4) rpeStatus.textContent = "Esfuerzo ligero y controlado";
        else if (rpeVal <= 6) rpeStatus.textContent = "Moderado y seguro";
        else if (rpeVal <= 8) rpeStatus.textContent = "Exigente pero tolerable";
        else rpeStatus.textContent = "Alta demanda neuromuscular";
      }

      // --- TARJETA 2: DOLOR EVA Y PORCENTAJE ---
      const painElem = document.getElementById('metric-pain-val');
      const painBar = document.getElementById('metric-pain-bar');
      const painStatusElem = document.getElementById('metric-pain-status');

      if (painElem) painElem.textContent = painVal.toFixed(1);
      const painPercent = Math.min(100, Math.max(10, Math.round((painVal / 10) * 100)));
      if (painBar) {
        painBar.style.width = `${painPercent}%`;
        if (painVal <= 4) painBar.className = "bg-primary h-full rounded-full transition-all duration-500";
        else if (painVal <= 6) painBar.className = "bg-tertiary h-full rounded-full transition-all duration-500";
        else painBar.className = "bg-error h-full rounded-full transition-all duration-500";
      }

      if (painStatusElem) {
        if (painVal <= 4) {
          painStatusElem.textContent = 'En Zona Segura (≤ 4)';
          painStatusElem.parentElement.className = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs mt-1 font-medium';
        } else if (painVal <= 6) {
          painStatusElem.textContent = 'Sobrecarga Moderada (5-6)';
          painStatusElem.parentElement.className = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-xs mt-1 font-medium';
        } else {
          painStatusElem.textContent = 'Alerta Inflamatoria (> 6)';
          painStatusElem.parentElement.className = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error/10 text-error text-xs mt-1 font-medium';
        }
      }

      // --- TARJETA 3: META SEMANAL (Cálculo adaptativo según dolor del paciente) ---
      const weeklyVal = document.getElementById('metric-weekly-val');
      const weeklyBar = document.getElementById('metric-weekly-bar');
      const weeklyStatus = document.getElementById('metric-weekly-status');
      const weeklyTitle = document.getElementById('metric-weekly-title');

      // Cuanto menor es el dolor y mejor es el progreso, mayor es el % de recuperación (15% a 96%)
      const recoveryPercent = Math.min(96, Math.max(20, Math.round((10 - painVal) * 9.2 + ((athlete.age || 25) < 30 ? 5 : 2))));

      if (weeklyVal) weeklyVal.textContent = recoveryPercent;
      if (weeklyBar) weeklyBar.style.width = `${recoveryPercent}%`;
      if (weeklyTitle) weeklyTitle.textContent = "Meta de Recuperación";

      if (weeklyStatus) {
        if (recoveryPercent >= 80) weeklyStatus.textContent = "Recuperación acelerada";
        else if (recoveryPercent >= 60) weeklyStatus.textContent = "Progreso constante";
        else weeklyStatus.textContent = "Fase inicial de alivio";
      }

      // --- TARJETA 4: IMPACTO / SOBRECARGA EVITADA (Adaptado a su deporte y dolor) ---
      const avoidedTitle = document.getElementById('metric-avoided-title');
      const avoidedVal = document.getElementById('metric-avoided-val');
      const avoidedUnit = document.getElementById('metric-avoided-unit');
      const avoidedStatus = document.getElementById('metric-avoided-status');
      const avoidedBar = document.getElementById('metric-avoided-bar');

      const sport = athlete.sport || 'running';
      const cleanZone = (athlete.painZone || 'Espinilla').split('(')[0].trim();

      if (sport === 'running') {
        const kmSaved = Math.round(20 + (10 - painVal) * 2.6);
        const percentSaved = Math.min(95, Math.max(30, Math.round(recoveryPercent * 0.9)));
        if (avoidedTitle) avoidedTitle.textContent = `Impacto en ${cleanZone} evitado`;
        if (avoidedVal) avoidedVal.textContent = kmSaved;
        if (avoidedUnit) avoidedUnit.textContent = "km";
        if (avoidedStatus) avoidedStatus.textContent = "Sustituidos por ciclismo/descarga";
        if (avoidedBar) avoidedBar.style.width = `${percentSaved}%`;
      } else if (sport === 'ciclismo') {
        const hrsSaved = (10 + (10 - painVal) * 1.1).toFixed(1);
        const percentSaved = Math.min(95, Math.max(30, Math.round(recoveryPercent * 0.92)));
        if (avoidedTitle) avoidedTitle.textContent = `Sobretensión en ${cleanZone} prevenida`;
        if (avoidedVal) avoidedVal.textContent = hrsSaved;
        if (avoidedUnit) avoidedUnit.textContent = "hrs";
        if (avoidedStatus) avoidedStatus.textContent = "Pedaleo suave en Z1/Z2";
        if (avoidedBar) avoidedBar.style.width = `${percentSaved}%`;
      } else if (sport === 'crossfit' || sport === 'fuerza') {
        const seriesSaved = Math.round(15 + (10 - painVal) * 2);
        const percentSaved = Math.min(95, Math.max(30, Math.round(recoveryPercent * 0.88)));
        if (avoidedTitle) avoidedTitle.textContent = `Sobrecarga en ${cleanZone} adaptada`;
        if (avoidedVal) avoidedVal.textContent = seriesSaved;
        if (avoidedUnit) avoidedUnit.textContent = "series";
        if (avoidedStatus) avoidedStatus.textContent = "Sustituidas por isometría";
        if (avoidedBar) avoidedBar.style.width = `${percentSaved}%`;
      } else {
        const minSaved = Math.round(50 + (10 - painVal) * 8);
        const percentSaved = Math.min(95, Math.max(30, Math.round(recoveryPercent * 0.85)));
        if (avoidedTitle) avoidedTitle.textContent = `Impacto articular amortiguado`;
        if (avoidedVal) avoidedVal.textContent = minSaved;
        if (avoidedUnit) avoidedUnit.textContent = "min";
        if (avoidedStatus) avoidedStatus.textContent = "Descarga activa realizada";
        if (avoidedBar) avoidedBar.style.width = `${percentSaved}%`;
      }
    },

    renderLineChart() {
      const container = document.getElementById('chart-container');
      if (!container) return;

      const history = Storage.getHistory();
      if (!history || history.length === 0) return;

      const data = history.slice(-14);

      const width = 700;
      const height = 240;
      const padLeft = 30;
      const padRight = 30;
      const padTop = 25;
      const padBottom = 35;

      const chartW = width - padLeft - padRight;
      const chartH = height - padTop - padBottom;

      const maxLoad = Math.max(...data.map(d => Number(d.load) || 0), 25);
      const maxPain = 10;

      const stepX = data.length > 1 ? chartW / (data.length - 1) : chartW;

      const loadPoints = data.map((d, i) => {
        const x = padLeft + i * stepX;
        const norm = (Number(d.load) || 0) / maxLoad;
        const y = padTop + chartH - (norm * chartH);
        return { x, y, val: d.load, day: d.day, activity: d.activity };
      });

      const painPoints = data.map((d, i) => {
        const x = padLeft + i * stepX;
        const norm = (Number(d.pain) || 0) / maxPain;
        const y = padTop + chartH - (norm * chartH);
        return { x, y, val: d.pain, day: d.day, activity: d.activity };
      });

      const loadPathD = loadPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

      let painPathD = `M ${painPoints[0].x.toFixed(1)} ${painPoints[0].y.toFixed(1)}`;
      for (let i = 0; i < painPoints.length - 1; i++) {
        const p0 = painPoints[i];
        const p1 = painPoints[i + 1];
        const mx = ((p0.x + p1.x) / 2).toFixed(1);
        painPathD += ` Q ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}, ${mx} ${((p0.y + p1.y) / 2).toFixed(1)} T ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      }

      const painAreaD = `${painPathD} L ${painPoints[painPoints.length - 1].x.toFixed(1)} ${(padTop + chartH).toFixed(1)} L ${painPoints[0].x.toFixed(1)} ${(padTop + chartH).toFixed(1)} Z`;
      const safeThresholdY = padTop + chartH - ((4 / maxPain) * chartH);

      container.innerHTML = `
        <div class="absolute inset-x-0 bottom-0 bg-primary/5 border-t border-dashed border-primary/40 rounded-lg pointer-events-none flex items-start px-3 pt-1" style="height: ${(chartH * 0.4).toFixed(0)}px;">
          <span class="font-label-sm text-[10px] text-primary uppercase font-bold tracking-wider">Zona de Retorno Seguro (Molestia controlada ≤ 4)</span>
        </div>

        <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 ${width} ${height}">
          <defs>
            <linearGradient id="painGradDynamic" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stop-color="#ffb95f" stop-opacity="0.25"></stop>
              <stop offset="100%" stop-color="#4edea3" stop-opacity="0.0"></stop>
            </linearGradient>
          </defs>

          <line stroke="#2e3545" stroke-dasharray="3 3" stroke-width="1" x1="${padLeft}" x2="${width - padRight}" y1="${padTop}" y2="${padTop}"></line>
          <line stroke="#2e3545" stroke-dasharray="3 3" stroke-width="1" x1="${padLeft}" x2="${width - padRight}" y1="${(padTop + chartH * 0.33).toFixed(1)}" y2="${(padTop + chartH * 0.33).toFixed(1)}"></line>
          <line stroke="#2e3545" stroke-dasharray="3 3" stroke-width="1" x1="${padLeft}" x2="${width - padRight}" y1="${(padTop + chartH * 0.66).toFixed(1)}" y2="${(padTop + chartH * 0.66).toFixed(1)}"></line>
          
          <line stroke="#4edea3" stroke-dasharray="5 5" stroke-width="1.5" x1="${padLeft}" x2="${width - padRight}" y1="${safeThresholdY.toFixed(1)}" y2="${safeThresholdY.toFixed(1)}"></line>
          <line stroke="#2e3545" stroke-width="1.5" x1="${padLeft}" x2="${width - padRight}" y1="${(padTop + chartH).toFixed(1)}" y2="${(padTop + chartH).toFixed(1)}"></line>

          <path d="${painAreaD}" fill="url(#painGradDynamic)"></path>
          <path d="${loadPathD}" fill="none" stroke="#4cd7f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"></path>
          <path d="${painPathD}" fill="none" stroke="#4edea3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path>

          ${loadPoints.map((p) => `
            <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="#4cd7f6" stroke="#003640" stroke-width="1.5" class="cursor-pointer" onclick="window.showToast('${p.day}: Carga ${p.val} • ${p.activity || ""}', 'info')">
              <title>${p.day}: Carga ${p.val}</title>
            </circle>
          `).join('')}

          ${painPoints.map((p, i) => {
            const isHigh = p.val > 6;
            const isMedium = p.val > 4 && p.val <= 6;
            const color = isHigh ? '#ffb4ab' : (isMedium ? '#ffb95f' : '#4edea3');
            const stroke = isHigh ? '#93000a' : (isMedium ? '#653e00' : '#003824');
            const radius = (i === painPoints.length - 1 || isHigh) ? 6 : 4;

            return `
              <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${radius}" fill="${color}" stroke="${stroke}" stroke-width="2" class="cursor-pointer hover:scale-125 transition-transform" onclick="window.showToast('${p.day}: Dolor ${p.val}/10 • ${p.activity || ""}', '${isHigh ? 'error' : (isMedium ? 'warning' : 'success')}')">
                <title>${p.day}: Dolor EVA ${p.val}/10</title>
              </circle>
            `;
          }).join('')}
        </svg>
      `;
    }
  };

  window.KineticDashboard = DashboardModule;

  // ==========================================
  // 5. FUNCIÓN 1: REGISTRAR MOLESTIA & RPE
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
        DashboardModule.renderMetrics();
        DashboardModule.renderLineChart();

        window.showToast(`¡Registro guardado! Dolor: ${painVal}/10 • RPE: ${rpeVal}/10`, 'success');

        setTimeout(() => {
          Router.navigate('dashboard');
        }, 600);
      });
    }
  };

  window.KineticRegister = RegisterModule;

  // ==========================================
  // 6. FUNCIÓN 2: BIBLIOTECA & FILTROS (Buscar)
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

      grid.querySelectorAll('.routine-card').forEach(card => {
        card.addEventListener('click', () => {
          Router.navigate('session');
          window.showToast('Iniciando sesión guiada para esta rutina', 'success');
        });
      });
    }
  };

  window.KineticRoutines = RoutinesModule;

  // =========================================================================
  // 7. FUNCIONES 3 Y 4: SESIÓN GUIADA (Videos 20s + Marcar 3 Estados)
  // =========================================================================
  const SessionModule = {
    currentIndex: 0,
    isPlaying: true,
    timerSeconds: 20,
    intervalId: null,
    exerciseResults: {},
    currentExercises: [],

    init() {
      const athlete = Storage.getAthlete() || window.KineticData.defaultAthlete;
      this.loadExercisesForProtocol(athlete ? athlete.painZone : "Espinilla (Tibia derecha)");

      this.initButtons();
      this.renderStep();
      this.startLoopTimer();

      window.addEventListener('viewChanged', (e) => {
        if (e.detail && e.detail.view === 'session') {
          this.startLoopTimer();
        } else {
          this.pauseLoopTimer();
        }
      });
    },

    loadExercisesForProtocol(painZone) {
      const protocol = window.KineticData.painProtocols[painZone] || window.KineticData.painProtocols["Espinilla (Tibia derecha)"];
      this.currentExercises = protocol && protocol.exercises ? protocol.exercises : window.KineticData.painProtocols["Espinilla (Tibia derecha)"].exercises;
      this.currentIndex = 0;
      this.exerciseResults = {};
      this.renderStep();
    },

    initButtons() {
      const btnCompleted = document.getElementById('btn-exercise-completed');
      if (btnCompleted) {
        btnCompleted.addEventListener('click', () => this.markStep('completed'));
      }

      const btnDiscomfort = document.getElementById('btn-exercise-discomfort');
      if (btnDiscomfort) {
        btnDiscomfort.addEventListener('click', () => this.markStep('discomfort'));
      }

      const btnSkipped = document.getElementById('btn-exercise-skipped');
      if (btnSkipped) {
        btnSkipped.addEventListener('click', () => this.markStep('skipped'));
      }

      const togglePlayBtn = document.getElementById('toggle-play-btn');
      if (togglePlayBtn) {
        togglePlayBtn.addEventListener('click', () => {
          this.isPlaying = !this.isPlaying;
          const icon = document.getElementById('play-pause-icon');
          if (icon) icon.textContent = this.isPlaying ? 'pause' : 'play_arrow';
          if (this.isPlaying) {
            this.startLoopTimer();
          } else {
            this.pauseLoopTimer();
          }
        });
      }

      const restartBtn = document.getElementById('restart-session-btn');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => this.resetSession());
      }
    },

    renderStep() {
      const exercises = this.currentExercises;
      if (!exercises || exercises.length === 0) return;

      const ex = exercises[this.currentIndex];
      if (!ex) return;

      const stepCounter = document.getElementById('session-step-counter');
      const stepMotivational = document.getElementById('session-step-motivational');
      const timeRemaining = document.getElementById('session-time-remaining');

      if (stepCounter) stepCounter.textContent = `Paso ${this.currentIndex + 1} de ${exercises.length}:`;
      
      const motivationalTexts = [
        "Iniciando descarga activa para tu molestia",
        "Aislamiento muscular seguro sin impacto",
        "Restaurando movilidad articular",
        "Cierre descompresivo final"
      ];
      if (stepMotivational) stepMotivational.textContent = motivationalTexts[this.currentIndex] || "Ejecuta con calma";
      if (timeRemaining) {
        const remainingSteps = exercises.length - this.currentIndex;
        timeRemaining.textContent = `~${(remainingSteps * 1.5).toFixed(0).padStart(2, '0')} min`;
      }

      this.renderSegmentedBar();

      const titleElem = document.getElementById('current-ex-title');
      const focusElem = document.getElementById('current-ex-focus');
      const mediaElem = document.getElementById('current-ex-media');
      const cuesElem = document.getElementById('current-ex-cues');
      const warningElem = document.getElementById('current-ex-warning');

      if (titleElem) titleElem.textContent = ex.title;
      if (focusElem) focusElem.textContent = ex.focus;
      if (mediaElem) {
        mediaElem.src = ex.videoUrl;
        mediaElem.alt = ex.title;
      }

      if (cuesElem) {
        cuesElem.innerHTML = ex.keyCues.map(cue => `
          <li class="flex items-start gap-2">
            <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
            <span>${cue}</span>
          </li>
        `).join('');
      }

      if (warningElem) warningElem.textContent = ex.warningAlert;

      this.timerSeconds = 20;
      this.updateLoopDisplay();
    },

    renderSegmentedBar() {
      const container = document.getElementById('session-segmented-bar');
      const exercises = this.currentExercises;
      if (!container || !exercises) return;

      container.innerHTML = exercises.map((ex, idx) => {
        const result = this.exerciseResults[idx];
        let colorClass = "bg-surface-container-high";
        let iconHtml = "";

        if (result === 'completed') {
          colorClass = "bg-primary shadow-sm shadow-primary/30";
          iconHtml = `<span class="material-symbols-outlined text-primary text-xs">check_circle</span>`;
        } else if (result === 'discomfort') {
          colorClass = "bg-tertiary shadow-sm shadow-tertiary/30";
          iconHtml = `<span class="material-symbols-outlined text-tertiary text-xs">warning</span>`;
        } else if (result === 'skipped') {
          colorClass = "bg-error shadow-sm shadow-error/30";
          iconHtml = `<span class="material-symbols-outlined text-error text-xs">cancel</span>`;
        } else if (idx === this.currentIndex) {
          colorClass = "bg-secondary";
          iconHtml = `<span class="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>`;
        }

        const isCurrent = idx === this.currentIndex;

        return `
          <div class="flex flex-col gap-1 cursor-pointer" onclick="window.KineticSession.goToStep(${idx})">
            <div class="h-2 w-full rounded-full ${colorClass} transition-all duration-300"></div>
            <div class="flex items-center justify-between px-0.5">
              <span class="font-label-sm text-[10px] uppercase truncate ${isCurrent ? 'text-secondary font-bold' : (result ? 'text-on-surface' : 'text-on-surface-variant/60')}">
                ${ex.title.split(' ')[0]} ${idx + 1}
              </span>
              ${iconHtml}
            </div>
          </div>
        `;
      }).join('');
    },

    markStep(status) {
      this.exerciseResults[this.currentIndex] = status;
      const exercises = this.currentExercises;

      if (status === 'completed') {
        window.showToast(`Paso ${this.currentIndex + 1} completado con éxito`, 'success');
      } else if (status === 'discomfort') {
        window.showToast(`Paso ${this.currentIndex + 1} omitido por molestia (registrado)`, 'warning');
      } else if (status === 'skipped') {
        window.showToast(`Paso ${this.currentIndex + 1} marcado como no realizado`, 'error');
      }

      if (this.currentIndex < exercises.length - 1) {
        this.currentIndex++;
        this.renderStep();
      } else {
        this.renderSegmentedBar();
        this.showSessionSummary();
      }
    },

    showSessionSummary() {
      const results = Object.values(this.exerciseResults);
      const completedCount = results.filter(r => r === 'completed').length;
      const discomfortCount = results.filter(r => r === 'discomfort').length;
      const skippedCount = results.filter(r => r === 'skipped').length;

      const athlete = Storage.getAthlete() || window.KineticData.defaultAthlete;
      const athleteName = athlete ? athlete.name : "Atleta";

      const modalHtml = `
        <div id="session-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div class="bg-surface-container max-w-md w-full p-6 rounded-2xl border border-surface-variant/50 shadow-2xl flex flex-col gap-4 text-center">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center shadow-inner">
              <span class="material-symbols-outlined text-3xl">sports_score</span>
            </div>
            
            <div>
              <span class="text-xs text-primary font-bold uppercase tracking-wider">Protocolo Finalizado</span>
              <h3 class="font-headline-lg text-xl text-on-surface font-bold mt-1">¡Gran trabajo de descarga, ${athleteName}!</h3>
              <p class="font-body-sm text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Tus tejidos se han liberado de sobretensión. Has protegido tu ${athlete ? athlete.painZone : 'zona de molestia'} sin perder adaptación aeróbica.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-2 py-3 border-y border-surface-variant/30">
              <div class="bg-surface-container-low p-2.5 rounded-xl">
                <span class="text-lg font-extrabold text-primary">${completedCount}</span>
                <span class="block text-[10px] uppercase text-on-surface-variant font-semibold">Completados</span>
              </div>
              <div class="bg-surface-container-low p-2.5 rounded-xl">
                <span class="text-lg font-extrabold text-tertiary">${discomfortCount}</span>
                <span class="block text-[10px] uppercase text-on-surface-variant font-semibold">Molestia</span>
              </div>
              <div class="bg-surface-container-low p-2.5 rounded-xl">
                <span class="text-lg font-extrabold text-error">${skippedCount}</span>
                <span class="block text-[10px] uppercase text-on-surface-variant font-semibold">No realizó</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary text-left">
              <strong>Consejo de Telemetría:</strong> Aplica crioterapia local durante 12 minutos y descansa las piernas elevadas.
            </div>

            <div class="flex flex-col gap-2 pt-2">
              <button type="button" class="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md" onclick="document.getElementById('session-modal').remove(); window.KineticRouter.navigate('dashboard');">
                Volver a Mi Progreso
              </button>
              <button type="button" class="w-full py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-xs" onclick="document.getElementById('session-modal').remove(); window.KineticSession.resetSession();">
                Repetir protocolo
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    goToStep(index) {
      const exercises = this.currentExercises;
      if (index >= 0 && index < exercises.length) {
        this.currentIndex = index;
        this.renderStep();
      }
    },

    resetSession() {
      this.currentIndex = 0;
      this.exerciseResults = {};
      this.renderStep();
      window.showToast('Sesión reiniciada desde el paso 1', 'success');
    },

    startLoopTimer() {
      this.pauseLoopTimer();
      this.intervalId = setInterval(() => {
        if (!this.isPlaying) return;

        this.timerSeconds--;
        if (this.timerSeconds < 0) {
          this.timerSeconds = 20;
        }
        this.updateLoopDisplay();
      }, 1000);
    },

    pauseLoopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    updateLoopDisplay() {
      const display = document.getElementById('loop-timer-display');
      const progress = document.getElementById('video-loop-progress');

      if (display) display.textContent = `${this.timerSeconds}s`;
      if (progress) {
        const percentage = ((20 - this.timerSeconds) / 20) * 100;
        progress.style.width = `${percentage}%`;
      }
    }
  };

  window.KineticSession = SessionModule;

  // ==========================================
  // 8. AVISO MÉDICO & NOTIFICACIONES
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

  // Inicialización global
  document.addEventListener('DOMContentLoaded', () => {
    Router.init();
    ProfileModule.init();
    DashboardModule.init();
    RegisterModule.init();
    RoutinesModule.init();
    SessionModule.init();
    initMedicalDisclaimer();
  });
})();
