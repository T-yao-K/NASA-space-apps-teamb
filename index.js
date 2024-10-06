// セットのデータを定義
const sets = [
    {
        backgroundImage: 'png/space1.png',
        description: '渦巻銀河NGC 1433をジェイムズ・ウェッブ宇宙望遠鏡（左上）とハッブル宇宙望遠鏡（右下）で観測した様子',
        bgmSource: 'audio/space1.wav'
    },
    {
        backgroundImage: 'png/space2.png',
        description: '画像全体を埋める薄いカーテンのような構造は、星団の星々の光を反射する星間物質で、反射星雲として知られています',
        bgmSource: 'audio/space2.wav'
    },
    {
        backgroundImage: 'png/space3.png',
        description: '彗星238P/Readが太陽に近づくにつれて水氷が昇華している様子',
        bgmSource: 'audio/space3.wav'
    },
    {
        backgroundImage: 'png/space4.png',
        description: '球状星団内のブラックホールのアーティストによる想像図',
        bgmSource: 'audio/space4.wav'
    },
    {
        backgroundImage: 'png/space5.png',
        description: 'ビッグバン後数億年で形成された初期の銀河の周りには、予想以上に密度の高い冷たいガスが存在していたことが観測されました',
        bgmSource: 'audio/space5.wav'
    },
    // 必要に応じて追加のセットを定義
];

document.addEventListener('DOMContentLoaded', () => {
    // ランダムにセットを選択
    const selectedSet = sets[Math.floor(Math.random() * sets.length)];

    // 背景画像を設定
    const backgroundImage = document.querySelector('.background-image');
    backgroundImage.style.backgroundImage = `url('${selectedSet.backgroundImage}')`;

    // 説明文を設定
    const descriptionCard = document.querySelector('.description-card');
    descriptionCard.textContent = selectedSet.description;

    // BGMのソースを設定
    const bgm = document.getElementById('bgm');
    bgm.src = selectedSet.bgmSource;

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

document.addEventListener('DOMContentLoaded', () => {
    const backgroundImage = document.querySelector('.background-image');
    if (!backgroundImage) {
        console.error("Element with class 'background-image' not found.");
        return; // 要素が見つからない場合、以降の処理を実行しない
    }

    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) * 0.01;
        const moveY = (clientY - centerY) * 0.01;

        backgroundImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
