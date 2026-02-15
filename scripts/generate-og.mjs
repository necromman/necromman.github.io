/**
 * generate-og.mjs
 * 빌드 타임에 모든 콘텐츠 페이지의 OG 이미지를 자동 생성한다.
 * satori (HTML/CSS → SVG) + @resvg/resvg-js (SVG → PNG)
 */
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';
import matter from 'gray-matter';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const OG_DIR = path.join(ROOT, 'assets', 'og');
const CACHE_DIR = path.join(ROOT, '.cache', 'fonts');

const FONT_URL =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf';
const FONT_FILENAME = 'Pretendard-Bold.otf';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const BG_COLOR = '#1a1a1a';
const ACCENT = '#e8572a';
const TEXT_WHITE = '#ffffff';
const TEXT_MUTED = '#888888';
const TEXT_BRAND = '#666666';

// ─── 폰트 다운로드 & 캐싱 ─────────────────────────────────

async function ensureFont() {
  const fontPath = path.join(CACHE_DIR, FONT_FILENAME);
  if (existsSync(fontPath)) {
    console.log('[og] 캐시된 폰트 사용:', fontPath);
    return fs.readFile(fontPath);
  }

  console.log('[og] 폰트 다운로드:', FONT_URL);
  await fs.mkdir(CACHE_DIR, { recursive: true });

  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`폰트 다운로드 실패: ${res.status} ${res.statusText}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(fontPath, buffer);
  console.log('[og] 폰트 캐시 완료:', fontPath);
  return buffer;
}

// ─── content-data.js 파싱 ──────────────────────────────────

async function loadContentData() {
  const code = await fs.readFile(path.join(ROOT, 'assets', 'content-data.js'), 'utf-8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context.window.CONTENT_DATA;
}

function buildSeriesMap(contentData) {
  const map = new Map(); // href → { seriesNum, seriesTitle, seriesId }
  contentData.forEach((series, idx) => {
    const seriesNum = idx + 1;
    (series.articles || []).forEach((article) => {
      const href = article.href.replace(/^\//, '');
      map.set(href, {
        seriesNum,
        seriesTitle: series.title,
        seriesId: series.id,
      });
    });
  });
  return map;
}

// ─── 콘텐츠 HTML 수집 ──────────────────────────────────────

async function collectContentFiles() {
  const files = [];
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const seriesDir = path.join(CONTENT_DIR, entry.name);
    const htmlFiles = await fs.readdir(seriesDir);
    for (const file of htmlFiles) {
      if (!file.endsWith('.html')) continue;
      files.push({
        absPath: path.join(seriesDir, file),
        relPath: `content/${entry.name}/${file}`,
        seriesSlug: entry.name,
        articleSlug: file.replace('.html', ''),
      });
    }
  }
  return files;
}

// ─── OG 카드 렌더링 ────────────────────────────────────────

function seriesLabel(seriesSlug, seriesNum) {
  const name = seriesSlug
    .replace(/-series$/, '')
    .replace(/-/g, ' ')
    .toUpperCase();
  return `SERIES ${seriesNum}\u2002\u2014\u2002${name}`;
}

function titleFontSize(title) {
  const len = title.length;
  if (len <= 2) return 180;
  if (len <= 4) return 140;
  if (len <= 6) return 120;
  if (len <= 8) return 105;
  if (len <= 12) return 88;
  if (len <= 16) return 76;
  if (len <= 20) return 66;
  if (len <= 28) return 56;
  return 48;
}

function buildOgElement({ title }) {
  const fontSize = titleFontSize(title);

  return {
    type: 'div',
    props: {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 72px',
        backgroundColor: BG_COLOR,
        fontFamily: 'Pretendard',
      },
      children: [
        // 제목 — 가운데 정렬, maxWidth로 긴 제목 자동 개행
        {
          type: 'div',
          props: {
            style: {
              fontSize,
              fontWeight: 700,
              color: TEXT_WHITE,
              lineHeight: 1.3,
              textAlign: 'center',
              maxWidth: 760,
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
            },
            children: title,
          },
        },
        // Accent bar
        {
          type: 'div',
          props: {
            style: { width: 80, height: 5, backgroundColor: ACCENT, marginTop: 32 },
          },
        },
        // 브랜딩
        {
          type: 'div',
          props: {
            style: {
              fontSize: 18,
              color: TEXT_BRAND,
              letterSpacing: '5px',
              marginTop: 20,
            },
            children: 'Editorial',
          },
        },
      ],
    },
  };
}

// ─── 랜딩 페이지용 기본 OG 이미지 ──────────────────────────

function buildLandingOgElement() {
  return {
    type: 'div',
    props: {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BG_COLOR,
        fontFamily: 'Pretendard',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontSize: 72,
              fontWeight: 700,
              color: TEXT_WHITE,
              letterSpacing: '4px',
              marginBottom: 24,
            },
            children: 'Editorial',
          },
        },
        {
          type: 'div',
          props: {
            style: { width: 80, height: 4, backgroundColor: ACCENT, marginBottom: 28 },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: 22,
              color: TEXT_MUTED,
              letterSpacing: '1px',
            },
            children: '에디토리얼 매거진 스타일 블로그',
          },
        },
      ],
    },
  };
}

// ─── 메인 ──────────────────────────────────────────────────

async function main() {
  console.log('[og] OG 이미지 생성 시작');
  const startTime = Date.now();

  // 1. 폰트 로드
  const fontData = await ensureFont();

  const fonts = [
    { name: 'Pretendard', data: fontData, weight: 700, style: 'normal' },
  ];

  // 2. 시리즈 데이터 로드
  const contentData = await loadContentData();
  const seriesMap = buildSeriesMap(contentData);

  // 3. 콘텐츠 파일 수집
  const files = await collectContentFiles();
  console.log(`[og] 콘텐츠 파일 ${files.length}개 발견`);

  // 4. OG 디렉토리 초기화
  await fs.mkdir(OG_DIR, { recursive: true });

  // 5. 각 콘텐츠에 대해 OG 이미지 생성
  let generated = 0;
  for (const file of files) {
    const raw = await fs.readFile(file.absPath, 'utf-8');
    const { data: fm } = matter(raw);
    const title = fm.pageTitle || file.articleSlug;

    // 시리즈 매칭
    const seriesInfo = seriesMap.get(file.relPath);
    const seriesNum = seriesInfo?.seriesNum;

    const element = buildOgElement({ title });

    // satori → SVG
    const svg = await satori(element, { width: OG_WIDTH, height: OG_HEIGHT, fonts });

    // resvg → PNG
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: OG_WIDTH },
    });
    const png = resvg.render().asPng();

    // 저장
    const outDir = path.join(OG_DIR, file.seriesSlug);
    await fs.mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, `${file.articleSlug}.png`);
    await fs.writeFile(outPath, png);
    generated++;
  }

  // 6. 랜딩 페이지용 기본 OG 이미지
  const landingElement = buildLandingOgElement();
  const landingSvg = await satori(landingElement, { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  const landingResvg = new Resvg(landingSvg, {
    fitTo: { mode: 'width', value: OG_WIDTH },
  });
  const landingPng = landingResvg.render().asPng();
  await fs.writeFile(path.join(OG_DIR, 'default.png'), landingPng);
  generated++;

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`[og] 완료: ${generated}개 이미지 생성 (${elapsed}s)`);
}

main().catch((err) => {
  console.error('[og] 오류:', err);
  process.exit(1);
});
