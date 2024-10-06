document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    const toggleButton = document.getElementById('toggleButton');

    // 音量の設定（必要に応じて調整）
    bgm.volume = 0.5;

    // ボタンを表示
    toggleButton.style.display = "inline-block";
    toggleButton.textContent = "Play BGM";

    // ボタンで再生／停止を制御
    toggleButton.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play()
                .then(() => {
                    console.log("BGM started playing.");
                    toggleButton.textContent = "Pause BGM";
                })
                .catch(error => {
                    console.error("BGM playback failed:", error);
                    toggleButton.textContent = "Play BGM";
                });
        } else {
            bgm.pause();
            toggleButton.textContent = "Play BGM";
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
