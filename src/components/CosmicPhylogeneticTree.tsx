import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { COSMIC_PHYLOGENETIC_TREE } from '../data/cosmicArchiveData';
import { PhylogeneticNode } from '../types';
import {
  Compass,
  Sparkles,
  Orbit,
  Layers,
  ChevronRight,
  Info,
  BookOpen,
  Search,
  Check,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Filter,
  Eye,
  Crosshair,
  Move,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  Sliders,
  HelpCircle,
  MapPin
} from 'lucide-react';

interface CosmicPhylogeneticTreeProps {
  onSelectCandidateByName?: (name: string) => void;
}

interface RadialNode {
  node: PhylogeneticNode;
  x: number;
  y: number;
  radius: number;
  angle: number; // in radians
  depth: number;
  parentId?: string;
  path: string[];
  color: string;
  domainId: string;
}

interface RadialLink {
  source: RadialNode;
  target: RadialNode;
  pathString: string;
  isHighlighted: boolean;
}

const DOMAIN_COLORS: Record<string, { primary: string; light: string; accent: string; label: string }> = {
  'domain-exoplanets': { primary: '#2d6a4f', light: '#d8f3dc', accent: '#52b788', label: 'Exoplanets' },
  'domain-stars': { primary: '#b07d18', light: '#fefae0', accent: '#d4a373', label: 'Stars' },
  'domain-nebulae': { primary: '#8b4513', light: '#faedcd', accent: '#bc6c25', label: 'Nebulae' },
  'domain-galaxies': { primary: '#1e3a5f', light: '#e0eaf5', accent: '#3b6294', label: 'Galaxies' },
  'domain-missions': { primary: '#4a5568', light: '#edf2f7', accent: '#718096', label: 'Space Missions' },
};

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 4.0;
const ZOOM_STEP = 1.25;
const PAN_STEP = 50;

