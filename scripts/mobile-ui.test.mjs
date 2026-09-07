import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const outputRoot = join(process.cwd(), "dist", "client");
const routes = [
  "/",
  "/about",
  "/products",
  "/products/next-gen-ai-core-banking",
  "/products/npci-products",
  "/products/digital-banking-products",
  "/products/enterprise-solution",
  "/products/merchant-management-solution",
  "/products/card-management",
  "/leadership",
  "/team",
  "/privacy-policy",
  "/terms-conditions",
];

const routeFile = (route) =>
  route === "/" ? join(outputRoot, "index.html") : join(outputRoot, route, "index.html");

test("every public page declares a phone-safe viewport", () => {
  for (const route of routes) {
    const file = routeFile(route);
    assert.ok(existsSync(file), `missing prerendered page: ${route}`);
    const html = readFileSync(file, "utf8");
    assert.match(
      html,
      /<meta[^>]+name=["']viewport["'][^>]+content=["']width=device-width, initial-scale=1["']/i,
      `${route} is missing the responsive viewport declaration`,
    );
  }
});

test("all website videos include iPhone and Android playback safeguards", () => {
  let videoCount = 0;

  for (const route of routes) {
    const html = readFileSync(routeFile(route), "utf8");
    const videos = [...html.matchAll(/<video\b[^>]*>[\s\S]*?<\/video>/gi)].map((match) => match[0]);
    videoCount += videos.length;

    for (const video of videos) {
      assert.match(video, /\bautoplay(?:=["'][^"']*["'])?/i, `${route}: autoplay is missing`);
      assert.match(video, /\bmuted(?:=["'][^"']*["'])?/i, `${route}: muted is missing`);
      assert.match(video, /\bloop(?:=["'][^"']*["'])?/i, `${route}: loop is missing`);
      assert.match(video, /\bplaysinline(?:=["'][^"']*["'])?/i, `${route}: playsInline is missing`);
      assert.match(
        video,
        /\bwebkit-playsinline(?:=["'][^"']*["'])?/i,
        `${route}: iOS inline playback attribute is missing`,
      );
      assert.match(video, /\bposter=["'][^"']+["']/i, `${route}: poster fallback is missing`);
      assert.match(
        video,
        /<source\b[^>]+type=["']video\/mp4["']/i,
        `${route}: MP4 source type is missing`,
      );
    }
  }

  assert.ok(videoCount >= 9, `expected full-site video coverage, found ${videoCount}`);
});

test("shared media retries playback and exposes a tap fallback", () => {
  const source = readFileSync(
    join(process.cwd(), "src/components/site/CinematicMedia.tsx"),
    "utf8",
  );

  for (const safeguard of [
    'setAttribute("webkit-playsinline", "")',
    'document.addEventListener("visibilitychange"',
    'window.addEventListener("pageshow"',
    "IntersectionObserver",
    "cinematic-media-play",
  ]) {
    assert.ok(source.includes(safeguard), `missing playback safeguard: ${safeguard}`);
  }
});

test("mobile artwork fills its card and retains a decode fallback", () => {
  const styles = readFileSync(join(process.cwd(), "src/styles.css"), "utf8");
  const icon = readFileSync(join(process.cwd(), "src/components/site/GlassIcon3D.tsx"), "utf8");

  assert.match(
    styles,
    /@media \(max-width: 899px\)[\s\S]*?\.about-capability-card-visual[\s\S]*?width: min\(21rem, 80%\)/,
  );
  assert.match(
    styles,
    /\.about-capability-card-visual \.glass-icon-3d[\s\S]*?--glass-icon-size: min\(100%, 17rem\)/,
  );
  assert.match(
    styles,
    /@media \(max-width: 620px\)[\s\S]*?\.about-capability-card-visual[\s\S]*?width: 88%/,
  );
  assert.match(
    styles,
    /@media \(max-width: 560px\)[\s\S]*?\.chatbot-visit-greeting[\s\S]*?display: none/,
  );
  assert.ok(icon.includes("glass-icon-3d-artwork-fallback"));
  assert.ok(icon.includes("has-artwork-error"));
});
