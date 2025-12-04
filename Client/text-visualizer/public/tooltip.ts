/**
 * MUI-style Tooltip System
 * Provides Material-UI-like tooltips for vanilla JavaScript
 */

import { createPopper, Instance } from '@popperjs/core';

/**
 * Initialize MUI-style tooltips for elements with data-tooltip attribute
 */
// Store popper instances to avoid recreating
const popperInstances = new WeakMap<Element, Instance>();

export function initTooltips(): void {
  // Clean up old tooltips first
  document.querySelectorAll('.mui-tooltip').forEach(tooltip => {
    if (!tooltip.parentElement) return;
    const element = tooltip.parentElement.querySelector('[data-tooltip], .tooltip-html');
    if (element && popperInstances.has(element)) {
      const instance = popperInstances.get(element);
      if (instance) {
        instance.destroy();
      }
      popperInstances.delete(element);
    }
    tooltip.remove();
  });
  
  // Handle simple text tooltips
  document.querySelectorAll('[data-tooltip]:not(.tooltip-html)').forEach(element => {
    const tooltipText = element.getAttribute('data-tooltip');
    if (!tooltipText || popperInstances.has(element)) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'mui-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.innerHTML = `<div class="mui-tooltip-arrow"></div><div class="mui-tooltip-inner">${escapeHtml(tooltipText)}</div>`;
    document.body.appendChild(tooltip);
    
    const popperInstance = createPopper(element, tooltip, {
      placement: 'top',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
    
    popperInstances.set(element, popperInstance);
    
    element.addEventListener('mouseenter', () => {
      tooltip.setAttribute('data-show', '');
      popperInstance.update();
    });
    
    element.addEventListener('mouseleave', () => {
      tooltip.removeAttribute('data-show');
    });
  });
  
  // Handle HTML tooltips (for buffs/debuffs)
  document.querySelectorAll('.tooltip-html').forEach(element => {
    const encodedHtml = element.getAttribute('data-tooltip-html');
    if (!encodedHtml || popperInstances.has(element)) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'mui-tooltip mui-tooltip-html';
    tooltip.setAttribute('role', 'tooltip');
    
    try {
      const tooltipHtml = decodeURIComponent(escape(atob(encodedHtml)));
      tooltip.innerHTML = `<div class="mui-tooltip-arrow"></div><div class="mui-tooltip-inner">${tooltipHtml}</div>`;
      document.body.appendChild(tooltip);
      
      const popperInstance = createPopper(element, tooltip, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
      
      popperInstances.set(element, popperInstance);
      
      element.addEventListener('mouseenter', () => {
        tooltip.setAttribute('data-show', '');
        popperInstance.update();
      });
      
      element.addEventListener('mouseleave', () => {
        tooltip.removeAttribute('data-show');
      });
    } catch (e) {
      console.error('Error decoding tooltip HTML:', e);
    }
  });
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

