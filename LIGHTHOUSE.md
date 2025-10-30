# Lighthouse Optimization Guide

## Target Scores: 95+ Across All Categories

This portfolio is pre-configured to achieve excellent Lighthouse scores. Here's how to maintain and verify them.

## How to Run Lighthouse

### Method 1: Chrome DevTools (Recommended)
```bash
# Build and serve locally
npm run build
npx serve out

# Then:
# 1. Open http://localhost:3000 in Chrome
# 2. Open DevTools (F12)
# 3. Go to Lighthouse tab
# 4. Select all categories
# 5. Click "Analyze page load"
```

### Method 2: Lighthouse CLI
```bash
npm install -g lighthouse

# Build and serve
npm run build
npx serve out

# Run Lighthouse
lighthouse http://localhost:3000 --view
```

### Method 3: PageSpeed Insights (After Deployment)
Visit: https://pagespeed.web.dev/
Enter: https://gxu0904.github.io

## Optimizations Already Implemented

### Performance (Target: 95-100)
✅ **Static Export** - Pre-rendered HTML for instant load
✅ **Code Splitting** - Automatic Next.js chunk optimization
✅ **Small Bundle** - 142 KB First Load JS (excellent)
✅ **Font Optimization** - JetBrains Mono with `font-display: swap`
✅ **No Large Dependencies** - Minimal dependencies used
✅ **CSS Optimization** - Tailwind purges unused styles
✅ **Lazy Loading** - Components load on demand

### Accessibility (Target: 95-100)
✅ **Semantic HTML** - Proper heading hierarchy
✅ **Keyboard Navigation** - Full keyboard support
✅ **Focus Indicators** - Visible focus states
✅ **ARIA Labels** - Where needed for screen readers
✅ **Color Contrast** - WCAG AA compliant colors
✅ **Alt Text** - (No images used, but ready)
✅ **Language Attribute** - `lang="en"` on html tag

### Best Practices (Target: 95-100)
✅ **HTTPS** - GitHub Pages serves over HTTPS
✅ **Console Errors** - No errors in production
✅ **Deprecated APIs** - Modern React/Next.js
✅ **Security Headers** - Via GitHub Pages
✅ **Valid HTML** - No parsing errors
✅ **Meta Viewport** - Responsive meta tag

### SEO (Target: 95-100)
✅ **Meta Description** - Descriptive and under 160 chars
✅ **Title Tag** - Unique and descriptive
✅ **Heading Structure** - Logical h1, h2, h3 hierarchy
✅ **Robots.txt** - Public and indexable
✅ **Sitemap** - XML sitemap included
✅ **Canonical URL** - Prevents duplicate content
✅ **Open Graph** - Rich social media previews
✅ **Mobile Friendly** - Responsive design
✅ **Structured Data** - (Optional, can add later)

## Common Issues & Fixes

### If Performance < 95

**Issue**: First Contentful Paint (FCP) too slow
```bash
# Check bundle size
npm run build

# Look for large chunks
# Reduce by code splitting or removing dependencies
```

**Issue**: Largest Contentful Paint (LCP) too slow
- Ensure no large images in critical path
- Check font loading (should use font-display: swap)
- Verify static export is working

**Issue**: Cumulative Layout Shift (CLS) > 0.1
- Set explicit widths/heights on elements
- Avoid dynamic content insertion at top
- Use CSS transforms instead of position changes

### If Accessibility < 95

**Issue**: Color contrast
```css
/* Ensure text has 4.5:1 contrast ratio */
/* Check at: https://webaim.org/resources/contrastchecker/ */
```

**Issue**: Missing labels
- Add `aria-label` to interactive elements without text
- Ensure form inputs have associated labels

**Issue**: Keyboard navigation
- Test Tab key through all interactive elements
- Ensure focus is visible

### If Best Practices < 95

**Issue**: Console errors
```bash
# Check browser console for errors
# Fix any runtime errors
```

**Issue**: Insecure requests
- Ensure all external resources use HTTPS
- Check social links, CDN links, etc.

### If SEO < 95

**Issue**: Missing meta description
- Update in `app/layout.tsx`
- Keep under 160 characters

**Issue**: Title too short/long
- Aim for 50-60 characters
- Include key terms

**Issue**: Mobile unfriendly
- Test on mobile device
- Ensure text is readable (min 16px)
- Ensure tap targets are 48x48px minimum

## Verification Checklist

Before considering Lighthouse optimization complete:

### Performance
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Total Blocking Time < 200ms
- [ ] Speed Index < 3.4s

### Accessibility
- [ ] All interactive elements keyboard accessible
- [ ] All text has 4.5:1 contrast (WCAG AA)
- [ ] All images have alt text (if added)
- [ ] Heading hierarchy is logical
- [ ] No automatic audio/video

### Best Practices
- [ ] No console errors
- [ ] All external links use HTTPS
- [ ] No deprecated APIs
- [ ] Correct image aspect ratios
- [ ] Proper HTTP status codes

### SEO
- [ ] Title 50-60 chars
- [ ] Meta description 120-160 chars
- [ ] robots.txt allows indexing
- [ ] Sitemap accessible
- [ ] Valid structured data (optional)
- [ ] Mobile friendly

## Testing Across Devices

```bash
# Mobile simulation in Chrome DevTools
# 1. Open DevTools
# 2. Click device icon (Ctrl+Shift+M)
# 3. Select device (iPhone 12, Galaxy S21, etc.)
# 4. Test interactions
```

## Continuous Monitoring

After deployment, monitor with:

1. **PageSpeed Insights** - Monthly check
   - https://pagespeed.web.dev/

2. **Google Search Console** - Weekly check
   - Verify indexing status
   - Check Core Web Vitals

3. **Lighthouse CI** - Optional
   - Automate Lighthouse tests in CI/CD
   - Get alerts for score regressions

## Expected Scores (After Customization)

With default content and following this guide:

- **Performance**: 95-100 ✅
- **Accessibility**: 95-100 ✅
- **Best Practices**: 95-100 ✅
- **SEO**: 95-100 ✅

## Pro Tips

1. **Test on Real Device** - Mobile scores can differ from desktop
2. **Test on Slow Network** - Use Chrome DevTools network throttling
3. **Clear Cache** - Test with cleared cache to simulate first visit
4. **Test Dark Mode** - Verify both themes pass checks
5. **Test All Commands** - Ensure no runtime errors

---

Your site is configured for excellent Lighthouse scores out of the box. Just verify after adding your content!