export const CosmicPhylogeneticTree: React.FC<CosmicPhylogeneticTreeProps> = ({
  onSelectCandidateByName,
}) => {
  const [selectedNode, setSelectedNode] = useState<PhylogeneticNode>(COSMIC_PHYLOGENETIC_TREE);
  const [hoveredNode, setHoveredNode] = useState<RadialNode | null>(null);
  const [viewMode, setViewMode] = useState<'radial' | 'cladogram' | 'linear'>('radial');
  const [searchTaxon, setSearchTaxon] = useState('');
  const [activeDomainFilter, setActiveDomainFilter] = useState<string>('all');
  
  // Navigation State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);
  const [showHelpGuide, setShowHelpGuide] = useState(false);
  const [collapsedBranches, setCollapsedBranches] = useState<Set<string>>(new Set());

  // Touch gesture state
  const touchStateRef = useRef<{
    initialDistance: number;
    initialZoom: number;
    lastPan: { x: number; y: number };
    lastTouch: { x: number; y: number };
  }>({
    initialDistance: 0,
    initialZoom: 1,
    lastPan: { x: 0, y: 0 },
    lastTouch: { x: 0, y: 0 },
  });

  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Helper to find a node and build its path from root
  const findNodeAndPath = useCallback((
    current: PhylogeneticNode,
    targetId: string,
    currentPath: string[] = []
  ): { node: PhylogeneticNode; path: string[] } | null => {
    const newPath = [...currentPath, current.id];
    if (current.id === targetId) return { node: current, path: newPath };
    if (current.children) {
      for (const child of current.children) {
        const found = findNodeAndPath(child, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  }, []);

  const highlightPath = useMemo(() => {
    const res = findNodeAndPath(COSMIC_PHYLOGENETIC_TREE, selectedNode.id);
    return res ? res.path : ['universe-root'];
  }, [selectedNode, findNodeAndPath]);

  // Compute full radial dendrogram layout
  const { nodes, links } = useMemo(() => {
    const calculatedNodes: RadialNode[] = [];
    const calculatedLinks: RadialLink[] = [];

    // Root node
    const rootRadial: RadialNode = {
      node: COSMIC_PHYLOGENETIC_TREE,
      x: 0,
      y: 0,
      radius: 0,
      angle: 0,
      depth: 0,
      path: ['universe-root'],
      color: '#1e3a5f',
      domainId: 'universe-root',
    };
    calculatedNodes.push(rootRadial);

    const domains = COSMIC_PHYLOGENETIC_TREE.children || [];
    const numDomains = domains.length;
    const anglePerDomain = (2 * Math.PI) / (numDomains || 1);

    domains.forEach((domain, dIdx) => {
      if (activeDomainFilter !== 'all' && domain.id !== activeDomainFilter) {
        return;
      }

      const domainStartAngle = dIdx * anglePerDomain - Math.PI / 2;
      const domainEndAngle = domainStartAngle + anglePerDomain;
      const domainMidAngle = (domainStartAngle + domainEndAngle) / 2;

      const domainRadius = 80;
      const dColor = DOMAIN_COLORS[domain.id]?.primary || '#1e3a5f';

      const domainNode: RadialNode = {
        node: domain,
        x: domainRadius * Math.cos(domainMidAngle),
        y: domainRadius * Math.sin(domainMidAngle),
        radius: domainRadius,
        angle: domainMidAngle,
        depth: 1,
        parentId: rootRadial.node.id,
        path: ['universe-root', domain.id],
        color: dColor,
        domainId: domain.id,
      };
      calculatedNodes.push(domainNode);

      // Link from root to domain
      const c2x0 = domainRadius * 0.5 * Math.cos(domainMidAngle);
      const c2y0 = domainRadius * 0.5 * Math.sin(domainMidAngle);
      const pStr0 = `M 0 0 C ${c2x0 * 0.4} ${c2y0 * 0.4}, ${c2x0 * 0.8} ${c2y0 * 0.8}, ${domainNode.x} ${domainNode.y}`;

      calculatedLinks.push({
        source: rootRadial,
        target: domainNode,
        pathString: pStr0,
        isHighlighted: highlightPath.includes(domain.id),
      });

      if (collapsedBranches.has(domain.id)) {
        return;
      }

      const subclasses = domain.children || [];
      const numSubclasses = subclasses.length;
      const subAngleSpan = anglePerDomain * 0.88;
      const subAngleStart = domainMidAngle - subAngleSpan / 2;
      const subAngleStep = numSubclasses > 1 ? subAngleSpan / (numSubclasses - 1) : 0;

      subclasses.forEach((subclass, sIdx) => {
        const subAngle = numSubclasses === 1 ? domainMidAngle : subAngleStart + sIdx * subAngleStep;
        const subRadius = 145;

        const subNode: RadialNode = {
          node: subclass,
          x: subRadius * Math.cos(subAngle),
          y: subRadius * Math.sin(subAngle),
          radius: subRadius,
          angle: subAngle,
          depth: 2,
          parentId: domain.id,
          path: ['universe-root', domain.id, subclass.id],
          color: dColor,
          domainId: domain.id,
        };
        calculatedNodes.push(subNode);

        // Link from domain to subclass
        const rMid1 = (domainRadius + subRadius) / 2;
        const c1x = rMid1 * Math.cos(domainMidAngle);
        const c1y = rMid1 * Math.sin(domainMidAngle);
        const c2x = rMid1 * Math.cos(subAngle);
        const c2y = rMid1 * Math.sin(subAngle);
        const pStr1 = `M ${domainNode.x} ${domainNode.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${subNode.x} ${subNode.y}`;

        calculatedLinks.push({
          source: domainNode,
          target: subNode,
          pathString: pStr1,
          isHighlighted: highlightPath.includes(subclass.id),
        });

        if (collapsedBranches.has(subclass.id)) {
          return;
        }

        const objects = subclass.children || [];
        const numObjects = objects.length;
        const objAngleSpan = (subAngleSpan / (numSubclasses || 1)) * 0.95;
        const objAngleStart = subAngle - objAngleSpan / 2;
        const objAngleStep = numObjects > 1 ? objAngleSpan / (numObjects - 1) : 0;

        objects.forEach((obj, oIdx) => {
          const objAngle = numObjects === 1 ? subAngle : objAngleStart + oIdx * objAngleStep;
          const objRadius = 215;

          const objNode: RadialNode = {
            node: obj,
            x: objRadius * Math.cos(objAngle),
            y: objRadius * Math.sin(objAngle),
            radius: objRadius,
            angle: objAngle,
            depth: 3,
            parentId: subclass.id,
            path: ['universe-root', domain.id, subclass.id, obj.id],
            color: dColor,
            domainId: domain.id,
          };
          calculatedNodes.push(objNode);

          // Link from subclass to object
          const rMid2 = (subRadius + objRadius) / 2;
          const c1x2 = rMid2 * Math.cos(subAngle);
          const c1y2 = rMid2 * Math.sin(subAngle);
          const c2x2 = rMid2 * Math.cos(objAngle);
          const c2y2 = rMid2 * Math.sin(objAngle);
          const pStr2 = `M ${subNode.x} ${subNode.y} C ${c1x2} ${c1y2}, ${c2x2} ${c2y2}, ${objNode.x} ${objNode.y}`;

          calculatedLinks.push({
            source: subNode,
            target: objNode,
            pathString: pStr2,
            isHighlighted: highlightPath.includes(obj.id),
          });
        });
      });
    });

    return { nodes: calculatedNodes, links: calculatedLinks };
  }, [activeDomainFilter, collapsedBranches, highlightPath]);

  // Selected radial node position
  const selectedRadialNode = useMemo(() => {
    return nodes.find((n) => n.node.id === selectedNode.id) || nodes[0];
  }, [nodes, selectedNode]);

  // Handle clicking on a node
  const handleNodeClick = (node: PhylogeneticNode) => {
    setSelectedNode(node);
  };

  // Zoom and Pan Helpers
  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(Number((z * ZOOM_STEP).toFixed(2)), MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(Number((z / ZOOM_STEP).toFixed(2)), MIN_ZOOM));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleFocusSelectedNode = useCallback(() => {
    if (!selectedRadialNode) return;
    // Animate zoom and pan towards the selected node coordinates
    const targetScale = selectedRadialNode.depth === 0 ? 1 : 1.7;
    // Map node (x, y) to svg center: translate vector = (-x * scale, -y * scale)
    const targetPanX = -selectedRadialNode.x * (targetScale * 0.9);
    const targetPanY = -selectedRadialNode.y * (targetScale * 0.9);
    
    setZoom(targetScale);
    setPan({ x: targetPanX, y: targetPanY });
  }, [selectedRadialNode]);

  const handlePanDirection = useCallback((dx: number, dy: number) => {
    setPan((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  }, []);

  // Mouse Drag Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel Zoom Listener (smooth zooming at focal position)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    setZoom((prevZoom) => {
      const nextZoom = Math.min(Math.max(prevZoom * zoomFactor, MIN_ZOOM), MAX_ZOOM);
      return Number(nextZoom.toFixed(3));
    });
  };

  // Touch handlers for mobile/tablet pinch-to-zoom & single-finger pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStateRef.current.lastTouch = { x: touch.clientX, y: touch.clientY };
      touchStateRef.current.lastPan = { ...pan };
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      touchStateRef.current.initialDistance = dist;
      touchStateRef.current.initialZoom = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const dx = touch.clientX - touchStateRef.current.lastTouch.x;
      const dy = touch.clientY - touchStateRef.current.lastTouch.y;
      setPan({
        x: touchStateRef.current.lastPan.x + dx,
        y: touchStateRef.current.lastPan.y + dy,
      });
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      if (touchStateRef.current.initialDistance > 0) {
        const factor = dist / touchStateRef.current.initialDistance;
        const newZoom = Math.min(Math.max(touchStateRef.current.initialZoom * factor, MIN_ZOOM), MAX_ZOOM);
        setZoom(Number(newZoom.toFixed(2)));
      }
    }
  };

  // Keyboard navigation shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case '+':
      case '=':
        e.preventDefault();
        handleZoomIn();
        break;
      case '-':
      case '_':
        e.preventDefault();
        handleZoomOut();
        break;
      case '0':
      case 'r':
      case 'R':
        e.preventDefault();
        handleResetZoom();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        handleFocusSelectedNode();
        break;
      case 'ArrowUp':
        e.preventDefault();
        handlePanDirection(0, PAN_STEP);
        break;
      case 'ArrowDown':
        e.preventDefault();
        handlePanDirection(0, -PAN_STEP);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        handlePanDirection(PAN_STEP, 0);
        break;
      case 'ArrowRight':
        e.preventDefault();
        handlePanDirection(-PAN_STEP, 0);
        break;
      default:
        break;
    }
  }, [handleZoomIn, handleZoomOut, handleResetZoom, handleFocusSelectedNode, handlePanDirection]);

  // Search filter
  const filteredTaxa = useMemo(() => {
    if (!searchTaxon.trim()) return [];
    const query = searchTaxon.toLowerCase();
    return nodes.filter(
      (n) =>
        n.node.name.toLowerCase().includes(query) ||
        n.node.latinName.toLowerCase().includes(query) ||
        n.node.description.toLowerCase().includes(query)
    );
  }, [nodes, searchTaxon]);

  // Get breadcrumb path for selected node
  const lineageBreadcrumb = useMemo(() => {
    const res = findNodeAndPath(COSMIC_PHYLOGENETIC_TREE, selectedNode.id);
    if (!res) return [COSMIC_PHYLOGENETIC_TREE.name];
    const pathNodes: string[] = [];
    let curr: PhylogeneticNode | undefined = COSMIC_PHYLOGENETIC_TREE;
    for (const id of res.path) {
      if (curr && curr.id === id) {
        pathNodes.push(curr.name.split(' (')[0]);
      } else if (curr?.children) {
        const found = curr.children.find((c) => c.id === id);
        if (found) {
          pathNodes.push(found.name.split(' (')[0]);
          curr = found;
        }
      }
    }
    return pathNodes;
  }, [selectedNode, findNodeAndPath]);

  // Minimap bounding box calculations
  const minimapViewBox = useMemo(() => {
    // 560 x 560 base view, scaled by zoom & offset by pan
    const viewWidth = 560 / zoom;
    const viewHeight = 560 / zoom;
    const viewX = -viewWidth / 2 - pan.x / zoom;
    const viewY = -viewHeight / 2 - pan.y / zoom;
    return { x: viewX, y: viewY, width: viewWidth, height: viewHeight };
  }, [zoom, pan]);

  return (
    <section
      id="cosmic-dendrogram-section"
      className={`paper-card plate-border p-4 sm:p-6 rounded-xs mt-6 transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto bg-[#faf6ee] shadow-2xl border-2 border-[#1e3a5f]' : ''
      }`}
    >
      {/* Section Header with Academic Subtitle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[#dfd5c3] pb-3 mb-4 gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono-archive tracking-widest text-[#8c6d31] uppercase font-bold">
              Taxonomia Phylogenetica Cosmica · Radial Dendrogram
            </span>
            <span className="text-[10px] bg-[#f0e7d7] text-[#6b5d49] px-2 py-0.5 rounded-xs border border-[#d6c7b2] font-mono-archive">
              INTERACTIVE PAN & ZOOM CONTROLS
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#1f2c3d] mt-1">
            Cosmic Taxonomic Dendrogram & Cladistic Lineage
          </h2>

          <p className="text-xs sm:text-sm text-[#5c5243] font-eb mt-0.5">
            Radial dendrogram spanning cosmological matter from the Primordial Universe into 5 celestial domains. Navigate via click-drag pan, mouse wheel zoom, touch gestures, and interactive radar controls.
          </p>
        </div>

        {/* View Mode Tabs & Fullscreen Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-[#ede2d1] p-0.5 rounded-xs border border-[#cfc3af] text-xs font-cinzel">
            <button
              onClick={() => setViewMode('radial')}
              className={`px-3 py-1 rounded-xs transition-colors font-semibold ${
                viewMode === 'radial'
                  ? 'bg-[#1e3a5f] text-[#fbf8f1] shadow-xs'
                  : 'text-[#5a4d3c] hover:text-[#2b2723]'
              }`}
            >
              Radial Dendrogram
            </button>
            <button
              onClick={() => setViewMode('cladogram')}
              className={`px-3 py-1 rounded-xs transition-colors font-semibold ${
                viewMode === 'cladogram'
                  ? 'bg-[#1e3a5f] text-[#fbf8f1] shadow-xs'
                  : 'text-[#5a4d3c] hover:text-[#2b2723]'
              }`}
            >
              Botanical Cladogram
            </button>
            <button
              onClick={() => setViewMode('linear')}
              className={`px-3 py-1 rounded-xs transition-colors font-semibold ${
                viewMode === 'linear'
                  ? 'bg-[#1e3a5f] text-[#fbf8f1] shadow-xs'
                  : 'text-[#5a4d3c] hover:text-[#2b2723]'
              }`}
            >
              Taxon Hierarchy
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Expanded View' : 'Expand Research Canvas'}
            className="p-1.5 bg-[#ede2d1] hover:bg-[#dfd3bf] text-[#1e3a5f] rounded-xs border border-[#cfc3af] transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Domain Filter Bar & Search Ribbons */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5 bg-[#f5ece0] p-2.5 rounded-xs border border-[#dbceb9] text-[11px] font-mono-archive">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[#8c6d31] font-bold uppercase tracking-wider mr-1">
            Focus Domain:
          </span>
          <button
            onClick={() => {
              setActiveDomainFilter('all');
              handleResetZoom();
            }}
            className={`px-2.5 py-1 rounded-xs border transition-all ${
              activeDomainFilter === 'all'
                ? 'bg-[#1e3a5f] text-[#fbf8f1] border-[#1e3a5f] font-bold shadow-xs'
                : 'bg-[#faf6ee] text-[#4a3f31] border-[#d6c7b2] hover:bg-[#eae0cf]'
            }`}
          >
            All Domains (5)
          </button>
          {Object.entries(DOMAIN_COLORS).map(([id, info]) => (
            <button
              key={id}
              onClick={() => {
                setActiveDomainFilter(id);
                // Auto focus selected domain
                const dNode = nodes.find((n) => n.node.id === id);
                if (dNode) {
                  setSelectedNode(dNode.node);
                  setZoom(1.4);
                  setPan({ x: -dNode.x * 1.2, y: -dNode.y * 1.2 });
                }
              }}
              className={`px-2.5 py-1 rounded-xs border transition-all flex items-center gap-1.5 ${
                activeDomainFilter === id
                  ? 'bg-[#1e3a5f] text-[#fbf8f1] border-[#1e3a5f] font-bold shadow-xs'
                  : 'bg-[#faf6ee] text-[#4a3f31] border-[#d6c7b2] hover:bg-[#eae0cf]'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: info.primary }}></span>
              <span>{info.label}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex items-center min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-[#8c6d31]" />
          <input
            type="text"
            placeholder="Search taxon or object..."
            value={searchTaxon}
            onChange={(e) => setSearchTaxon(e.target.value)}
            className="w-full bg-[#faf6ee] pl-8 pr-3 py-1 text-xs text-[#2c241b] placeholder-[#9c8e7b] border border-[#d6c7b2] rounded-xs focus:outline-none focus:border-[#1e3a5f]"
          />
          {searchTaxon && (
            <button
              onClick={() => setSearchTaxon('')}
              className="absolute right-2 text-xs text-[#8c6d31] hover:text-[#1e3a5f]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Search results dropdown preview if active */}
      {searchTaxon.trim() && filteredTaxa.length > 0 && (
        <div className="mb-4 bg-[#fbf8f1] border border-[#d6c7b2] rounded-xs p-2 max-h-36 overflow-y-auto">
          <div className="text-[10px] font-mono-archive text-[#8c6d31] font-bold uppercase mb-1">
            Matching Taxa ({filteredTaxa.length}):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filteredTaxa.map((rNode) => (
              <button
                key={rNode.node.id}
                onClick={() => {
                  setSelectedNode(rNode.node);
                  setSearchTaxon('');
                  // Center viewport on matched node
                  setZoom(1.6);
                  setPan({ x: -rNode.x * 1.5, y: -rNode.y * 1.5 });
                }}
                className="px-2 py-0.5 bg-[#f4eee2] hover:bg-[#1e3a5f] hover:text-[#fff] text-[11px] rounded-xs border border-[#dbceb9] font-mono-archive text-left transition-colors"
              >
                <span className="font-bold">{rNode.node.name}</span>
                <span className="text-[9px] opacity-75 ml-1">({rNode.node.level})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Interactive Diagram & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Diagram Visualization Area (8 cols) */}
        <div className="lg:col-span-8 bg-[#fdfbf7] p-4 rounded-xs border border-[#d6c7b2] shadow-xs min-h-[580px] flex flex-col justify-between relative overflow-hidden">
          {viewMode === 'radial' && (
            <div
              ref={canvasContainerRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onWheel={handleWheel}
              className="relative w-full flex-1 flex flex-col items-center justify-center select-none outline-none focus:ring-1 focus:ring-[#1e3a5f]/30 rounded-xs"
            >
              {/* Comprehensive Floating Pan & Zoom Control Toolbar */}
              <div className="absolute top-2 right-2 z-20 flex flex-col items-end gap-2 pointer-events-auto">
                {/* Main Zoom Actions Floating Palette */}
                <div className="flex items-center gap-1 bg-[#faf5ec]/95 backdrop-blur-md p-1.5 rounded-xs border border-[#c9bda8] shadow-md">
                  {/* Zoom Out Button */}
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= MIN_ZOOM}
                    title="Zoom Out (- or Scroll Down)"
                    className="p-1.5 hover:bg-[#ede2d1] active:bg-[#dfd3bf] disabled:opacity-40 disabled:hover:bg-transparent rounded-xs text-[#1e3a5f] transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  {/* Zoom Percentage Badge */}
                  <span className="text-[11px] font-mono-archive font-bold text-[#1e3a5f] px-1.5 min-w-[44px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>

                  {/* Zoom In Button */}
                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= MAX_ZOOM}
                    title="Zoom In (+ or Scroll Up)"
                    className="p-1.5 hover:bg-[#ede2d1] active:bg-[#dfd3bf] disabled:opacity-40 disabled:hover:bg-transparent rounded-xs text-[#1e3a5f] transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <div className="w-[1px] h-4 bg-[#d6c7b2] mx-1"></div>

                  {/* Focus on Selected Node Button */}
                  <button
                    onClick={handleFocusSelectedNode}
                    title="Focus on Selected Taxon Node (F)"
                    className="p-1.5 hover:bg-[#ede2d1] active:bg-[#dfd3bf] rounded-xs text-[#8c6d31] transition-colors flex items-center gap-1"
                  >
                    <Crosshair className="w-4 h-4" />
                  </button>

                  {/* Reset to Root View (Fit) */}
                  <button
                    onClick={handleResetZoom}
                    title="Reset to Center & 100% Zoom (0 / R)"
                    className="p-1.5 hover:bg-[#ede2d1] active:bg-[#dfd3bf] rounded-xs text-[#1e3a5f] transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <div className="w-[1px] h-4 bg-[#d6c7b2] mx-1"></div>

                  {/* Toggle Minimap */}
                  <button
                    onClick={() => setShowMinimap(!showMinimap)}
                    title={showMinimap ? 'Hide Mini-Radar' : 'Show Mini-Radar'}
                    className={`p-1.5 rounded-xs transition-colors ${
                      showMinimap ? 'bg-[#1e3a5f] text-[#fbf8f1]' : 'hover:bg-[#ede2d1] text-[#5c5040]'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </button>

                  {/* Help Guide Toggle */}
                  <button
                    onClick={() => setShowHelpGuide(!showHelpGuide)}
                    title="Keyboard & Navigation Guide"
                    className={`p-1.5 rounded-xs transition-colors ${
                      showHelpGuide ? 'bg-[#8c6d31] text-[#fbf8f1]' : 'hover:bg-[#ede2d1] text-[#5c5040]'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Zoom Presets Bar */}
                <div className="flex items-center gap-1 bg-[#faf5ec]/90 backdrop-blur-xs px-2 py-1 rounded-xs border border-[#d6c7b2] text-[10px] font-mono-archive shadow-xs">
                  <span className="text-[#8c6d31] font-bold mr-1">PRESETS:</span>
                  {[
                    { label: '50%', val: 0.5 },
                    { label: '100%', val: 1.0 },
                    { label: '150%', val: 1.5 },
                    { label: '250%', val: 2.5 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setZoom(preset.val)}
                      className={`px-1.5 py-0.5 rounded-xs border transition-colors ${
                        Math.abs(zoom - preset.val) < 0.05
                          ? 'bg-[#1e3a5f] text-[#fbf8f1] border-[#1e3a5f] font-bold'
                          : 'bg-[#faf6ee] text-[#55493a] border-[#dfd5c3] hover:bg-[#eae0ce]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Compass Directional Pan D-Pad */}
                <div className="bg-[#faf5ec]/90 backdrop-blur-xs p-1.5 rounded-xs border border-[#d6c7b2] shadow-xs flex flex-col items-center">
                  <button
                    onClick={() => handlePanDirection(0, PAN_STEP)}
                    title="Pan Up (ArrowUp)"
                    className="p-1 hover:bg-[#ede2d1] active:bg-[#dfd3bf] rounded-xs text-[#1e3a5f]"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePanDirection(PAN_STEP, 0)}
                      title="Pan Left (ArrowLeft)"
                      className="p-1 hover:bg-[#ede2d1] active:bg-[#dfd3bf] rounded-xs text-[#1e3a5f]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      title="Center View"
                      className="p-1 hover:bg-[#ede2d1] rounded-xs text-[#8c6d31]"
                    >
                      <Compass className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handlePanDirection(-PAN_STEP, 0)}
                      title="Pan Right (ArrowRight)"
                      className="p-1 hover:bg-[#ede2d1] active:bg-[#dfd3bf] rounded-xs text-[#1e3a5f]"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handlePanDirection(0, -PAN_STEP)}
                    title="Pan Down (ArrowDown)"
                    className="p-1 hover:bg-[#ede2d1] active:bg-[#dfd3bf] rounded-xs text-[#1e3a5f]"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Navigation Help Guide Popover */}
              {showHelpGuide && (
                <div className="absolute top-14 left-4 right-4 sm:right-auto sm:w-80 bg-[#fdfaf5] border border-[#b07d18] rounded-xs p-3 shadow-lg z-30 text-xs font-eb">
                  <div className="flex items-center justify-between border-b border-[#dfd5c3] pb-1.5 mb-2">
                    <span className="font-cinzel font-bold text-[#1e3a5f] flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[#8c6d31]" /> Navigation Controls
                    </span>
                    <button
                      onClick={() => setShowHelpGuide(false)}
                      className="text-xs text-[#8c6d31] hover:text-[#1e3a5f]"
                    >
                      ✕
                    </button>
                  </div>
                  <ul className="space-y-1.5 text-[11px] font-mono-archive text-[#4a3f31]">
                    <li className="flex justify-between">
                      <span className="text-[#8c6d31] font-bold">Pan:</span>
                      <span>Click & drag canvas / Arrow keys</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#8c6d31] font-bold">Zoom:</span>
                      <span>Mouse Wheel / Pinch gesture / + -</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#8c6d31] font-bold">Center Root:</span>
                      <span>R key / 0 key / Reset button</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#8c6d31] font-bold">Focus Taxon:</span>
                      <span>F key / Target crosshair button</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#8c6d31] font-bold">Minimap:</span>
                      <span>Click radar box to jump to quadrant</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Radial Dendrogram SVG Canvas */}
              <div
                className={`w-full ${
                  isFullscreen ? 'h-[75vh]' : 'h-[500px]'
                } cursor-grab active:cursor-grabbing relative overflow-hidden flex items-center justify-center touch-none`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                <svg
                  ref={svgRef}
                  viewBox="-280 -280 560 560"
                  className="w-full h-full"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.12s ease-out',
                  }}
                >
                  <defs>
                    {/* Concentric radial parchment glow */}
                    <radialGradient id="dendrogram-bg-glow" cx="0" cy="0" r="1">
                      <stop offset="0%" stopColor="#fdfbf7" />
                      <stop offset="50%" stopColor="#faf5ec" />
                      <stop offset="85%" stopColor="#f3ebd9" />
                      <stop offset="100%" stopColor="#e9dec6" />
                    </radialGradient>

                    {/* Universe Root Core Gradient */}
                    <radialGradient id="root-universe-grad" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#2a4d77" />
                      <stop offset="100%" stopColor="#0f2038" />
                    </radialGradient>
                  </defs>

                  {/* Concentric Taxonomic Ring Guides */}
                  {[80, 145, 215].map((r, i) => (
                    <g key={i}>
                      <circle
                        cx="0"
                        cy="0"
                        r={r}
                        fill="none"
                        stroke={i === 0 ? '#b8a68c' : i === 1 ? '#ccbfae' : '#ded5c5'}
                        strokeWidth={i === 0 ? '1' : '0.75'}
                        strokeDasharray={i > 0 ? '3,3' : undefined}
                        opacity="0.75"
                      />
                      {/* Layer labels */}
                      <text
                        x="0"
                        y={-r - 3}
                        textAnchor="middle"
                        fill="#9e8e78"
                        fontSize="5"
                        fontFamily="'JetBrains Mono', monospace"
                        letterSpacing="1"
                      >
                        {i === 0 ? 'LAYER I · DOMAINS' : i === 1 ? 'LAYER II · SUBCLASSES' : 'LAYER III · SPECIMEN OBJECTS'}
                      </text>
                    </g>
                  ))}

                  {/* Connection Lines / Arcs */}
                  <g className="tree-links">
                    {links.map((link, idx) => (
                      <path
                        key={idx}
                        d={link.pathString}
                        fill="none"
                        stroke={link.isHighlighted ? '#b07d18' : '#c9bcab'}
                        strokeWidth={link.isHighlighted ? '2' : '0.85'}
                        strokeOpacity={link.isHighlighted ? 0.95 : 0.65}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                    ))}
                  </g>

                  {/* Nodes */}
                  <g className="tree-nodes">
                    {nodes.map((rNode) => {
                      const isSelected = selectedNode.id === rNode.node.id;
                      const isHovered = hoveredNode?.node.id === rNode.node.id;
                      const isPathActive = highlightPath.includes(rNode.node.id);
                      const isLeaf = rNode.depth === 3;
                      const isDomain = rNode.depth === 1;
                      const isSubclass = rNode.depth === 2;
                      const isRoot = rNode.depth === 0;

                      // Determine node radius & styling
                      const nodeR = isRoot ? 24 : isDomain ? 16 : isSubclass ? 10 : 6;

                      // Text label positioning for leaf & subclass nodes
                      const angleDeg = (rNode.angle * 180) / Math.PI;
                      const isRightSide = Math.cos(rNode.angle) >= 0;
                      const labelRotation = isRightSide ? angleDeg : angleDeg + 180;
                      const labelOffset = isRoot ? 0 : isDomain ? 20 : isSubclass ? 14 : 9;

                      return (
                        <g
                          key={rNode.node.id}
                          transform={`translate(${rNode.x}, ${rNode.y})`}
                          className="cursor-pointer group"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNodeClick(rNode.node);
                          }}
                          onMouseEnter={() => setHoveredNode(rNode)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          {/* Selection Pulse Ring */}
                          {isSelected && (
                            <circle
                              cx="0"
                              cy="0"
                              r={nodeR + 6}
                              fill="none"
                              stroke="#b07d18"
                              strokeWidth="2"
                              strokeDasharray="3,2"
                              className="animate-spin"
                              style={{ animationDuration: '8s' }}
                            />
                          )}

                          {/* Node Main Circle */}
                          <circle
                            cx="0"
                            cy="0"
                            r={nodeR}
                            fill={
                              isRoot
                                ? 'url(#root-universe-grad)'
                                : isSelected
                                ? '#b07d18'
                                : isPathActive
                                ? rNode.color
                                : isHovered
                                ? '#3b6294'
                                : rNode.color
                            }
                            stroke={isSelected ? '#fbf8f1' : isPathActive ? '#faf5ec' : '#ded5c5'}
                            strokeWidth={isSelected ? '2.5' : isRoot ? '2' : '1.2'}
                            opacity={isPathActive || isSelected ? 1 : 0.88}
                            className="transition-all duration-200"
                          />

                          {/* Inner glyph / dot */}
                          {isRoot && (
                            <text
                              x="0"
                              y="3"
                              textAnchor="middle"
                              fill="#fbf8f1"
                              fontSize="6.5"
                              fontFamily="'Cinzel', serif"
                              fontWeight="bold"
                            >
                              UNIVERSE
                            </text>
                          )}

                          {isDomain && (
                            <text
                              x="0"
                              y="2.5"
                              textAnchor="middle"
                              fill="#fbf8f1"
                              fontSize="4.5"
                              fontFamily="'Cinzel', serif"
                              fontWeight="bold"
                            >
                              {rNode.node.name.slice(0, 3).toUpperCase()}
                            </text>
                          )}

                          {/* Subclass/Leaf Node Label in Radial Orientation */}
                          {!isRoot && (
                            <g
                              transform={`rotate(${labelRotation})`}
                              className="pointer-events-none"
                            >
                              <text
                                x={isRightSide ? labelOffset : -labelOffset}
                                y="2.5"
                                textAnchor={isRightSide ? 'start' : 'end'}
                                fill={
                                  isSelected
                                    ? '#8c6d31'
                                    : isPathActive
                                    ? '#1e3a5f'
                                    : isHovered
                                    ? '#1f2c3d'
                                    : '#5c5040'
                                }
                                fontSize={isDomain ? '6' : isSubclass ? '5' : '4.5'}
                                fontFamily={isDomain || isSubclass ? "'Cinzel', serif" : "'JetBrains Mono', monospace"}
                                fontWeight={isSelected || isDomain ? 'bold' : 'normal'}
                              >
                                {rNode.node.name.split(' (')[0]}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Interactive Mini-Radar / Minimap Navigator (Bottom Left) */}
              {showMinimap && (
                <div className="absolute bottom-3 left-3 bg-[#faf5ec]/95 backdrop-blur-md p-1.5 rounded-xs border border-[#c9bda8] shadow-md z-20 w-32 h-32 flex flex-col justify-between select-none">
                  <div className="flex items-center justify-between text-[9px] font-mono-archive text-[#8c6d31] font-bold uppercase pb-0.5 border-b border-[#dfd5c3]">
                    <span>Radar View</span>
                    <button
                      onClick={() => setShowMinimap(false)}
                      className="text-[#9c8e7b] hover:text-[#1e3a5f]"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div
                    className="relative w-full h-[96px] bg-[#f4eee2] rounded-xs border border-[#d6c7b2] overflow-hidden cursor-crosshair"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left - rect.width / 2;
                      const clickY = e.clientY - rect.top - rect.height / 2;
                      // Scale radar coordinate back to main canvas translate
                      const scaleFactor = 560 / rect.width;
                      setPan({
                        x: -clickX * scaleFactor * (zoom * 0.45),
                        y: -clickY * scaleFactor * (zoom * 0.45),
                      });
                    }}
                  >
                    <svg viewBox="-280 -280 560 560" className="w-full h-full">
                      {/* Mini rings */}
                      {[80, 145, 215].map((r, i) => (
                        <circle
                          key={i}
                          cx="0"
                          cy="0"
                          r={r}
                          fill="none"
                          stroke="#ccbfae"
                          strokeWidth="2"
                        />
                      ))}
                      {/* Mini root */}
                      <circle cx="0" cy="0" r="18" fill="#1e3a5f" />
                      {/* Mini nodes dots */}
                      {nodes.map((n) => (
                        <circle
                          key={n.node.id}
                          cx={n.x}
                          cy={n.y}
                          r={n.depth === 1 ? 8 : 4}
                          fill={n.node.id === selectedNode.id ? '#b07d18' : n.color}
                        />
                      ))}
                      {/* Viewport Bound Box */}
                      <rect
                        x={minimapViewBox.x}
                        y={minimapViewBox.y}
                        width={minimapViewBox.width}
                        height={minimapViewBox.height}
                        fill="#b07d18"
                        fillOpacity="0.18"
                        stroke="#b07d18"
                        strokeWidth="3"
                        strokeDasharray="4,3"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Floating Tooltip if Hovering */}
              {hoveredNode && (
                <div className="absolute bottom-3 left-36 right-4 sm:right-auto sm:max-w-md bg-[#faf5ec]/95 backdrop-blur-md p-2.5 rounded-xs border border-[#c9bda8] shadow-md z-20 pointer-events-none text-xs font-eb">
                  <div className="flex items-center justify-between gap-2 border-b border-[#dfd5c3] pb-1 mb-1">
                    <span className="font-cinzel font-bold text-[#1f2c3d] text-sm">
                      {hoveredNode.node.name}
                    </span>
                    <span className="text-[9px] font-mono-archive uppercase px-1.5 py-0.5 bg-[#1e3a5f] text-[#fbf8f1] rounded-xs">
                      {hoveredNode.node.level}
                    </span>
                  </div>
                  <div className="text-[11px] italic font-cormorant text-[#7a6a55]">
                    {hoveredNode.node.latinName}
                  </div>
                  <p className="text-[11px] text-[#443828] mt-1 line-clamp-2">
                    {hoveredNode.node.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {viewMode === 'cladogram' && (
            <div className="space-y-3 text-xs font-eb p-2 max-h-[460px] overflow-y-auto">
              <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-2">
                Hierarchical APG-IV Astro-Cladogram Representation
              </div>

              {/* Cladogram Tree Branches */}
              <div className="border-l-2 border-[#1e3a5f] pl-3 space-y-3">
                <div
                  className={`p-2.5 rounded-xs cursor-pointer transition-colors ${
                    selectedNode.id === 'universe-root'
                      ? 'bg-[#1e3a5f] text-[#fff]'
                      : 'bg-[#f4eee2] hover:bg-[#eae1d0]'
                  }`}
                  onClick={() => handleNodeClick(COSMIC_PHYLOGENETIC_TREE)}
                >
                  <div className="font-cinzel font-bold text-sm">1.0 Universum Primordiale (Supreme Root)</div>
                  <div className="text-[11px] italic font-cormorant">{COSMIC_PHYLOGENETIC_TREE.latinName}</div>
                </div>

                {COSMIC_PHYLOGENETIC_TREE.children?.map((domain, dIdx) => (
                  <div key={domain.id} className="border-l-2 border-[#8c6d31] pl-3 space-y-2">
                    <div
                      className={`p-2 rounded-xs cursor-pointer transition-colors ${
                        selectedNode.id === domain.id
                          ? 'bg-[#8c6d31] text-[#fff]'
                          : 'bg-[#f4eee2] hover:bg-[#eae1d0]'
                      }`}
                      onClick={() => handleNodeClick(domain)}
                    >
                      <div className="font-cinzel font-bold text-xs">
                        1.{dIdx + 1} {domain.name}
                      </div>
                      <div className="text-[10px] italic font-cormorant opacity-90">{domain.latinName}</div>
                    </div>

                    {/* Subclasses */}
                    {domain.children?.map((subclass, sIdx) => (
                      <div key={subclass.id} className="border-l-2 border-[#4a7c59] pl-3 space-y-1.5">
                        <div
                          className={`p-1.5 rounded-xs cursor-pointer transition-colors text-xs ${
                            selectedNode.id === subclass.id
                              ? 'bg-[#4a7c59] text-[#fff]'
                              : 'bg-[#faf6ee] hover:bg-[#eae0ce]'
                          }`}
                          onClick={() => handleNodeClick(subclass)}
                        >
                          <div className="font-cinzel font-semibold">
                            1.{dIdx + 1}.{sIdx + 1} {subclass.name}
                          </div>
                          <div className="text-[9px] font-mono-archive opacity-80">{subclass.latinName}</div>
                        </div>

                        {/* Object leaves */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
                          {subclass.children?.map((obj) => (
                            <div
                              key={obj.id}
                              className={`p-1 rounded-xs cursor-pointer transition-colors text-[10px] font-mono-archive ${
                                selectedNode.id === obj.id
                                  ? 'bg-[#1e3a5f] text-[#fff]'
                                  : 'bg-[#fcfaf6] hover:bg-[#f0e6d5] border border-[#e5dac9]'
                              }`}
                              onClick={() => handleNodeClick(obj)}
                            >
                              ★ {obj.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'linear' && (
            <div className="p-2 space-y-2 text-xs font-eb max-h-[460px] overflow-y-auto">
              <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-1">
                Strict Evolutionary Succession (From Cosmos to Leaves)
              </div>

              {[
                { rank: '1. Universe', latin: 'Universum Primordiale', desc: 'Cosmic Singularity & Dark Energy Continuum (~13.8 Ga)' },
                { rank: '2. Domains', latin: 'Divisio Macrocosmica', desc: 'Exoplanets, Stars, Nebulae, Galaxies, Space Missions' },
                { rank: '3. Subclasses', latin: 'Ordo Morphologicus', desc: 'Terrestrial worlds, Jovian giants, H-II nurseries, Spiral disks, Flagships' },
                { rank: '4. Specimen Objects', latin: 'Species et Specimina', desc: 'Kepler-186f, TRAPPIST-1e, Betelgeuse, Orion M-42, JWST, Milky Way' },
              ].map((item, i) => (
                <div key={i} className="p-2.5 bg-[#f6eee0] rounded-xs border border-[#dbceba] flex items-center justify-between">
                  <div>
                    <div className="font-cinzel font-bold text-[#1e3a5f]">{item.rank}</div>
                    <div className="text-[11px] italic font-cormorant text-[#6b5d49]">{item.latin}</div>
                    <div className="text-[11px] text-[#443828] mt-0.5">{item.desc}</div>
                  </div>
                  <span className="font-mono-archive text-[10px] bg-[#e6dac4] px-2 py-0.5 rounded-xs text-[#55493a]">
                    LEVEL {i + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Diagram Footer Controls */}
          <div className="mt-3 pt-2 border-t border-[#dfd5c3] flex flex-wrap items-center justify-between text-[11px] font-mono-archive text-[#6e5f4c] gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#8c6d31]">NAV CONTROLS:</span>
              <span>Scroll wheel zoom · Drag to pan · Radar minimap · D-Pad</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleFocusSelectedNode}
                className="text-[#8c6d31] hover:underline flex items-center gap-1 font-bold"
              >
                <Crosshair className="w-3 h-3" /> Focus Node
              </button>
              <span className="text-[#d6c7b2]">·</span>
              <button
                onClick={handleResetZoom}
                className="text-[#1e3a5f] hover:underline flex items-center gap-1 font-bold"
              >
                <RefreshCw className="w-3 h-3" /> Reset View
              </button>
            </div>
          </div>
        </div>

        {/* Right Node Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 bg-[#f6f0e4] p-4 rounded-xs border border-[#c9bda8] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#dfd5c3] pb-2">
            <span className="text-[10px] font-mono-archive font-bold text-[#8c6d31] uppercase">
              Taxon Cladistic Inspector
            </span>
            <span className="text-[9px] bg-[#1e3a5f] text-[#fbf8f1] px-2 py-0.5 rounded-xs font-mono-archive uppercase font-bold tracking-wider">
              {selectedNode.level}
            </span>
          </div>

          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-cinzel font-bold text-[#1f2c3d]">
                {selectedNode.name}
              </h3>
              <button
                onClick={handleFocusSelectedNode}
                title="Center & Zoom on this node in Dendrogram"
                className="px-1.5 py-0.5 bg-[#ede2d1] hover:bg-[#1e3a5f] hover:text-[#fff] text-[#1e3a5f] rounded-xs border border-[#cfc3af] text-[10px] font-mono-archive flex items-center gap-1 transition-colors shrink-0"
              >
                <Crosshair className="w-3 h-3" /> Focus
              </button>
            </div>
            <div className="text-xs italic font-cormorant text-[#7a6a55] mt-0.5">
              {selectedNode.latinName}
            </div>
          </div>

          {/* Evolutionary Lineage Trail Breadcrumb */}
          <div className="bg-[#eee5d3] p-2 rounded-xs border border-[#d6c7b2] text-[10px] font-mono-archive text-[#6e5e4b] space-y-0.5">
            <div className="text-[9px] uppercase font-bold text-[#8c6d31]">Lineage Path:</div>
            <div className="text-[#1e3a5f] font-semibold break-words flex flex-wrap items-center gap-1">
              {lineageBreadcrumb.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span>{item}</span>
                  {idx < lineageBreadcrumb.length - 1 && <span className="text-[#9e8e78]">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* APG IV Botanical Analog Note */}
          {selectedNode.apgAnalog && (
            <div className="bg-[#f0e7d7] p-2.5 rounded-xs border border-[#d6c7b2] text-xs font-eb">
              <div className="text-[10px] font-mono-archive font-bold text-[#8c6d31] uppercase mb-0.5 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#8c6d31]" />
                APG IV Botanical Clade Analog
              </div>
              <p className="text-[#3c3429] italic leading-relaxed">
                {selectedNode.apgAnalog}
              </p>
            </div>
          )}

          {/* Detailed Scientific Description */}
          <div className="bg-[#fdfaf5] p-3 rounded-xs border border-[#dfd5c3] text-xs font-eb leading-relaxed text-[#352c22]">
            {selectedNode.description}
          </div>

          {/* Scientific Metadata Key-Values if available */}
          {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
            <div className="bg-[#fdfaf5] p-2.5 rounded-xs border border-[#dfd5c3] text-xs font-mono-archive space-y-1">
              <div className="text-[9px] uppercase font-bold text-[#8c6d31] mb-1">
                Cladistic Parameters & Coordinates
              </div>
              {selectedNode.metadata.distance && (
                <div className="flex justify-between border-b border-[#f0e7d7] pb-0.5">
                  <span className="text-[#7a6a55]">Distance:</span>
                  <span className="font-bold text-[#1f2c3d]">{selectedNode.metadata.distance}</span>
                </div>
              )}
              {selectedNode.metadata.spectralType && (
                <div className="flex justify-between border-b border-[#f0e7d7] pb-0.5">
                  <span className="text-[#7a6a55]">Spectral Class:</span>
                  <span className="font-bold text-[#1f2c3d]">{selectedNode.metadata.spectralType}</span>
                </div>
              )}
              {selectedNode.metadata.temperature && (
                <div className="flex justify-between border-b border-[#f0e7d7] pb-0.5">
                  <span className="text-[#7a6a55]">Temperature:</span>
                  <span className="font-bold text-[#1f2c3d]">{selectedNode.metadata.temperature}</span>
                </div>
              )}
              {selectedNode.metadata.epoch && (
                <div className="flex justify-between border-b border-[#f0e7d7] pb-0.5">
                  <span className="text-[#7a6a55]">Epoch / Era:</span>
                  <span className="font-bold text-[#1f2c3d]">{selectedNode.metadata.epoch}</span>
                </div>
              )}
              {selectedNode.metadata.subClade && (
                <div className="flex justify-between border-b border-[#f0e7d7] pb-0.5">
                  <span className="text-[#7a6a55]">Sub-Clade:</span>
                  <span className="font-bold text-[#1f2c3d]">{selectedNode.metadata.subClade}</span>
                </div>
              )}
              {selectedNode.metadata.discovery && (
                <div className="flex justify-between">
                  <span className="text-[#7a6a55]">Discovery / Launch:</span>
                  <span className="font-bold text-[#1f2c3d]">{selectedNode.metadata.discovery}</span>
                </div>
              )}
            </div>
          )}

          {/* Sample Specimens in this Clade */}
          {selectedNode.sampleObjects && selectedNode.sampleObjects.length > 0 && (
            <div className="bg-[#f2e8d9] p-2.5 rounded-xs border border-[#d8ccb9] text-xs">
              <div className="text-[10px] font-mono-archive font-bold text-[#1e3a5f] uppercase mb-1.5">
                Key Catalog Specimens in Clade:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.sampleObjects.map((specimen, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectCandidateByName && onSelectCandidateByName(specimen)}
                    className="px-2 py-0.5 bg-[#fdfbf7] hover:bg-[#1e3a5f] hover:text-[#fbf8f1] border border-[#cfc2ad] rounded-xs font-mono-archive text-[10px] text-[#3d3224] transition-colors"
                  >
                    {specimen} →
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Child Sub-nodes Quick Navigator */}
          {selectedNode.children && selectedNode.children.length > 0 && (
            <div className="bg-[#f2e8d9] p-2.5 rounded-xs border border-[#d8ccb9] text-xs">
              <div className="text-[10px] font-mono-archive font-bold text-[#8c6d31] uppercase mb-1.5">
                Sub-Branches ({selectedNode.children.length}):
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedNode.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      handleNodeClick(child);
                      // Center viewport on clicked child
                      const cNode = nodes.find((n) => n.node.id === child.id);
                      if (cNode) {
                        setPan({ x: -cNode.x * 1.3, y: -cNode.y * 1.3 });
                      }
                    }}
                    className="px-2 py-0.5 bg-[#fbf8f1] hover:bg-[#1e3a5f] hover:text-[#fff] text-[10px] rounded-xs border border-[#d6c7b2] font-mono-archive transition-colors text-left"
                  >
                    {child.name.split(' (')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


