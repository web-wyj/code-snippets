/**
 * 复制到控制台下载当前页静态图片视频
 * */
(async () => {
    const INTERVAL_TIME = 1000;     // 间隔时间，默认1000ms
    const DOWNLOAD_IMAGE = true;    // 是否下载图片
    const DOWNLOAD_VIDEO = true;    // 是否下载视频

    const cache = new Map();
    DOWNLOAD_IMAGE && await downloadImage();
    DOWNLOAD_VIDEO && await downloadVideo();
    async function downloadVideo() {
        const list1 = Array.from(document.getElementsByTagName('video'));
        const list2 = Array.from(document.getElementsByTagName('source'));
        const list = list1.concat(list2);
        for (let index = 0; index < list.length; index++) {
            const el = list[index];
            const dataSrc = el.getAttribute('data-src');
            const src = el.getAttribute('src');
            if (typeof dataSrc === 'string') {
                console.log(`${index + 1} / ${list.length} download: ${dataSrc}`);
                await download(dataSrc);
            } else if (typeof src === 'string') {
                console.log(`${index + 1} / ${list.length} download: ${src}`);
                await download(src);
            } else {
                console.log(`${index + 1} / ${list.length} empty:`, el);
            }
        }
    }
    async function downloadImage() {
        const list = Array.from(document.getElementsByTagName('img'));
        for (let index = 0; index < list.length; index++) {
            const el = list[index];
            const dataSrc = el.getAttribute('data-src');
            const src = el.getAttribute('src');
            if (typeof dataSrc === 'string') {
                console.log(`${index + 1} / ${list.length} download: ${dataSrc}`);
                await download(dataSrc);
            } else if (typeof src === 'string') {
                console.log(`${index + 1} / ${list.length} download: ${src}`);
                await download(src);
            } else {
                console.log(`${index + 1} / ${list.length} empty:`, el);
            }
        }
    }
    async function download(url, index, length) {
        if (cache.get(url) !== undefined) return;
        cache.set(url, true);

        const blob = await (await fetch(url)).blob();
        const dataUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = getFileName(url);
        link.click();
        await sleep(INTERVAL_TIME);
    }
    async function sleep(time) {
        return new Promise(resolve => {
            window.setTimeout(resolve, time);
        });
    }
    function getFileName(url) {
        const frontUrl = url.split('?')[0];
        const frontUrlBroken = frontUrl.split('.');
        const extName = frontUrlBroken[frontUrlBroken.length - 1] || '';
        const baseName = frontUrlBroken[frontUrlBroken.length - 2] || 'undefined';
        const fileName = extName === '' ? baseName : baseName + '.' + extName;
        return fileName;
    }
})()