import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Search,
  MapPin,
  Maximize2,
  X,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Filter,
  Phone,
  Mail,
  Building,
  Shield,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  MousePointer,
  Grid,
  Layers,
  Heart,
  ArrowRight,
  RefreshCw,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import {
  DraggableCardBody,
  DraggableCardContainer,
} from '@/components/ui/draggable-card';
import { Button } from '@/components/ui/button';
import {
  allGalleryItems as coimbatoreGalleryItems,
  gallerySheets as coimbatoreGallerySheets,
  tiruppurGalleryItems,
  tiruppurGallerySheets,
  tiruppurSheetTabs,
  tiruppurDraggableSets,
  SchoolGalleryItem,
} from '@/data/galleryData';

// Coimbatore Standout Draggable Sets
const coimbatoreDraggableSets = {
  allStars: [
    {
      id: 'chss-rathinapuri',
      title: 'CHSS Rathinapuri',
      location: 'Rathinapuri, Coimbatore',
      image: '/images/gallery/cards/chss-rathinapuri_photo.jpg',
      className: 'absolute top-6 left-[6%] md:left-[10%] rotate-[-5deg]',
      tag: 'Sheet 1 • Central',
    },
    {
      id: 'cbhss-rspuram',
      title: 'CBHSS RS Puram',
      location: 'RS Puram, Coimbatore',
      image: '/images/gallery/cards/cbhss-rspuram_photo.jpg',
      className: 'absolute top-28 left-[22%] md:left-[26%] rotate-[7deg]',
      tag: 'Sheet 2 • West',
    },
    {
      id: 'ghss-kalapatti',
      title: 'GHSS Kalapatti',
      location: 'Kalapatti, Coimbatore',
      image: '/images/gallery/cards/ghss-kalapatti_photo.jpg',
      className: 'absolute top-8 left-[42%] md:left-[44%] rotate-[-4deg]',
      tag: 'Sheet 3 • North East',
    },
    {
      id: 'cghss-oppanakara',
      title: 'CGHSS Oppanakara St',
      location: 'Oppanakara St, Coimbatore',
      image: '/images/gallery/cards/cghss-oppanakara_photo.jpg',
      className: 'absolute top-32 right-[22%] md:right-[26%] rotate-[8deg]',
      tag: 'Sheet 2 • City',
    },
    {
      id: 'ghss-karamadai',
      title: 'GHSS Karamadai',
      location: 'Karamadai, Coimbatore',
      image: '/images/gallery/cards/ghss-karamadai_photo.jpg',
      className: 'absolute top-10 right-[5%] md:right-[8%] rotate-[-7deg]',
      tag: 'Sheet 4 • North',
    },
    {
      id: 'ghss-kuniyamuthur',
      title: 'GHSS Kuniyamuthur',
      location: 'Kuniyamuthur, Coimbatore',
      image: '/images/gallery/cards/ghss-kuniyamuthur_photo.jpg',
      className: 'absolute bottom-8 left-[14%] md:left-[18%] rotate-[6deg]',
      tag: 'Sheet 3 • South',
    },
    {
      id: 'ghss-mettupalayam',
      title: 'GHSS Mettupalayam',
      location: 'Mettupalayam, Coimbatore',
      image: '/images/gallery/cards/ghss-mettupalayam_photo.jpg',
      className: 'absolute bottom-12 right-[36%] md:right-[38%] rotate-[-5deg]',
      tag: 'Sheet 4 • Hills Cluster',
    },
    {
      id: 'gghss-chinnathadagam',
      title: 'GGHSS Chinnathadagam',
      location: 'Chinnathadagam, Coimbatore',
      image: '/images/gallery/cards/gghss-chinnathadagam_photo.jpg',
      className: 'absolute bottom-8 right-[10%] md:right-[14%] rotate-[8deg]',
      tag: 'Sheet 5 • Thadagam Valley',
    },
  ],
  urbanCity: [
    {
      id: 'chss-rathinapuri',
      title: 'CHSS Rathinapuri',
      location: 'Rathinapuri, Coimbatore',
      image: '/images/gallery/cards/chss-rathinapuri_photo.jpg',
      className: 'absolute top-6 left-[8%] md:left-[12%] rotate-[-6deg]',
      tag: 'Career Guidance',
    },
    {
      id: 'chss-venkitapuram',
      title: 'CHSS Venkitapuram',
      location: 'Venkitapuram, Coimbatore',
      image: '/images/gallery/cards/chss-venkitapuram_photo.jpg',
      className: 'absolute top-28 left-[24%] md:left-[28%] rotate-[8deg]',
      tag: 'Higher Education',
    },
    {
      id: 'chss-selvapuram',
      title: 'CHSS Selvapuram',
      location: 'Selvapuram, Coimbatore',
      image: '/images/gallery/cards/chss-selvapuram_photo.jpg',
      className: 'absolute top-8 left-[44%] md:left-[46%] rotate-[-5deg]',
      tag: 'Soft Skills',
    },
    {
      id: 'chss-ramanathapuram',
      title: 'CHSS Ramanathapuram',
      location: 'Ramanathapuram, Coimbatore',
      image: '/images/gallery/cards/chss-ramanathapuram_photo.jpg',
      className: 'absolute top-32 right-[22%] md:right-[24%] rotate-[7deg]',
      tag: 'Career Guidance',
    },
    {
      id: 'chss-vadakovai',
      title: 'CHSS Vadakovai',
      location: 'Vadakovai, Coimbatore',
      image: '/images/gallery/cards/chss-vadakovai_photo.jpg',
      className: 'absolute top-10 right-[6%] md:right-[8%] rotate-[-8deg]',
      tag: 'Mentorship',
    },
    {
      id: 'cghss-ranganathapuram',
      title: 'CGHSS Ranganathapuram',
      location: 'Ranganathapuram, Coimbatore',
      image: '/images/gallery/cards/cghss-ranganathapuram_photo.jpg',
      className: 'absolute bottom-8 left-[16%] md:left-[20%] rotate-[5deg]',
      tag: 'Girls Motivation',
    },
    {
      id: 'chss-siddhapudur',
      title: 'CHSS Siddhapudur',
      location: 'Siddhapudur, Coimbatore',
      image: '/images/gallery/cards/chss-siddhapudur_photo.jpg',
      className: 'absolute bottom-10 right-[12%] md:right-[16%] rotate-[-6deg]',
      tag: 'Tech Careers',
    },
  ],
  northSouth: [
    {
      id: 'ghss-karamadai',
      title: 'GHSS Karamadai',
      location: 'Karamadai, Coimbatore',
      image: '/images/gallery/cards/ghss-karamadai_photo.jpg',
      className: 'absolute top-6 left-[8%] md:left-[12%] rotate-[-5deg]',
      tag: 'Tech Careers',
    },
    {
      id: 'ghss-mettupalayam',
      title: 'GHSS Mettupalayam',
      location: 'Mettupalayam, Coimbatore',
      image: '/images/gallery/cards/ghss-mettupalayam_photo.jpg',
      className: 'absolute top-28 left-[25%] md:left-[28%] rotate-[7deg]',
      tag: 'Youth Leadership',
    },
    {
      id: 'ghss-velliangadu',
      title: 'GHSS Velliangadu',
      location: 'Velliangadu, Coimbatore',
      image: '/images/gallery/cards/ghss-velliangadu_photo.jpg',
      className: 'absolute top-8 left-[44%] md:left-[46%] rotate-[-4deg]',
      tag: 'Rural Guidance',
    },
    {
      id: 'ghss-irugur',
      title: 'GHSS Irugur',
      location: 'Irugur, Coimbatore',
      image: '/images/gallery/cards/ghss-irugur_photo.jpg',
      className: 'absolute top-32 right-[22%] md:right-[24%] rotate-[9deg]',
      tag: 'Volunteer Force',
    },
    {
      id: 'ghss-othakkalmandapam',
      title: 'GHSS Othakkalmandapam',
      location: 'Othakkalmandapam, Coimbatore',
      image: '/images/gallery/cards/ghss-othakkalmandapam_photo.jpg',
      className: 'absolute top-10 right-[6%] md:right-[8%] rotate-[-7deg]',
      tag: 'Cut-off Analysis',
    },
    {
      id: 'ghss-chettipalayam',
      title: 'GHSS Chettipalayam',
      location: 'Chettipalayam, Coimbatore',
      image: '/images/gallery/cards/ghss-chettipalayam_photo.jpg',
      className: 'absolute bottom-8 left-[16%] md:left-[20%] rotate-[6deg]',
      tag: 'Delicate Ability',
    },
    {
      id: 'gbhss-chinnathadagam',
      title: 'GBHSS Chinnathadagam',
      location: 'Chinnathadagam, Coimbatore',
      image: '/images/gallery/cards/gbhss-chinnathadagam_photo.jpg',
      className: 'absolute bottom-10 right-[12%] md:right-[16%] rotate-[-6deg]',
      tag: 'Career Readiness',
    },
  ],
};

