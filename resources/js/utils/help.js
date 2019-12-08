/**
 * 消息提示音
 */
export function voice() {
    let audio = document.createElement("audio");
    document.body.appendChild(audio);
    audio.src = '../assets/voice/default.mp3';
    audio.play();
};