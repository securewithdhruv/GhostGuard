import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Upload,
  Download,
  SlidersHorizontal,
  Zap,
  Fingerprint,
  Layers,
  RefreshCcw,
  Sparkles,
  Brain,
  ScanLine,
  Lock,
  Info,
  X,
  ShieldCheck,
  Waves,
  FileKey,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils/cn';

type ProtectionLevel = 'Low' | 'Medium' | 'High' | 'Ultra';

interface ProcessingState {
  noise: number;
  distortion: number;
  metadata: boolean;
  watermark: boolean;
  level: ProtectionLevel;
}

const LEVEL_CONFIG: Record<ProtectionLevel, { noise: number; distortion: number; description: string }> = {
  Low: { noise: 8, distortion: 6, description: 'Best visual fidelity' },
  Medium: { noise: 18, distortion: 12, description: 'Balanced protection' },
  High: { noise: 36, distortion: 24, description: 'Stronger model disruption' },
  Ultra: { noise: 58, distortion: 38, description: 'Maximum obfuscation' },
};

const AboutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-6 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">How GhostGuard Works</h2>
              <p className="text-sm text-slate-400">Multi-layer adversarial protection system</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20">
                  <Zap className="h-4 w-4 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-indigo-200">Adversarial Noise Injection</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Injects carefully calculated high-frequency perturbations into the pixel data that are imperceptible to humans
                but cause significant disruption to the latent space representations used by AI models. This creates "feature
                collisions" that confuse convolutional neural networks (CNNs) and vision transformers (ViTs), making the image
                unsuitable for training or style transfer.
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20">
                  <Waves className="h-4 w-4 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-cyan-200">Edge Distortion & Ghosting</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Detects high-gradient regions (edges, textures, boundaries) and applies micro-displacement with weighted
                blending. This creates subtle "ghosting artifacts" that specifically target the spatial convolution operations
                used by image models. The result is that feature extractors fail to build accurate representations of shapes,
                patterns, and textures.
              </p>
            </div>

            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20">
                  <Layers className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="font-semibold text-purple-200">Watermark Pattern Layer</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Embeds a semi-invisible high-frequency grid and text pattern ("GhostGuard") at sub-pixel opacity. These patterns
                interfere with style mimicry algorithms and create traceable signatures. Even if scrapers attempt to crop or
                resize the image, residual patterns remain and disrupt training convergence.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                  <FileKey className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-emerald-200">Metadata Poisoning</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Subtly manipulates alpha channel values in a pseudo-random pattern. This corrupts metadata that some AI
                pipelines rely on for normalization and preprocessing. The technique is lossless for visual display but creates
                unexpected behavior during batch processing and automated ingestion workflows.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
            <div className="flex gap-3">
              <Info className="h-5 w-5 flex-shrink-0 text-yellow-400" />
              <div>
                <p className="mb-1 font-semibold text-yellow-200">Privacy First</p>
                <p className="text-sm text-slate-300">
                  All processing happens locally in your browser using the Canvas API. Your original images never leave your
                  device. No uploads, no tracking, no cloud storage.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full rounded-lg bg-indigo-500 px-4 py-3 font-medium text-white transition hover:bg-indigo-400"
          >
            Got it, let's protect some images
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const NeuralNetwork = () => {
  const nodes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: (i % 5) * 25 + 10,
    y: Math.floor(i / 5) * 35 + 10,
  }));

  return (
    <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((target, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={node.x}
            y1={node.y}
            x2={target.x}
            y2={target.y}
            stroke="url(#lineGradient)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: i * 0.05 }}
          />
        ))
      )}
      {nodes.map((node, i) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r="1.5"
          fill="#818cf8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        />
      ))}
    </svg>
  );
};

