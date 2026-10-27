import React from 'react';

/**
 * NodeGlyph Component
 * Renders SVG micro-icon graphics for individual architecture nodes.
 */
export default function NodeGlyph({ nodeId, color }) {
  switch (nodeId) {
    case 'react-ui':
      return (
        <g transform="translate(-9, -9)" stroke={color} strokeWidth="1.6" fill="none">
          <ellipse cx="9" cy="9" rx="8" ry="3" />
          <ellipse cx="9" cy="9" rx="8" ry="3" transform="rotate(60 9 9)" />
          <ellipse cx="9" cy="9" rx="8" ry="3" transform="rotate(120 9 9)" />
          <circle cx="9" cy="9" r="1.8" fill={color} />
        </g>
      );
    case 'node-api':
      return (
        <g transform="translate(-9, -9)" stroke={color} strokeWidth="1.6" fill="none">
          <polygon points="9,1 17,5 17,13 9,17 1,13 1,5" />
          <path d="M9,1 L9,17" />
          <path d="M1,5 L9,9 L17,5" />
        </g>
      );
    case 'n8n-webhooks':
      return (
        <g transform="translate(-9, -9)" stroke={color} strokeWidth="1.6" fill="none">
          <circle cx="4.5" cy="9" r="2" fill={color} />
          <circle cx="13.5" cy="4.5" r="2" />
          <circle cx="13.5" cy="13.5" r="2" />
          <path d="M6.5 9 L11.5 4.5 M6.5 9 L11.5 13.5" />
        </g>
      );
    case 'enterprise-ops':
      return (
        <g transform="translate(-9, -9)" stroke={color} strokeWidth="1.6" fill="none">
          <ellipse cx="9" cy="4.5" rx="7" ry="2.5" />
          <path d="M2 4.5 v9 c0 1.4 3.1 2.5 7 2.5 s7 -1.1 7 -2.5 v-9" />
          <path d="M2 9 c0 1.4 3.1 2.5 7 2.5 s7 -1.1 7 -2.5" />
        </g>
      );
    default:
      return null;
  }
}
