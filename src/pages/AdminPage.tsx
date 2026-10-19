import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSiteConfig } from '../context/ConfigContext';
import { SiteConfig, GalleryImage } from '../config/siteConfig';
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Eye,
  Code,
  Image as ImageIcon,
  Check,
  Copy,
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  Globe,
  Settings
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { config, updateConfig, resetConfig, isCustomized, uploadedImages } = useSiteConfig();
  const navigate = useNavigate();

  // Local draft state so the user can edit before saving
  const [draftConfig, setDraftConfig] = useState<SiteConfig>(config);
  const [activeTab, setActiveTab] = useState<'gallery' | 'landing' | 'preview' | 'export'>('gallery');
  const [previewSubTab, setPreviewSubTab] = useState<'gallery' | 'landing'>('gallery');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activePictureIndex, setActivePictureIndex] = useState<number>(0);

  useEffect(() => {
    if (config) {
      setDraftConfig(config);
    }
  }, [config]);

  const handleSave = () => {
    updateConfig(draftConfig);
    setSaveStatus('Changes saved successfully! Your live website is updated.');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleSaveAndPreview = () => {
    updateConfig(draftConfig);
    navigate('/gallery');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all picture names and settings to their default values?')) {
      resetConfig();
      setSaveStatus('Reset to default values successfully.');
      setTimeout(() => setSaveStatus(null), 3500);
    }
  };

  const updateGalleryImage = (index: number, updates: Partial<GalleryImage>) => {
    const updatedImages = [...(draftConfig.images || [])];
    if (updatedImages[index]) {
      updatedImages[index] = {
        ...updatedImages[index],
        ...updates,
      };
      setDraftConfig({
        ...draftConfig,
        images: updatedImages,
      });
    }
  };

  const selectUploadedImageForGallery = (index: number, imageSrc: string) => {
    updateGalleryImage(index, { imageUrl: imageSrc });
  };

  const selectUploadedImageForSample = (imageSrc: string) => {
    setDraftConfig({
      ...draftConfig,
      sampleImage: imageSrc,
    });
  };

  // Generate clean TypeScript code for export
  const generateExportCode = () => {
    return `// ==============================================================================
// SITE CONFIGURATION (Exported from Admin Panel)
// ==============================================================================
import image1 from '../assets/images/regenerated_image_1792413619865.jpg';
import image2 from '../assets/images/regenerated_image_1792413622421.png';
import image3 from '../assets/images/regenerated_image_1792413629309.jpg';
import image4 from '../assets/images/regenerated_image_1792413630953.jpg';
import image5 from '../assets/images/regenerated_image_1792413633440.jpg';
import image6 from '../assets/images/regenerated_image_1792413643226.jpg';

export const siteConfig = ${JSON.stringify(draftConfig, null, 2)};
`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const currentPicture = draftConfig?.images?.[activePictureIndex] || draftConfig?.images?.[0];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Live Website</span>
              </Link>
            </div>
            <div className="flex items-center gap-2.5 mt-1">
              <Settings className="w-6 h-6 text-slate-800" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Gallery Admin Panel
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Customize pictures and displayed names with live updates. All 6 original uploaded files are preserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Direct Working Preview Button in Header */}
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border shadow-2xs ${
                activeTab === 'preview'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Changes</span>
            </button>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>Open Live Gallery</span>
            </Link>

            {isCustomized && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
                title="Reset all settings to default"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Defaults</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Save Status Notification */}
        {saveStatus && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs sm:text-sm text-emerald-800 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveStatus}</span>
            </div>
            <Link
              to="/gallery"
              className="font-semibold underline underline-offset-2 hover:text-emerald-950"
            >
              View Gallery Now →
            </Link>
          </div>
        )}

        {/* Preserved Uploaded Images Library Strip */}
        <div className="mt-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm font-bold text-slate-900">
                Preserved Uploaded Images (6 Available)
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Safe & stored in project assets
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {uploadedImages.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 text-left"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={img.src}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-2 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-800 truncate">
                    Image #{img.id}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {img.filename.slice(0, 15)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="mt-6 flex items-center gap-1 border-b border-slate-200 pb-px">
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Gallery Pictures (1–6)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('landing')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'landing'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Landing Page Sample</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Interactive Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Export Code</span>
          </button>
        </div>

        {/* Tab Content: Gallery Pictures Editor */}
        {activeTab === 'gallery' && currentPicture && (
          <div className="mt-6 space-y-6">
            
            {/* Quick Picture Selector Ribbon */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {(draftConfig.images || []).map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActivePictureIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                    activePictureIndex === idx
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-500/30 flex items-center justify-center text-[10px]">
                    {img.id}
                  </span>
                  <span>{img.caption || `Picture ${img.id}`}</span>
                </button>
              ))}
            </div>

            {/* Active Picture Detail Form */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Left: Current Image Preview & Preserved Picker */}
                <div className="w-full lg:w-72 shrink-0">
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Picture #{currentPicture.id} Preview
                  </label>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                    <img
                      src={currentPicture.imageUrl}
                      alt={currentPicture.caption || 'Preview'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Quick Pick from Uploaded Images */}
                  <div className="mt-4">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Click to select an uploaded picture:
                    </span>
                    <div className="grid grid-cols-6 gap-1.5">
                      {uploadedImages.map((u) => {
                        const isSelected = currentPicture.imageUrl === u.src;
                        return (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => selectUploadedImageForGallery(activePictureIndex, u.src)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                              isSelected ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                            title={`Select Image #${u.id}`}
                          >
                            <img src={u.src} alt={u.name} className="w-full h-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Editable Fields */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Displayed Name / Caption
                    </label>
                    <input
                      type="text"
                      value={currentPicture.caption || ''}
                      onChange={(e) => updateGalleryImage(activePictureIndex, { caption: e.target.value })}
                      placeholder="e.g., Misty Mountain Vista"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      This label appears directly beneath Picture #{currentPicture.id} in the gallery.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Assigned Destination URL
                    </label>
                    <input
                      type="url"
                      value={currentPicture.destinationUrl}
                      onChange={(e) => updateGalleryImage(activePictureIndex, { destinationUrl: e.target.value })}
                      placeholder="https://example.com/destination"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all font-mono"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Opens in the same browser tab when a visitor clicks this picture.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Custom Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={
                        typeof currentPicture.imageUrl === 'string' &&
                        currentPicture.imageUrl.startsWith('http')
                          ? currentPicture.imageUrl
                          : ''
                      }
                      onChange={(e) => {
                        if (e.target.value) {
                          updateGalleryImage(activePictureIndex, { imageUrl: e.target.value });
                        }
                      }}
                      placeholder="Or paste an external web URL (https://...)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Editing Picture {activePictureIndex + 1} of 6
                    </span>

                    <div className="flex items-center gap-2">
                      {activePictureIndex > 0 && (
                        <button
                          type="button"
                          onClick={() => setActivePictureIndex(activePictureIndex - 1)}
                          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                        >
                          Previous Picture
                        </button>
                      )}
                      {activePictureIndex < 5 && (
                        <button
                          type="button"
                          onClick={() => setActivePictureIndex(activePictureIndex + 1)}
                          className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors font-semibold"
                        >
                          Next Picture →
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* All 6 Pictures Quick Overview Grid */}
            <div className="pt-4">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                All 6 Gallery Pictures Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(draftConfig.images || []).map((img, idx) => (
                  <div
                    key={img.id}
                    onClick={() => setActivePictureIndex(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      activePictureIndex === idx
                        ? 'bg-slate-50 border-slate-900 ring-2 ring-slate-900/10'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-slate-400">#{img.id}</span>
                          <span className="text-xs font-semibold text-slate-900 truncate block">
                            {img.caption || `Picture ${img.id}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
                          {img.destinationUrl}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab Content: Landing Page Sample Image Editor */}
        {activeTab === 'landing' && (
          <div className="mt-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Page 1 Landing Sample Image
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                This image appears in the center of the homepage. By requirement, it is strictly non-clickable and leads to the "View All Pictures" button.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-80 shrink-0">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Current Sample Image Preview
                </label>
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                  <img
                    src={draftConfig.sampleImage}
                    alt={draftConfig.sampleImageCaption || 'Sample Image'}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 1-Click Pick from Preserved Uploaded Images */}
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    Or select any of your 6 uploaded images:
                  </span>
                  <div className="grid grid-cols-6 gap-1.5">
                    {uploadedImages.map((u) => {
                      const isSelected = draftConfig.sampleImage === u.src;
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => selectUploadedImageForSample(u.src)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            isSelected ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                          title={`Use Image #${u.id} as sample`}
                        >
                          <img src={u.src} alt={u.name} className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    Displayed Name / Caption for Sample Image
                  </label>
                  <input
                    type="text"
                    value={draftConfig.sampleImageCaption || ''}
                    onChange={(e) => setDraftConfig({ ...draftConfig, sampleImageCaption: e.target.value })}
                    placeholder="e.g., Featured Landscape Showcase"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    Custom Sample Image Web URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={
                      typeof draftConfig.sampleImage === 'string' && draftConfig.sampleImage.startsWith('http')
                        ? draftConfig.sampleImage
                        : ''
                    }
                    onChange={(e) => {
                      if (e.target.value) {
                        setDraftConfig({ ...draftConfig, sampleImage: e.target.value });
                      }
                    }}
                    placeholder="https://your-domain.com/sample.jpg"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={draftConfig.buttonText}
                    onChange={(e) => setDraftConfig({ ...draftConfig, buttonText: e.target.value })}
                    placeholder="View All Pictures"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    The call-to-action button that navigates from Page 1 to Page 2.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>
                    The sample image container is purely non-clickable to keep visitor focus on the "View All Pictures" button.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Live Interactive Preview */}
        {activeTab === 'preview' && (
          <div className="mt-6 space-y-6">
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Live Preview (Interactive)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    See exactly how your changes appear on the live website before applying.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setPreviewSubTab('gallery')}
                      className={`px-3 py-1.5 rounded-md transition-colors ${
                        previewSubTab === 'gallery'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Gallery (Page 2)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewSubTab('landing')}
                      className={`px-3 py-1.5 rounded-md transition-colors ${
                        previewSubTab === 'landing'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Landing (Page 1)
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveAndPreview}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
                  >
                    <span>Save & Open Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Preview SubTab: Gallery */}
              {previewSubTab === 'gallery' && (
                <div>
                  <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
                    <span>Previewing 6 Pictures · 2 Columns Mobile, 3 Columns Desktop</span>
                    <span className="font-mono text-slate-400">Target: Same browser tab</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
                    {(draftConfig.images || []).map((img) => (
                      <div
                        key={img.id}
                        className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200"
                      >
                        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                          <img
                            src={img.imageUrl}
                            alt={img.caption || `Picture ${img.id}`}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold rounded-md">
                            #{img.id}
                          </div>
                        </div>
                        <div className="p-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                              {img.caption || `Picture ${img.id}`}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
                              {img.destinationUrl}
                            </p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview SubTab: Landing */}
              {previewSubTab === 'landing' && (
                <div className="max-w-2xl mx-auto py-6 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    {draftConfig.title}
                  </h2>
                  {draftConfig.tagline && (
                    <p className="text-sm text-slate-600 mb-6">
                      {draftConfig.tagline}
                    </p>
                  )}

                  <div className="rounded-2xl border border-slate-200 p-2 bg-slate-50 mb-6">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-200">
                      <img
                        src={draftConfig.sampleImage}
                        alt="Sample Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {draftConfig.sampleImageCaption && (
                      <p className="text-xs text-slate-500 mt-2">
                        {draftConfig.sampleImageCaption}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPreviewSubTab('gallery')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <span>{draftConfig.buttonText}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab Content: Export Code */}
        {activeTab === 'export' && (
          <div className="mt-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Export Configuration Code
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  If you want to bake your changes permanently into the source code for static deployment, copy this snippet.
                </p>
              </div>

              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs overflow-x-auto font-mono max-h-96">
                {generateExportCode()}
              </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
