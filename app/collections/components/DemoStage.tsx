import { useRef } from "react";
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

export default function DemoStage({ slug }: { slug: AnimationSlug }) {
  const stage = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const Demo = ANIMATIONS_BY_ID[slug].component;

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
    <div ref={stage} className={styles.stage}>
      {slug === "horizontal-gallery" ? (
        <div ref={gallery} className={styles.galleryScroll} tabIndex={0} role="region" aria-label="Scroll to move the gallery">
          {renderDemo()}
        </div>
      ) : (
        <div className={styles.demoFrame}>
          {renderDemo()}
        </div>
      )}
    </div>
  );
}
