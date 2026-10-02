# Workflow compartido

Esta es la fuente maestra de reglas para Fer/OpenAI Codex y Marce/Claude Code. `AGENTS.md` y `CLAUDE.md` remiten a este documento; las reglas comunes se mantienen aquí.

## Antes de comenzar

- Identifica la tarea, el operador y el agente: Fer/OpenAI Codex o Marce/Claude Code.
- Revisa la rama actual y ejecuta `git status`. Identifica los cambios existentes antes de actuar.
- `main` es la rama estable. No trabajes directamente sobre ella.
- Una tarea = una rama. Una rama = un responsable activo.
- Fer/Codex y Marce/Claude no trabajan simultáneamente sobre la misma rama.
- Usa ramas identificables, por ejemplo `fer/codex/tarea` o `marce/claude/tarea`, y un clon o worktree separado por operador.
- Antes de editar, indica qué archivos modificarás y cuál es el objetivo del cambio.
- No sobrescribas, descartes ni incluyas cambios existentes ajenos a la tarea sin autorización.

## Durante el trabajo

- Realiza cambios pequeños, específicos y reversibles.
- No hagas refactors ni formateos fuera del alcance solicitado.
- Respeta el diseño, contenido y assets existentes salvo instrucción explícita para cambiarlos.
- No modifiques precios, checkout, legales, tracking, hosting ni configuración de producción sin autorización específica para esa área.
- Si el alcance requiere un cambio protegido que no está autorizado, solicita autorización antes de realizarlo.
- Las restricciones particulares de una tarea se aplican a esa tarea; no se convierten automáticamente en reglas permanentes del repositorio.

## Autorizaciones

- Commit requiere autorización explícita.
- Push requiere autorización explícita.
- Merge requiere autorización explícita.
- Deploy requiere autorización explícita.
- Una autorización no implica las demás. Respeta la acción, rama y alcance autorizados.
- No ejecutes otras acciones Git remotas ni acciones de producción sin autorización explícita.
- El README indica que un push a `main` dispara un deploy automático en Netlify. Antes de integrar a `main`, confirma si publicará y obtén también autorización de deploy cuando corresponda.

## Coordinación y transferencia

- Acuerden tarea, rama y responsable en una issue o PR de GitHub cuando esté disponible. Publicar o actualizar allí requiere autorización; mientras tanto, entrega el resumen en la conversación.
- Si dos tareas afectan los mismos archivos, acuerden el orden antes de editar.
- El otro operador puede revisar el diff; las correcciones las hace el responsable activo, salvo transferencia explícita.
- Para transferir una rama, el responsable saliente detiene su agente y entrega el estado exacto. El entrante confirma la recepción antes de continuar.
- Los cambios sin commit no viajan mediante GitHub. Indica cómo se entregarán y no hagas commit o push solo para facilitar el handoff sin autorización.
- Documenta quién hizo cada cambio en el handoff y, cuando se autorice, en la descripción de la PR. El operador humano mantiene la responsabilidad.

## Al terminar

- Revisa el diff y ejecuta `git diff --check` y `git status`. Revisa también el contenido de archivos nuevos, que aún no aparecen en el diff normal.
- Realiza las validaciones adecuadas al cambio y reporta su resultado; no afirmes haber ejecutado comprobaciones que no hiciste.
- Reporta archivos modificados o creados, decisiones, validaciones, pendientes, estado Git y siguiente paso.
- Identifica siempre Operador y Agente usando `docs/ai/HANDOFF_TEMPLATE.md`.
- Si el siguiente paso requiere autorización, detente y espera.
