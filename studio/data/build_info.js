// Which build of the weapon data this page shows. The deploy (.github/workflows/deploy-studio.yml)
// rebuilds the data from the Mod Source and replaces this file with the commit, its date and hosted: true.
// A local copy (run_studio.bat) keeps this default and shows the Definition Workbench.
window.STUDIO_BUILD = { hosted: false, commit: '', date: '' };