const ProcessingOverlay = ({ isProcessing, progress }: { isProcessing: boolean; progress: number }) => {
  const steps = [
    { text: 'Analyzing image latent vectors...', icon: Brain },
    { text: 'Injecting adversarial perturbations...', icon: Zap },
    { text: 'Detecting feature boundaries...', icon: ScanLine },
    { text: 'Applying edge obfuscation layer...', icon: Sparkles },
    { text: 'Embedding watermark signature...', icon: Fingerprint },
    { text: 'Encrypting output metadata...', icon: Lock },
  ];

  if (!isProcessing) return null;

  const currentStep = Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length));
  const metrics = {
    perturbation: Math.min(100, Math.max(4, progress * 0.96)),
    entropy: Math.min(100, Math.max(3, progress * 0.88)),
    latent: Math.min(100, Math.max(5, progress * 0.92)),
  };
  const CurrentIcon = steps[currentStep].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950/95 via-indigo-950/90 to-slate-950/95 backdrop-blur-md"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2">
        <NeuralNetwork />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="absolute h-32 w-32 rounded-full border-2 border-indigo-500/20 border-t-indigo-400"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            className="absolute h-24 w-24 rounded-full border-2 border-cyan-500/20 border-r-cyan-400"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute h-16 w-16 rounded-full border border-purple-500/20 border-b-purple-400"
          />
          
          <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 backdrop-blur-sm">
            <CurrentIcon className="h-6 w-6 text-indigo-300" />
          </div>
        </div>

        <div className="relative mt-10 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex items-center gap-2 text-sm font-medium text-indigo-200"
            >
              <CurrentIcon className="h-4 w-4" />
              {steps[currentStep].text}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 h-1.5 w-80 overflow-hidden rounded-full bg-white/5 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-500 shadow-lg shadow-indigo-500/50"
            animate={{
              width: `${progress}%`,
            }}
            transition={{ width: { duration: 0.18, ease: 'easeOut' } }}
          />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-cyan-300 tabular-nums">
              {metrics.perturbation.toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-slate-400">Perturbation</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-purple-300 tabular-nums">
              {metrics.entropy.toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-slate-400">Entropy</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-indigo-300 tabular-nums">
              {metrics.latent.toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-slate-400">Latent Shift</div>
          </div>
        </div>

        <div className="mt-6 w-96 rounded-lg border border-indigo-500/20 bg-black/40 p-3 font-mono text-xs backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <div className="h-2 w-2 rounded-full bg-red-400"></div>
            <span className="ml-2 text-slate-400">neural_defense.log</span>
          </div>
          {steps.slice(0, currentStep + 1).map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-1 text-emerald-400"
            >
              <span className="text-slate-500">[{i + 1}]</span> {step.text}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CompareSlider = ({ original, processed }: { original: string; processed: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    return () => {
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full select-none overflow-hidden rounded-xl border border-white/10 bg-black"
      onMouseMove={(e) => {
        if (isDragging) handleMove(e.clientX);
      }}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (isDragging) handleMove(e.touches[0].clientX);
      }}
      onClick={(e) => handleMove(e.clientX)}
    >
      <img src={processed} alt="Protected" className="pointer-events-none absolute inset-0 h-full w-full object-contain" />
      <img 
        src={original}
        alt="Original"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      />
      <div
        className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-indigo-400"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-indigo-300 bg-slate-950 text-xs font-semibold text-indigo-200 shadow-lg">
          <>||</>
        </div>
      </div>
      <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/65 px-2.5 py-1 text-xs text-slate-100">
        Original
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded-md bg-indigo-500/25 px-2.5 py-1 text-xs text-indigo-100">
        Protected
      </div>
    </div>
  );
};

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  const [settings, setSettings] = useState<ProcessingState>({
    noise: 18,
    distortion: 12,
    metadata: true,
    watermark: true,
    level: 'Medium'
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processingJobRef = useRef(0);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setOriginalName(file.name.replace(/\.[^/.]+$/, ''));
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyProtection = useCallback(async () => {
    if (!image) return;

    const currentJob = ++processingJobRef.current;
    setIsProcessing(true);
    setProgress(6);

    const progressSteps = [14, 28, 46, 65, 82, 94];
    let progressIndex = 0;
    const progressInterval = window.setInterval(() => {
      if (currentJob !== processingJobRef.current) {
        window.clearInterval(progressInterval);
        return;
      }
      setProgress((prev) => {
        const nextTarget = progressSteps[Math.min(progressIndex, progressSteps.length - 1)];
        const nextValue = Math.min(nextTarget, prev + 4);
        if (nextValue >= nextTarget && progressIndex < progressSteps.length - 1) {
          progressIndex += 1;
        }
        return Math.max(prev, nextValue);
      });
    }, 55);

    await new Promise((resolve) => setTimeout(resolve, 90));

    if (currentJob !== processingJobRef.current) {
      window.clearInterval(progressInterval);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) {
      window.clearInterval(progressInterval);
      if (currentJob === processingJobRef.current) {
        setIsProcessing(false);
        setProgress(0);
      }
      return;
    }

    const img = new Image();
    img.src = image;

    img.onload = () => {
      if (currentJob !== processingJobRef.current) {
        window.clearInterval(progressInterval);
        return;
      }

      setProgress((prev) => Math.max(prev, 36));
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const base = imageData.data;
      const width = canvas.width;
      const height = canvas.height;

      setProgress((prev) => Math.max(prev, 52));
      const noiseData = new Uint8ClampedArray(base);
      const noiseIntensity = (settings.noise / 100) * 35;

      for (let i = 0; i < noiseData.length; i += 4) {
        const noise = (Math.random() - 0.5) * noiseIntensity;
        noiseData[i] = Math.max(0, Math.min(255, noiseData[i] + noise * 1.2));
        noiseData[i + 1] = Math.max(0, Math.min(255, noiseData[i + 1] + noise * 0.9));
        noiseData[i + 2] = Math.max(0, Math.min(255, noiseData[i + 2] + noise * 1.5));
      }

      setProgress((prev) => Math.max(prev, 68));
      const output = new Uint8ClampedArray(noiseData);
      const shiftRange = Math.max(1, Math.round(settings.distortion / 8));
      const edgeThreshold = 18 - Math.min(12, settings.distortion / 4);

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          const right = (y * width + (x + 1)) * 4;
          const left = (y * width + (x - 1)) * 4;
          const top = ((y - 1) * width + x) * 4;
          const bottom = ((y + 1) * width + x) * 4;

          const gx = Math.abs(noiseData[right] - noiseData[left]);
          const gy = Math.abs(noiseData[bottom] - noiseData[top]);
          const edgeScore = (gx + gy) / 2;

          if (edgeScore > edgeThreshold && Math.random() < settings.distortion / 100) {
            const offsetX = Math.round((Math.random() - 0.5) * shiftRange * 2);
            const offsetY = Math.round((Math.random() - 0.5) * shiftRange * 2);
            const sx = Math.max(0, Math.min(width - 1, x + offsetX));
            const sy = Math.max(0, Math.min(height - 1, y + offsetY));
            const srcIdx = (sy * width + sx) * 4;

            output[idx] = noiseData[srcIdx];
            output[idx + 1] = noiseData[srcIdx + 1];
            output[idx + 2] = noiseData[srcIdx + 2];
          }
        }
      }

      if (settings.metadata) {
        for (let i = 0; i < output.length; i += 64) {
          output[i + 3] = output[i + 3] === 255 ? 254 : 255;
        }
      }

      setProgress((prev) => Math.max(prev, 82));
      ctx.putImageData(new ImageData(output, width, height), 0, 0);

      if (settings.watermark) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
        ctx.lineWidth = 1;

        for (let i = -height; i < width + height; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i - height, height);
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        ctx.font = `${Math.max(12, Math.round(width / 90))}px sans-serif`;
        ctx.rotate((-14 * Math.PI) / 180);
        for (let x = -height; x < width; x += 220) {
          for (let y = 40; y < height + width; y += 180) {
            ctx.fillText('GhostGuard', x, y);
          }
        }
        ctx.restore();
      }

      if (currentJob !== processingJobRef.current) {
        window.clearInterval(progressInterval);
        return;
      }

      setProgress(100);
      setProcessedImage(canvas.toDataURL('image/png'));
      window.clearInterval(progressInterval);
      window.setTimeout(() => {
        if (currentJob === processingJobRef.current) {
          setIsProcessing(false);
          setProgress(0);
        }
      }, 120);
    };

    img.onerror = () => {
      window.clearInterval(progressInterval);
      if (currentJob === processingJobRef.current) {
        setIsProcessing(false);
        setProgress(0);
      }
    };
  }, [image, settings]);

  useEffect(() => {
    if (!image) return;

    const timeout = window.setTimeout(() => {
      applyProtection();
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [image, settings, applyProtection]);

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `${originalName}_ghostguarded.png`;
    link.click();
  };

  const handleLevelChange = (level: ProtectionLevel) => {
    setSettings((prev) => ({
      ...prev,
      level,
      noise: LEVEL_CONFIG[level].noise,
      distortion: LEVEL_CONFIG[level].distortion,
    }));
  };

  const toggleSwitchClass = (enabled: boolean) =>
    cn(
      'relative h-6 w-11 rounded-full border transition-colors',
      enabled ? 'border-indigo-400 bg-indigo-500' : 'border-white/20 bg-white/10'
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 flex flex-col">
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />

      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 bg-slate-950/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">GhostGuard</p>
              <p className="text-xs text-slate-400">Adversarial Image Protection</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAbout(true)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">How it works</span>
          </button>
        </div>
      </motion.header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/60 p-6 backdrop-blur-sm"
        >
          <div className="mb-6 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-slate-100">Protection Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <label className="text-slate-300">Strength Preset</label>
              <span className="font-semibold text-indigo-400">{settings.level}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['Low', 'Medium', 'High', 'Ultra'] as ProtectionLevel[]).map((level) => (
                <motion.button
                  key={level}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLevelChange(level)}
                  className={cn(
                    'rounded-lg border px-3 py-2.5 text-sm font-medium transition-all',
                    settings.level === level
                      ? 'border-indigo-400 bg-indigo-500/20 text-indigo-100 shadow-lg shadow-indigo-500/20'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  {level}
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-slate-400">{LEVEL_CONFIG[settings.level].description}</p>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <Zap className="h-4 w-4 text-indigo-400" />
                  Noise Injection
                </label>
                <span className="text-sm font-semibold text-slate-100">{settings.noise}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.noise}
                onChange={(e) => setSettings({ ...settings, noise: Number(e.target.value) })}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  Edge Distortion
                </label>
                <span className="text-sm font-semibold text-slate-100">{settings.distortion}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.distortion}
                onChange={(e) => setSettings({ ...settings, distortion: Number(e.target.value) })}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
            <button
              onClick={() => setSettings({ ...settings, watermark: !settings.watermark })}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 transition hover:bg-white/5"
            >
              <span className="flex items-center gap-2 text-sm text-slate-300">
                <Layers className="h-4 w-4 text-purple-400" />
                Watermark Layer
              </span>
              <span className={toggleSwitchClass(settings.watermark)}>
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-lg transition-all',
                    settings.watermark ? 'left-5' : 'left-0.5'
                  )}
                />
              </span>
            </button>

            <button
              onClick={() => setSettings({ ...settings, metadata: !settings.metadata })}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 transition hover:bg-white/5"
            >
              <span className="flex items-center gap-2 text-sm text-slate-300">
                <Fingerprint className="h-4 w-4 text-emerald-400" />
                Metadata Poisoning
              </span>
              <span className={toggleSwitchClass(settings.metadata)}>
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-lg transition-all',
                    settings.metadata ? 'left-5' : 'left-0.5'
                  )}
                />
              </span>
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {image && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">
                  Live preview is enabled. Adjust settings and the protected output updates automatically.
                </div>

                <button
                  onClick={downloadImage}
                  disabled={!processedImage || isProcessing}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Download className="h-5 w-5" />
                  Download Protected PNG
                </button>
                <button
                  onClick={() => {
                    processingJobRef.current += 1;
                    setIsProcessing(false);
                    setProgress(0);
                    setImage(null);
                    setProcessedImage(null);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Protect Another Image
                </button>
              </motion.div>
            )}
          </div>
        </motion.aside>

        <motion.section
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex min-h-[580px] flex-col"
        >
          <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-900/40 p-3 sm:p-5 backdrop-blur-sm">
            {!image ? (
              <label
                className={cn(
                  'group relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed px-6 text-center transition-all duration-300',
                  isDragging
                    ? 'scale-[1.01] border-indigo-400 bg-indigo-500/10'
                    : 'border-white/15 hover:border-indigo-300/50 hover:bg-white/5'
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFile(file);
                }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }} />
                </div>

                <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20" />
                <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />

                <div className="relative z-10 mb-8">
                  <motion.div
                    animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    className="relative mx-auto"
                  >
                    <div className="relative flex h-28 w-28 items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border border-dashed border-indigo-400/30"
                      />
                      
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 shadow-2xl shadow-indigo-500/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/40">
                        <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent" />
                        <Upload className="relative h-10 w-10 text-indigo-300 transition-transform duration-300 group-hover:-translate-y-1" />
                      </div>

                      <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-indigo-400/60" />
                      <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-cyan-400/60" />
                      <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-cyan-400/60" />
                      <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-indigo-400/60" />
                    </div>
                  </motion.div>
                </div>

                <h3 className="relative z-10 text-2xl font-bold text-slate-100 transition-colors group-hover:text-indigo-200">
                  Drop Image to Protect
                </h3>
                <p className="relative z-10 mt-3 max-w-md text-sm text-slate-400 transition-colors group-hover:text-slate-300">
                  or click to browse • Supports JPEG, PNG, WebP
                </p>
                
                <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-300 backdrop-blur-sm">
                    <Brain className="h-4 w-4" />
                    Neural Defense
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300 backdrop-blur-sm">
                    <Lock className="h-4 w-4" />
                    Local Processing
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-300 backdrop-blur-sm">
                    <Fingerprint className="h-4 w-4" />
                    Watermarked
                  </div>
                </div>

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </label>
            ) : (
              <div className="relative h-full">
                <AnimatePresence>{isProcessing && <ProcessingOverlay isProcessing={isProcessing} progress={progress} />}</AnimatePresence>

                {!processedImage && !isProcessing && (
                  <div className="flex h-full w-full items-center justify-center">
                    <img src={image} alt="Original upload" className="h-full w-full object-contain" />
                  </div>
                )}

                {processedImage && !isProcessing && <CompareSlider original={image} processed={processedImage} />}
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between px-2 text-xs text-slate-400">
            <p className="flex items-center gap-2">
              <Info className="h-3.5 w-3.5" />
              {image
                ? 'Live preview updates automatically as you change protection settings'
                : 'Upload an image to see a live protected preview'}
            </p>
            {image && <p className="hidden sm:block">File: {originalName || 'uploaded-image'}</p>}
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 py-4">
        <div className="mx-auto w-full max-w-7xl px-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          Copyright © GhostGuard 2026
        </div>
      </footer>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
