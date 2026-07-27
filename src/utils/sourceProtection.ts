export function setupSourceCodeProtection(onBlockedAction?: (reason: string) => void) {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    if (onBlockedAction) onBlockedAction('Right-click context menu restricted by Security Protocol.');
    return false;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      if (onBlockedAction) onBlockedAction('Developer Tools inspection shortcut (F12) restricted.');
      return false;
    }

    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
    if (e.ctrlKey || e.metaKey) {
      if (
        (e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        e.key === 'u' ||
        e.key === 'U' ||
        e.key === 's' ||
        e.key === 'S'
      ) {
        e.preventDefault();
        if (onBlockedAction) onBlockedAction(`Inspection shortcut (Ctrl+${e.key}) restricted.`);
        return false;
      }
    }
  };

  const handleDragStart = (e: DragEvent) => {
    // Prevent image / text dragging if needed
    if ((e.target as HTMLElement)?.tagName === 'IMG') {
      e.preventDefault();
    }
  };

  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('dragstart', handleDragStart);

  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('dragstart', handleDragStart);
  };
}
