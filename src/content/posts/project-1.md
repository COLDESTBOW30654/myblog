---
title: 视奸我 - 网易云音乐播放状态展示
published: 2026-02-27T05:05:00
description: 视奸我 - 网易云音乐播放状态展示的README文档。
draft: false
category: 一些小项目
---

# 视奸我 - 网易云音乐播放状态展示

将网易云音乐播放状态实时展示在个人主页上。

## 项目结构

```
shijian-music/
├── api/                    # API 调试工具
│   ├── music.php       # 音乐数据 API
│   └── debug.html          # 可视化调试面板
└── shijianwomusic/         # BetterNCM 插件
    ├── src/main.tsx        # 插件源码
    └── dist/               # 构建输出（安装此目录）
        ├── main.js
        └── manifest.json
        └──	shijianwo.plugin
```

## 快速开始

### 1. 环境要求
- PHP 7.4+
- Web 服务器 (Apache/Nginx)
- Node.js（用于构建插件）
- [BetterNCM](https://github.com/std-microblock/BetterNCM) >= 0.2.5

### 2. 构建插件

```bash
cd shijianwomusic
npm install
npm run build
```

### 3. 安装 BetterNCM 插件

1. 安装 [BetterNCM](https://github.com/std-microblock/BetterNCM)
2. 在 BetterNCM 设置中点击 "Open Folder" 打开数据目录
3. 创建 `plugins_dev` 文件夹（如果不存在）
4. 将 `shijianwomusic/dist` 目录内的文件复制到 `plugins_dev/shijianwo-music/`
5. 重启网易云音乐

目录结构：
```
BetterNCM/
└── plugins_dev/
    └── shijianwo-music/
        ├── main.js
        └── manifest.json
        └──	shijianwo.plugin
```

### 4. 配置插件

1. 打开网易云音乐
2. 点击右上角 BetterNCM 图标
3. 找到 "视奸我-网易云插件"
4. 点击配置按钮，输入 API 地址：
   ```
   http://your-domain.com/music.php
   ```
5. 保存配置

### 5. 部署主页

将 `my-index` 目录上传到 Web 服务器即可。

## API 接口

### 基础 URL
```
http://your-domain.com/music.php
```

### 接口列表

| 接口 | 说明 |
|------|------|
| `?action=current` | 获取完整播放信息 |
| `?action=song` | 仅获取歌曲信息 |
| `?action=progress` | 仅获取播放进度 |
| `?action=lyrics` | 仅获取歌词 |
| `?action=status` | 获取播放状态 |
| `?action=health` | 健康检查 |

### POST 更新数据
```
POST /music.php?action=update
Content-Type: application/json

{
  "playing": {
    "isPlaying": true,
    "song": {...},
    "progress": {...},
    "lyrics": {...}
  }
}
```

## 调试工具

访问 `http://your-domain.com/api/debug.html` 可视化查看 API 数据。

## 功能特点

- 实时同步播放状态
- 显示歌曲名称、艺术家、专辑
- 播放进度条实时更新
- 歌词预览
- 响应式设计，支持移动端

## 常见问题

### 插件列表中看不到插件
1. 确保安装的是 `dist` 目录内的文件
2. 确保 `manifest.json` 和 `main.js` 在同一目录
3. 重启网易云音乐客户端

### 配置按钮无响应
1. 按 F12 打开开发者工具
2. 查看控制台是否有错误
3. 确保 BetterNCM 版本 >= 0.2.5

### API 连接失败
1. 检查 API 地址是否正确
2. 确保 PHP 服务器正常运行
3. 检查跨域配置

### 歌曲信息为空
1. 确保网易云音乐正在播放歌曲
2. 按 F12 查看控制台日志
3. 检查 BetterNCM API 是否正常返回数据

## demo展示

#### 这里演示的是直接调用我自己的api，api仅提供数据，播放器显示功能需要自己写

<style>
.music-player {
    background: var(--card-bg, #fff);
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.music-player .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    margin-bottom: 12px;
}
.music-player .status-dot {
    margin-left: auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #9ca3af;
}
.music-player .status-dot.playing {
    background: #22c55e;
    animation: statusPulse 2s ease-in-out infinite;
}
@keyframes statusPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
.music-player .content {
    display: flex;
    gap: 16px;
}
.music-player .cover {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    background: #f3f4f6;
    flex-shrink: 0;
}
.music-player .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.music-player .cover-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
}
.music-player .info {
    flex: 1;
    min-width: 0;
}
.music-player .song-title {
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.music-player .artist, .music-player .album {
    font-size: 12px;
    color: #6b7280;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.music-player .progress-container {
    margin-top: 8px;
}
.music-player .progress-bar {
    width: 100%;
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
}
.music-player .progress-fill {
    height: 100%;
    background: #22c55e;
    border-radius: 2px;
    transition: width 0.3s;
}
.music-player .time {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #9ca3af;
    margin-top: 4px;
}
.music-player .lyrics {
    margin-top: 8px;
    font-size: 12px;
    color: #6b7280;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

<section class="music-player" id="section-music">
    <div class="title">
        <span>🎵</span>
        <span id="music-section-title">正在播放</span>
        <span class="status-dot" id="music-status-dot"></span>
    </div>
    <div class="content">
        <div class="cover" id="music-cover-wrapper">
            <img id="music-cover" src="" alt="封面" style="display:none;">
            <div class="cover-placeholder" id="music-cover-placeholder">
                <span>🎵</span>
            </div>
        </div>
        <div class="info">
            <div class="song-title" id="music-title">未在播放</div>
            <div class="artist" id="music-artist">-</div>
            <div class="album" id="music-album">-</div>
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill" id="music-progress-bar" style="width:0%"></div>
                </div>
                <div class="time">
                    <span id="music-current-time">00:00</span>
                    <span id="music-duration">00:00</span>
                </div>
            </div>
        </div>
    </div>
    <div class="lyrics" id="music-lyrics-wrapper" style="display:none;">
        <p id="music-lyrics"></p>
    </div>
</section>

<script>
(function() {
    const API_URL = 'https://blym.top/music.php';
    let lastMusicData = null;
    let lastUpdateTime = 0;
    let lastProgressTime = Date.now();
    let lastProgressValue = -1;
    const PAUSE_THRESHOLD = 10000;
    const NOT_PLAYING_THRESHOLD = 30 * 60 * 1000;
    const PROGRESS_CHANGE_THRESHOLD = 1000;

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
    }
    
    function showNotPlaying() {
        const dot = document.getElementById('music-status-dot');
        const title = document.getElementById('music-section-title');
        const songTitle = document.getElementById('music-title');
        const artist = document.getElementById('music-artist');
        const album = document.getElementById('music-album');
        const cover = document.getElementById('music-cover');
        const coverPlaceholder = document.getElementById('music-cover-placeholder');
        const progressBar = document.getElementById('music-progress-bar');
        const currentTime = document.getElementById('music-current-time');
        const duration = document.getElementById('music-duration');
        const lyricsWrapper = document.getElementById('music-lyrics-wrapper');
    
        if (dot) { dot.className = 'status-dot'; }
        if (title) title.textContent = '未在播放';
        if (songTitle) songTitle.textContent = '未在播放';
        if (artist) artist.textContent = '-';
        if (album) album.textContent = '-';
        if (cover) cover.style.display = 'none';
        if (coverPlaceholder) coverPlaceholder.style.display = 'flex';
        if (progressBar) progressBar.style.width = '0%';
        if (currentTime) currentTime.textContent = '00:00';
        if (duration) duration.textContent = '00:00';
        if (lyricsWrapper) lyricsWrapper.style.display = 'none';
    }
    
    function showPaused() {
        const dot = document.getElementById('music-status-dot');
        if (dot) dot.className = 'status-dot';
    }
    
    function updateLocalProgress() {
        if (!lastMusicData || !lastMusicData.playing) return;
    
        const now = Date.now();
        const timeSinceProgressChange = now - lastProgressTime;
    
        if (timeSinceProgressChange > NOT_PLAYING_THRESHOLD) {
            showNotPlaying();
            return;
        }
    
        if (timeSinceProgressChange > PAUSE_THRESHOLD) {
            showPaused();
            return;
        }
    
        if (!lastMusicData.playing.isPlaying) return;
    
        const progress = lastMusicData.playing.progress || {};
        const elapsedMs = now - lastUpdateTime;
    
        if (elapsedMs > 30000) return;
    
        const currentMs = (progress.currentTime || 0) + elapsedMs;
        const durationMs = progress.duration || 1;
        const percent = Math.min(100, Math.max(0, (currentMs / durationMs) * 100));
    
        const progressBar = document.getElementById('music-progress-bar');
        const currentTimeEl = document.getElementById('music-current-time');
    
        if (progressBar) progressBar.style.width = percent + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTime(currentMs / 1000);
    }
    
    function updateMusic() {
        fetch(API_URL + '?action=current')
            .then(res => res.json())
            .then(response => {
                const data = response.data;
                if (!data || !data.playing) return;
    
                const now = Date.now();
                const rawProgress = data.playing.progress?.currentTime || 0;
                const currentProgress = Math.floor(rawProgress / PROGRESS_CHANGE_THRESHOLD);
                
                if (currentProgress !== lastProgressValue) {
                    lastProgressTime = now;
                    lastProgressValue = currentProgress;
                }
    
                lastMusicData = data;
                lastUpdateTime = now;
    
                const song = data.playing.song || {};
                const progress = data.playing.progress || {};
                const lyrics = data.playing.lyrics || {};
                const isPlaying = data.playing.isPlaying || false;
    
                const timeSinceProgressChange = now - lastProgressTime;
                const isPaused = timeSinceProgressChange > PAUSE_THRESHOLD;
                const isNotPlaying = timeSinceProgressChange > NOT_PLAYING_THRESHOLD;
    
                if (isNotPlaying) {
                    showNotPlaying();
                    return;
                }
    
                const dot = document.getElementById('music-status-dot');
                const title = document.getElementById('music-section-title');
                const songTitle = document.getElementById('music-title');
                const artist = document.getElementById('music-artist');
                const album = document.getElementById('music-album');
                const cover = document.getElementById('music-cover');
                const coverPlaceholder = document.getElementById('music-cover-placeholder');
                const progressBar = document.getElementById('music-progress-bar');
                const currentTime = document.getElementById('music-current-time');
                const duration = document.getElementById('music-duration');
                const lyricsWrapper = document.getElementById('music-lyrics-wrapper');
                const lyricsEl = document.getElementById('music-lyrics');
    
                if (title) {
                    title.textContent = (isPlaying && !isPaused) ? '正在播放' : '已暂停';
                }
    
                if (dot) {
                    if (isPlaying && !isPaused) {
                        dot.className = 'status-dot playing';
                    } else {
                        dot.className = 'status-dot';
                    }
                }
    
                if (songTitle) songTitle.textContent = song.name || '未在播放';
                if (artist) {
                    const artists = song.artists || [];
                    artist.textContent = artists.length > 0 ? artists.join(' / ') : '-';
                }
                if (album) album.textContent = song.album?.name || '-';
    
                if (cover && coverPlaceholder) {
                    if (song.album?.cover) {
                        cover.src = song.album.cover;
                        cover.style.display = 'block';
                        coverPlaceholder.style.display = 'none';
                    } else {
                        cover.style.display = 'none';
                        coverPlaceholder.style.display = 'flex';
                    }
                }
    
                if (progressBar) progressBar.style.width = (progress.percent || 0) + '%';
                if (currentTime) currentTime.textContent = progress.formattedCurrentTime || '00:00';
                if (duration) duration.textContent = progress.formattedDuration || '00:00';
    
                if (lyricsWrapper && lyricsEl) {
                    if (lyrics.available && lyrics.raw) {
                        lyricsEl.textContent = lyrics.raw.substring(0, 100);
                        lyricsWrapper.style.display = 'block';
                    } else {
                        lyricsWrapper.style.display = 'none';
                    }
                }
            })
            .catch(() => {
                const dot = document.getElementById('music-status-dot');
                if (dot) dot.className = 'status-dot';
            });
    }
    
    updateMusic();
    setInterval(updateMusic, 1000);
    setInterval(updateLocalProgress, 100);
})();
</script>

## 温馨提醒

### 本项目使用AI进行开发

## 许可证

MIT License
