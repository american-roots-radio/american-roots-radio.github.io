from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')

marker = '<option value="default">🔩 Modern Dark Steel</option>'
addition = '''<option value="light">☀️ Light</option>\n                            <option value="standarddark">🌙 Dark</option>\n                            <option value="default">🔩 Modern Dark Steel</option>'''

count = text.count(marker)
if count != 2:
    raise SystemExit(f'Expected 2 default theme options, found {count}')
text = text.replace(marker, addition)

css = r'''
<style id="crh-standard-light-dark-test-v1">
/* TEST BRANCH ONLY — neutral website-style Light / Dark themes. */
body[data-theme="light"] {
    --bg-color: #f6f7f9;
    --panel-bg: #ffffff;
    --card-bg: #ffffff;
    --card-hover: #f2f4f7;
    --accent: #2563eb;
    --accent-glow: rgba(37, 99, 235, 0.16);
    --text: #111827;
    --text-muted: #667085;
    color-scheme: light;
}

body[data-theme="standarddark"] {
    --bg-color: #0d1117;
    --panel-bg: #161b22;
    --card-bg: #1b2129;
    --card-hover: #242c36;
    --accent: #58a6ff;
    --accent-glow: rgba(88, 166, 255, 0.18);
    --text: #f0f3f6;
    --text-muted: #9da7b3;
    color-scheme: dark;
}

/* Neutral page surfaces */
body[data-theme="light"] header,
body[data-theme="standarddark"] header {
    background: var(--bg-color) !important;
    border-bottom-color: color-mix(in srgb, var(--text) 14%, transparent) !important;
}
body[data-theme="light"] .now-playing-banner,
body[data-theme="standarddark"] .now-playing-banner,
body[data-theme="light"] .eq-panel,
body[data-theme="standarddark"] .eq-panel,
body[data-theme="light"] .status-box,
body[data-theme="standarddark"] .status-box,
body[data-theme="light"] .card-radio,
body[data-theme="standarddark"] .card-radio,
body[data-theme="light"] .support-modal,
body[data-theme="standarddark"] .support-modal,
body[data-theme="light"] .contact-modal,
body[data-theme="standarddark"] .contact-modal {
    background: var(--panel-bg) !important;
    border-color: color-mix(in srgb, var(--text) 16%, transparent) !important;
    box-shadow: none;
}
body[data-theme="light"] .card-radio,
body[data-theme="standarddark"] .card-radio {
    background: var(--card-bg) !important;
}
body[data-theme="light"] .card-radio:hover,
body[data-theme="standarddark"] .card-radio:hover,
body[data-theme="light"] .card-radio.playing,
body[data-theme="standarddark"] .card-radio.playing {
    background: var(--card-hover) !important;
    border-color: var(--accent) !important;
}

/* Text that was hard-coded white in the original theme */
body[data-theme="light"] .banner-title,
body[data-theme="light"] .status-header h3,
body[data-theme="light"] .status-val,
body[data-theme="light"] .eq-header h3,
body[data-theme="light"] .station-meta h3,
body[data-theme="light"] .now-playing-info h4,
body[data-theme="light"] .search-box,
body[data-theme="light"] .contact-modal-close,
body[data-theme="light"] .support-modal-close {
    color: var(--text) !important;
}

/* Inputs, menus and EQ surfaces */
body[data-theme="light"] .eq-preset-select,
body[data-theme="light"] .genre-filter-select,
body[data-theme="light"] .appearance-menu summary,
body[data-theme="light"] .mobile-theme-picker,
body[data-theme="light"] .search-box,
body[data-theme="light"] .sleep-timer-select,
body[data-theme="light"] .btn-player-btn,
body[data-theme="light"] .btn-play-card,
body[data-theme="light"] .btn-stop-card,
body[data-theme="light"] .btn-random-station,
body[data-theme="light"] .btn-resume-last,
body[data-theme="light"] .btn-share-station,
body[data-theme="light"] .btn-filter,
body[data-theme="light"] .btn-family {
    background: #ffffff !important;
    color: #111827 !important;
    border-color: #d0d5dd !important;
}
body[data-theme="standarddark"] .eq-preset-select,
body[data-theme="standarddark"] .genre-filter-select,
body[data-theme="standarddark"] .appearance-menu summary,
body[data-theme="standarddark"] .mobile-theme-picker,
body[data-theme="standarddark"] .search-box,
body[data-theme="standarddark"] .sleep-timer-select,
body[data-theme="standarddark"] .btn-player-btn,
body[data-theme="standarddark"] .btn-play-card,
body[data-theme="standarddark"] .btn-stop-card,
body[data-theme="standarddark"] .btn-random-station,
body[data-theme="standarddark"] .btn-resume-last,
body[data-theme="standarddark"] .btn-share-station,
body[data-theme="standarddark"] .btn-filter,
body[data-theme="standarddark"] .btn-family {
    background: #21262d !important;
    color: #f0f3f6 !important;
    border-color: #30363d !important;
}

body[data-theme="light"] .appearance-popover { background: #ffffff !important; border-color: #d0d5dd !important; }
body[data-theme="standarddark"] .appearance-popover { background: #161b22 !important; border-color: #30363d !important; }
body[data-theme="light"] .eq-bands,
body[data-theme="light"] canvas#vu-meter { background: #eef1f5 !important; border-color: #d0d5dd !important; }
body[data-theme="standarddark"] .eq-bands,
body[data-theme="standarddark"] canvas#vu-meter { background: #0b0f14 !important; border-color: #30363d !important; }

/* Player follows the selected neutral theme */
body[data-theme="light"] .bottom-player {
    background: #ffffff !important;
    border-top-color: #d0d5dd !important;
    box-shadow: 0 -4px 18px rgba(16,24,40,.10) !important;
}
body[data-theme="standarddark"] .bottom-player {
    background: #0d1117 !important;
    border-top-color: #30363d !important;
    box-shadow: 0 -4px 18px rgba(0,0,0,.45) !important;
}
body[data-theme="light"] .bottom-player .player-divider { background: #d0d5dd !important; }
body[data-theme="standarddark"] .bottom-player .player-divider { background: #30363d !important; }
body[data-theme="light"] .volume-control,
body[data-theme="light"] .normalizer-control { background: #ffffff !important; border-color: #d0d5dd !important; }
body[data-theme="standarddark"] .volume-control,
body[data-theme="standarddark"] .normalizer-control { background: #161b22 !important; border-color: #30363d !important; }

/* Keep the existing western brand/signature buttons intact on purpose. */
</style>
'''

anchor = '</head>'
if 'crh-standard-light-dark-test-v1' in text:
    raise SystemExit('Test theme CSS already present')
if anchor not in text:
    raise SystemExit('Missing </head>')
text = text.replace(anchor, css + '\n' + anchor, 1)

path.write_text(text, encoding='utf-8')
