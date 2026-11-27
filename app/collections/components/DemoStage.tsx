import { useEffect, useRef, useState } from "react";
import { ANIMATIONS_BY_ID, type AnimationSlug } from "../../animations/registry";
import CursorOriginTransition from "../../animations/components/CursorOriginTransition/CursorOriginTransition";
import HorizontalGallery from "../../animations/components/HorizontalGallery/HorizontalGallery";
import ImageMaskReveal from "../../animations/components/ImageMaskReveal/ImageMaskReveal";
import ImageParallax from "../../animations/components/ImageParallax/ImageParallax";
import VelocityImage from "../../animations/components/VelocityImage/VelocityImage";
import VideoHoverPreview from "../../animations/components/VideoHoverPreview/VideoHoverPreview";
import styles from "../collections.module.css";

const sampleImage = "https://images.unsplash.com/photo-1515266591878-f93e32bc5937?auto=format&fit=crop&w=1000&q=80";
const sampleVideo = "https://mdn.github.io/shared-assets/videos/flower.mp4";

export default function DemoStage({ slug, replayKey }: { slug: AnimationSlug; replayKey: number }) {
  const stage = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const Demo = ANIMATIONS_BY_ID[slug].component;

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const startWhenRevealed = () => {
      const state = element.dataset.revealState;
      if (state && state !== "settled") return;
      observer.disconnect();
      setReady(true);
    };
    const observer = new MutationObserver(startWhenRevealed);
    observer.observe(element, { attributes: true, attributeFilter: ["data-reveal-state"] });
    startWhenRevealed();
    return () => observer.disconnect();
  }, []);

  function renderDemo() {
    switch (slug) {
      case "cursor-origin-transition": return <CursorOriginTransition viewport={stage} />;
      case "horizontal-gallery": return <HorizontalGallery scrollContainer={gallery} />;
      case "image-mask-reveal": return <ImageMaskReveal src={sampleImage} alt="Sample photograph" />;
      case "image-parallax": return <ImageParallax src={sampleImage} alt="Sample photograph" />;
      case "velocity-image": return <VelocityImage src={sampleImage} alt="Sample photograph" />;
      case "video-hover-preview": return <VideoHoverPreview src={sampleVideo} poster="https://mdn.github.io/shared-assets/images/examples/flowers.jpg" />;
      default: return <Demo />;
    }
  }

  return (
    <div ref={stage} className={styles.stage} data-reveal="fade up" data-reveal-detail data-intro>
      {slug === "horizontal-gallery" ? (
        <div key={replayKey} ref={gallery} className={styles.galleryScroll} tabIndex={0} role="region" aria-label="Scroll to move the gallery">
          {ready && renderDemo()}
        </div>
      ) : (
        <div key={replayKey} className={styles.demoFrame}>
          {ready && renderDemo()}
        </div>
      )}
    </div>
  );
}
