// データセット（背景画像、説明文、BGMソース）を定義
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
];

let isZenMode = false; // 禅モードの状態を管理する変数
let zoomLevel = 100; // 背景画像のズームレベル（%）を管理する変数。初期値100%
let originalSearchStyle = {}; // 検索バーの元のスタイルを保存するオブジェクト
let originX = 50; // ズームの基準となるX位置（%）
let originY = 50; // ズームの基準となるY位置（%）

document.addEventListener('DOMContentLoaded', () => {
    // 背景画像、説明文、BGMをランダムに設定する
    const selectedSet = sets[Math.floor(Math.random() * sets.length)];
    const backgroundImage = document.querySelector('.background-image');
    backgroundImage.style.backgroundImage = `url('${selectedSet.backgroundImage}')`;
    backgroundImage.style.backgroundSize = `${zoomLevel}%`;
    backgroundImage.style.backgroundPosition = `${originX}% ${originY}%`;

    const descriptionCard = document.querySelector('.description-card');
    descriptionCard.textContent = selectedSet.description;

    const bgm = document.getElementById('bgm');
    bgm.src = selectedSet.bgmSource;
    bgm.volume = 0.5;

    const searchContainer = document.querySelector('.search-container');

    // 禅モードに入る前の検索バーのスタイルを保存
    originalSearchStyle = {
        position: searchContainer.style.position,
        top: searchContainer.style.top,
        left: searchContainer.style.left,
        transform: searchContainer.style.transform,
        display: searchContainer.style.display
    };

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
    async function updateWeather() {
        const weatherElement = document.getElementById('weather');
        const res = await fetch("http://api.weatherapi.com/v1/current.json?key=fb0ad9e3e9134f8ba3f112037240710&q=Yamaguchi&aqi=yes")
        const users = await res.json();
        const weatherData = {
            location: users.location.region,
            temperature: users.current.temp_c + '°C',
            description: users.current.condition.text
        };
        weatherElement.textContent = `${weatherData.location}: ${weatherData.temperature} - ${weatherData.description}`;
    }
    updateWeather();

    // 検索バーの機能を追加
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = document.getElementById('searchBar').value.trim();
        if (query) {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.location.href = googleSearchUrl;
        } else {
            alert('検索キーワードを入力してください');
        }
    }

    // 背景画像をマウス操作で移動させるエフェクト（通常モード用）
    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) * 0.01;
        const moveY = (clientY - centerY) * 0.01;

        backgroundImage.style.backgroundPosition = `${originX + moveX}% ${originY + moveY}%`;
    });

    // 禅モードのトグル機能を追加
    document.addEventListener('keydown', (event) => {
        if (event.key === 'z') {
            toggleZenMode();
        }
    });

    // 全画面表示を切り替える関数
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => console.log("Entered full screen mode"))
                .catch((err) => console.error(`Error attempting to enable full-screen mode: ${err.message}`));
        } else {
            document.exitFullscreen()
                .then(() => console.log("Exited full screen mode"))
                .catch((err) => console.error(`Error attempting to exit full-screen mode: ${err.message}`));
        }
    }

    // 禅モードをトグルする関数
    function toggleZenMode() {
        isZenMode = !isZenMode;
        const contentWrapper = document.querySelector('.content-wrapper');
        const navbar = document.querySelector('.navbar');
        const zenModeInstruction = document.querySelector('.zen-mode-instruction');

        if (isZenMode) {
            // 全画面表示に切り替える
            toggleFullScreen();

            // 禅モードに切り替える
            contentWrapper.style.display = 'none';
            navbar.style.display = 'none';
            searchBar.style.display = 'none';
            descriptionCard.style.display = 'none';
            zenModeInstruction.style.display = 'none';
            
            // 背景画像をズームできるように設定
            backgroundImage.classList.add('zoom-enabled'); // ズーム機能の有効化クラスを追加
            bgm.play();
        } else {
            // 全画面表示を解除
            toggleFullScreen();

            // 通常モードに戻す
            contentWrapper.style.display = 'block';
            navbar.style.display = 'flex';
            searchBar.style.display = 'block';
            descriptionCard.style.display = 'block';
            zenModeInstruction.style.display = 'block';

            // 背景画像のズームを解除
            backgroundImage.classList.remove('zoom-enabled');
            backgroundImage.style.backgroundSize = `100%`; // ズームを元に戻す
            backgroundImage.style.backgroundPosition = `center center`; // 画像の位置を中央に戻す
            zoomLevel = 100; // ズームレベルをリセット
            originX = 50; // ズーム基準位置を中央に戻す
            originY = 50;

            // 検索バーのスタイルを元に戻す
            searchBar.style.display = originalSearchStyle.display;
            searchContainer.style.position = originalSearchStyle.position;
            searchContainer.style.top = originalSearchStyle.top;
            searchContainer.style.left = originalSearchStyle.left;
            searchContainer.style.transform = originalSearchStyle.transform;

            bgm.pause();
        }
    }

    // 背景画像のズームを制御する関数（禅モード時）
    function zoomBackground(event) {
        if (isZenMode) { // 禅モード時のみズームを有効にする
            // マウスの位置を基準にズーム基準を設定
            const rect = backgroundImage.getBoundingClientRect();
            const mouseX = ((event.clientX - rect.left) / rect.width) * 100; // マウスのX位置を%で取得
            const mouseY = ((event.clientY - rect.top) / rect.height) * 100; // マウスのY位置を%で取得

            if (event.deltaY < 0) {
                // スクロールアップ（ズームイン）
                zoomLevel += 10;
                if (zoomLevel > 300) zoomLevel = 300; // ズームレベルの上限を設定
            } else {
                // スクロールダウン（ズームアウト）
                zoomLevel -= 10;
                if (zoomLevel < 100) zoomLevel = 100; // ズームレベルの下限を設定
            }

            // ズーム基準位置を設定（ズーム時に画像の拡大をマウス位置で制御）
            originX = mouseX;
            originY = mouseY;

            // ズームレベルと位置を背景画像に反映
            backgroundImage.style.backgroundSize = `${zoomLevel}%`;
            backgroundImage.style.backgroundPosition = `${originX}% ${originY}%`;
        }
    }

    // 禅モード時のみ背景画像をズームできるようにイベントリスナーを追加
    document.addEventListener('wheel', zoomBackground);
});