const categoryTabs = [
  'All Categories',
  'Career Guidance',
  'Higher Education',
  'Soft Skills',
  'Govt School Quota',
];

const coimbatoreSheetTabs = [
  { id: 0, label: 'All 45 Schools' },
  { id: 1, label: 'Sheet 1: Urban & Central (9)' },
  { id: 2, label: 'Sheet 2: RS Puram & South (9)' },
  { id: 3, label: 'Sheet 3: Kuniyamuthur & Rural (9)' },
  { id: 4, label: 'Sheet 4: Karamadai & North (9)' },
  { id: 5, label: 'Sheet 5: Thadagam & Peripheries (9)' },
];

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const districtParam = searchParams.get('district')?.toLowerCase();

  // Selected district: defaults to Tiruppur as requested, switchable to Coimbatore
  const [selectedDistrict, setSelectedDistrict] = useState<'tiruppur' | 'coimbatore'>(
    districtParam === 'coimbatore' ? 'coimbatore' : 'tiruppur'
  );

  useEffect(() => {
    if (districtParam === 'coimbatore' || districtParam === 'tiruppur') {
      setSelectedDistrict(districtParam);
    }
  }, [districtParam]);

  const handleDistrictChange = (dist: 'tiruppur' | 'coimbatore') => {
    setSelectedDistrict(dist);
    setSearchParams({ district: dist });
    setSelectedSheet(0);
    setSearchQuery('');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSheet, setSelectedSheet] = useState(0);
  const [viewMode, setViewMode] = useState<'cards' | 'sheets'>('cards');
  const [activeDraggableSet, setActiveDraggableSet] = useState<'allStars' | 'urbanCity' | 'ruralClusters' | 'northSouth'>('allStars');
  const [selectedItem, setSelectedItem] = useState<SchoolGalleryItem | null>(null);
  const [selectedSheetModal, setSelectedSheetModal] = useState<number | null>(null);

  // Active district data
  const isTiruppur = selectedDistrict === 'tiruppur';
  const activeItems = isTiruppur ? tiruppurGalleryItems : coimbatoreGalleryItems;
  const activeSheets = isTiruppur ? tiruppurGallerySheets : coimbatoreGallerySheets;
  const activeSheetTabs = isTiruppur ? tiruppurSheetTabs : coimbatoreSheetTabs;

  // Draggable items resolution
  const draggableItems = useMemo(() => {
    if (isTiruppur) {
      if (activeDraggableSet === 'urbanCity') return tiruppurDraggableSets.urbanCity;
      if (activeDraggableSet === 'ruralClusters' || activeDraggableSet === 'northSouth') {
        return tiruppurDraggableSets.ruralClusters;
      }
      return tiruppurDraggableSets.allStars;
    } else {
      if (activeDraggableSet === 'urbanCity') return coimbatoreDraggableSets.urbanCity;
      if (activeDraggableSet === 'northSouth' || activeDraggableSet === 'ruralClusters') {
        return coimbatoreDraggableSets.northSouth;
      }
      return coimbatoreDraggableSets.allStars;
    }
  }, [isTiruppur, activeDraggableSet]);

  // Filtered gallery items
  const filteredItems = useMemo(() => {
    return activeItems.filter((item) => {
      // Search matching
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highlight.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Category filter
      if (
        selectedCategory !== 'All Categories' &&
        item.category !== selectedCategory
      ) {
        return false;
      }

      // Sheet filter
      if (selectedSheet !== 0 && item.sheet !== selectedSheet) {
        return false;
      }

      return true;
    });
  }, [activeItems, searchQuery, selectedCategory, selectedSheet]);

  // Navigate lightbox modal
  const handleNextPhoto = () => {
    if (!selectedItem) return;
    const currentIndex = activeItems.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % activeItems.length;
    setSelectedItem(activeItems[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedItem) return;
    const currentIndex = activeItems.findIndex((i) => i.id === selectedItem.id);
    const prevIndex =
      (currentIndex - 1 + activeItems.length) % activeItems.length;
    setSelectedItem(activeItems[prevIndex]);
  };

  const sheetModalImagePath = isTiruppur
    ? `/images/gallery/tiruppur/sheet_page_${selectedSheetModal}.jpg`
    : `/images/gallery/sheet_page_${selectedSheetModal}.jpg`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb Strip */}
      <div className="bg-slate-900 border-b border-slate-800 text-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-500">/</span>
            <span className="text-amber-400 font-semibold">Gallery</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">
              {isTiruppur ? 'Tiruppur Field Documentation' : 'Coimbatore Field Documentation'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {isTiruppur ? '70 Tiruppur Schools Documented' : '45 Coimbatore Schools Documented'}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-6">
          {/* District Selector Pill Bar */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md">
              <button
                onClick={() => handleDistrictChange('tiruppur')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  isTiruppur
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg scale-102'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <MapPin className={`w-4 h-4 ${isTiruppur ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>Tiruppur District</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isTiruppur ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  70 Schools • 8 Sheets
                </span>
              </button>

              <button
                onClick={() => handleDistrictChange('coimbatore')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  !isTiruppur
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg scale-102'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <MapPin className={`w-4 h-4 ${!isTiruppur ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>Coimbatore District</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    !isTiruppur ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  45 Schools • 5 Sheets
                </span>
              </button>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            GSG Trust Field Impact • {isTiruppur ? 'Tiruppur Textile Belt & Rural Hub' : 'Coimbatore Headquarters & Urban Hub'}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {isTiruppur ? 'Tiruppur' : 'Coimbatore'} Field Documentation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
              Gallery
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isTiruppur ? (
              <>
                Authentic on-ground documentation photos from <strong>70 Government & Corporation Higher Secondary Schools</strong> across Tiruppur. Real career counselling, delicate ability training, and 7.5% quota awareness drives.
              </>
            ) : (
              <>
                Authentic on-ground documentation photos from <strong>45+ Government & Corporation Higher Secondary Schools</strong> across Coimbatore. Real career counselling, delicate ability training, and 7.5% quota awareness drives.
              </>
            )}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300">
            <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" /> {isTiruppur ? '70 Documented Schools' : '45 Documented Schools'}
            </span>
            <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> {isTiruppur ? '15,000+ Students Reached' : '45,000+ Students Reached'}
            </span>
            <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" /> {isTiruppur ? '8 Verified Field Sheets' : '5 Verified Field Sheets'}
            </span>
            <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Free Guidance Since 2013
            </span>
          </div>
        </div>
      </section>

      {/* 1. INTERACTIVE DRAGGABLE CARDS ANIMATION CANVAS */}
      <section className="py-12 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="container mx-auto px-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-3.5 py-1 text-xs text-amber-400 font-semibold mb-1 shadow-inner">
                <MousePointer className="w-3.5 h-3.5 animate-bounce" />
                Interactive Draggable Stage
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Touch, Drag & Explore {isTiruppur ? 'Tiruppur' : 'Coimbatore'} School Sessions
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Freely toss and rearrange authentic photo cards from GSG Trust field guidance camps.
              </p>
            </div>

            {/* Set Switchers */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-2xl">
              <button
                onClick={() => setActiveDraggableSet('allStars')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeDraggableSet === 'allStars'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All-Stars (8)
              </button>
              <button
                onClick={() => setActiveDraggableSet('urbanCity')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeDraggableSet === 'urbanCity'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                City Schools
              </button>
              <button
                onClick={() =>
                  setActiveDraggableSet(isTiruppur ? 'ruralClusters' : 'northSouth')
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeDraggableSet === 'ruralClusters' || activeDraggableSet === 'northSouth'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isTiruppur ? 'Rural Clusters' : 'North & South'}
              </button>
            </div>
          </div>
        </div>

        {/* Draggable Card Canvas */}
        <div className="max-w-7xl mx-auto px-4">
          <DraggableCardContainer className="relative h-[560px] sm:h-[640px] w-full rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-800 shadow-2xl p-4 flex items-center justify-center overflow-hidden">
            {/* Ambient Background Text & Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="pointer-events-none absolute text-center z-0 max-w-lg px-4 select-none">
              <p className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight">
                GET SET GO TRUST
              </p>
              <p className="text-xs sm:text-sm font-bold text-amber-500/50 uppercase tracking-widest mt-2">
                Field Documentation Photos • {isTiruppur ? 'Tiruppur' : 'Coimbatore'}
              </p>
              <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
                If it&apos;s your first day with GSG Trust, you empower a student&apos;s future.
              </p>
            </div>

            {/* Draggable Cards */}
            {draggableItems.map((item) => (
              <DraggableCardBody
                key={item.id}
                className={item.className}
                onClick={() => {
                  const found = activeItems.find((g) => g.id === item.id);
                  if (found) setSelectedItem(found);
                }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white p-2 shadow-2xl border border-slate-700/60 w-52 sm:w-60">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 mb-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="pointer-events-none w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-md shadow">
                      {item.tag}
                    </span>
                  </div>
                  <div className="px-1 py-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-amber-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                </div>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-2">
            <span className="flex items-center gap-1.5">
              <MousePointer className="w-3.5 h-3.5 text-amber-400" />
              Tip: Drag and throw cards across the board. Click any card to zoom in.
            </span>
            <span className="hidden sm:inline text-slate-500">
              {activeItems.length} Schools across {activeSheets.length} Documentation Sheets
            </span>
          </div>
        </div>
      </section>

      {/* 2. COMPLETE SCHOOL DIRECTORY & SHEET BROWSER */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Field Documentation Archive • {isTiruppur ? 'Tiruppur District' : 'Coimbatore District'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Browse All {activeItems.length} {isTiruppur ? 'Tiruppur' : 'Coimbatore'} Schools
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
                Every photograph represents an authentic career guidance camp conducted in {isTiruppur ? 'Tiruppur' : 'Coimbatore'} government & corporation higher secondary schools.
              </p>
            </div>

            {/* View Mode & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* View Switcher */}
              <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm w-full sm:w-auto">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-initial ${
                    viewMode === 'cards'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" /> Photo Cards ({activeItems.length})
                </button>
                <button
                  onClick={() => setViewMode('sheets')}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-initial ${
                    viewMode === 'sheets'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Full Sheets ({activeSheets.length})
                </button>
              </div>

              {/* Search Bar */}
              <div className="w-full sm:w-64 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search school / area..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          {viewMode === 'cards' && (
            <div className="space-y-3 mb-8">
              {/* Sheet Selection Pills */}
              <div className="flex flex-wrap gap-2">
                {activeSheetTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedSheet(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedSheet === tab.id
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Category:
                </span>
                {categoryTabs.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CARDS VIEW */}
          {viewMode === 'cards' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                  >
                    {/* Photo Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={item.photoUrl}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950 text-amber-300 font-bold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>Sheet {item.sheet}</span>
                      </div>

                      <div className="absolute top-3 right-3 bg-white text-slate-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-slate-200">
                        {item.category}
                      </div>

                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-slate-900 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" /> View Photo
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-amber-600 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Building className="w-3.5 h-3.5 text-slate-400" /> {item.location}
                        </p>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 italic">
                          &ldquo;{item.highlight}&rdquo;
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                          {item.studentsCount}
                        </span>
                        <span className="text-slate-400 font-medium">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
                  <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <h4 className="font-bold text-slate-900 text-lg mb-1">
                    No Schools Found
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    No schools matching &ldquo;{searchQuery}&rdquo;. Try another school name or reset your filters.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Categories');
                      setSelectedSheet(0);
                    }}
                    className="text-xs"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* SHEETS VIEW */}
          {viewMode === 'sheets' && (
            <div className="space-y-12">
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-amber-950 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                    Official GSG Trust Documentation Sheets (PDF Format) • {isTiruppur ? 'Tiruppur' : 'Coimbatore'}
                  </h3>
                  <p className="text-xs text-amber-800 max-w-2xl">
                    These {activeSheets.length} official field sheets contain the complete {activeItems.length}-school matrix verified by GSG Trust coordinators across {isTiruppur ? 'Tiruppur' : 'Coimbatore'} higher secondary schools.
                  </p>
                </div>
                <span className="text-xs font-bold bg-amber-200/80 px-3 py-1.5 rounded-xl">
                  {activeSheets.length} Sheets • {activeItems.length} School Camps
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeSheets.map((sheet) => (
                  <div
                    key={sheet.id}
                    onClick={() => setSelectedSheetModal(sheet.sheetNumber)}
                    className="group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl hover:border-amber-400 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                      <img
                        src={sheet.image}
                        alt={sheet.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                          <Eye className="w-4 h-4" /> View Full Sheet {sheet.sheetNumber}
                        </span>
                      </div>
                      <div className="absolute top-3 left-3 bg-slate-950/90 text-amber-400 text-xs font-black px-3 py-1 rounded-full shadow">
                        SHEET {sheet.sheetNumber} OF {activeSheets.length}
                      </div>
                    </div>

                    <div className="p-5 border-t border-slate-100">
                      <h4 className="font-extrabold text-slate-900 text-base mb-1 group-hover:text-amber-600 transition-colors">
                        {sheet.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {sheet.schoolsCovered} Government Schools Documented
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. LIGHTBOX / ZOOM MODAL FOR INDIVIDUAL SCHOOL PHOTO */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl animate-fadeIn max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                  GSG
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base sm:text-lg">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs text-amber-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedItem.location}, {selectedItem.district}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">Sheet {selectedItem.sheet}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPhoto}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                  title="Next Photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors ml-2"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Photo */}
            <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-center overflow-hidden flex-1 max-h-[60vh]">
              <img
                src={selectedItem.photoUrl}
                alt={selectedItem.name}
                className="max-h-[55vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                    {selectedItem.studentsCount}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Category: <strong className="text-slate-800">{selectedItem.category}</strong>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {selectedItem.highlight}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  to="/counselling"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs flex-1 sm:flex-initial shadow-md"
                >
                  Schedule School Session <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. LIGHTBOX / MODAL FOR FULL 3x3 SHEET */}
      {selectedSheetModal !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4"
          onClick={() => setSelectedSheetModal(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl animate-fadeIn max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs">
                  GSG
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    Official Field Documentation — Sheet {selectedSheetModal} of {activeSheets.length}
                  </h3>
                  <p className="text-xs text-amber-400">
                    Field Impact Documentation Photos • {isTiruppur ? 'Tiruppur District' : 'Coimbatore District'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSheetModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-100 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={sheetModalImagePath}
                alt={`Official Field Documentation Sheet ${selectedSheetModal}`}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Verified Field Report • GSG Trust {isTiruppur ? 'Tiruppur Hub' : 'Coimbatore Hub'}</span>
              </div>
              <a
                href={sheetModalImagePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 font-bold hover:underline flex items-center gap-1"
              >
                Open Full Resolution <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. START A PROJECT & STATUTORY COMPLIANCE FOOTER BLOCK */}
      <section className="bg-slate-950 text-white py-16 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Start a Project */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl font-black text-white">Start a Project</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/scholarships/apply"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  <GraduationCap className="w-4 h-4" /> Apply for Scholarship
                </Link>
                <Link
                  to="/counselling"
                  className="border border-slate-700 hover:bg-slate-800 text-slate-200 px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  Book Free Counselling
                </Link>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-2 max-w-md">
                Empowering Tamil Nadu students through free career guidance, verified college information, and direct scholarships since 2013.
              </p>

              {/* Contact lines */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <a
                  href="tel:+919789340230"
                  className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-bold">+91-97893 40230</span>
                </a>
                <a
                  href="https://wa.me/919789340230?text=Hello%20GSG%20Trust,%20I%20am%20enquiring%20about%20school%20career%20guidance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="mailto:gsgtrustcbe@gmail.com"
                  className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>gsgtrustcbe@gmail.com</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Natesa+Gounder+St,+Lakshmipuram,+Rathinapuri,+Ganapathy,+Coimbatore,+Tamil+Nadu+641027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-amber-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027</span>
                </a>
              </div>

              {/* Statutory Compliance Box */}
              <div className="pt-3 border-t border-slate-800">
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Statutory Compliance
                </p>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  12AB Registered · 80G: AAETG361M/2025/1/1/2<br />
                  CSR-1: CSR001963 · PAN: AATG361M
                </p>
              </div>
            </div>

            {/* Col 2: Organisation */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                Organisation
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>
                  <Link to="/about" className="hover:text-amber-400 transition-colors">
                    About GSG Trust
                  </Link>
                </li>
                <li>
                  <Link to="/about/mission-vision" className="hover:text-amber-400 transition-colors">
                    Mission &amp; Vision
                  </Link>
                </li>
                <li>
                  <Link to="/about/leadership" className="hover:text-amber-400 transition-colors">
                    Leadership &amp; Trustees
                  </Link>
                </li>
                <li>
                  <Link to="/about/impact" className="hover:text-amber-400 transition-colors">
                    Impact Metrics
                  </Link>
                </li>
                <li>
                  <Link to="/volunteers" className="hover:text-amber-400 transition-colors">
                    Volunteer Force
                  </Link>
                </li>
                <li>
                  <Link to="/testimonials" className="hover:text-amber-400 transition-colors">
                    Student Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Programs & Education */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                Education &amp; Drives
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>
                  <Link to="/education/tiruppur" className="hover:text-amber-400 transition-colors font-medium text-amber-300">
                    Tiruppur Education Hub (70 Schools)
                  </Link>
                </li>
                <li>
                  <Link to="/education/coimbatore" className="hover:text-amber-400 transition-colors">
                    Coimbatore Education Hub
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="hover:text-amber-400 transition-colors">
                    6 Core Pillars
                  </Link>
                </li>
                <li>
                  <Link to="/scholarships" className="hover:text-amber-400 transition-colors">
                    Scholarships &amp; Aid
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="hover:text-amber-400 transition-colors">
                    Courses &amp; Cut-offs
                  </Link>
                </li>
                <li>
                  <Link to="/colleges" className="hover:text-amber-400 transition-colors">
                    Colleges Directory
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-amber-400 transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
            <p>
              &copy; {new Date().getFullYear()} Get Set Go Educational &amp; Charitable Trust. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/contact" className="hover:text-amber-400 transition-colors">
                Contact
              </Link>
              <span>•</span>
              <Link to="/gallery?district=tiruppur" className="hover:text-amber-400 transition-colors">
                Tiruppur Gallery
              </Link>
              <span>•</span>
              <Link to="/gallery?district=coimbatore" className="hover:text-amber-400 transition-colors">
                Coimbatore Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
