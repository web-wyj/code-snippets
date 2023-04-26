/**
 * 复制到控制台下载指定内容
 * */
(async () => {
    // downloadJson(json, 'xxx.json');
    window.downloadJson = downloadJson;
    // downloadUrl('http://xxxx');
    window.downloadUrl = downloadUrl;

    function downloadJson(json, filename) {
        let content = json;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
            const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
            downloadBlob(blob, filename);
        }
    }

    async function downloadUrl(url) {
        const blob = await (await fetch(url)).blob();
        const dataUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = getFileName(url);
        link.click();
    }

    async function downloadBlob(blob, filename = 'unname') {
        const dataUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        link.click();
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