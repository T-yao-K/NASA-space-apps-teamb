document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    const toggleButton = document.getElementById('toggleButton');

    // 新しいタブを開いたときに自動でBGMを再生
    const playPromise = bgm.play();

    // 自動再生がブロックされた場合、ボタンを表示して手動再生を促す
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log("BGM started playing automatically.");
            })
            .catch(error => {
                console.warn("BGM playback was prevented due to a browser restriction. User action required.");
                toggleButton.textContent = "Play BGM"; // 再生がブロックされた場合、ボタンテキストを変更
            });
    }

    // ボタンで再生／停止を制御
    toggleButton.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play()
                .then(() => {
                    toggleButton.textContent = "Pause BGM"; // 再生中はボタンを「Pause」に
                })
                .catch(error => {
                    console.error("BGM playback failed:", error);
                });
        } else {
            bgm.pause();
            toggleButton.textContent = "Play BGM"; // 停止中はボタンを「Play」に
        }
    });
});
