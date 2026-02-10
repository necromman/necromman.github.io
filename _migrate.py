#!/usr/bin/env python3
"""
_migrate.py — 11ty 마이그레이션 일회성 스크립트
content/**/*.html과 index.html에서 공통 head를 제거하고 front matter를 추가한다.
"""
import re
import os
import json
import glob

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))


def extract_meta(html, name=None, prop=None):
    """Extract content attribute from a meta tag (handles attribute order)."""
    for attr_name, attr_val in [("name", name), ("property", prop)]:
        if attr_val is None:
            continue
        # Try attr="..." content="..." order
        m = re.search(
            rf'<meta\s+{attr_name}="{re.escape(attr_val)}"\s+content="([^"]*)"',
            html, re.IGNORECASE,
        )
        if m:
            return m.group(1)
        # Try content="..." attr="..." order
        m = re.search(
            rf'<meta\s+content="([^"]*)"\s+{attr_name}="{re.escape(attr_val)}"',
            html, re.IGNORECASE,
        )
        if m:
            return m.group(1)
    return None


def extract_title(html):
    """Extract text from <title> tag, removing ' — Editorial' suffix."""
    m = re.search(r"<title>(.+?)</title>", html)
    if m:
        title = m.group(1)
        # Strip " — Editorial" suffix if present (content pages)
        # Landing page title "Editorial — 에디토리얼 블로그" won't match
        return title.replace(" \u2014 Editorial", "").strip()
    return None


def extract_jsonld(html):
    """Extract JSON-LD data."""
    m = re.search(
        r'<script\s+type="application/ld\+json">\s*(\{[\s\S]*?\})\s*</script>',
        html,
    )
    if m:
        try:
            return json.loads(m.group(1))
        except json.JSONDecodeError:
            return None
    return None


def extract_head_styles(html):
    """Extract <style> blocks from <head> section."""
    head_m = re.search(r"<head[^>]*>([\s\S]*?)</head>", html)
    if head_m:
        head = head_m.group(1)
        styles = re.findall(r"<style[^>]*>[\s\S]*?</style>", head)
        return "\n".join(styles)
    return ""


def extract_body(html):
    """Extract content inside <body>...</body>."""
    m = re.search(r"<body[^>]*>([\s\S]*)</body>", html)
    if m:
        return m.group(1).strip()
    return ""


def yaml_str(s):
    """Safely format a string for YAML front matter (double-quoted)."""
    if s is None:
        return '""'
    escaped = s.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def migrate_content(filepath):
    """Migrate a content HTML file to 11ty format."""
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    # Extract front matter data
    page_title = extract_title(html)
    description = extract_meta(html, name="description")
    og_title = extract_meta(html, prop="og:title")
    og_description = extract_meta(html, prop="og:description")
    published_time = extract_meta(html, prop="article:published_time")
    jsonld = extract_jsonld(html)

    # Fallback: get datePublished from JSON-LD
    if not published_time and jsonld:
        published_time = jsonld.get("datePublished", "2026-01-01")

    # Check if og:title differs from page title
    og_title_differs = og_title and og_title != page_title

    # Check if og:description differs from meta description
    og_desc_differs = og_description and og_description != description

    # Check if dateModified differs from datePublished
    date_modified = None
    if jsonld and "dateModified" in jsonld:
        if jsonld["dateModified"] != jsonld.get("datePublished", published_time):
            date_modified = jsonld["dateModified"]

    # Extract head styles and body
    styles = extract_head_styles(html)
    body = extract_body(html)

    # Build front matter
    fm = ["---"]
    fm.append("layout: layouts/article.njk")
    fm.append(f"pageTitle: {yaml_str(page_title)}")
    fm.append(f"description: {yaml_str(description)}")
    if og_title_differs:
        fm.append(f"ogTitle: {yaml_str(og_title)}")
    if og_desc_differs:
        fm.append(f"ogDescription: {yaml_str(og_description)}")
    fm.append(f'datePublished: "{published_time}"')
    if date_modified:
        fm.append(f'dateModified: "{date_modified}"')
    fm.append("---")

    # Build output: front matter + styles + body
    parts = ["\n".join(fm)]
    if styles:
        parts.append(styles)
    parts.append(body)

    output = "\n".join(parts) + "\n"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(output)

    return page_title


def migrate_index(filepath):
    """Migrate index.html (landing page) to 11ty format."""
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    page_title = extract_title(html)
    description = extract_meta(html, name="description")
    og_description = extract_meta(html, prop="og:description")
    google_verification = extract_meta(html, name="google-site-verification")

    og_desc_differs = og_description and og_description != description

    body = extract_body(html)

    # Build front matter
    fm = ["---"]
    fm.append("layout: layouts/landing.njk")
    fm.append(f"pageTitle: {yaml_str(page_title)}")
    fm.append(f"description: {yaml_str(description)}")
    if og_desc_differs:
        fm.append(f"ogDescription: {yaml_str(og_description)}")
    if google_verification:
        fm.append(f'googleVerification: "{google_verification}"')
    fm.append("---")

    output = "\n".join(fm) + "\n" + body + "\n"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(output)

    return page_title


if __name__ == "__main__":
    # Migrate content files
    content_files = sorted(
        glob.glob(os.path.join(PROJECT_ROOT, "content", "**", "*.html"), recursive=True)
    )
    print(f"Found {len(content_files)} content files")

    for f in content_files:
        title = migrate_content(f)
        rel = os.path.relpath(f, PROJECT_ROOT)
        print(f"  > {rel} -- {title}")

    # Migrate index.html
    index_path = os.path.join(PROJECT_ROOT, "index.html")
    if os.path.exists(index_path):
        title = migrate_index(index_path)
        print(f"  > index.html -- {title}")

    print(f"\nDone! Migrated {len(content_files) + 1} files.")
