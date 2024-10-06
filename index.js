document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    const toggleButton = document.getElementById('toggleButton');

    // 音量の設定（必要に応じて調整）
    bgm.volume = 0.5;

    // 新しいタブを開いたときに自動でBGMを再生
    const playPromise = bgm.play();

    // 自動再生がブロックされた場合、ボタンを表示して手動再生を促す
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log("BGM started playing automatically.");
                toggleButton.style.display = "inline-block"; // BGMが再生されたらボタンを表示
            })
            .catch(error => {
                console.warn("BGM playback was prevented due to a browser restriction. User action required.");
                toggleButton.textContent = "Play BGM"; // 再生がブロックされた場合、ボタンテキストを変更
                toggleButton.style.display = "inline-block"; // ボタンを表示
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

    // 時計の更新を行う関数
    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // 1秒ごとに時計を更新
    setInterval(updateClock, 1000);
    updateClock();

    // 天気情報を表示する関数（サンプルデータ）
    function updateWeather() {
        const weatherElement = document.getElementById('weather');
        // サンプルデータを設定（実際にはAPIからデータを取得）
        const weatherData = {
            location: 'Tokyo',
            temperature: '22°C',
            description: 'Clear Sky'
        };
        weatherElement.textContent = `${weatherData.location}: ${weatherData.temperature} - ${weatherData.description}`;
    }

    // 天気情報を更新
    updateWeather();
});
