// Toggle this when ready to launch
export const PRELAUNCH_MODE = true;

export function handleAppLink(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  // Only intercept app.speakerdrive.com links
  if (!href.includes('app.speakerdrive.com')) return;
  
  // Allow direct access with special key press (Ctrl/Cmd + click)
  if (e.ctrlKey || e.metaKey) return;
  
  if (PRELAUNCH_MODE) {
    e.preventDefault();
    window.location.href = '/coming-soon';
  }
}