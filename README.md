# KineticLoad • Endurance Telemetry & Active Deload

> **Prototipo Demostrativo:** Esta aplicación es un prototipo experimental. No reemplaza la valoración de un fisioterapeuta deportivo ni el diagnóstico médico profesional ante lesiones musculares o fracturas por estrés.

---

## 🌐 Enlace Público (Disponible en Celular y PC)

👉 **[https://dspinto-pixel.github.io/appp/](https://dspinto-pixel.github.io/appp/)**

---

## 🏃 Atleta y Caso de Uso
- **Atleta:** Mateo Gómez, 24 años, triatleta y corredor de media distancia.
- **Situación:** A 4 semanas de su competencia clave (Maratón D-28) con sobrecarga en gemelos y periostitis tibial.
- **Objetivo:** Adaptar su entrenamiento diario de forma inmediata para mantener su capacidad aeróbica sin empeorar la inflamación ósea ni articular.

---

## ✨ Funciones Implementadas (PRD)

1. **Anotar (Registro Post-Entrenamiento):**
   - Selector de disciplina deportiva (Running, Ciclismo, Fuerza, Natación).
   - Mapa corporal interactivo con siluetas anatómicas (frontal y posterior) para tocar la zona afectada (espinilla/tibia, gemelos/sóleo, tendón de Aquiles, rodilla, etc.).
   - Escala de Dolor visual de 1 a 10 (EVA) con retroalimentación semafórica (verde ≤ 4 zona segura, amarillo 5-6 moderado, rojo > 6 severo).
   - Escala de esfuerzo percibido (RPE de 1 a 10) y campo de notas.
   - Guardado automático en memoria local (*LocalStorage*) y actualización inmediata de métricas.

2. **Buscar (Biblioteca de Rutinas y Alivio):**
   - Buscador inteligente en tiempo real por molestia o zona muscular.
   - Filtros rápidos por disciplina (Todas, Running, Ciclismo, Crossfit).
   - Tarjetas con tiempo estimado, nivel de impacto (*Cero Impacto*, *Bajo Impacto*) y equipamiento necesario.
   - Acceso con un clic directo a la Sesión Guiada.

3. **Ver (Cápsulas Biomecánicas de 20 Segundos):**
   - Reproductor con animación en bucle de 20 segundos y temporizador en tiempo real.
   - Puntos clave biomecánicos precisos para no compensar con cadera o articulaciones vecinas.
   - Advertencias de compensación biomecánica visibles.

4. **Marcar (Control de 3 Estados por Ejercicio):**
   - 🟩 **Completado** (verde, suma a la adherencia de la semana).
   - 🟨 **Omitido por molestia** (amarillo, registra molestia y adapta la carga).
   - 🟥 **No lo realicé** (rojo, registra falta de tiempo o equipo).
   - Barra de progreso segmentada táctil de 4 pasos y modal de resumen final con recomendaciones de telemetría.

5. **Ver (Dashboard & Gráfico Lineal Carga vs. Dolor Semanal):**
   - Gráfico lineal dual interactivo: Curva de Carga de entrenamiento (cian) superpuesta a la Curva de Dolor EVA (verde/ámbar).
   - Línea discontinua de Umbral Seguro (EVA ≤ 4) y sombreado de zona de retorno seguro.
   - Puntos interactivos con información de cada día al tocarlos o hacer clic.
   - 4 tarjetas de métricas en tiempo real: RPE hoy, Nivel de molestia, Meta semanal cumplida y Kilómetros de impacto prevenidos.
   - Recomendación bioadaptativa del día (ej. sustituir carrera por pedaleo suave en Z2 para proteger el periostio).

---

## 📱 Experiencia en Celular
- Barra de navegación inferior ergonómica (*Mobile Bottom Bar*) con 4 accesos directos: Progreso, Molestia, Rutinas y Sesión.
- Área táctil amplia y botones de gran formato para operar cómodamente sobre la esterilla.
