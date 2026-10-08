import Image from "next/image";
import { IndustryScene } from "@/components/visuals/IndustryScene";
import { findPhoto } from "@/lib/media";
import { industryPhotoAlt } from "@/content/industry-photos";

/**
 * Industry visual: the photograph in public/industries/<slug>.* when one has been supplied (see
 * docs/industry-photography.md), otherwise the bright code-built scene. Both fill their frame.
 */
export function IndustryMedia({ slug, priority = false, sizes = "(min-width:1024px) 40vw, 100vw" }: { slug: string; priority?: boolean; sizes?: string }) {
  const photo = findPhoto("industries", slug);
  if (photo) {
    return <Image src={photo} alt={industryPhotoAlt[slug] ?? ""} fill sizes={sizes} priority={priority} quality={85} className="object-cover" />;
  }
  return <IndustryScene slug={slug} />;
}
